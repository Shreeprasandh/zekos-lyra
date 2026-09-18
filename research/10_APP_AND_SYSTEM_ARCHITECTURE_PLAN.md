# Module 10: ZEKOS Companion App & System Architecture Plan

**Brand**: **ZEKOS**  
**AI Companion**: **LYRA**  
**Design Philosophy**: *Organic Minimalism & Warm Tactile Luxury*  
**Architecture Spec**: Version 1.0.0 (Production Blueprint)  
**Date**: 2026-09-18T12:44:00+05:30  
**Author**: Luna (Chief Architect) for Sir  

---

## 1. Design Philosophy & Aesthetic Directives

To guarantee that **ZEKOS** feels like a timeless, human-crafted heirloom rather than a generic or cold "AI gadget", the interface follows four strict design laws:

```
+-------------------------------------------------------------------------------+
|                       ZEKOS VISUAL & INTERACTION LAWS                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. BREATHING WHITESPACE:                                                     |
|     Minimum 32px grid gutters, 64px section margins. Never crowd a card.      |
|     Every element must have deliberate negative space around it.              |
|                                                                               |
|  2. ORGANIC WARM PALETTE (HASAMI PORCELAIN & SLATE):                          |
|     No harsh neon blues or electric purples typical of cheap AI wrappers.    |
|     • Canvas: Warm Ceramic Bone (#FBF9F6) / Deep Obsidian (#141312)           |
|     • Surface: Raw Linen / Sand (#F2EEE9) / Charcoal Ash (#1E1C1A)            |
|     • Primary Accent: Terracotta Clay (#C85A32)                               |
|     • Botanical Accent: Muted Sage (#6B7C65)                                  |
|     • Text: Smoked Espresso (#231F20) / Pure Bone (#FAF8F5)                   |
|                                                                               |
|  3. EDITORIAL TYPOGRAPHIC CONTRAST:                                           |
|     Display: High-end editorial serif (Instrument Serif / Fraunces) for warm, |
|     human culinary headers; paired with razor-sharp Swiss grotesque (Geist /  |
|     Inter) for numbers, timer clocks, and nutritional grams.                  |
|                                                                               |
|  4. TACTILE MICRO-ANIMATIONS (PHYSICS-FIRST):                                 |
|     Spring physics via Framer Motion (stiffness: 300, damping: 28). Buttons   |
|     compress like physical keys; cards glide with subtle elevation blurs.     |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 2. Complete Production Tech Stack (Gold Standard & Feasibility)

We reject fragile prototype shortcuts. The ZEKOS platform is engineered on battle-tested, high-throughput, latency-optimized industry standards:

```
+---------------------------------------------------------------------------------------------------+
|                                     ZEKOS SYSTEM TOPOLOGY                                         |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [ CLIENT LAYER ]                                                                                 |
|  +--------------------------------------------+  +---------------------------------------------+  |
|  | ZEKOS MOBILE COMPANION APP                 |  | ZEKOS POD WALL TERMINAL                     |  |
|  | • Next.js 16 PWA & React Native (Expo SDK) |  | • Rockchip RK3566 Linux Embedded OS         |  |
|  | • React 19 Server Components by default    |  | • Hardware-Accelerated Chromium Kiosk UI    |  |
|  | • Tailwind CSS v4 + Framer Motion          |  | • Offline Local SQLite Cache (Top 300 Meals)|  |
|  | • Lucide Icons (Minimal 1.5px stroke)      |  | • ALSA / PulseAudio DSP (Hardware AEC Loop) |  |
|  +---------------------+----------------------+  +----------------------+----------------------+  |
|                        |                                                |                         |
|                        +-----------------------+------------------------+                         |
|                                                |                                                  |
|                                                v                                                  |
|  [ API & AGENTIC ORCHESTRATION GATEWAY ]                                                          |
|  +---------------------------------------------------------------------------------------------+  |
|  | • Node.js / Next.js 16 Route Handlers (Edge / Serverless)                                   |  |
|  | • tRPC / Zod Strict Runtime Validation (Zero Unchecked Payloads)                             |  |
|  | • Pine Labs P3P Gateway (HTTP 402 Autonomous Payment Handshake Client)                      |  |
|  | • Spotify Connect Web API & Daemon Controller (`librespot` IPC)                            |  |
|  | • Quick-Commerce Multiplexer (Blinkit, Zepto, Swiggy Instamart Dark Store Stock Engine)     |  |
|  +---------------------------------------------+-----------------------------------------------+  |
|                                                |                                                  |
|                                                v                                                  |
|  [ DATABASE & LIVING DATA STORE (SUPABASE POSTGRES 16) ]                                          |
|  +---------------------------------------------------------------------------------------------+  |
|  | • 100% Row Level Security (RLS) Multi-Tenant Isolation                                      |  |
|  | • pgvector Embeddings for Household Palate Tensor & Taste Memory Clustering                |  |
|  | • Supabase Realtime WebSockets (Instant Pod-to-App State Sync <50ms)                        |  |
|  | • Validated ICMR-NIN IFCT 2017 & USDA FoodData Central Empirical Nutritional Stores         |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

### 2.1 Why This Stack is 100% Feasible & Battle-Tested
1. **Next.js 16 + React 19 Server Components (RSC)**:
   * 0kb client bundle overhead for static nutritional lookups and recipe indexes.
   * Instant server-side rendering (SSR) of complex family meal calendars.
2. **Supabase Postgres 16 with pgvector**:
   * Uses `pgvector` HNSW indexing for instantaneous cosine-similarity search over family preference vectors, finding dishes that match Mom's remaining vegetables in <12ms.
3. **Rockchip RK3566 Linux Kiosk (Pod Hardware)**:
   * Rockchip's VPU supports hardware-accelerated rendering of Chromium at 60 FPS on an 800x480 or 1080x600 display with <3W total system power draw.
4. **Pine Labs P3P + Grantex Engine**:
   * Extends production UPI AutoPay infrastructure; zero reliance on fragile browser automation or scraping.

---

## 3. The Companion Mobile App: Screen-by-Screen Architecture

The mobile app serves as the **Master Configuration Anchor**—quiet, elegant, and never intrusive.

```
+-------------------------------------------------------------------------------+
|                      ZEKOS COMPANION APP SCREEN FLOW                          |
+-------------------+---------------------------+-------------------------------+
| SCREEN            | PRIMARY PURPOSE           | KEY UI / INTERACTION DETAILS  |
+-------------------+---------------------------+-------------------------------+
| 1. The Hearth     | Daily Glancable Overview  | • Proposed Lunch & Dinner     |
|    (Home Dashboard)| & Meal Approvals          | • Active Decay Clock Alert    |
|                   |                           | • 1-Tap Absence Toggle        |
|                   |                           | • Single organic hero card    |
+-------------------+---------------------------+-------------------------------+
| 2. The Larder     | Living Inventory &        | • Grouped: Crisper / Pantry   |
|    (Inventory)    | Spoilage Countdown        | • Freshness progress bars     |
|                   |                           | • Auto-synced delivery receipts|
+-------------------+---------------------------+-------------------------------+
| 3. The Palate     | Household Identity,       | • Origin Cuisine Selector     |
|    (Heritage)     | Health & Taste Graph      | • Spice tolerance sliders     |
|                   |                           | • Family member allergy tags  |
+-------------------+---------------------------+-------------------------------+
| 4. The Wallet     | Autonomous Spend Controls | • Live Wallet Balance (UPI)   |
|    (Commerce)     | & Quick Commerce Rails    | • Daily Spend Limit Slider    |
|                   |                           | • Verifiable Receipt Ledger   |
+-------------------+---------------------------+-------------------------------+
| 5. Connectors     | Hardware, Spotify &       | • ZEKOS Pod BLE Status        |
|    (Integrations) | Smart Home Devices        | • Spotify OAuth Connect       |
|                   |                           | • LPG Cylinder Bluetooth scale|
+-------------------+---------------------------+-------------------------------+
```

### 3.1 Screen 1: The Hearth (Home Dashboard)
* **Hero Visual**: A single, clean card celebrating today's meal plan with high-resolution food photography, subtle steam micro-animations, and generous 32px padding.
* **Absence Toggle**: Simple, respectful pill buttons for each family member:
  * `[ Rohan: Eating Home 🟢 ]` (Tap once to change to `[ Eating Out 🔴 ]`).
* **Active Spoilage Card**: Surfaces only when perishables are within 72 hours of decay:
  * *"2kg Potatoes remaining (3 days left). Suggested: Aloo Gobi or Dum Aloo."*
* **Zero Clutter**: Exactly 3 cards visible on first load. No endless scroll, no ad banners, no dark patterns.

### 3.2 Screen 2: The Larder (Living Kitchen Inventory)
* **Visual Categorization**:
  * *Cold Crisper*: Fresh vegetables, herbs, dairy, paneer.
  * *Dry Counter*: Onions, potatoes, garlic, bananas.
  * *Pantry Vault*: Lentils (*dals*), rice, atta, cooking oil, spices.
* **Decay Indicator**: Instead of alarming red warning text, an elegant circular ring indicates freshness (Green: 100-60% shelf-life; Amber: 59-25%; Terracotta: <24% urgency).
* **Auto-Ingress**: Shows recent delivery batches: *"Added from Blinkit 10 mins ago: 500g Nandini Curd, 1kg Tomatoes."*

### 3.3 Screen 3: The Palate (Cultural Heritage & Health)
* **The Migrant Palate Configuration**:
  * Dropdown: `Cultural Heritage: Tamil Nadu (Kongu Nadu - Erode)`
  * Dropdown: `Current Residence: Jaipur, Rajasthan`
  * System displays active local substitutions: *"Shallots unavailable in Jaipur; auto-substituting sweet small onions with jaggery tweak."*
* **Family Profiles**:
  * *Dad*: Type-2 Diabetic (Flags high-glycemic rice; auto-recommends brown rice or millet blend).
  * *Mom*: Excludes whole cloves (Hard culinary exclusion).
  * *Son*: High protein target (Auto-upscales paneer/dal ratios).

### 3.4 Screen 4: The Kitchen Wallet (Autonomous Commerce)
* **Wallet Card**: Large, crisp typography showing available balance (e.g., `₹2,450.00`).
* **1-Tap Top-Up**: Pre-set buttons: `[+₹500]` `[+₹1,000]` `[+₹2,000]` over UPI AutoPay.
* **Spend Guardrails (Grantex)**:
  * Daily Cap Slider: Set to `₹350 / day`.
  * Category Lock: Strictly restricted to Groceries & Fresh Produce (MCC 5411).
  * Voice Biometric / PIN: Toggle on/off for orders exceeding ₹150.
* **Verifiable Audit Log**: Every autonomous order displays time, dark-store receipt, price, and reason (*"Ordered 10 Rs Nandini Milk packet via Zepto — requested by Mom via voice"*).

---

## 4. The ZEKOS Pod Wall Display: Glancable Kiosk UI (800x480)

The physical wall unit uses a **State-Driven Ambient Display Engine** designed to be read effortlessly from 6 feet away while standing at the stove:

```
+-------------------------------------------------------------------------------+
|                    ZEKOS POD DISPLAY STATES (800x480 IPS)                     |
+-------------------------------------------------------------------------------+
|                                                                               |
|  STATE 1: IDLE / AMBIENT CLOCK & MUSIC                                        |
|  +-------------------------------------------------------------------------+  |
|  | 07:18 AM                    TUESDAY, 18 SEP               WI-FI: ONLINE |  |
|  |                                                                         |  |
|  |   🥘 Today's Lunch: Arhar Dal Tadka + Bhindi Fry + Phulkas              |  |
|  |   👥 Portions: 3  |  🥔 Spoil Alert: 2kg Potatoes (3 days left)         |  |
|  |                                                                         |  |
|  |   🎵 Spotify: "M.S. Subbulakshmi - Bhaja Govindam" [||||||||·····]      |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
|  STATE 2: ACTIVE COOKING STEP (GIANT 36PT TYPOGRAPHY)                         |
|  +-------------------------------------------------------------------------+  |
|  | STEP 3 OF 6                          TOMATO RICE PREP     [ROTARY: SCROLL] |  |
|  |                                                                         |  |
|  |   "Add 1 tsp mustard seeds and 2 green chillies.                        |  |
|  |    Wait for splutter, then add chopped onions."                         |  |
|  |                                                                         |  |
|  |   [||||||||||||||||||||||||||||||||····················] 45% Complete   |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
|  STATE 3: DUAL TIMERS & WHISTLE COUNTER (PARALLEL SPLIT)                      |
|  +-------------------------------------------------------------------------+  |
|  | DAL WHISTLES                BIRYANI DUM TIMER         EGG BOIL TIMER    |  |
|  |                                                                         |  |
|  |   WHISTLE: 2 / 3                11 : 42                   03 : 15       |  |
|  |   (Gas off next whistle)       REMAINING                 REMAINING      |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 5. End-to-End Voice Interaction & Hardware AEC Pipeline

```
[ Mom speaks: "Hey Lyra, order a 10 Rs milk packet fast!" ]
                             |
                             v
Dual Knowles MEMS Microphones (Broadside Beamforming Array)
                             |
                             v
Conexant Audio DSP (Hardware Loopback AEC)
  • Subtracts Spotify music playback (75dB) from analog mic stream in real time.
  • Isolates vocal transients from continuous 72dB kitchen chimney fan hum.
                             |
                             v
Edge VAD (Voice Activity Detection) -> Triggers on "Hey Lyra!"
                             |
                             v
On-Device / Cloud ASR Pipeline (Gnani.ai Indic Model)
  • Latency: <240ms.
  • Decodes colloquial Indic code-switching (Hinglish/Tamil-English).
                             |
                             v
Dialogue State Engine (Natural Language Understanding)
  • Checks past preferences: Nandini Blue Milk, Zepto dark store.
  • Checks Wallet balance: ₹2,450 (Approved).
  • Checks Zepto stock: Available in dark store 800m away.
                             |
                             v
Spoken Confirmation (<600ms latency):
  🗣️ Lyra: "10 Rs Nandini on Zepto via wallet, right Mom?"
  👩 Mom: "Ha"
                             |
                             v
Autonomous Execution:
  • Pine Labs P3P HTTP 402 handshake debits ₹10 from wallet.
  • Zepto dark store dispatches rider.
  • Wall display shows rider ETA countdown: [ 🛵 Arriving in 8 mins ].
```

---

## 6. Implementation Roadmap & Verification Milestones

```
+-------------------------------------------------------------------------------+
|                       ENGINEERING IMPLEMENTATION ROADMAP                      |
+-------------------+-----------------------------------+-----------------------+
| MILESTONE         | KEY DELIVERABLES                  | COMPLETION CRITERIA   |
+-------------------+-----------------------------------+-----------------------+
| Phase 1: Core     | Next.js 16 Web Dashboard +        | • Dynamic Palate Graph|
| Simulation Engine | Wall Kiosk Simulator              |   calculates decay.   |
|                   | Tailwind CSS v4 + Framer Motion   | • 20 Features mapped. |
+-------------------+-----------------------------------+-----------------------+
| Phase 2: Empirical| ICMR-NIN IFCT 2017 database +     | • Real nutritional & |
| Data Layer        | Dark Store Mock API Contracts     |   SKU integrity.      |
+-------------------+-----------------------------------+-----------------------+
| Phase 3: Agentic  | Pine Labs P3P protocol simulator  | • Zero-OTP autonomous |
| Commerce Rails    | with Grantex daily spend ceilings |   wallet execution.   |
+-------------------+-----------------------------------+-----------------------+
| Phase 4: Audio    | Spotify Web Playback integration  | • Voice ducking &     |
| & Lifestyle Sync  | + dual timer & whistle counters   |   rotary wheel steps. |
+-------------------+-----------------------------------+-----------------------+
```
