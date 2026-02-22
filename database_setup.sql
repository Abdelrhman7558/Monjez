-- 1. Table for Leads (Apollo/Apify)
CREATE TABLE IF NOT EXISTS apollo_leads (
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
-- 2. Table for Social Media Posts
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    platform TEXT DEFAULT 'LinkedIn',
    post_type TEXT,
    -- 'Post', 'Video', 'Photo'
    content TEXT,
    status TEXT DEFAULT 'scheduled',
    -- 'scheduled', 'posted', 'failed'
    scheduled_at TIMESTAMPTZ,
    analytics JSONB DEFAULT '{}'::jsonb
);
-- 3. Table for AI Consultant Chats
CREATE TABLE IF NOT EXISTS consultant_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES auth.users(id),
    role TEXT,
    -- 'user', 'assistant'
    content TEXT
);
-- Enable RLS for all tables
ALTER TABLE apollo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultant_chats ENABLE ROW LEVEL SECURITY;
-- Simple Policies (Allow all for testing, refine later for production)
CREATE POLICY "Allow All Leads" ON apollo_leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Social" ON social_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Chats" ON consultant_chats FOR ALL USING (true) WITH CHECK (true);