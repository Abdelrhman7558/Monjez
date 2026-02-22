-- 1. Job Status Table (For background task tracking)
CREATE TABLE IF NOT EXISTS public.job_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    job_type TEXT,
    status TEXT,
    progress INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    error_message TEXT
);
-- 2. Meta Ads Settings (Wallet and Checks)
CREATE TABLE IF NOT EXISTS public.meta_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    optimization_checks_count INTEGER DEFAULT 0,
    scaling_checks_count INTEGER DEFAULT 0,
    currency TEXT DEFAULT 'EGP'
);
-- 3. Meta Campaign Details
CREATE TABLE IF NOT EXISTS public.meta_campaign_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_campaign_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    strategy_type TEXT,
    allocated_budget DECIMAL(10, 2),
    status TEXT DEFAULT 'active',
    last_optimized_at TIMESTAMPTZ,
    last_scaled_at TIMESTAMPTZ
);
-- 4. Leads Table
CREATE TABLE IF NOT EXISTS public.apollo_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT,
    email TEXT,
    phone TEXT,
    role TEXT,
    company TEXT,
    linkedin_url TEXT,
    problem TEXT,
    headline TEXT,
    description TEXT,
    is_hot BOOLEAN DEFAULT false,
    batch_date DATE
);
-- 5. LinkedIn Configuration
CREATE TABLE IF NOT EXISTS public.linkedin_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    access_token TEXT,
    member_id TEXT,
    is_connected BOOLEAN DEFAULT false
);
-- 6. Social Assets (Creative materials)
CREATE TABLE IF NOT EXISTS public.social_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT,
    type TEXT,
    -- 'video', 'image'
    url TEXT,
    size TEXT,
    file_path TEXT
);
-- 7. Social Posts Tracking
CREATE TABLE IF NOT EXISTS public.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    content TEXT,
    post_type TEXT,
    status TEXT,
    -- 'scheduled', 'posted', 'failed'
    analytics JSONB DEFAULT '{}'::jsonb,
    refinement_feedback TEXT,
    -- Comments from user for AI
    original_content TEXT -- Backup if refinement happens
);
-- Initial settings row if not exists
INSERT INTO public.meta_settings (wallet_balance)
SELECT 0.00
WHERE NOT EXISTS (
        SELECT 1
        FROM public.meta_settings
    );
-- Initial linkedin config row if not exists
INSERT INTO public.linkedin_config (is_connected)
SELECT false
WHERE NOT EXISTS (
        SELECT 1
        FROM public.linkedin_config
    );
-- Enable RLS and simple policies
DO $$ BEGIN
ALTER TABLE public.job_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_campaign_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apollo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
EXCEPTION
WHEN OTHERS THEN NULL;
END $$;
-- Generic policies (Allow all for development)
DROP POLICY IF EXISTS "Allow All Job Status" ON public.job_status;
CREATE POLICY "Allow All Job Status" ON public.job_status FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow All Meta Settings" ON public.meta_settings;
CREATE POLICY "Allow All Meta Settings" ON public.meta_settings FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow All Meta Campaign Details" ON public.meta_campaign_details;
CREATE POLICY "Allow All Meta Campaign Details" ON public.meta_campaign_details FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow All Leads" ON public.apollo_leads;
CREATE POLICY "Allow All Leads" ON public.apollo_leads FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow All LinkedIn Config" ON public.linkedin_config;
CREATE POLICY "Allow All LinkedIn Config" ON public.linkedin_config FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow All Social Assets" ON public.social_assets;
CREATE POLICY "Allow All Social Assets" ON public.social_assets FOR ALL USING (true) WITH CHECK (true);