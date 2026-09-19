// ==============================================================================
// ZEKOS & LYRA ARCHITECTURAL TYPES (STRICT TYPESCRIPT)
// ==============================================================================

export type StorageZone = 'crisper' | 'counter' | 'vault';

export type MealSlotType = 'breakfast' | 'tiffin' | 'lunch' | 'dinner';

export type AttendanceStatus = 'home' | 'out';

export interface FamilyMember {
  id: string;
  name: string;
  role: 'head' | 'member' | 'cook';
  avatarInitials: string;
  attendance: AttendanceStatus;
  healthTags: string[];
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  storageZone: StorageZone;
  daysRemaining: number;
  freshnessPercent: number; // 0 to 100
  category: 'produce' | 'dairy' | 'staples' | 'spices';
}

export interface MealProposal {
  id: string;
  slot: MealSlotType;
  title: string;
  subtitle: string;
  prepTimeMinutes: number;
  servings: number;
  clearsPerishablesText?: string;
  isApproved: boolean;
  ingredients: string[];
  emotionKey: ToastEmotion;
}

export interface PodRemoteState {
  isConnected: boolean;
  localLanLatencyMs: number;
  activeDish: string;
  currentStepNumber: number;
  totalSteps: number;
  currentStepText: string;
  whistleCurrent: number;
  whistleTarget: number;
  timerSecondsRemaining: number;
  isTimerRunning: boolean;
  countertopLightOn: boolean;
  volumePercent: number;
  isMicMuted: boolean;
  spotifyNowPlaying: {
    title: string;
    artist: string;
    isPlaying: boolean;
  };
}

export interface WalletTransaction {
  id: string;
  timestamp: string;
  itemDescription: string;
  amount: number;
  merchant: 'Zepto' | 'Blinkit' | 'Instamart';
  orderedBy: string;
  isAutonomous: boolean;
}

export interface WalletState {
  balance: number;
  dailySpendLimit: number;
  todaySpendSoFar: number;
  merchantLockActive: boolean; // strictly MCC 5411 Groceries
  transactions: WalletTransaction[];
}

export interface HouseholdProfile {
  id: string;
  name: string;
  inviteCode: string;
  originCuisine: string;
  currentCity: string;
  marketSubstitutions: {
    original: string;
    substitute: string;
    note: string;
  }[];
  hardExclusions: string[];
  language: 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: 'Female' | 'Male' | 'Non-Binary' | 'Prefer not to say';
  role: 'head' | 'member' | 'cook';
  householdId: string;
  householdName: string;
  originCuisine: string;
  isDemo: boolean;
  isAuthenticated: boolean;
}

export interface ExtractedRecipe {
  title: string;
  sourceUrl: string;
  sourceType: 'instagram' | 'youtube';
  creator: string;
  prepTimeMinutes: number;
  servings: number;
  summary: string;
  ingredientsAvailable: string[];
  ingredientsMissing: { name: string; estimatedCost: number }[];
  steps: string[];
  emotionKey: ToastEmotion;
}


// 48 Toast Mascot Emotions mapped to assets/mascot/*.png
export type ToastEmotion =
  | 'toast_01_smile_neutral'
  | 'toast_02_excited_cheer'
  | 'toast_03_winking_sparkle'
  | 'toast_04_blushing_love'
  | 'toast_05_coffee_mug'
  | 'toast_06_jump_celebration'
  | 'toast_07_confident_waving'
  | 'toast_08_surprised_exclamation'
  | 'toast_09_cool_sunglasses'
  | 'toast_10_thinking_question'
  | 'toast_11_idea_lightbulb'
  | 'toast_12_reading_recipe_book'
  | 'toast_13_working_laptop'
  | 'toast_14_inspecting_magnifier'
  | 'toast_15_slumped_exhausted'
  | 'toast_16_cozy_drinking_mug'
  | 'toast_17_crying_tears'
  | 'toast_18_sad_disappointed'
  | 'toast_19_nervous_sweat'
  | 'toast_20_angry_steam'
  | 'toast_21_determined_grit'
  | 'toast_22_shy_blushing'
  | 'toast_23_heart_eyes'
  | 'toast_24_hugging_heart'
  | 'toast_25_eating_cookie'
  | 'toast_26_chef_hat_spatula'
  | 'toast_27_party_hat_confetti'
  | 'toast_28_puffed_cheeks_steam'
  | 'toast_29_clapping_hands'
  | 'toast_30_fresh_herbs_stem'
  | 'toast_31_whispering_dots'
  | 'toast_32_worried_sweatdrop'
  | 'toast_33_flat_floor_tired'
  | 'toast_34_peeking_counter'
  | 'toast_35_sick_wrapped_blanket'
  | 'toast_36_stern_focused'
  | 'toast_37_cheering_fistpump'
  | 'toast_38_giggling_cute'
  | 'toast_39_blowing_hot_soup'
  | 'toast_40_sleeping_zzz'
  | 'toast_41_confused_question_mark'
  | 'toast_42_sparkly_star_eyes'
  | 'toast_43_friendly_wave'
  | 'toast_44_offering_flower'
  | 'toast_45_laughing_tears_joy'
  | 'toast_46_anxious_shiver'
  | 'toast_47_peeking_door'
  | 'toast_48_reaching_hug';
