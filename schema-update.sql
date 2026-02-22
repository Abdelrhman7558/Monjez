-- Apollo Leads History
create table if not exists public.apollo_leads (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text,
    phone text,
    role text,
    company text,
    linkedin_url text,
    problem text,
    headline text,
    description text,
    is_hot boolean default false,
    batch_date date default current_date
);
-- Social Posts History
create table if not exists public.social_posts (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    content text not null,
    platform text default 'LinkedIn',
    post_type text,
    -- 'Post', 'Video', 'Photo'
    scheduled_at timestamp with time zone,
    status text default 'scheduled',
    -- 'scheduled', 'posted', 'failed'
    analytics jsonb default '{}'::jsonb
);
-- Enable RLS
alter table public.apollo_leads enable row level security;
alter table public.social_posts enable row level security;
-- Policies for Founder (assuming same logic as existing leads)
create policy "Founder can view apollo leads" on public.apollo_leads for
select to authenticated using (
        auth.uid() = 'REPLACE_WITH_YOUR_FOUNDER_UUID'::uuid
    );
create policy "Founder can manage social posts" on public.social_posts for all to authenticated using (
    auth.uid() = 'REPLACE_WITH_YOUR_FOUNDER_UUID'::uuid
);