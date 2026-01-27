create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  company text,
  message text not null,
  page_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  page_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_signups_created_at_idx
  on public.newsletter_signups (created_at desc);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  goal text not null,
  budget text,
  timeline text,
  partner text,
  note text,
  name text not null,
  phone text not null,
  email text not null,
  company text,
  service text not null,
  detail text not null,
  page_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

create table if not exists public.schedule_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  date text not null,
  slot text not null,
  page_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists schedule_requests_created_at_idx
  on public.schedule_requests (created_at desc);

alter table public.contact_messages enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.quote_requests enable row level security;
alter table public.schedule_requests enable row level security;
