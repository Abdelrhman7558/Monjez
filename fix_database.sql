-- ============================================================
-- Monjez: Consolidated Database Schema
-- Run this in Supabase SQL Editor to set up all required tables.
-- All statements use IF NOT EXISTS / DROP IF EXISTS for safety.
-- ============================================================
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
-- 4. Leads Table (Apollo/Apify)
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
    batch_date DATE,
    outreach_status TEXT DEFAULT 'pending',
    -- 'pending', 'email_sent', 'linkedin_sent', 'failed'
    last_outreach_at TIMESTAMPTZ,
    outreach_logs JSONB DEFAULT '[]'::jsonb
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
    platform TEXT DEFAULT 'LinkedIn',
    status TEXT,
    -- 'scheduled', 'posted', 'failed'
    scheduled_at TIMESTAMPTZ,
    analytics JSONB DEFAULT '{}'::jsonb,
    refinement_feedback TEXT,
    -- Comments from user for AI
    original_content TEXT -- Backup if refinement happens
);
-- 8. Strategy Call Leads (Public Booking Form)
CREATE TABLE IF NOT EXISTS public.strategy_call_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_type TEXT,
    role TEXT,
    main_problem TEXT,
    monthly_revenue TEXT,
    status TEXT DEFAULT 'new',
    referral_source TEXT,
    selected_pricing_tier TEXT
);
-- 9. AI Consultant Chat Persistence
CREATE TABLE IF NOT EXISTS public.consultant_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- 10. Planner Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'Medium',
    -- 'Low', 'Medium', 'High'
    status TEXT DEFAULT 'todo',
    -- 'todo', 'in_progress', 'completed'
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
-- 11. Habits Tracking
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    frequency TEXT DEFAULT 'daily',
    -- 'daily', 'weekly'
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE,
    completed_at DATE DEFAULT current_date,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- 12. Industry News
CREATE TABLE IF NOT EXISTS public.industry_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT,
    url TEXT,
    source TEXT,
    category TEXT,
    -- 'AI', 'Automation', 'Meta', 'LinkedIn'
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_consultant_chats_user_id ON public.consultant_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_consultant_chats_created_at ON public.consultant_chats(created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id ON public.habit_logs(habit_id);
-- ============================================================
-- Seed Data
-- ============================================================
-- Initial meta_settings row if not exists
INSERT INTO public.meta_settings (wallet_balance)
SELECT 0.00
WHERE NOT EXISTS (
        SELECT 1
        FROM public.meta_settings
    );
-- Initial linkedin_config row if not exists
INSERT INTO public.linkedin_config (is_connected)
SELECT false
WHERE NOT EXISTS (
        SELECT 1
        FROM public.linkedin_config
    );
-- ============================================================
-- Row Level Security
-- ============================================================
-- Enable RLS on all tables
DO $$ BEGIN
ALTER TABLE public.job_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_campaign_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apollo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategy_call_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultant_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_news ENABLE ROW LEVEL SECURITY;
EXCEPTION
WHEN OTHERS THEN NULL;
END $$;
-- ============================================================
-- RLS Policies (Development: Allow All)
-- ============================================================
-- Job Status
DROP POLICY IF EXISTS "Allow All Job Status" ON public.job_status;
CREATE POLICY "Allow All Job Status" ON public.job_status FOR ALL USING (true) WITH CHECK (true);
-- Meta Settings
DROP POLICY IF EXISTS "Allow All Meta Settings" ON public.meta_settings;
CREATE POLICY "Allow All Meta Settings" ON public.meta_settings FOR ALL USING (true) WITH CHECK (true);
-- Meta Campaign Details
DROP POLICY IF EXISTS "Allow All Meta Campaign Details" ON public.meta_campaign_details;
CREATE POLICY "Allow All Meta Campaign Details" ON public.meta_campaign_details FOR ALL USING (true) WITH CHECK (true);
-- Apollo Leads
DROP POLICY IF EXISTS "Allow All Leads" ON public.apollo_leads;
CREATE POLICY "Allow All Leads" ON public.apollo_leads FOR ALL USING (true) WITH CHECK (true);
-- LinkedIn Config
DROP POLICY IF EXISTS "Allow All LinkedIn Config" ON public.linkedin_config;
CREATE POLICY "Allow All LinkedIn Config" ON public.linkedin_config FOR ALL USING (true) WITH CHECK (true);
-- Social Assets
DROP POLICY IF EXISTS "Allow All Social Assets" ON public.social_assets;
CREATE POLICY "Allow All Social Assets" ON public.social_assets FOR ALL USING (true) WITH CHECK (true);
-- Social Posts
DROP POLICY IF EXISTS "Allow All Social Posts" ON public.social_posts;
CREATE POLICY "Allow All Social Posts" ON public.social_posts FOR ALL USING (true) WITH CHECK (true);
-- Strategy Call Leads
DROP POLICY IF EXISTS "Allow All Strategy Leads" ON public.strategy_call_leads;
CREATE POLICY "Allow All Strategy Leads" ON public.strategy_call_leads FOR ALL USING (true) WITH CHECK (true);
-- Consultant Chats
DROP POLICY IF EXISTS "Allow All Consultant Chats" ON public.consultant_chats;
CREATE POLICY "Allow All Consultant Chats" ON public.consultant_chats FOR ALL USING (true) WITH CHECK (true);
-- Tasks
DROP POLICY IF EXISTS "Allow All Tasks" ON public.tasks;
CREATE POLICY "Allow All Tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
-- Habits
DROP POLICY IF EXISTS "Allow All Habits" ON public.habits;
CREATE POLICY "Allow All Habits" ON public.habits FOR ALL USING (true) WITH CHECK (true);
-- Habit Logs
DROP POLICY IF EXISTS "Allow All Habit Logs" ON public.habit_logs;
CREATE POLICY "Allow All Habit Logs" ON public.habit_logs FOR ALL USING (true) WITH CHECK (true);
-- Industry News
DROP POLICY IF EXISTS "Allow All Industry News" ON public.industry_news;
CREATE POLICY "Allow All Industry News" ON public.industry_news FOR ALL USING (true) WITH CHECK (true);