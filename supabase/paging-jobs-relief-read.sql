-- Relief Team Leaders on active cover can read the dispatch feed (owner, 24 Nov 2026).
-- leaders_read used profiles.role = 'leader' only; is_leader() also covers relievers (covering_ids()).
-- VTLs keep their own vtl_read policy. Applied as migration paging_jobs_relief_read.
drop policy if exists leaders_read on public.paging_jobs;
create policy leaders_read on public.paging_jobs for select to authenticated using ((select public.is_leader()));
