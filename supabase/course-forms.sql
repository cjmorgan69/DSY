-- AR course: blank forms for students (24 Nov 2026). Applied as migration `course_forms`.
-- The PDFs themselves are NOT in this public repo (the vendor form carries a SAAS manager's name and contact details):
-- they were uploaded straight into the table on 24 Nov 2026 through a one-time upload function that was then dropped.
-- Keys: vendor (Vendor_Creation_Form.pdf, 184,470 bytes, md5 88cbc0570839859b08b4058ec414b4fc)
--       cover  (Ambulance_Cover_Application_Volunteers.pdf, 853,585 bytes, md5 89a27fd63b1af78475f9d90c5483f07d)
-- To replace a form, ask Claude with the new PDF (same one-time upload route), or update the row from the Supabase dashboard.
create table if not exists public.course_forms (
  key text primary key,
  title text not null,
  filename text not null,
  data bytea not null,
  updated_at timestamptz not null default now()
);
alter table public.course_forms enable row level security;
revoke all on public.course_forms from anon, authenticated;

-- Any signed-in DSY user can download a form (students need them); nobody reads the table directly.
create or replace function public.course_form(p_key text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('title', f.title, 'filename', f.filename, 'b64', encode(f.data, 'base64'))
  from course_forms f where f.key = p_key and auth.uid() is not null
$$;
revoke execute on function public.course_form(text) from public, anon;
grant execute on function public.course_form(text) to authenticated;
