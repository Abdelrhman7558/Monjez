-- Create table for AI Consultant chat persistence
CREATE TABLE IF NOT EXISTS consultant_chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE consultant_chats ENABLE ROW LEVEL SECURITY;
-- Create policies
CREATE POLICY "Users can view their own chats" ON consultant_chats FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chats" ON consultant_chats FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- Index for performance
CREATE INDEX IF NOT EXISTS idx_consultant_chats_user_id ON consultant_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_consultant_chats_created_at ON consultant_chats(created_at);