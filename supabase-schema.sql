-- Run this once in Supabase SQL Editor.
-- The dashboard keeps its existing data shape in JSONB so the current UI is unchanged.

create table if not exists public.jcm_portal_state (
  id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.jcm_portal_accounts (
  id text primary key,
  accounts jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.jcm_signup_requests (
  id text primary key,
  requests jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.jcm_portal_state enable row level security;
alter table public.jcm_portal_accounts enable row level security;
alter table public.jcm_signup_requests enable row level security;

-- The portal signs users in with Supabase Auth before reading or writing data.
-- Create the portal users in Authentication > Users and add role metadata
-- (role, campus, className, name) to each user's app_metadata/user_metadata.
drop policy if exists "jcm portal state read" on public.jcm_portal_state;
drop policy if exists "jcm portal state write" on public.jcm_portal_state;
create policy "jcm portal state read" on public.jcm_portal_state for select to authenticated using (auth.uid() is not null);
create policy "jcm portal state write" on public.jcm_portal_state for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "jcm portal accounts read" on public.jcm_portal_accounts;
drop policy if exists "jcm portal accounts write" on public.jcm_portal_accounts;
create policy "jcm portal accounts read" on public.jcm_portal_accounts for select to authenticated using (auth.uid() is not null);
create policy "jcm portal accounts write" on public.jcm_portal_accounts for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "jcm signup requests read" on public.jcm_signup_requests;
drop policy if exists "jcm signup requests write" on public.jcm_signup_requests;
create policy "jcm signup requests read" on public.jcm_signup_requests for select to authenticated using (auth.uid() is not null);
create policy "jcm signup requests write" on public.jcm_signup_requests for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

grant select, insert, update on public.jcm_portal_state to authenticated;
grant select, insert, update on public.jcm_portal_accounts to authenticated;
grant select, insert, update on public.jcm_signup_requests to authenticated;
