# Supabase setup for Mooseology 101

Run these in the **Supabase Dashboard** (SQL Editor and Storage) so the app can store site content and slideshow images.

## 1. Environment variables

Ensure your app has:

- `VITE_SUPABASE_URL` – Project URL (Settings → API)
- `VITE_SUPABASE_ANON_KEY` – anon public key (Settings → API)

Set them in local `.env` and in Netlify (Site settings → Environment variables).

---

## 2. Auth: create Moose’s user

1. In Supabase: **Authentication** → **Providers** → enable **Email** (and optionally **Magic Link**).
2. **Authentication** → **Users** → **Add user** → create one user (e.g. Moose’s email + password).  
   There is no public signup; only this user can log in to edit.

---

## 3. Database: create tables and RLS

Run the following in **SQL Editor** (New query).

```sql
-- Editable site content (About text, later image URLs). Key-value store.
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Slideshow images: src (URL), alt text, display order.
create table if not exists public.slideshow_images (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- RLS: everyone can read; only authenticated users can write.
alter table public.site_content enable row level security;
alter table public.slideshow_images enable row level security;

create policy "site_content read" on public.site_content
  for select using (true);

create policy "site_content write" on public.site_content
  for all using (auth.role() = 'authenticated');

create policy "slideshow_images read" on public.slideshow_images
  for select using (true);

create policy "slideshow_images write" on public.slideshow_images
  for all using (auth.role() = 'authenticated');
```

If you see **"new row violates row-level security policy"** when adding a slideshow image, replace the single write policy with explicit insert/update/delete policies. In **SQL Editor** run:

```sql
drop policy if exists "slideshow_images write" on public.slideshow_images;

create policy "slideshow_images insert" on public.slideshow_images
  for insert to authenticated with check (true);

create policy "slideshow_images update" on public.slideshow_images
  for update to authenticated using (true) with check (true);

create policy "slideshow_images delete" on public.slideshow_images
  for delete to authenticated using (true);
```

---

## 4. Storage: bucket for site images

1. **Storage** → **New bucket** → name: `site-assets` → set **Public bucket** (so the app can show images via public URLs).
2. **Policies** for `site-assets`:
   - **SELECT**: allow for all (public read).
   - **INSERT / UPDATE / DELETE**: allow for `auth.role() = 'authenticated'`.

Or in SQL (Storage policies may be in Dashboard only; if your project supports storage policies in SQL, add them similarly).

---

## 5. Optional: seed About content

To prefill the About section from the app’s defaults, run once (adjust values if you like):

```sql
insert into public.site_content (key, value)
values
  ('intro', '"The leaves are turning and starting to fall..."'::jsonb),
  ('parkCity', '"Park City Mountain Resort is a premier ski destination..."'::jsonb),
  ('mooseIntro', '"Hello I am Moose, I''m a local full time certified ski instructor..."'::jsonb),
  ('experience', '"I create a fun one on one personalized learning experience..."'::jsonb),
  ('callToAction', '"So get your calendars out and start planning your 2025/2026 ski trip..."'::jsonb),
  ('contact', '"Call today to secure your ski school vacation dates..."'::jsonb),
  ('newStudentsIntro', '"Welcome to a new experience here at the Park City Ski School..."'::jsonb),
  ('newStudentsProcess', '"Are you going to fall? Yes! That is primarily the biggest fear..."'::jsonb),
  ('veteranStudents', '"Get those legs in shape with a little cardio..."'::jsonb)
on conflict (key) do nothing;
```

(You can paste the full default strings from the app code into the `value` strings above.)

---

## 6. Optional: seed slideshow images

To prefill the slideshow with the current image URLs (e.g. from ibb.co), insert rows into `slideshow_images` with `src`, `alt`, and `sort_order`. After that, Moose can replace them with uploads to `site-assets` and update the rows.
