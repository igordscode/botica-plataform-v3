create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

alter table public.newsletter_subscribers enable row level security;

revoke all on table public.newsletter_subscribers from anon, authenticated;
grant insert on table public.newsletter_subscribers to anon;

drop policy if exists "Allow anonymous newsletter subscriptions" on public.newsletter_subscribers;
create policy "Allow anonymous newsletter subscriptions"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);
