-- Joyn Strategy Hub — run this once in your Supabase SQL editor
-- Project → SQL Editor → paste → Run

create table if not exists posts (
  id          text         primary key,
  date        date         not null,
  platform    text         not null check (platform in ('TikTok', 'Instagram', 'Pinterest')),
  format      text         not null default '',
  hook        text         not null,
  shoot       text         not null default '',
  caption     text         not null,
  warn        text,
  promo_code  text,
  is_posted   boolean      not null default false,
  note        text         not null default '',
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now()
);

-- Allow all access (this is an internal team tool, no auth needed)
alter table posts enable row level security;
create policy "Allow all" on posts for all using (true) with check (true);

-- Enable realtime sync across team members
alter publication supabase_realtime add table posts;
