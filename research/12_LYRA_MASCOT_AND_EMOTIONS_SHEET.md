# Module 12: ZEKOS Official Logo & LYRA Toast Mascot Specification

**Brand**: **ZEKOS**  
**AI Companion**: **LYRA**  
**Design System**: **Hasami Earth (Ceramic & Hearth Tactile Minimalism)**  
**Version**: 2.0.0 (Official Asset Specification)  
**Date**: 2026-09-18T20:38:00+05:30  
**Author**: Luna for Sir  

---

## 1. Official ZEKOS Brand Logo Specification

Ingested directly from Sir's master design (`image/logowithtext.png` & `image/logowithouttext.png`):

```
       /--------------------\
      |     (●)   ||   ( )   |
      |          FORK SPOON  |
       \____________________/
             Z E K O S
```

* **Symbolic Mark**:
  * **The Continuous Line Plate**: An unbroken, minimalist circular line drawing of a ceramic dining plate enclosing a central fork and spoon.
  * **The Sage Accent**: A delicate culinary Sage Green dot (`#7A8B73`) positioned serenely on the left rim.
  * **The Terracotta Spoon Ember**: An inner sun-baked Terracotta glow (`#C85A32`) lining the head of the spoon.
  * **Stroke Styling**: Smoked Charcoal Espresso (`#1E1B18`) single-stroke continuous vector line.
* **Exact Wordmark**:
  * `Z E K O S` in clean, modern geometric grotesque uppercase with wide 0.25em tracking.
* **Asset Locations**:
  * Full Logo with Text: `assets/brand/zekos_logo_with_text.png`
  * Symbol Only (App Icon / Pod Header): `assets/brand/zekos_logo_symbol.png`

---

## 2. Official LYRA Mascot: The Living Toast Companion

Ingested directly from Sir's master artwork (`image/mainmascotdesign.png`):

* **Character Morphology**:
  * **Body**: A warm, golden-baked artisanal bread loaf slice.
  * **Crust**: Sun-baked Terracotta Crust (`#D67039` / `#C85A32`) with soft dimensional shading.
  * **Face (Crumb)**: Porcelain Cream (`#FFFDF9`) with two large, expressive dark coffee-bean eyes with dual specular light highlights.
  * **Smile & Blush**: Gentle curved smiling mouth with soft peach blush cheeks (`#FBA28C`).
  * **Limbs**: Cute dark chocolate / smoked espresso nubby hands and feet (`#2B211B`).
  * **Personality**: Warm, joyful, helpful, comforting, and deeply expressive.
* **Asset Location**:
  * Master Portrait: `assets/brand/lyra_main_mascot.png`

---

## 3. The 48 Mascot Emotions & States Matrix

Extracted directly from Sir's 6x8 master emotions chart (`image/mascotemotionschart.png`) with mathematical Voronoi component segmentation and transparent backgrounds (`assets/mascot/`):

```
+===================================================================================================+
|                                THE 48 OFFICIAL LYRA EMOTIONS                                      |
+----+--------------------------------+-------------------------------------+-----------------------+
| #  | FILENAME                       | VISUAL POSE & EXPRESSION            | APP & WIDGET TRIGGER  |
+----+--------------------------------+-------------------------------------+-----------------------+
| 01 | toast_01_smile_neutral.png     | Gentle smile, arms down, calm.      | Default home screen.  |
| 02 | toast_02_excited_cheer.png     | Squinty happy eyes, arms cheering.  | Meal approved!        |
| 03 | toast_03_winking_sparkle.png   | Cute wink with gold sparkles.       | Recipe swap success.  |
| 04 | toast_04_blushing_love.png     | Blushing cheeks, floating hearts.   | Favorite family meal. |
| 05 | toast_05_coffee_mug.png        | Holding dark leaf coffee/tea mug.   | Morning breakfast.    |
| 06 | toast_06_jump_celebration.png  | Mid-air jump with open mouth grin.  | Zero waste milestone. |
| 07 | toast_07_confident_waving.png  | Confident wink, waving one arm.     | "I got this!" prompt. |
| 08 | toast_08_surprised_exclamation | Wide-eyed gasp, exclamation mark.   | Missing ingredient.   |
| 09 | toast_09_cool_sunglasses.png   | Black sunglasses with shine spark.  | Pro chef mode.        |
| 10 | toast_10_thinking_question.png | Hand on chin, floating question.    | Meal recommendation.  |
| 11 | toast_11_idea_lightbulb.png    | Glowing lightbulb popping above!    | Leftover hack found.  |
| 12 | toast_12_reading_recipe_book.png| Holding open green cookbook.        | Step-by-step recipe.  |
| 13 | toast_13_working_laptop.png    | Typing on leaf-logo laptop.         | Weekly planning.      |
| 14 | toast_14_inspecting_magnifier  | Looking through magnifying glass.   | Pantry audit check.   |
| 15 | toast_15_slumped_exhausted.png | Slumped on table, tired eyes.       | Late evening fatigue. |
| 16 | toast_16_cozy_drinking_mug.png | Closed eyes, sipping hot beverage.  | Evening digestif.     |
| 17 | toast_17_crying_tears.png      | Flowing tears streaming down.       | Burned dish / error.  |
| 18 | toast_18_sad_disappointed.png  | Pouty sad face, looking down.       | Spoilage alert lost.  |
| 19 | toast_19_nervous_sweat.png     | Nervous smile with blue sweat drop. | High heat warning.    |
| 20 | toast_20_angry_steam.png       | Angry clenched face, steam puffs.   | Flame unattended!     |
| 21 | toast_21_determined_grit.png   | Clenched fists, fierce grit eyes.   | Complex recipe prep.  |
| 22 | toast_22_shy_blushing.png      | Hands near face, rosy cute blush.   | Complement received.  |
| 23 | toast_23_heart_eyes.png        | Big bright red heart-shaped eyes.   | Loved recipe rated 5★ |
| 24 | toast_24_hugging_heart.png     | Hugging large red dimensional heart.| Family health care.   |
| 25 | toast_25_eating_cookie.png     | Munching chocolate chip cookie.     | Snack time mode.      |
| 26 | toast_26_chef_hat_spatula.png  | Wearing chef hat, holding spatula.  | Active cooking mode.  |
| 27 | toast_27_party_hat_confetti.png| Party hat with colorful confetti!   | Festival / feast day. |
| 28 | toast_28_puffed_cheeks_steam   | Puffed cheeks with steam vents.     | Dum / pressure cook.  |
| 29 | toast_29_clapping_hands.png    | Joyfully clapping hands together.   | Step finished well.   |
| 30 | toast_30_fresh_herbs_stem.png  | Holding green culinary herb branch. | 100% fresh inventory. |
| 31 | toast_31_whispering_dots.png   | Hand on mouth, thinking dots "...". | Quiet calculation.    |
| 32 | toast_32_worried_sweatdrop.png | Worried face, looking at expiry.    | 24h decay urgency.     |
| 33 | toast_33_flat_floor_tired.png  | Melted flat on floor, exhausted.    | Post-dinner cleanup.  |
| 34 | toast_34_peeking_counter.png   | Peeking over a kitchen counter.     | Glanceable widget.     |
| 35 | toast_35_sick_wrapped_blanket  | Wrapped warmly in green blanket.    | Cold / Empathetic mode |
| 36 | toast_36_stern_focused.png     | Stern focused eyebrows, ready.      | Strict diet filter.   |
| 37 | toast_37_cheering_fistpump.png | Winking with double fist pump!      | Cart fee saved!       |
| 38 | toast_38_giggling_cute.png     | Hand over mouth giggling shyly.     | Fun taste quiz.       |
| 39 | toast_39_blowing_hot_soup.png  | Blowing steam off a leaf mug.       | Hot soup / rasam tea.  |
| 40 | toast_40_sleeping_zzz.png      | Sleeping peacefully with 'zzz'.     | Kitchen night standby.|
| 41 | toast_41_confused_question_mark| Question marks floating left/right. | Ambiguous voice query.|
| 42 | toast_42_sparkly_star_eyes.png | Golden starry eyes with sparkle.    | Michelin level dish!  |
| 43 | toast_43_friendly_wave.png     | Friendly open-palm wave hello.      | Morning greeting.     |
| 44 | toast_44_offering_flower.png   | Holding out a bright red flower.    | Mother's day / thank. |
| 45 | toast_45_laughing_tears_joy.png| Tears of pure laughter and joy.     | Fun kitchen moments.  |
| 46 | toast_46_anxious_shiver.png    | Shivering with speed-lines.         | Gas flame blow-out.   |
| 47 | toast_47_peeking_door.png      | Peeking around a wall / doorway.    | Remote kitchen status.|
| 48 | toast_48_reaching_hug.png      | Leaning forward for a warm hug.     | Comfort food comfort. |
+----+--------------------------------+-------------------------------------+-----------------------+
```

---

## 4. Clean Directory Structure

All unwanted files, old generated concepts, and redundant archives have been purged:

```
kitchen/
├── assets/
│   ├── brand/
│   │   ├── zekos_logo_with_text.png    # Official Master Logo with Wordmark
│   │   ├── zekos_logo_symbol.png       # Official Symbol (Plate, Fork, Spoon)
│   │   ├── lyra_main_mascot.png        # Official Lyra Toast Mascot Portrait
│   │   └── lyra_emotions_chart.png     # Full 48-Emotions Reference Chart
│   └── mascot/
│       ├── toast_01_smile_neutral.png  # Individual 48 Sliced Sprites
│       └── ... (up to toast_48)        # Clean Transparent Background PNGs
├── image/                              # User Source Assets
├── research/                           # System Architecture & Academic Dossiers
└── scratch/                            # Local Inspection & Development Cache
```
