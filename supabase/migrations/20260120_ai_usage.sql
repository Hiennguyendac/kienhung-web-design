create table if not exists public.ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period text not null,
  tokens_used integer not null default 0,
  tokens_limit integer not null,
  plan text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ai_usage_user_period_key
  on public.ai_usage (user_id, period);

create or replace function public.set_ai_usage_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_ai_usage_updated_at on public.ai_usage;
create trigger set_ai_usage_updated_at
before update on public.ai_usage
for each row execute function public.set_ai_usage_updated_at();

alter table public.ai_usage enable row level security;

drop policy if exists "ai_usage_read_own" on public.ai_usage;
create policy "ai_usage_read_own"
on public.ai_usage for select
using (auth.uid() = user_id);

drop policy if exists "ai_usage_insert_own" on public.ai_usage;
create policy "ai_usage_insert_own"
on public.ai_usage for insert
with check (auth.uid() = user_id);

drop policy if exists "ai_usage_update_own" on public.ai_usage;
create policy "ai_usage_update_own"
on public.ai_usage for update
using (auth.uid() = user_id);
