-- 0001_init.sql
-- 层级：projects → canvases / sessions → messages
-- 注意：session 挂在 project 上而不是 canvas 上，切换画布时对话历史仍然连续。

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null,
  name        text not null check (char_length(name) between 1 and 60),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_user_updated_idx
  on public.projects (user_id, updated_at desc);

create table if not exists public.canvases (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects (id) on delete cascade,
  name        text not null default '主画布',
  elements    jsonb not null default '[]'::jsonb,
  viewport    jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists canvases_project_idx on public.canvases (project_id);

create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects (id) on delete cascade,
  title       text not null default '新对话',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists sessions_project_idx on public.sessions (project_id, updated_at desc);

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references public.sessions (id) on delete cascade,
  role        text not null check (role in ('user', 'assistant', 'tool')),
  content     text not null default '',
  blocks      jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists messages_session_idx on public.messages (session_id, created_at);

-- RLS：用户只能看到自己的项目，以及挂在项目下的画布/会话/消息
alter table public.projects enable row level security;
alter table public.canvases enable row level security;
alter table public.sessions enable row level security;
alter table public.messages enable row level security;

create policy projects_owner on public.projects
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy canvases_owner on public.canvases
  for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()))
  with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

create policy sessions_owner on public.sessions
  for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()))
  with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

create policy messages_owner on public.messages
  for all using (exists (
    select 1 from public.sessions s
    join public.projects p on p.id = s.project_id
    where s.id = session_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.sessions s
    join public.projects p on p.id = s.project_id
    where s.id = session_id and p.user_id = auth.uid()
  ));

-- updated_at 自动维护
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();
