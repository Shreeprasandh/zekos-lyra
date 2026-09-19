import { create } from 'zustand';
import {
  FamilyMember,
  PantryItem,
  MealProposal,
  PodRemoteState,
  WalletState,
  HouseholdProfile,
  ToastEmotion,
  UserProfile,
  ExtractedRecipe,
} from '../types';

interface ZekosStoreState {
  // Navigation
  activeTab: 'home' | 'pantry' | 'remote' | 'wallet' | 'profile';
  setActiveTab: (tab: 'home' | 'pantry' | 'remote' | 'wallet' | 'profile') => void;

  // Active Mascot State & Sleep Engine
  currentMascotEmotion: ToastEmotion;
  isMascotSleeping: boolean;
  setMascotEmotion: (emotion: ToastEmotion) => void;
  setMascotSleeping: (sleeping: boolean) => void;

  // Conversational AI Chat & Voice Assistant
  chatModalVisible: boolean;
  setChatModalVisible: (visible: boolean) => void;

  // Widgets Preview Modal
  widgetsModalVisible: boolean;
  setWidgetsModalVisible: (visible: boolean) => void;

  // User & Authentication
  currentUser: UserProfile;
  authModalVisible: boolean;
  setAuthModalVisible: (visible: boolean) => void;
  setCurrentUser: (user: Partial<UserProfile>) => void;
  loginWithDemo: () => void;
  logout: () => void;

  // Social Video-to-Recipe Modal
  reelModalVisible: boolean;
  setReelModalVisible: (visible: boolean) => void;
  importReelRecipeToDinner: (recipe: ExtractedRecipe) => void;
  sendRecipeToPod: (recipe: ExtractedRecipe) => void;

  // Household & Members
  household: HouseholdProfile;
  members: FamilyMember[];
  toggleAttendance: (memberId: string) => void;

  // Meals & Horizons
  activeMealId: string;
  meals: Record<string, MealProposal>;
  approveMeal: (mealId: string) => void;
  swapMeal: (mealId: string) => void;
  startCookingMeal: (mealId: string) => void;

  // Living Pantry
  pantry: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, 'id'>) => void;

  // Virtual Pod Remote (Wall Terminal)
  pod: PodRemoteState;
  togglePodLight: () => void;
  toggleSpotifyPlay: () => void;
  incrementWhistle: () => void;
  adjustVolume: (volume: number) => void;
  broadcastDinnerIntercom: () => void;

  // Pine Labs P3P Wallet
  wallet: WalletState;
  topUpWallet: (amount: number) => void;
  setDailyLimit: (limit: number) => void;

  // Reset demo
  resetToDemo: () => void;
}

const INITIAL_HOUSEHOLD: HouseholdProfile = {
  id: 'hh_sharma_01',
  name: 'The Sharma Residence',
  inviteCode: 'ZEKOS-7492',
  originCuisine: 'Kongu Nadu (Tamil Nadu)',
  currentCity: 'Jaipur (Rajasthan)',
  marketSubstitutions: [
    {
      original: 'Sambar Shallots (Small Onions)',
      substitute: 'Small Sweet Red Onions',
      note: 'Add 1/4 tsp organic jaggery to match shallot sweetness',
    },
    {
      original: 'Murungai Keerai (Drumstick Leaves)',
      substitute: 'Tender Spinach & Methi Blend',
      note: 'Roast with cumin and shallots to match earthy profile',
    },
  ],
  hardExclusions: ['Whole cloves (Affinity: 0.0)', 'Raw garlic on Tuesdays'],
  language: 'en',
};

const INITIAL_MEMBERS: FamilyMember[] = [
  { id: 'm1', name: 'Dr. Priya', role: 'head', avatarInitials: 'PS', attendance: 'home', healthTags: ['Balanced'] },
  { id: 'm2', name: 'Suresh', role: 'member', avatarInitials: 'SS', attendance: 'home', healthTags: ['Low-GI', 'Diabetic-Care'] },
  { id: 'm3', name: 'Rohan', role: 'member', avatarInitials: 'RS', attendance: 'out', healthTags: ['High-Protein'] },
  { id: 'm4', name: 'Ananya', role: 'member', avatarInitials: 'AS', attendance: 'home', healthTags: ['Iron-Rich'] },
];

const INITIAL_MEALS: Record<string, MealProposal> = {
  dinner_today: {
    id: 'dinner_today',
    slot: 'dinner',
    title: 'Palak Paneer & Ragi Phulkas',
    subtitle: 'Clears 250g fresh spinach • Diabetic friendly',
    prepTimeMinutes: 28,
    servings: 3, // automatically 3 because Rohan is 'out'
    clearsPerishablesText: 'Clears 250g Spinach & 200g Paneer',
    isApproved: false,
    ingredients: ['Fresh Spinach (250g)', 'Paneer (200g)', 'Ragi-Wheat Atta', 'Roasted Cumin', 'Garlic'],
    emotionKey: 'toast_26_chef_hat_spatula',
  },
  lunch_today: {
    id: 'lunch_today',
    slot: 'lunch',
    title: 'Kongu Tomato Rice + Cucumber Raita',
    subtitle: 'Clears 3 softening tomatoes • Fast 20-min prep',
    prepTimeMinutes: 20,
    servings: 4,
    clearsPerishablesText: 'Clears 3 soft tomatoes & curry leaves',
    isApproved: true,
    ingredients: ['Ponni Rice (2 cups)', 'Ripe Tomatoes (3)', 'Curry Leaves', 'Mustard Seeds', 'Cold-pressed Sesame Oil'],
    emotionKey: 'toast_02_excited_cheer',
  },
  tiffin_morning: {
    id: 'tiffin_morning',
    slot: 'tiffin',
    title: 'Methi Thepla + Sweet Mango Chunda',
    subtitle: 'Transit-stable for 6 hours • Non-leaking school pack',
    prepTimeMinutes: 18,
    servings: 2,
    isApproved: true,
    ingredients: ['Fresh Methi (1 cup)', 'Besan & Wheat Flour', 'Ajwain', 'White Sesame Seeds'],
    emotionKey: 'toast_21_determined_grit',
  },
};

const INITIAL_PANTRY: PantryItem[] = [
  { id: 'p1', name: 'Country Tomatoes', quantity: '2.0 kg', storageZone: 'crisper', daysRemaining: 3, freshnessPercent: 35, category: 'produce' },
  { id: 'p2', name: 'Fresh Spinach (Palak)', quantity: '250 g', storageZone: 'crisper', daysRemaining: 1, freshnessPercent: 15, category: 'produce' },
  { id: 'p3', name: 'Fresh Paneer', quantity: '200 g', storageZone: 'crisper', daysRemaining: 2, freshnessPercent: 30, category: 'dairy' },
  { id: 'p4', name: 'Nandini Cow Milk', quantity: '1.0 L', storageZone: 'crisper', daysRemaining: 1, freshnessPercent: 20, category: 'dairy' },
  { id: 'p5', name: 'Curry Leaves (Kadi Patta)', quantity: '50 g', storageZone: 'crisper', daysRemaining: 2, freshnessPercent: 25, category: 'produce' },
  { id: 'p6', name: 'Fresh Coriander', quantity: '100 g', storageZone: 'crisper', daysRemaining: 1, freshnessPercent: 10, category: 'produce' },
  { id: 'p7', name: 'Nashik Red Onions', quantity: '3.0 kg', storageZone: 'counter', daysRemaining: 8, freshnessPercent: 75, category: 'produce' },
  { id: 'p8', name: 'Pahadi Potatoes', quantity: '2.5 kg', storageZone: 'counter', daysRemaining: 6, freshnessPercent: 60, category: 'produce' },
  { id: 'p9', name: 'Garlic Bulbs', quantity: '250 g', storageZone: 'counter', daysRemaining: 14, freshnessPercent: 85, category: 'produce' },
  { id: 'p10', name: 'Ponni Parboiled Rice', quantity: '5.0 kg', storageZone: 'vault', daysRemaining: 90, freshnessPercent: 98, category: 'staples' },
  { id: 'p11', name: 'Unpolished Toor Dal', quantity: '1.5 kg', storageZone: 'vault', daysRemaining: 60, freshnessPercent: 95, category: 'staples' },
  { id: 'p12', name: 'Cold-Pressed Sesame Oil', quantity: '1.0 L', storageZone: 'vault', daysRemaining: 45, freshnessPercent: 90, category: 'staples' },
];

const INITIAL_POD: PodRemoteState = {
  isConnected: true,
  localLanLatencyMs: 12,
  activeDish: 'Dal Tadka & Steamed Rice',
  currentStepNumber: 2,
  totalSteps: 4,
  currentStepText: 'Splutter mustard seeds, cumin & curry leaves in hot gingelly oil.',
  whistleCurrent: 2,
  whistleTarget: 3,
  timerSecondsRemaining: 485,
  isTimerRunning: true,
  countertopLightOn: true,
  volumePercent: 75,
  isMicMuted: false,
  spotifyNowPlaying: {
    title: 'Bho Shambho - Revati',
    artist: 'Maharajapuram Santhanam',
    isPlaying: true,
  },
};

const INITIAL_WALLET: WalletState = {
  balance: 2450.0,
  dailySpendLimit: 350.0,
  todaySpendSoFar: 58.0,
  merchantLockActive: true,
  transactions: [
    {
      id: 'tx_1',
      timestamp: 'Today, 07:15 AM',
      itemDescription: '1L Nandini Full Cream Milk',
      amount: 58.0,
      merchant: 'Zepto',
      orderedBy: 'Mom (Voice)',
      isAutonomous: true,
    },
    {
      id: 'tx_2',
      timestamp: 'Yesterday, 06:40 PM',
      itemDescription: '200g Fresh Malai Paneer',
      amount: 95.0,
      merchant: 'Blinkit',
      orderedBy: 'Lyra (Decay Pre-emption)',
      isAutonomous: true,
    },
  ],
};

const INITIAL_USER: UserProfile = {
  id: 'usr_priya_01',
  name: 'Dr. Priya Sharma',
  email: 'priya.sharma@zekos.internal',
  mobile: '+91 98765 43210',
  age: 42,
  gender: 'Female',
  role: 'head',
  householdId: 'hh_sharma_01',
  householdName: 'The Sharma Residence',
  originCuisine: 'Kongu Nadu (Tamil Nadu)',
  isDemo: true,
  isAuthenticated: true,
};

export const useZekosStore = create<ZekosStoreState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  currentMascotEmotion: 'toast_01_smile_neutral',
  isMascotSleeping: false,
  setMascotEmotion: (emotion) => set({ currentMascotEmotion: emotion }),
  setMascotSleeping: (sleeping) =>
    set({
      isMascotSleeping: sleeping,
      currentMascotEmotion: sleeping ? 'toast_40_sleeping_zzz' : 'toast_01_smile_neutral',
    }),

  // Conversational AI Chat & Voice Assistant Modal
  chatModalVisible: false,
  setChatModalVisible: (visible) =>
    set({
      chatModalVisible: visible,
      isMascotSleeping: false,
      currentMascotEmotion: visible ? 'toast_02_excited_cheer' : 'toast_01_smile_neutral',
    }),

  // Widgets Preview Modal
  widgetsModalVisible: false,
  setWidgetsModalVisible: (visible) => set({ widgetsModalVisible: visible }),

  // User & Authentication
  currentUser: INITIAL_USER,
  authModalVisible: false,
  setAuthModalVisible: (visible) => set({ authModalVisible: visible }),
  setCurrentUser: (user) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...user, isAuthenticated: true },
      authModalVisible: false,
      currentMascotEmotion: 'toast_02_excited_cheer',
    })),
  loginWithDemo: () =>
    set({
      currentUser: INITIAL_USER,
      authModalVisible: false,
      household: INITIAL_HOUSEHOLD,
      members: INITIAL_MEMBERS,
      currentMascotEmotion: 'toast_01_smile_neutral',
    }),
  logout: () =>
    set((state) => ({
      currentUser: { ...state.currentUser, isAuthenticated: false, isDemo: false },
      authModalVisible: true,
      currentMascotEmotion: 'toast_18_sad_disappointed',
    })),

  // Social Video-to-Recipe Modal
  reelModalVisible: false,
  setReelModalVisible: (visible) => set({ reelModalVisible: visible }),
  importReelRecipeToDinner: (recipe) =>
    set((state) => {
      const homeCount = state.members.filter((m) => m.attendance === 'home').length;
      return {
        meals: {
          ...state.meals,
          dinner_today: {
            id: 'dinner_today',
            slot: 'dinner',
            title: recipe.title,
            subtitle: `${recipe.summary} • Added from ${recipe.sourceType === 'youtube' ? 'YouTube' : 'Instagram'}`,
            prepTimeMinutes: recipe.prepTimeMinutes,
            servings: homeCount,
            clearsPerishablesText: `Clears ${recipe.ingredientsAvailable.slice(0, 2).join(' & ')}`,
            isApproved: true,
            ingredients: [...recipe.ingredientsAvailable, ...recipe.ingredientsMissing.map((m) => m.name)],
            emotionKey: recipe.emotionKey,
          },
        },
        currentMascotEmotion: recipe.emotionKey,
        reelModalVisible: false,
      };
    }),
  sendRecipeToPod: (recipe) =>
    set((state) => ({
      pod: {
        ...state.pod,
        activeDish: recipe.title,
        currentStepNumber: 1,
        totalSteps: recipe.steps.length,
        currentStepText: recipe.steps[0] || 'Prepare ingredients.',
      },
      currentMascotEmotion: 'toast_26_chef_hat_spatula',
      reelModalVisible: false,
    })),

  household: INITIAL_HOUSEHOLD,
  members: INITIAL_MEMBERS,
  toggleAttendance: (memberId) =>
    set((state) => {
      const updatedMembers = state.members.map((m) =>
        m.id === memberId
          ? { ...m, attendance: (m.attendance === 'home' ? 'out' : 'home') as 'home' | 'out' }
          : m
      );
      const homeCount = updatedMembers.filter((m) => m.attendance === 'home').length;

      // Automatically adjust servings on the active dinner proposal
      const currentDinner = state.meals['dinner_today'];
      const updatedMeals = {
        ...state.meals,
        dinner_today: {
          ...currentDinner,
          servings: homeCount,
        },
      };

      return {
        members: updatedMembers,
        meals: updatedMeals,
        currentMascotEmotion: 'toast_10_thinking_question',
      };
    }),

  activeMealId: 'dinner_today',
  meals: INITIAL_MEALS,
  approveMeal: (mealId) =>
    set((state) => {
      const meal = state.meals[mealId];
      if (!meal) return state;

      const isNowApproved = !meal.isApproved;
      return {
        meals: {
          ...state.meals,
          [mealId]: { ...meal, isApproved: isNowApproved },
        },
        currentMascotEmotion: isNowApproved ? 'toast_02_excited_cheer' : 'toast_01_smile_neutral',
      };
    }),

  swapMeal: (mealId) =>
    set((state) => {
      const meal = state.meals[mealId];
      if (!meal) return state;

      const alternatives: Record<string, Partial<MealProposal>> = {
        dinner_today: {
          title: 'Bhindi Masala & Phulkas',
          subtitle: 'Clears 400g Ladyfingers • Quick 22-min prep',
          prepTimeMinutes: 22,
          clearsPerishablesText: 'Clears 400g Bhindi',
          isApproved: false,
          emotionKey: 'toast_03_winking_sparkle',
        },
      };

      const alt = alternatives[mealId];
      if (!alt) return state;

      return {
        meals: {
          ...state.meals,
          [mealId]: { ...meal, ...alt },
        },
        currentMascotEmotion: 'toast_03_winking_sparkle',
      };
    }),

  startCookingMeal: (mealId) =>
    set((state) => {
      const meal = state.meals[mealId] || state.meals['dinner_today'];
      return {
        activeTab: 'remote',
        pod: {
          ...state.pod,
          activeDish: meal.title,
          currentStepNumber: 1,
          totalSteps: 4,
          currentStepText: `Begin preparation: ${meal.ingredients.slice(0, 3).join(', ')}.`,
        },
        currentMascotEmotion: 'toast_26_chef_hat_spatula',
      };
    }),

  pantry: INITIAL_PANTRY,
  addPantryItem: (item) =>
    set((state) => ({
      pantry: [{ ...item, id: `p_${Date.now()}` }, ...state.pantry],
    })),

  pod: INITIAL_POD,
  togglePodLight: () =>
    set((state) => ({
      pod: {
        ...state.pod,
        countertopLightOn: !state.pod.countertopLightOn,
      },
    })),

  toggleSpotifyPlay: () =>
    set((state) => ({
      pod: {
        ...state.pod,
        spotifyNowPlaying: {
          ...state.pod.spotifyNowPlaying,
          isPlaying: !state.pod.spotifyNowPlaying.isPlaying,
        },
      },
    })),

  incrementWhistle: () =>
    set((state) => {
      const nextWhistle = state.pod.whistleCurrent >= state.pod.whistleTarget ? 0 : state.pod.whistleCurrent + 1;
      const isDone = nextWhistle === state.pod.whistleTarget;
      return {
        pod: { ...state.pod, whistleCurrent: nextWhistle },
        currentMascotEmotion: isDone ? 'toast_28_puffed_cheeks_steam' : 'toast_07_confident_waving',
      };
    }),

  adjustVolume: (volume) =>
    set((state) => ({
      pod: { ...state.pod, volumePercent: Math.max(0, Math.min(100, volume)) },
    })),

  broadcastDinnerIntercom: () =>
    set(() => ({
      currentMascotEmotion: 'toast_06_jump_celebration',
    })),

  wallet: INITIAL_WALLET,
  topUpWallet: (amount) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: state.wallet.balance + amount,
      },
      currentMascotEmotion: 'toast_02_excited_cheer',
    })),

  setDailyLimit: (limit) =>
    set((state) => ({
      wallet: { ...state.wallet, dailySpendLimit: limit },
    })),

  resetToDemo: () =>
    set({
      activeTab: 'home',
      currentMascotEmotion: 'toast_01_smile_neutral',
      household: INITIAL_HOUSEHOLD,
      members: INITIAL_MEMBERS,
      meals: INITIAL_MEALS,
      pantry: INITIAL_PANTRY,
      pod: INITIAL_POD,
      wallet: INITIAL_WALLET,
    }),
}));
