# Module 04: Product Architecture & System Design — RasoiOS

## 1. Product Thesis & Vision
**RasoiOS** is the world’s first **Asymmetric Household Kitchen Operating System**. 

It resolves the daily *"Aaj kya banega?"* dilemma by decoupling the kitchen’s executive decision-making from its manual physical execution. It bridges the cognitive gap between the exhausted household manager, the vernacular domestic cook, and the ultra-fast quick-commerce fulfillment grid through autonomous agentic infrastructure.

---

## 2. Full-Stack End-to-End System Architecture

```
+---------------------------------------------------------------------------------------------------+
|                                        RASOIOS SYSTEM TOPOLOGY                                    |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [ INGRESS LAYER ]                                                                                |
|  +---------------------------+  +-------------------------------+  +---------------------------+  |
|  | Quick Commerce Receipts   |  | Vernacular Cook Voice Stream  |  | Low-Friction Shelf Snaps  |  |
|  | (Blinkit/Zepto/Instamart) |  | (Gnani ASR + Noise Suppression|  | (Multimodal Vision Model) |  |
|  +-------------+-------------+  +---------------+---------------+  +-------------+-------------+  |
|                |                                |                                |                |
|                +--------------------------------+--------------------------------+                |
|                                                 |                                                 |
|                                                 v                                                 |
|  [ KITCHEN DIGITAL TWIN & STATE RECONCILIATION ENGINE ]                                           |
|  +---------------------------------------------------------------------------------------------+  |
|  | Real-Time Multimodal Inventory Ledger (SKUs, Grams, Expiry Clock, Container Occlusion Map)  |  |
|  +----------------------------------------------+----------------------------------------------+  |
|                                                 |                                                 |
|                                                 v                                                 |
|  [ COGNITIVE REASONING & OPTIMIZATION CORE ]                                                      |
|  +---------------------------------------------------------------------------------------------+  |
|  |  DYNAMIC PALATE GRAPH             DECAY MATRIX                    CONSTRAINT SOLVER            |  |
|  |  - Family Taste Vectors           - Perishable Half-Life          - Dietary Restrictions       |  |
|  |  - Sensory Satiety Decay          - Leftover Expiry Triage        - Cook Schedule Limits       |  |
|  +----------------------------------------------+----------------------------------------------+  |
|                                                 |                                                 |
|                                                 v                                                 |
|  [ ASYMMETRIC USER INTERACTION LAYER ]                                                            |
|  +----------------------------------------------+----------------------------------------------+  |
|  |  HOUSEHOLD MANAGER (WhatsApp / Notification) |  DOMESTIC COOK (Vernacular Acoustic Terminal)|  |
|  |  - 10-Second Interactive Decision Card       |  - Hands-Free Spoken Interaction             |  |
|  |  - 1-Tap Approval / Voice Override           |  - Conversational Instruction & Ingress      |  |
|  +----------------------------------------------+----------------------------------------------+  |
|                                                 |                                                 |
|                                                 v                                                 |
|  [ AGENTIC EXECUTION RAILS ]                                                                      |
|  +----------------------------------------------+----------------------------------------------+  |
|  |  PINE LABS P3P & GRANTEX ENGINE              |  DELHIVERY & QUICK COMMERCE ORCHESTRATION   |  |
|  |  - Autonomous HTTP 402 Execution             |  - Dark Store Stock & Cart Assembly          |  |
|  |  - Mandate Ceilings (₹350/day spend limit)   |  - JIT Arrival Synchronized to Cook Entry    |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. The Asymmetric Interface Paradigm

The core design breakthrough of RasoiOS is **asymmetry**: the homeowner and the cook must never interact with the same user interface.

### 3.1 Interface A: The Domestic Cook Terminal (Hands-Free & Vernacular)
* **Form Factor**: Either an ambient magnetic puck mounted on the refrigerator exterior ("The Rasoi Puck") or an automated, zero-friction WhatsApp Voice Agent running on the cook's low-end Android smartphone.
* **Powered by Gnani.ai Frontier Voice AI**:
  * *Acoustic Frontend*: Dual-microphone beamforming with active noise suppression tuned to cancel 85dB pressure cooker whistles, exhaust fans, running tap water, and metallic utensil clatter.
  * *Vernacular Speech Recognition (ASR)*: Supports 14+ Indian languages with full code-switching (Hinglish, Bhojpuri-Hindi, Kanglish, Tanglish).
  * *Entity Normalization*: Transforms colloquial, non-standard quantities into standardized culinary inventory deltas:
    * Spoken: *"Didi, do katori arhar ki daal bachi hai"* -> System: `INVENTORY_UPDATE: {item: "cooked_toor_dal", qty: "300ml", type: "leftover", shelf_life: "14h"}`
    * Spoken: *"Pyaaz bas do chote bache hain"* -> System: `INVENTORY_UPDATE: {item: "red_onion", count: 2, status: "low"}`
* **Conversational Flow**:
  * Cook walks into the kitchen. Geofence / BLE beacon detects cook’s smartphone.
  * Rasoi Puck speaks gently in the cook’s native tongue:
    * *"Namaste Didi. Aaj dopahar ke liye Bhabhi ne Aloo Shimla Mirch aur Arhar Dal approve ki hai. Shimla mirch fridge ke neeche wale drawer me hai, aur dahi 10 minute me Zepto se aa raha hai."*
  * **Result**: The cook does not ask *"Aaj kya banega?"*. She receives clear, validated authorization with zero psychological liability.

### 3.2 Interface B: The Household Manager (10-Second Async Decision Card)
* **Channel**: Rich interactive WhatsApp message or OS-level native push notification.
* **Timing**: Delivered proactively at **07:00 AM** (for lunch) and **05:30 PM** (for dinner)—30 minutes *before* the cook arrives.
* **Card Anatomy**:
  ```
  ==============================================
  🥘 RASOIOS: TODAY'S LUNCH PROPOSAL
  ==============================================
  Menu:
    1. Aloo Shimla Mirch (Clears 2 expiring capsicums)
    2. Tadka Dal (Repurposes yesterday's Arhar dal)
    3. Fresh Phulkas (4 for Rohan, 2 for Priya)

  Nutrition & Health:
    ✓ 24g Protein | Low Glycemic Index | Under 550 kcal

  Missing Ingredients:
    • 250g Amul Masti Curd (₹35 via Zepto - 8 min away)

  [ APPROVE MEAL & ORDER (₹35) ]  [ SWAP DISH ]  [ EDIT ]
  ==============================================
  *Auto-approves in 12 mins under your Daily Grantex Rule.*
  ```
* **Cognitive Effort**: Exactly **one tap**. If in an urgent meeting, the homeowner ignores it, and the system executes the pre-authorized default under the Grantex spend rule.

---

## 4. The Kitchen Digital Twin & Multimodal State Engine

Maintaining an accurate real-time inventory without manual data entry requires a tri-source reconciliation engine:

```
[ Quick-Commerce Invoices (Blinkit/Zepto) ] ---> Auto-Increment Raw Stock (100% precision on ingress)
                                                        |
[ Spoken Cook Audits ("Tamatar khatam hai") ] --> Auto-Decrement Stock on Consumption (Tacit ground truth)
                                                        |
[ Periodic Camera Snaps (Crisper/Counter) ] ----> Reconcile Drifts & Spoilage (Computer vision bounding boxes)
                                                        v
                                          [ REAL-TIME KITCHEN DIGITAL TWIN ]
```

### 4.1 Automated Invoice Ingress (The Inflow Pipeline)
* Ingests electronic delivery receipts from Zepto, Blinkit, Swiggy Instamart, and BigBasket via Gmail parsing or WhatsApp order confirmations.
* Maps commercial SKUs directly to raw culinary building blocks:
  * `"Country Eggs 6 pcs"` -> `inventory.eggs += 6` (Estimated shelf life: 14 days)
  * `"Fresho Coriander 100g"` -> `inventory.coriander += 100g` (Decay half-life: 48 hours)

### 4.2 Spoken Delta Reconciliation (The Outflow Pipeline)
* During routine prep, the cook naturally announces stockouts or depletion.
* The Gnani voice agent listens for negative triggers: *"Khatam ho gaya"*, *"Nahi hai"*, *"Thoda sa hai"*, *"Kharab ho gaya"*.
* Updates stock levels dynamically without requiring the cook to interact with an application.

---

## 5. The Dynamic Palate Graph & Taste Memory Engine

The core algorithmic differentiator of RasoiOS is its mathematical formulation of household dining dynamics.

### 5.1 The Mathematical Formulation
Let the household palate state at time $t$ be represented as a multi-dimensional state tensor:

$$\mathcal{H}(t) = \left\{ \mathbf{P}_u, \mathbf{S}_m(t), \mathbf{I}(t), \mathbf{D}(t) \right\}$$

Where:
1. **$\mathbf{P}_u$ (User Preference Vectors)**: Static & semi-static constraints for each family member $u \in U$ (spice tolerance $\sigma \in [0, 1]$, dietary restrictions $C_{\text{diet}}$, macro-nutrient targets $M_{\text{targets}}$).
2. **$\mathbf{S}_m(t)$ (Sensory Satiety & Decay Score)**: For every dish $m$, its appeal decays sharply immediately after consumption and recovers following an exponential recovery curve:
   $$S_m(t) = 1 - e^{-\lambda_m (t - t_{\text{last\_served}})}$$
   *Where $\lambda_m$ is the dish-specific fatigue parameter (e.g., Dal Tadka has a fast recovery $\lambda \approx 0.8$, whereas Biryani or Paneer Lababdar has a slow recovery $\lambda \approx 0.15$).*
3. **$\mathbf{I}(t)$ (Active Kitchen Inventory)**: Current available quantities of ingredients $k$ with corresponding decay weights $w_k(t)$.
4. **$\mathbf{D}(t)$ (Perishable Urgency Index)**:
   $$U_k(t) = \frac{1}{\max(1, T_{\text{expiry}}(k) - t)}$$
   *Ingredients nearing biological spoilage (e.g., spinach at 12 hours) generate extreme optimization pressure to be consumed immediately.*

### 5.2 The Objective Optimization Function
The meal recommendation engine solves a multi-objective optimization problem to select the optimal meal set $M^*$:

$$\max_{M} \left[ \alpha \sum_{m \in M} S_m(t) + \beta \sum_{k \in \text{Ingredients}(M)} U_k(t) \cdot Q_k - \gamma \cdot \text{Cost}(\text{Missing}(M)) \right]$$

Subject to:
* $\text{PrepTime}(M) \le T_{\text{cook\_window}}$ (Cook cannot spend >45 minutes).
* $\text{AllergenCheck}(M, \mathbf{P}_u) = 0$ (Hard safety constraint).
* $\text{MissingIngredients}(M) \le \text{Threshold}_{\text{quick\_commerce}}$ (Max 2 items needed from Zepto).

---

## 6. The Autonomous Agentic Procurement Loop: Pine Labs P3P + Grantex

```
Step 1: Missing Ingredient Identified (e.g., 200g Paneer, ₹90)
           |
Step 2: Check Pine Labs Grantex Spend Guardrail
        - Condition: Daily spend < ₹350? YES.
        - Condition: Category == MCC 5411 (Grocery)? YES.
        - Condition: Time window 07:00-08:00 AM? YES.
           |
Step 3: Dispatch HTTP 402 Autonomous Payment via Pine Labs P3P
        - P3P handshake resolves payment over pre-authorized UPI Reserve Pay.
           |
Step 4: Dark Store Dispatches Rider (Blinkit/Zepto/Instamart)
           |
Step 5: Delhivery/MCP Geocoding synchronizes delivery to Cook ETA:
        Rider arrives 5 minutes before cook completes preliminary prep.
```

* **Zero-Intervention Purchase**: Homeowner is not pinged for OTP, biometric approval, or payment app PIN.
* **Cryptographic Spend Receipts**: Homeowner receives a weekly financial rollup with verifiable digital audit proofs generated by Grantex.
