-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Leads Table (Public Submission)
create table if not exists public.strategy_call_leads (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text not null,
    email text not null,
    company_type text,
    role text,
    main_problem text,
    monthly_revenue text,
    status text default 'new',
    referral_source text,
    selected_pricing_tier text
);

-- RLS for Leads
alter table public.strategy_call_leads enable row level security;

-- Policy: Allow specific Founder ID to view all leads
create policy "Founder can view all leads"
on public.strategy_call_leads
for select
to authenticated
using (auth.uid() = 'REPLACE_WITH_YOUR_FOUNDER_UUID'::uuid);

-- Policy: Allow Anon to Insert (for booking form)
create policy "Public can submit leads"
on public.strategy_call_leads
for insert
to anon
with check (true);

-- 2. Webhook Logs (Secure)
create table if not exists public.webhook_logs (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    source text not null,
    payload jsonb,
    status int
);

-- RLS for Webhook Logs
alter table public.webhook_logs enable row level security;

create policy "Founder can view logs"
on public.webhook_logs
for select
to authenticated
using (auth.uid() = 'REPLACE_WITH_YOUR_FOUNDER_UUID'::uuid);

-- 3. Founder Profile (Optional for now, but good for linking)
create table if not exists public.founder_profile (
    id uuid references auth.users not null primary key,
    full_name text,
    avatar_url text
);

alter table public.founder_profile enable row level security;

create policy "Users can view own profile"
on public.founder_profile
for select
to authenticated
using (auth.uid() = id);
