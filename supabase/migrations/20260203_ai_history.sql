create table if not exists public.ai_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null,
  input text,
  output text,
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ai_history_user_id_idx on public.ai_history (user_id);
create index if not exists ai_history_created_at_idx on public.ai_history (created_at desc);

create or replace function public.cleanup_ai_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.ai_history
  where user_id = new.user_id
    and created_at < now() - interval '30 days';
  return new;
end;
$$;

create trigger cleanup_ai_history
after insert on public.ai_history
for each row execute function public.cleanup_ai_history();

alter table public.ai_history enable row level security;

create policy "ai_history_read_own"
  on public.ai_history
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "ai_history_insert_own"
  on public.ai_history
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "ai_history_delete_own"
  on public.ai_history
  for delete
  to authenticated
  using (auth.uid() = user_id);
