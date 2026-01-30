-- Pro upgrade requests
create table if not exists public.pro_upgrade_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text,
  full_name text,
  phone text,
  note text,
  amount integer not null default 100000,
  status text not null default 'pending',
  token text not null unique,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by text,
  updated_at timestamptz not null default now()
);

create index if not exists pro_upgrade_requests_user_id_idx on public.pro_upgrade_requests (user_id);
create index if not exists pro_upgrade_requests_status_idx on public.pro_upgrade_requests (status);

alter table public.pro_upgrade_requests enable row level security;

-- Users can create requests for themselves
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'pro_upgrade_requests'
      AND policyname = 'pro_upgrade_requests_insert'
  ) THEN
    CREATE POLICY "pro_upgrade_requests_insert"
      ON public.pro_upgrade_requests
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Users can read their own requests
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'pro_upgrade_requests'
      AND policyname = 'pro_upgrade_requests_select_own'
  ) THEN
    CREATE POLICY "pro_upgrade_requests_select_own"
      ON public.pro_upgrade_requests
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Only service role should update; no explicit update policy.
