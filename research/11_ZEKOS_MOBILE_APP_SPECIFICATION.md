# Module 11: ZEKOS Companion Mobile App — Complete Production Specification

**Brand**: **ZEKOS**  
**AI Companion**: **LYRA**  
**Framework**: **React Native (Expo SDK)**  
**Visual Theme**: **Hasami Earth (Ceramic & Linen Tactile Minimalism)**  
**Version**: 1.0.0 (Production Blueprint)  
**Date**: 2026-09-18T19:35:00+05:30  
**Author**: Luna (Chief Architect) for Sir  

---

## 1. Visual Design Language & Tactile Architecture

### 1.1 The Hasami Earth Palette & Physical Materials
The interface rejects flat generic digital screens. It is styled around organic ceramic pottery, raw woven linen, and smoked charcoal:

```
+-------------------------------------------------------------------------------+
|                        HASAMI EARTH MATERIAL SPECIFICATION                    |
+-------------------+---------------+-------------------------------------------+
| TOKEN NAME        | HEX VALUE     | PHYSICAL MATERIAL & USAGE                 |
+-------------------+---------------+-------------------------------------------+
| $canvas-bone      | #FBF9F5       | Warm unglazed porcelain base canvas.      |
| $surface-linen    | #F2EEE9       | Raw woven linen card surfaces.            |
| $border-sand      | #E5DFD7       | 1px tactile divider (subtle pottery edge).|
| $primary-terracotta| #C85A32      | Sun-baked terracotta clay (Primary action)|
| $accent-sage      | #7A8B73       | Dried culinary sage (Healthy/Fresh badge).|
| $text-espresso    | #1E1B18       | Smoked espresso bean (High-contrast text).|
| $text-muted       | #766E65       | Ground walnut dust (Subtitles & metrics). |
| $dark-obsidian    | #121110       | Cast iron / obsidian slate (Dark mode).   |
+-------------------+---------------+-------------------------------------------+
```

### 1.2 Fine Stipple / Porcelain Texture Overlay
To prevent an artificial "AI look", the root container applies a high-resolution, micro-opacity (2.5%) organic stipple grain:
* **Effect**: Simulates tactile matte ceramic pottery and Japanese washi paper under light.
* **Implementation**: An ultra-lightweight 64x64 repeating PNG tile overlay with `mix-blend-mode: multiply` and `pointer-events: none`.

### 1.3 Strict Anti-Clutter & Typographic Directives
* **Zero Emojis**: Replaced with precision 1.5px stroke Lucide vector icons (`lucide-react-native`).
* **Zero Text Walls**: Every card is restricted to a maximum of 2 to 3 concise lines with clear visual hierarchy.
* **Editorial Typographic Scale**:
  * *Headings*: **Instrument Serif** (28pt / 32pt) — warm, human, handcrafted.
  * *Interface & Data*: **Geist** or **Inter** (13pt / 15pt) — crisp, geometric Swiss legibility.

---

## 2. Brand Logo & Lyra AI Mascot Design Concept

```
+-------------------------------------------------------------------------------+
|                          BRAND LOGO & MASCOT BLUEPRINT                        |
+-------------------------------------------------------------------------------+
```

### 2.1 ZEKOS Brand Logo Concept
* **Visual Mark**: **The Hearth Monogram ("The Open Vessel")**.
  * A continuous geometric line forming a minimalist ceramic bowl enclosing an upward warm ember curve.
  * Represents both the traditional cooking pot (*vessel*) and the modern home sanctuary (*hearth*).
  * Color: Smoked Espresso (`#1E1B18`) on light ceramic; Terracotta (`#C85A32`) as an accent dot.
* **Wordmark**: `Z E K O S` in custom geometric grotesque capitals with wide 0.25em tracking.

### 2.2 LYRA Mascot Concept: "The Hearth Whisper"
To avoid cartoonish, cheesy AI robots (like floating spheres or clunky mechanical androids), Lyra is embodied as **an artistic, organic culinary spirit**:
* **Visual Morphology**: A stylized, minimalist flame-leaf creature crafted in fluid single-stroke ceramic geometry.
* **Character**: Calming, mindful, friendly, and serene. Eyes are closed in gentle contentment (resembling someone smelling freshly tempered spices or listening to simmering soup).
* **Color Palette**: Terracotta body with a soft Sage Green leaf-wisp crown.
* **Role in App**:
  * Sits quietly in the top header or greeting card.
  * When thinking or calculating, the leaf-wisp gently sways with a subtle breathing pulse.
  * When a cooking crisis occurs, Lyra holds a tiny wooden spoon, ready to assist.

---

## 3. Complete Authentication & Household Onboarding Architecture

```
[ FLOW 1: AUTHENTICATION ]
Splash Screen -> Auth Gateway (Google One-Tap or Email/Password) -> Profile Ingress

[ FLOW 2: HOUSEHOLD ONBOARDING ]
Household Identity (Name/Heritage) -> Family Members -> Pod Pairing -> 6-Digit Household Code
```

### 3.1 Authentication Screen (Clean & Flexible)
* **Primary Route A (Google One-Tap)**:
  * 1-Click Google OAuth sign-in.
  * After initial sign-in, prompts user to optionally set a secure password so they can log in via email/password in the future.
* **Primary Route B (Email + Password Credentials)**:
  * *Sign In Tab*: Email input, Password input, "Forgot Password?" link.
  * *Sign Up Tab*:
    * Full Name
    * Email Address
    * Mobile Number (for delivery delivery notifications)
    * Password (min 8 chars, 1 number)
    * Age & Gender (used strictly for metabolic/caloric baseline calculations)

### 3.2 Household Setup & 6-Digit Family Code (Option 1)
* **Master Setup (First User)**:
  * User names their home (e.g., *"The Sharma Residence"*).
  * System generates a permanent, secure **6-Digit Household Code**: e.g., `ZEKOS-7492`.
* **Family Member Ingress**:
  * Family members (husband, daughter, son) download the app, sign up with their email/Google, and tap **"Join an Existing Household"**.
  * They enter `ZEKOS-7492` or tap a shared WhatsApp link.
  * Instantly connected to the home pantry, wallet, and meal calendar!

---

## 4. Industry-Standard Tab Bar Architecture (Clean & Non-Confusing)

We have discarded all theatrical or confusing labels. The bottom navigation bar adheres strictly to standard consumer terminology:

```
+---------------------------------------------------------------------------------------------------+
|                            BOTTOM NAVIGATION BAR (5 STANDARD TABS)                                |
+------------------+------------------+------------------+------------------+-----------------------+
| 1. Home          | 2. Pantry        | 3. Remote        | 4. Wallet        | 5. Profile            |
| (Icon: Home)     | (Icon: Package)  | (Icon: Radio)    | (Icon: CreditCard| (Icon: User)          |
+------------------+------------------+------------------+------------------+-----------------------+
```

---

### Tab 1: HOME (Daily Operations & Meal Coordination)
* **Hero Meal Proposal Card**:
  * Displays today's recommended lunch or dinner with high-resolution food imagery.
  * Lists primary ingredients utilized and indicates if it prevents food waste (*"Clears 3 softening tomatoes"*).
  * Two clean buttons: `[ Approve Meal ]` (Terracotta) and `[ Swap Dish ]` (Linen Outline).
* **Family Dinner Attendance (1-Tap Absence Toggle)**:
  * Horizontal row of family avatars:
    * `[ Rohan: Eating Out 🔴 ]`  `[ Mom: Home 🟢 ]`  `[ Dad: Home 🟢 ]`
  * Tapping Rohan toggles his state; dinner cooking portions adjust automatically.
* **Active Spoilage Alert**:
  * Surfaces only when ingredients are within 72 hours of spoiling:
    * *"2kg Potatoes remaining (3 days left) • Suggested: Aloo Gobi"*

---

### Tab 2: PANTRY (Living Inventory & Delivery Sync)
* **Storage Categorization**:
  * *Crisper (Cold Storage)*: Dairy, greens, vegetables.
  * *Dry Counter*: Potatoes, onions, garlic, seasonal fruits.
  * *Pantry Vault*: Dals, rice, flours, oils, and spices.
* **Freshness Progress Ring**:
  * Each item displays a clean percentage freshness indicator based on biological decay half-life.
* **Quick-Commerce Delivery Ingress**:
  * Card showing recent synced grocery orders from Blinkit, Zepto, and Instamart.
  * 1-tap view of items added to stock with timestamps.

---

### Tab 3: REMOTE (ZEKOS Pod Live Controller)
*A dedicated remote control for the kitchen wall appliance:*
* **Live Kiosk Mirror**:
  * Displays what is currently on the kitchen wall screen:
    * Active Recipe Step: *"Step 2: Add 1 tsp mustard seeds & splutter."*
    * Pressure Cooker Whistle Counter: `Whistles: 2 / 3` (Dal cooker).
    * Active Timers: `Dum Timer: 11:24 Remaining`.
* **Hardware Remote Controls**:
  * Volume Slider (0% to 100%).
  * Countertop LED Illuminator toggle (`[ Warm 3000K ]` on/off).
  * Mute / Unmute physical microphone toggle.
* **Spotify Remote Audio Card**:
  * Now Playing track title, artist, album art, pause/play, skip buttons.
* **Household Intercom**:
  * Big tactile button: `[ 📢 Broadcast "Dinner is Ready" to Kitchen Pod & Phones ]`.

---

### Tab 4: WALLET (Autonomous Commerce & Spend Limits)
* **Current Balance Display**:
  * Large, elegant typography: `₹ 2,450.00`.
  * Pre-set top-up buttons: `[ +₹500 ]` `[ +₹1,000 ]` `[ +₹2,000 ]` via UPI / Cards.
* **Pine Labs Grantex Spend Guardrails**:
  * Daily Spend Slider: Set daily limit (e.g. `₹350 / day`).
  * Merchant Lock: Restricted strictly to Groceries & Milk (MCC 5411).
  * Voice Spoken PIN toggle for orders exceeding ₹150.
* **Autonomous Order Audit Ledger**:
  * Clear receipts: *"10 Rs Nandini Milk via Zepto — Ordered by Mom via voice (8 min delivery)"*.

---

### Tab 5: PROFILE (Heritage, Health & System Settings)
* **Cultural Heritage Matrix**:
  * Origin State & Regional Cuisine: `Tamil Nadu (Kongu Nadu / Erode)`.
  * Current City: `Jaipur, Rajasthan`.
  * Active Market Substitutions: *"Shallots replaced by sweet small red onions"*.
* **Hard Culinary Exclusions (Learned by Lyra)**:
  * List of user-defined and voice-learned exclusions: *"No whole cloves"*, *"No raw garlic on Tuesdays"*.
* **Family Member Profiles**:
  * Health tags, calorie goals, and dietary restrictions (Diabetic, Low-GI).
* **Language Switcher (Native Languages)**:
  * Select interface language: English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali.
* **Household Code Display**:
  * `ZEKOS-7492` (Tap to share invite link via WhatsApp/SMS).

---

## 5. Native Multilingual Support (i18n Implementation Guide)

To deliver seamless native language support without clunky machine translation:
1. **Library**: `i18next` and `react-i18next` integrated with `expo-localization`.
2. **Translation Catalogs**: Structured JSON dictionaries in `assets/locales/`:
   * `en.json` (English)
   * `hi.json` (Hindi - हिन्दी)
   * `ta.json` (Tamil - தமிழ்)
   * `te.json` (Telugu - తెలుగు)
   * `kn.json` (Kannada - ಕನ್ನಡ)
   * `mr.json` (Marathi - मराठी)
   * `bn.json` (Bengali - বাংলা)
3. **Dynamic Locale Switching**:
   * Auto-detects device locale on first boot.
   * User can change language anytime in Profile in 1 tap; all UI labels update instantly without app restart.

---

## 6. How to Generate Google App Password for SMTP Email Setup

To enable automated welcome emails, password resets, and grocery invoice summaries via your dedicated email account:

```
+-------------------------------------------------------------------------------+
|                   HOW TO GENERATE A GMAIL SMTP APP PASSWORD                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|  Step 1: Open Google Account Settings                                         |
|          Go to https://myaccount.google.com/ and sign in with the email       |
|          you want ZEKOS to use.                                               |
|                                                                               |
|  Step 2: Enable 2-Step Verification (Mandatory)                               |
|          Click on 'Security' on the left menu. Under 'How you sign in to      |
|          Google', ensure '2-Step Verification' is turned ON.                  |
|                                                                               |
|  Step 3: Search for "App Passwords"                                           |
|          In the search bar at the very top of your Google Account page,       |
|          type "App passwords" and click the search result.                    |
|                                                                               |
|  Step 4: Create App Password                                                  |
|          • Enter an App Name: type "ZEKOS App"                                |
|          • Click 'Create'.                                                    |
|                                                                               |
|  Step 5: Copy the 16-Character Password                                       |
|          Google will display a 16-character code (e.g., abcd efgh ijkl mnop). |
|          Copy this password and save it securely.                             |
|                                                                               |
+-------------------------------------------------------------------------------+
```
*(When we initialize the email backend, you can provide this 16-character code along with your email, and we will safely isolate it in `.env.local`).*

---

## 7. Calendar Architecture: Mobile Weekly Horizon & Decay Engine
* **Form-Factor Split (The Contrarian's Ruling)**:
  * **Kitchen Pod Screen**: **Zero calendar grids.** The wall terminal displays strictly execution context (active recipe step in 36pt, whistle counter, current meal title).
  * **Mobile Companion App**: Houses the **Weekly Meal Horizon Strip** adapted from `wall-calendar-standalone.zip`.
* **Integrated Meal & Decay Horizon**:
  * 7-day horizontal scroll with date numbers, cultural fasting badges (e.g. *Purattasi Saturday*), and color-coded meal slots:
    * 🌅 Breakfast • 🍱 Tiffin / Lunchbox • ☀️ Lunch • 🌙 Dinner
  * Biological Decay Badges: Red/Amber indicators showing perishables nearing expiration on specific days.

---

## 8. Mobile Home Screen Widgets (1x2 & 2x2 Specifications)

Crafted in the **Hasami Earth** tactile aesthetic (Porcelain `#FBF9F5`, Linen `#F2EEE9`, Terracotta `#C85A32`, Charcoal `#1E1B18`, zero emojis, 1.5px Lucide vector icons).

### 8.1 Widget 1: The Quick-Glance Strip (1x2 / 2x1)
* **Visual Form**: Compact horizontal banner for high-density home screens.
* **Content**:
  ```
  +-----------------------------------------------------------+
  | [Pottery Vessel Icon]  DINNER • 8:00 PM                   |
  | Tomato Rice + Cucumber Raita                              |
  | 3/4 Home • 2kg Potatoes Spoil Alert (3d)                  |
  +-----------------------------------------------------------+
  ```
* **Interactive Tap**:
  * Tap left side → Opens ZEKOS Home tab.
  * Tap right side → 1-tap toggle: *"I'm eating out tonight"* (updates portion count immediately).

### 8.2 Widget 2: The Hearth Square (2x2)
* **Visual Form**: Balanced square card featuring warm linen background, subtle sand border, and organic typography.
* **Content**:
  ```
  +-----------------------------------------------------------+
  | [Lyra Hearth Icon]           TODAY'S DINNER               |
  |                                                           |
  | Palak Paneer & Ragi Phulkas                               |
  | ⏱ 25 min prep • Clears 250g fresh spinach                |
  |                                                           |
  | [🟢 Mom] [🟢 Dad] [🔴 Rohan: Out]                        |
  |                                                           |
  | [ ✓ Approve Meal ]                [ ⇄ Swap Dish ]         |
  +-----------------------------------------------------------+
  ```
* **Interactive Controls**:
  * `[ ✓ Approve Meal ]`: Sends approval directly to domestic cook / kitchen pod.
  * `[ ⇄ Swap Dish ]`: Cycles to next best decay-optimized recipe without opening the full app.

---

## 9. Multimedia Recipe Ingestion Engine ("Share to ZEKOS")

Enables users to import recipes directly from social media platforms (Instagram Reels, YouTube Shorts, full YouTube cooking videos, TikTok, and WhatsApp links) without manual data entry.

```
+---------------------------------------------------------------------------------------------------+
|                        "SHARE TO ZEKOS" UNIVERSAL SOCIAL MEDIA PIPELINE                            |
+-------------------+--------------------+------------------------+---------------------------------+
| 1. SHARE INTENT   | 2. AI PARSING      | 3. PANTRY RECONCILER   | 4. CALENDAR SCHEDULING          |
| User taps 'Share' | Extracts title,    | Compares ingredients   | Displays 1-tap prompt:          |
| from Instagram /  | ingredients, prep  | against live stock;    | "Add Ranveer Brar's Dal Makhani |
| YouTube to ZEKOS  | steps, and time.   | tags missing items.    | to Sunday Dinner?"              |
+-------------------+--------------------+------------------------+---------------------------------+
```

### 9.1 YouTube Extraction Pipeline (Shorts & Full Videos)
1. **Ingress**: User shares a YouTube link (e.g. Ranveer Brar, Sanjeev Kapoor, Hebbar's Kitchen) via mobile OS Share Sheet.
2. **Transcript & Description Ingestion**: ZEKOS backend fetches YouTube video metadata, pinned comments, and closed-caption transcripts.
3. **Structured Schema Normalization**:
   * Generates a strict culinary recipe schema:
     - Dish Name
     - Prep & Cook Times
     - Ingredients List with standardized grams / ml
     - Step-by-step instructions
4. **Pantry Gap Analysis**:
   * *"You already have: Dal, Ghee, Onions, Ginger, Garlic."*
   * *"Missing: 1 pack Kasuri Methi (₹25), 1 pack Fresh Cream (₹40)."*
   * Option: `[ Add Missing Ingredients to Zepto/Blinkit Cart ]`.

### 9.2 Instagram Reel & WhatsApp Audio Note Ingestion
1. **Instagram Reels**: Ingests video audio stream and caption text; runs Whisper ASR on vernacular commentary (Hindi, Tamil, Hinglish) to transcribe spoken measurements (*"do chammach dahi"* → `2 tbsp curd`).
2. **Auntie / Relative WhatsApp Audio Notes**: Mom receives a 45-second voice note (*"Use two spoons roasted gram and green chilies for the coconut chutney"*). Mom shares the audio note to ZEKOS; Lyra converts it into a permanent saved household recipe.

---

## 10. Lock Screen Live Activity & Sticky Cooking Notifications

For hands-free awareness when actively cooking:
* **Real-Time Pressure Cooker Whistle Counter**:
  * Displays persistent Live Activity on iOS Dynamic Island / Lock Screen and Android Ongoing Notifications:
    > `🥘 Dal Cooker • Whistle 2 of 3 • Est. 3 mins remaining`
* **Countdown Timers**:
  * Active Dum / Simmer timers live on lock screen; phone screen wakes gently with subtle chime when 1 minute remains.
* **Zero Gas-Wasted Guarantee**: Eliminates forgotten whistling cookers while working in another room.

