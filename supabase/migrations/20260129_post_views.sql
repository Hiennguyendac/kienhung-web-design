-- Create post views table
create table if not exists public.post_views (
  slug text primary key,
  views bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.post_views replica identity full;

-- RLS
alter table public.post_views enable row level security;

-- Allow public read access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'post_views'
      AND policyname = 'post_views_read_all'
  ) THEN
    CREATE POLICY "post_views_read_all"
      ON public.post_views
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Increment function
create or replace function public.increment_post_view(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_views bigint;
begin
  insert into public.post_views (slug, views)
  values (p_slug, 1)
  on conflict (slug)
  do update set views = public.post_views.views + 1,
                updated_at = now()
  returning views into v_views;

  return v_views;
end;
$$;

grant execute on function public.increment_post_view(text) to anon, authenticated;
grant select on table public.post_views to anon, authenticated;

-- Enable realtime on post_views if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'post_views'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.post_views;
  END IF;
END $$;
