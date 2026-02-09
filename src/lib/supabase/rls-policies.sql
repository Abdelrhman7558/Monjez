-- Enable RLS for all dashboard tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create Foundation policies for Founder-only access
-- This assumes all tables have a 'user_id' column that links to auth.users.id

CREATE POLICY "Founder full access" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON finance_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON founder_profile FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON habits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON investments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON companies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON ads_clients FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON website_analysis FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON webhook_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON competitors FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder full access" ON education FOR ALL USING (auth.uid() = user_id);

-- If the tables don't have user_id and you want to lock them to a specific user (the Founder),
-- you can use a policy that matches a specific email or ID directly if it's a single-user system.
-- Example: CREATE POLICY "Owner only" ON projects FOR ALL TO authenticated USING (auth.jwt()->>'email' = 'your-email@example.com');
