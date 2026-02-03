-- Fix function search_path mutable warning
alter function public.set_ai_usage_updated_at()
  set search_path = public;

-- Contact forms: allow inserts from anon/authenticated, keep RLS on
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_messages'
      AND policyname = 'contact_messages_insert'
  ) THEN
    CREATE POLICY "contact_messages_insert"
      ON public.contact_messages
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_signups'
      AND policyname = 'newsletter_signups_insert'
  ) THEN
    CREATE POLICY "newsletter_signups_insert"
      ON public.newsletter_signups
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'quote_requests'
      AND policyname = 'quote_requests_insert'
  ) THEN
    CREATE POLICY "quote_requests_insert"
      ON public.quote_requests
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'schedule_requests'
      AND policyname = 'schedule_requests_insert'
  ) THEN
    CREATE POLICY "schedule_requests_insert"
      ON public.schedule_requests
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;
