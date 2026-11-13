-- AR course bookings app (/ar/course/), 13 Nov 2026.
-- Replaces the Google Sheet app at /course/ for new groups. The old app and its sheet are not touched.
-- Students sign in with their DSY account (ambulance ID + password). They are matched to a group by
-- profiles.staff_id = course_students.staff_id (both normalised with norm_id).
-- Facilitators and leaders (is_facilitator()) read and change the course_* tables directly.
-- Students have no table access: they use the course_* functions below, which check the booking rules.

create table if not exists public.course_cohorts (
  id uuid primary key default gen_random_uuid(),
  name text not null,                          -- e.g. "AR course 2027 group 1"
  course_name text not null default 'Ambulance Responder Course',
  total_days int,                              -- days needed to complete (blank = count the days set up)
  cancel_cutoff_hours int not null default 48, -- students cannot cancel inside this window
  notes text,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid default auth.uid()
);

create table if not exists public.course_days (
  cohort_id uuid not null references public.course_cohorts(id) on delete cascade,
  day_number int not null,
  title text not null default '',
  links jsonb not null default '[]',           -- [{ "label": "...", "url": "..." }] course material for the day
  primary key (cohort_id, day_number)
);

create table if not exists public.course_workshops (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.course_cohorts(id) on delete cascade,
  day_number int not null,
  date date not null,
  start_time time,
  end_time time,
  location text not null default '',
  capacity int,                                -- blank = no limit
  notes text not null default '',
  cancelled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists course_workshops_cohort on public.course_workshops (cohort_id, day_number, date);

create table if not exists public.course_students (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.course_cohorts(id) on delete cascade,
  staff_id text not null,                      -- normalised ambulance ID
  first_name text not null default '',
  last_name text not null default '',
  active boolean not null default true,
  added_at timestamptz not null default now(),
  unique (cohort_id, staff_id)
);

create table if not exists public.course_bookings (
  workshop_id uuid not null references public.course_workshops(id) on delete cascade,
  student_id uuid not null references public.course_students(id) on delete cascade,
  status text not null check (status in ('confirmed', 'waitlist', 'cancelled')),
  booked_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (workshop_id, student_id)
);

create table if not exists public.course_attendance (
  workshop_id uuid not null references public.course_workshops(id) on delete cascade,
  student_id uuid not null references public.course_students(id) on delete cascade,
  status text not null check (status in ('present', 'late', 'left_early', 'absent')),
  note text not null default '',
  marked_by uuid default auth.uid(),
  marked_at timestamptz not null default now(),
  primary key (workshop_id, student_id)
);

create table if not exists public.course_unavailable (
  student_id uuid not null references public.course_students(id) on delete cascade,
  day_number int not null,
  note text not null default '',
  status text not null default 'open' check (status in ('open', 'withdrawn', 'cleared', 'booked')),
  sent_at timestamptz not null default now(),
  primary key (student_id, day_number)
);

-- What changed, for the facilitator's "Recent changes" list.
create table if not exists public.course_events (
  id bigint generated always as identity primary key,
  cohort_id uuid not null references public.course_cohorts(id) on delete cascade,
  kind text not null,                          -- booked, switched, cancelled, waitlist, promoted, left_waitlist, cant_make, withdrew
  student_id uuid references public.course_students(id) on delete cascade,
  workshop_id uuid references public.course_workshops(id) on delete set null,
  day_number int,
  detail text not null default '',
  at timestamptz not null default now()
);
create index if not exists course_events_cohort on public.course_events (cohort_id, at desc);

-- Facilitators and leaders: full access. Everyone else: none (students use the functions).
do $$
declare t text;
begin
  foreach t in array array['course_cohorts','course_days','course_workshops','course_students',
                           'course_bookings','course_attendance','course_unavailable','course_events'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_fac_all', t);
    execute format('create policy %I on public.%I for all to authenticated using (public.is_facilitator()) with check (public.is_facilitator())', t || '_fac_all', t);
    execute format('revoke all on public.%I from anon', t);
  end loop;
end $$;

/* ----------------------------- helpers ----------------------------- */

create or replace function public.course_today() returns date
language sql stable as $$ select (now() at time zone 'Australia/Adelaide')::date $$;

create or replace function public.course_starts_at(w public.course_workshops) returns timestamptz
language sql stable as $$ select ((w.date + coalesce(w.start_time, time '00:00')) at time zone 'Australia/Adelaide') $$;

-- The signed-in person's place in their newest active (not archived) group, or null.
create or replace function public.course_me() returns public.course_students
language sql stable security definer set search_path = public as $$
  select s.* from course_students s
  join course_cohorts c on c.id = s.cohort_id
  join profiles p on p.id = auth.uid()
  where s.active and not c.archived and s.staff_id = norm_id(p.staff_id) and s.staff_id <> ''
  order by c.created_at desc limit 1
$$;

-- Move people up from the waiting list while there are places.
create or replace function public.course_fill_waitlist(p_workshop uuid) returns void
language plpgsql security definer set search_path = public as $$
declare w course_workshops; nxt uuid; booked int;
begin
  select * into w from course_workshops where id = p_workshop;
  if w.id is null or w.cancelled or w.date < course_today() then return; end if;
  loop
    select count(*) into booked from course_bookings b join course_students s on s.id = b.student_id
      where b.workshop_id = w.id and b.status = 'confirmed' and s.active;
    exit when w.capacity is not null and booked >= w.capacity;
    nxt := null;
    select b.student_id into nxt from course_bookings b join course_students s on s.id = b.student_id
      where b.workshop_id = w.id and b.status = 'waitlist' and s.active order by b.booked_at limit 1;
    exit when nxt is null;
    update course_bookings set status = 'confirmed', updated_at = now() where workshop_id = w.id and student_id = nxt;
    update course_unavailable set status = 'booked' where student_id = nxt and day_number = w.day_number and status = 'open';
    insert into course_events (cohort_id, kind, student_id, workshop_id, day_number) values (w.cohort_id, 'promoted', nxt, w.id, w.day_number);
  end loop;
end $$;

-- Facilitator: after changing capacity, move people up.
create or replace function public.course_promote(p_workshop uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not is_facilitator() then raise exception 'Facilitators only.'; end if;
  perform course_fill_waitlist(p_workshop);
end $$;

/* --------------------------- student home --------------------------- */

create or replace function public.course_home() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare me course_students; c course_cohorts; out jsonb;
begin
  me := course_me();
  if me.id is null then
    return jsonb_build_object('enrolled', false,
      'name', (select full_name from profiles where id = auth.uid()),
      'staff_id', (select staff_id from profiles where id = auth.uid()));
  end if;
  select * into c from course_cohorts where id = me.cohort_id;
  select jsonb_build_object(
    'enrolled', true,
    'today', course_today(),
    'student', jsonb_build_object('first_name', me.first_name, 'last_name', me.last_name),
    'cohort', jsonb_build_object('name', c.name, 'course_name', c.course_name, 'total_days', c.total_days, 'cutoff_hours', c.cancel_cutoff_hours),
    'days', coalesce((select jsonb_agg(jsonb_build_object('day', d.day_number, 'title', d.title, 'links', d.links) order by d.day_number)
                      from course_days d where d.cohort_id = c.id), '[]'),
    'workshops', coalesce((select jsonb_agg(jsonb_build_object(
        'id', w.id, 'day', w.day_number, 'date', w.date, 'start', to_char(w.start_time, 'HH24:MI'), 'end', to_char(w.end_time, 'HH24:MI'),
        'location', w.location, 'notes', w.notes, 'capacity', w.capacity, 'cancelled', w.cancelled,
        'booked', (select count(*) from course_bookings b join course_students s on s.id = b.student_id where b.workshop_id = w.id and b.status = 'confirmed' and s.active),
        'waitlist', (select count(*) from course_bookings b join course_students s on s.id = b.student_id where b.workshop_id = w.id and b.status = 'waitlist' and s.active),
        'my', (select b.status from course_bookings b where b.workshop_id = w.id and b.student_id = me.id and b.status <> 'cancelled'),
        'my_place', (select count(*) + 1 from course_bookings b2 join course_students s2 on s2.id = b2.student_id
                     where b2.workshop_id = w.id and b2.status = 'waitlist' and s2.active
                       and b2.booked_at < (select b.booked_at from course_bookings b where b.workshop_id = w.id and b.student_id = me.id)),
        'attended', (select a.status from course_attendance a where a.workshop_id = w.id and a.student_id = me.id),
        'can_cancel', course_starts_at(w) - now() > make_interval(hours => c.cancel_cutoff_hours)
      ) order by w.date, w.start_time) from course_workshops w where w.cohort_id = c.id), '[]'),
    'unavailable', coalesce((select jsonb_agg(jsonb_build_object('day', u.day_number, 'note', u.note, 'sent_at', u.sent_at))
                             from course_unavailable u where u.student_id = me.id and u.status = 'open'), '[]')
  ) into out;
  return out;
end $$;

/* ------------------------- student actions ------------------------- */

-- Book a date. If the student holds another upcoming date for the same day, it is swapped.
-- If the date is full, join the waiting list instead when p_waitlist is true.
create or replace function public.course_book(p_workshop uuid, p_waitlist boolean default false) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me course_students; w course_workshops; c course_cohorts; other course_workshops; booked int; kind text := 'booked';
begin
  me := course_me();
  if me.id is null then raise exception 'You are not on a course group yet. Ask your facilitator.'; end if;
  select * into w from course_workshops where id = p_workshop for update;
  if w.id is null or w.cohort_id <> me.cohort_id then raise exception 'That date is not part of your course.'; end if;
  select * into c from course_cohorts where id = w.cohort_id;
  if w.cancelled then raise exception 'That date has been cancelled.'; end if;
  if w.date < course_today() then raise exception 'That date has already run.'; end if;
  if exists (select 1 from course_attendance a join course_workshops x on x.id = a.workshop_id
             where a.student_id = me.id and x.day_number = w.day_number and x.cohort_id = w.cohort_id and a.status in ('present', 'late')) then
    raise exception 'You have already done Day %.', w.day_number;
  end if;
  if exists (select 1 from course_bookings where workshop_id = w.id and student_id = me.id and status = 'confirmed') then
    raise exception 'You are already booked on this date.';
  end if;

  select count(*) into booked from course_bookings b join course_students s on s.id = b.student_id
    where b.workshop_id = w.id and b.status = 'confirmed' and s.active;

  if w.capacity is not null and booked >= w.capacity then
    if not p_waitlist then raise exception 'That date is full.'; end if;
    if exists (select 1 from course_bookings b join course_workshops x on x.id = b.workshop_id
               where b.student_id = me.id and x.day_number = w.day_number and x.cohort_id = w.cohort_id
                 and b.status = 'confirmed' and x.date >= course_today() and x.id <> w.id) then
      raise exception 'You are booked on another date for Day %. Cancel it first to wait for this one.', w.day_number;
    end if;
    insert into course_bookings (workshop_id, student_id, status) values (w.id, me.id, 'waitlist')
      on conflict (workshop_id, student_id) do update set status = 'waitlist', booked_at = now(), updated_at = now();
    insert into course_events (cohort_id, kind, student_id, workshop_id, day_number) values (w.cohort_id, 'waitlist', me.id, w.id, w.day_number);
    return course_home();
  end if;

  -- swap out an upcoming booking for the same day (needs to be outside the cut-off to let go of it)
  for other in select x.* from course_bookings b join course_workshops x on x.id = b.workshop_id
               where b.student_id = me.id and x.cohort_id = w.cohort_id and x.day_number = w.day_number
                 and b.status = 'confirmed' and x.id <> w.id and x.date >= course_today() loop
    if course_starts_at(other) - now() <= make_interval(hours => c.cancel_cutoff_hours) then
      raise exception 'Your Day % date is less than % hours away, so it cannot be changed here. Contact your facilitator.', w.day_number, c.cancel_cutoff_hours;
    end if;
    update course_bookings set status = 'cancelled', updated_at = now() where workshop_id = other.id and student_id = me.id;
    kind := 'switched';
    perform course_fill_waitlist(other.id);
  end loop;

  insert into course_bookings (workshop_id, student_id, status) values (w.id, me.id, 'confirmed')
    on conflict (workshop_id, student_id) do update set status = 'confirmed', booked_at = now(), updated_at = now();
  -- leave other waiting lists for this day
  update course_bookings b set status = 'cancelled', updated_at = now() from course_workshops x
    where x.id = b.workshop_id and b.student_id = me.id and x.day_number = w.day_number and b.status = 'waitlist' and x.id <> w.id;
  update course_unavailable set status = 'booked' where student_id = me.id and day_number = w.day_number and status = 'open';
  insert into course_events (cohort_id, kind, student_id, workshop_id, day_number) values (w.cohort_id, kind, me.id, w.id, w.day_number);
  return course_home();
end $$;

-- Cancel a booking (outside the cut-off) or leave a waiting list (any time).
create or replace function public.course_cancel(p_workshop uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me course_students; w course_workshops; c course_cohorts; st text;
begin
  me := course_me();
  if me.id is null then raise exception 'You are not on a course group yet.'; end if;
  select * into w from course_workshops where id = p_workshop;
  if w.id is null or w.cohort_id <> me.cohort_id then raise exception 'That date is not part of your course.'; end if;
  select * into c from course_cohorts where id = w.cohort_id;
  select status into st from course_bookings where workshop_id = w.id and student_id = me.id;
  if st = 'waitlist' then
    update course_bookings set status = 'cancelled', updated_at = now() where workshop_id = w.id and student_id = me.id;
    insert into course_events (cohort_id, kind, student_id, workshop_id, day_number) values (w.cohort_id, 'left_waitlist', me.id, w.id, w.day_number);
    return course_home();
  end if;
  if st is distinct from 'confirmed' then raise exception 'You are not booked on that date.'; end if;
  if w.date < course_today() then raise exception 'That date has already run.'; end if;
  if course_starts_at(w) - now() <= make_interval(hours => c.cancel_cutoff_hours) then
    raise exception 'This date is less than % hours away, so it cannot be cancelled here. Contact your facilitator.', c.cancel_cutoff_hours;
  end if;
  update course_bookings set status = 'cancelled', updated_at = now() where workshop_id = w.id and student_id = me.id;
  insert into course_events (cohort_id, kind, student_id, workshop_id, day_number) values (w.cohort_id, 'cancelled', me.id, w.id, w.day_number);
  perform course_fill_waitlist(w.id);
  return course_home();
end $$;

-- "I can't make any of these dates" for a day, with a short note; p_withdraw = true takes it back.
create or replace function public.course_cant_make(p_day int, p_note text default '', p_withdraw boolean default false) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me course_students;
begin
  me := course_me();
  if me.id is null then raise exception 'You are not on a course group yet.'; end if;
  if p_withdraw then
    update course_unavailable set status = 'withdrawn' where student_id = me.id and day_number = p_day and status = 'open';
    insert into course_events (cohort_id, kind, student_id, day_number) values (me.cohort_id, 'withdrew', me.id, p_day);
    return course_home();
  end if;
  if not exists (select 1 from course_workshops where cohort_id = me.cohort_id and day_number = p_day)
     and not exists (select 1 from course_days where cohort_id = me.cohort_id and day_number = p_day) then
    raise exception 'That day is not part of your course.';
  end if;
  if exists (select 1 from course_bookings b join course_workshops x on x.id = b.workshop_id
             where b.student_id = me.id and x.day_number = p_day and x.cohort_id = me.cohort_id and b.status = 'confirmed' and x.date >= course_today()) then
    raise exception 'You are booked for Day %. Cancel that booking first.', p_day;
  end if;
  insert into course_unavailable (student_id, day_number, note, status, sent_at) values (me.id, p_day, left(coalesce(p_note, ''), 300), 'open', now())
    on conflict (student_id, day_number) do update set note = excluded.note, status = 'open', sent_at = now();
  insert into course_events (cohort_id, kind, student_id, day_number, detail) values (me.cohort_id, 'cant_make', me.id, p_day, left(coalesce(p_note, ''), 300));
  return course_home();
end $$;

/* ----------------------- facilitator helpers ----------------------- */

-- Add students to a group from pasted lines. Each item: { staff_id, first_name, last_name }.
-- A leader also puts each ID on the DSY access list (as a student) so the person can create an account.
-- Returns, per ID, whether they already have a DSY account and whether the ID is on the access list.
create or replace function public.course_add_students(p_cohort uuid, p_people jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare p jsonb; sid text; lead boolean := is_leader(); out jsonb := '[]';
begin
  if not is_facilitator() then raise exception 'Facilitators only.'; end if;
  for p in select * from jsonb_array_elements(p_people) loop
    sid := norm_id(p->>'staff_id');
    continue when sid = '';
    insert into course_students (cohort_id, staff_id, first_name, last_name, active)
      values (p_cohort, sid, coalesce(trim(p->>'first_name'), ''), coalesce(trim(p->>'last_name'), ''), true)
      on conflict (cohort_id, staff_id) do update set
        first_name = coalesce(nullif(excluded.first_name, ''), course_students.first_name),
        last_name = coalesce(nullif(excluded.last_name, ''), course_students.last_name),
        active = true;
    if lead and not exists (select 1 from allowed_ids where staff_id = sid) then
      insert into allowed_ids (staff_id, note, role, added_by)
        values (sid, 'AR course: ' || coalesce((select name from course_cohorts where id = p_cohort), ''), 'member', auth.uid());
    end if;
  end loop;
  return course_account_status(p_cohort);
end $$;

-- For each student in a group: has a DSY account? on the access list?
create or replace function public.course_account_status(p_cohort uuid) returns jsonb
language sql stable security definer set search_path = public as $$
  select case when not is_facilitator() then null else coalesce(jsonb_agg(jsonb_build_object(
    'student_id', s.id,
    'account', exists (select 1 from profiles p where norm_id(p.staff_id) = s.staff_id),
    'allowed', exists (select 1 from allowed_ids a where a.staff_id = s.staff_id)
      or exists (select 1 from profiles p where norm_id(p.staff_id) = s.staff_id)
  )), '[]') end
  from course_students s where s.cohort_id = p_cohort
$$;

revoke execute on function public.course_me() from public, anon;
revoke execute on function public.course_home() from public, anon;
revoke execute on function public.course_book(uuid, boolean) from public, anon;
revoke execute on function public.course_cancel(uuid) from public, anon;
revoke execute on function public.course_cant_make(int, text, boolean) from public, anon;
revoke execute on function public.course_fill_waitlist(uuid) from public, anon, authenticated;
revoke execute on function public.course_promote(uuid) from public, anon;
revoke execute on function public.course_add_students(uuid, jsonb) from public, anon;
revoke execute on function public.course_account_status(uuid) from public, anon;
grant execute on function public.course_home() to authenticated;
grant execute on function public.course_book(uuid, boolean) to authenticated;
grant execute on function public.course_cancel(uuid) to authenticated;
grant execute on function public.course_cant_make(int, text, boolean) to authenticated;
grant execute on function public.course_promote(uuid) to authenticated;
grant execute on function public.course_add_students(uuid, jsonb) to authenticated;
grant execute on function public.course_account_status(uuid) to authenticated;
