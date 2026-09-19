-- ==============================================================================
-- 🏛️ ZEKOS & LYRA PRODUCTION SUPABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Project: ZEKOS (Industrial Kitchen Terminal & Mobile Companion)
-- Version: 1.0.0
-- Database: PostgreSQL 16 / Supabase
-- Target Region: Mumbai (ap-south-1)
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Households Table (The Sacred Hearth)
CREATE TABLE IF NOT EXISTS public.households (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  origin_cuisine TEXT DEFAULT 'Kongu Nadu (Tamil Nadu)',
  current_city TEXT DEFAULT 'Jaipur (Rajasthan)',
  wallet_balance NUMERIC(10, 2) DEFAULT 2450.00,
  daily_spend_limit NUMERIC(10, 2) DEFAULT 350.00,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Household Members Table
CREATE TABLE IF NOT EXISTS public.household_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('head', 'member', 'cook')),
  avatar_initials TEXT NOT NULL,
  attendance TEXT NOT NULL DEFAULT 'home' CHECK (attendance IN ('home', 'out')),
  health_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Living Pantry & Decay Table
CREATE TABLE IF NOT EXISTS public.pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  storage_zone TEXT NOT NULL CHECK (storage_zone IN ('crisper', 'counter', 'vault')),
  days_remaining INT NOT NULL,
  freshness_percent INT NOT NULL DEFAULT 100,
  category TEXT NOT NULL CHECK (category IN ('produce', 'dairy', 'staples', 'spices')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Meal Plans & Horizons Table
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
  slot TEXT NOT NULL CHECK (slot IN ('breakfast', 'tiffin', 'lunch', 'dinner')),
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  prep_time_minutes INT DEFAULT 20,
  servings INT DEFAULT 4,
  clears_perishables_text TEXT DEFAULT '',
  is_approved BOOLEAN DEFAULT FALSE,
  ingredients TEXT[] DEFAULT '{}',
  emotion_key TEXT DEFAULT 'toast_01_smile_neutral',
  scheduled_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Virtual Pod Terminal States Table
CREATE TABLE IF NOT EXISTS public.pod_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID UNIQUE REFERENCES public.households(id) ON DELETE CASCADE,
  is_connected BOOLEAN DEFAULT TRUE,
  local_lan_latency_ms INT DEFAULT 12,
  active_dish TEXT DEFAULT 'Dal Tadka & Steamed Rice',
  current_step_number INT DEFAULT 2,
  total_steps INT DEFAULT 4,
  current_step_text TEXT DEFAULT 'Splutter mustard seeds, cumin & curry leaves in hot gingelly oil.',
  whistle_current INT DEFAULT 2,
  whistle_target INT DEFAULT 3,
  timer_seconds_remaining INT DEFAULT 485,
  is_timer_running BOOLEAN DEFAULT TRUE,
  countertop_light_on BOOLEAN DEFAULT TRUE,
  volume_percent INT DEFAULT 75,
  is_mic_muted BOOLEAN DEFAULT FALSE,
  spotify_track TEXT DEFAULT 'Bho Shambho - Revati',
  spotify_artist TEXT DEFAULT 'Maharajapuram Santhanam',
  spotify_is_playing BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Autonomous Wallet Transactions Table (Pine Labs P3P)
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
  item_description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  merchant TEXT NOT NULL CHECK (merchant IN ('Zepto', 'Blinkit', 'Instamart')),
  ordered_by TEXT NOT NULL,
  is_autonomous BOOLEAN DEFAULT TRUE,
  mcc_code TEXT DEFAULT '5411',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 3D Wall Calendar Events Table (Adapted from Standalone Calendar)
CREATE TABLE IF NOT EXISTS public.wall_calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT DEFAULT '12:00',
  category TEXT NOT NULL CHECK (category IN ('meal', 'fasting', 'feast', 'market_delivery', 'reminder')),
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 🔒 ROW LEVEL SECURITY (RLS) POLICIES — ETA SENTINEL
-- ==============================================================================

ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pod_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wall_calendar_events ENABLE ROW LEVEL SECURITY;

-- Anonymous and Authenticated Access for Demo & Active Households
CREATE POLICY "Allow public read on households for demo" ON public.households
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on household_members for demo" ON public.household_members
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on pantry_items for demo" ON public.pantry_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on meal_plans for demo" ON public.meal_plans
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on pod_states for demo" ON public.pod_states
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on wallet_transactions for demo" ON public.wallet_transactions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on wall_calendar_events for demo" ON public.wall_calendar_events
  FOR SELECT USING (true);

-- Insert Demo Seed Record
INSERT INTO public.households (id, name, invite_code, origin_cuisine, current_city, wallet_balance, daily_spend_limit)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'The Sharma Residence',
  'ZEKOS-7492',
  'Kongu Nadu (Tamil Nadu)',
  'Jaipur (Rajasthan)',
  2450.00,
  350.00
) ON CONFLICT (invite_code) DO NOTHING;
