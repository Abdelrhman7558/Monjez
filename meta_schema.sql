-- Meta Ads Settings (Wallet and Checks)
CREATE TABLE IF NOT EXISTS public.meta_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    optimization_checks_count INTEGER DEFAULT 0,
    scaling_checks_count INTEGER DEFAULT 0,
    currency TEXT DEFAULT 'EGP'
);
-- Meta Campaign Details (Extended metadata for our strategies)
CREATE TABLE IF NOT EXISTS public.meta_campaign_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_campaign_id TEXT UNIQUE NOT NULL,
    -- The ID from Meta API
    created_at TIMESTAMPTZ DEFAULT now(),
    strategy_type TEXT,
    -- 'Blender', 'ABO_Multi', 'ABO_Single', etc.
    allocated_budget DECIMAL(10, 2),
    status TEXT DEFAULT 'active',
    last_optimized_at TIMESTAMPTZ,
    last_scaled_at TIMESTAMPTZ
);
-- Initial settings row if not exists
INSERT INTO public.meta_settings (wallet_balance)
SELECT 0.00
WHERE NOT EXISTS (
        SELECT 1
        FROM public.meta_settings
    );
-- Enable RLS
ALTER TABLE public.meta_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_campaign_details ENABLE ROW LEVEL SECURITY;
-- Simple Policies (Allow all for the single settings row for now)
CREATE POLICY "Allow All Meta Settings" ON public.meta_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Meta Campaign Details" ON public.meta_campaign_details FOR ALL USING (true) WITH CHECK (true);