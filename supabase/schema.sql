create extension if not exists pgcrypto;

do $$
begin
  create type public.priority_level as enum ('low', 'medium', 'high', 'urgent');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.recurrence_type as enum ('daily', 'weekly', 'monthly', 'yearly');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.weekday as enum ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.anime_status as enum ('watching', 'paused', 'planned', 'completed');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.birthdays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  birth_date date not null,
  alert_days_before integer check (alert_days_before is null or alert_days_before >= 0),
  snoozed_until date,
  notes text
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  priority public.priority_level not null default 'medium',
  notes text,
  deadline date,
  completed boolean not null default false,
  recurrence_type public.recurrence_type,
  recurrence_interval integer check (recurrence_interval is null or recurrence_interval > 0),
  next_occurrence date,
  created_at timestamptz not null default now()
);

create table if not exists public.anime (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  release_day public.weekday not null,
  release_time time not null,
  status public.anime_status not null default 'watching'
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date date not null,
  time time not null,
  location text,
  notes text,
  is_recurring boolean not null default false,
  recurrence_type public.recurrence_type
);

create index if not exists birthdays_user_id_idx on public.birthdays(user_id);
create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists tasks_active_idx on public.tasks(user_id, completed, next_occurrence);
create index if not exists anime_user_id_idx on public.anime(user_id);
create index if not exists meetings_user_id_date_idx on public.meetings(user_id, date, time);

alter table public.birthdays enable row level security;
alter table public.tasks enable row level security;
alter table public.anime enable row level security;
alter table public.meetings enable row level security;

drop policy if exists "Birthdays select own rows" on public.birthdays;
create policy "Birthdays select own rows"
  on public.birthdays for select
  using (auth.uid() = user_id);

drop policy if exists "Birthdays insert own rows" on public.birthdays;
create policy "Birthdays insert own rows"
  on public.birthdays for insert
  with check (auth.uid() = user_id);

drop policy if exists "Birthdays update own rows" on public.birthdays;
create policy "Birthdays update own rows"
  on public.birthdays for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Birthdays delete own rows" on public.birthdays;
create policy "Birthdays delete own rows"
  on public.birthdays for delete
  using (auth.uid() = user_id);

drop policy if exists "Tasks select own rows" on public.tasks;
create policy "Tasks select own rows"
  on public.tasks for select
  using (auth.uid() = user_id);

drop policy if exists "Tasks insert own rows" on public.tasks;
create policy "Tasks insert own rows"
  on public.tasks for insert
  with check (auth.uid() = user_id);

drop policy if exists "Tasks update own rows" on public.tasks;
create policy "Tasks update own rows"
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Tasks delete own rows" on public.tasks;
create policy "Tasks delete own rows"
  on public.tasks for delete
  using (auth.uid() = user_id);

drop policy if exists "Anime select own rows" on public.anime;
create policy "Anime select own rows"
  on public.anime for select
  using (auth.uid() = user_id);

drop policy if exists "Anime insert own rows" on public.anime;
create policy "Anime insert own rows"
  on public.anime for insert
  with check (auth.uid() = user_id);

drop policy if exists "Anime update own rows" on public.anime;
create policy "Anime update own rows"
  on public.anime for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Anime delete own rows" on public.anime;
create policy "Anime delete own rows"
  on public.anime for delete
  using (auth.uid() = user_id);

drop policy if exists "Meetings select own rows" on public.meetings;
create policy "Meetings select own rows"
  on public.meetings for select
  using (auth.uid() = user_id);

drop policy if exists "Meetings insert own rows" on public.meetings;
create policy "Meetings insert own rows"
  on public.meetings for insert
  with check (auth.uid() = user_id);

drop policy if exists "Meetings update own rows" on public.meetings;
create policy "Meetings update own rows"
  on public.meetings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Meetings delete own rows" on public.meetings;
create policy "Meetings delete own rows"
  on public.meetings for delete
  using (auth.uid() = user_id);
