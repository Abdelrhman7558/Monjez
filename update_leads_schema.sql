-- Add tracking columns for email automation
ALTER TABLE public.apollo_leads
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS dm_sent BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS followup_sent BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS replied BOOLEAN DEFAULT false;
-- Notify PostgREST to reload schema
NOTIFY pgrst,
'reload schema';