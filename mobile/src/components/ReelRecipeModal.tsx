import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {
  X,
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  Tv,
  Utensils,
  ShoppingCart,
  ExternalLink,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';
import { TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { ExtractedRecipe, ToastEmotion } from '../types';

interface PresetRecipe {
  id: string;
  chipLabel: string;
  sourceType: 'youtube' | 'instagram';
  recipe: ExtractedRecipe;
}

const PRESETS: PresetRecipe[] = [
  {
    id: 'p1',
    chipLabel: 'Chef Ranveer • Dal Makhani',
    sourceType: 'youtube',
    recipe: {
      title: 'Dhaba-Style Slow Cooked Dal Makhani',
      sourceUrl: 'https://youtube.com/watch?v=ranveer_dal_makhani_sim',
      sourceType: 'youtube',
      creator: 'Chef Ranveer Brar',
      prepTimeMinutes: 35,
      servings: 4,
      summary: 'Rich slow-simmered black lentils with smoked butter and kasuri methi finish.',
      ingredientsAvailable: ['Unpolished Toor & Urad Dal (Vault)', 'Country Tomatoes (Crisper)', 'Garlic Bulbs (Counter)'],
      ingredientsMissing: [{ name: 'Amul Fresh Cream 200ml', estimatedCost: 65.0 }],
      steps: [
        'Rinse soaked whole urad & rajma; pressure cook for 4 whistles with salt & kashmiri chili.',
        'Heat white butter in a clay pot; saute ginger-garlic paste and fresh tomato puree until oil separates.',
        'Add cooked lentils with warm water; simmer on low flame for 25 minutes until velvety.',
        'Finish with crushed kasuri methi and fresh cream before serving hot.',
      ],
      emotionKey: 'toast_26_chef_hat_spatula',
    },
  },
  {
    id: 'p2',
    chipLabel: 'Hebbars Kitchen • Crispy Ragi Dosa',
    sourceType: 'instagram',
    recipe: {
      title: 'Instant Crisp Ragi & Methi Dosa',
      sourceUrl: 'https://instagram.com/reel/hebbars_ragi_dosa_sim',
      sourceType: 'instagram',
      creator: 'Hebbars Kitchen',
      prepTimeMinutes: 18,
      servings: 3,
      summary: 'Nutritious low-GI finger millet crepes infused with tender methi leaves and cumin.',
      ingredientsAvailable: ['Ragi Atta (Vault)', 'Curry Leaves (Crisper)', 'Cold-Pressed Sesame Oil (Vault)'],
      ingredientsMissing: [{ name: 'Fresh Curd / Buttermilk 500ml', estimatedCost: 35.0 }],
      steps: [
        'Whisk 1 cup ragi flour with rice flour, curd, water, green chilies, and cumin into a pouring batter.',
        'Allow batter to rest for 10 minutes while cast-iron tawa gets smoking hot.',
        'Pour batter from the periphery inward; drizzle cold-pressed sesame oil.',
        'Cook on medium heat until golden and crispy; fold and serve with coconut chutney.',
      ],
      emotionKey: 'toast_11_idea_lightbulb',
    },
  },
  {
    id: 'p3',
    chipLabel: 'Kunal Kapur • Amritsari Paneer Bhurji',
    sourceType: 'youtube',
    recipe: {
      title: 'Street-Style Amritsari Paneer Bhurji',
      sourceUrl: 'https://youtube.com/shorts/kunal_paneer_bhurji_sim',
      sourceType: 'youtube',
      creator: 'Chef Kunal Kapur',
      prepTimeMinutes: 15,
      servings: 3,
      summary: 'High-protein scrambled fresh paneer tossed with aromatic spices and tangy tomatoes.',
      ingredientsAvailable: ['Fresh Paneer 200g (Crisper)', 'Country Tomatoes (Crisper)', 'Nashik Red Onions (Counter)'],
      ingredientsMissing: [{ name: 'Gram Flour (Besan) 50g', estimatedCost: 20.0 }],
      steps: [
        'Roast 1 tbsp besan in butter until nutty to create the signature street-style gravy body.',
        'Saute sliced onions, ginger, and green chillies until translucent; add chopped tomatoes.',
        'Crumble fresh paneer with fingers; toss into masala with turmeric, pav bhaji masala, and coriander.',
        'Garnish with julienned ginger and lemon juice; serve immediately with hot buttered toast.',
      ],
      emotionKey: 'toast_03_winking_sparkle',
    },
  },
];

export const ReelRecipeModal: React.FC = () => {
  const {
    reelModalVisible,
    setReelModalVisible,
    importReelRecipeToDinner,
    sendRecipeToPod,
    topUpWallet,
  } = useZekosStore();

  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [extractedResult, setExtractedResult] = useState<ExtractedRecipe | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetRecipe) => {
    setSelectedPresetId(preset.id);
    setInputUrl(preset.recipe.sourceUrl);
    setExtractedResult(null);
  };

  const handleAnalyze = () => {
    if (!inputUrl.trim()) {
      Alert.alert('Missing URL', 'Please paste an Instagram Reel or YouTube URL, or pick a preset above.');
      return;
    }

    setIsAnalyzing(true);
    setExtractedResult(null);
    setAnalysisStep('Connecting to video audio stream...');

    setTimeout(() => {
      setAnalysisStep('Transcribing speech & identifying culinary steps...');
    }, 900);

    setTimeout(() => {
      setAnalysisStep('Auditing household inventory (Crisper, Counter, Vault)...');
    }, 1800);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Pick matching preset or default to first
      const matched = PRESETS.find((p) => p.id === selectedPresetId)?.recipe || PRESETS[0].recipe;
      setExtractedResult(matched);
    }, 2700);
  };

  const handleClose = () => {
    setReelModalVisible(false);
    setIsAnalyzing(false);
    setExtractedResult(null);
  };

  const handleQueueDinner = () => {
    if (!extractedResult) return;
    importReelRecipeToDinner(extractedResult);
    Alert.alert(
      'Queued for Dinner',
      `"${extractedResult.title}" is now the active dinner plan on your Home tab with portions matched to eating members.`
    );
  };

  const handleSendToPod = () => {
    if (!extractedResult) return;
    sendRecipeToPod(extractedResult);
    Alert.alert(
      'Pushed to Kitchen Pod',
      `Live cooking guide for "${extractedResult.title}" has been broadcast to the wall terminal screen over local mDNS.`
    );
  };

  const handleQuickOrderMissing = () => {
    if (!extractedResult || extractedResult.ingredientsMissing.length === 0) return;
    const totalMissingCost = extractedResult.ingredientsMissing.reduce((acc, i) => acc + i.estimatedCost, 0);
    Alert.alert(
      'Zepto Quick-Cart Ready',
      `Order ${extractedResult.ingredientsMissing.map((m) => m.name).join(', ')} for ₹${totalMissingCost.toFixed(2)}?\nEstimated delivery: 11 mins.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place 1-Tap Order',
          onPress: () => {
            Alert.alert('Order Confirmed', 'Zepto autonomous micro-order dispatched. Lyra will notify you on arrival.');
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={reelModalVisible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.sparkleIcon}>
                <Sparkles size={16} color={HasamiEarth.primaryTerracotta} />
              </View>
              <View>
                <Text style={styles.modalTitle}>SHARE TO ZEKOS</Text>
                <Text style={styles.modalSub}>Instagram Reel & YouTube Recipe Ingestion</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <X size={18} color={HasamiEarth.textEspresso} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.scrollContent}>
            {/* Presets Chips */}
            <Text style={styles.sectionLabel}>TAP TO TEST POPULAR INDIAN CREATOR RECIPES:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
              {PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <TouchableOpacity
                    key={preset.id}
                    activeOpacity={0.7}
                    onPress={() => handleSelectPreset(preset)}
                    style={[styles.presetChip, isSelected && styles.presetChipActive]}
                  >
                    <Play size={11} color={isSelected ? HasamiEarth.canvasBone : HasamiEarth.primaryTerracotta} />
                    <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
                      {preset.chipLabel}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* URL Input Box */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.urlInput}
                placeholder="Paste Instagram Reel or YouTube URL here..."
                placeholderTextColor={HasamiEarth.textSubtle}
                value={inputUrl}
                onChangeText={(txt) => {
                  setInputUrl(txt);
                  setSelectedPresetId(null);
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {inputUrl.length > 0 && (
                <TouchableOpacity onPress={() => setInputUrl('')} style={styles.clearBtn}>
                  <X size={14} color={HasamiEarth.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Extract Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAnalyze}
              disabled={isAnalyzing}
              style={[styles.analyzeBtn, isAnalyzing && styles.analyzeBtnDisabled]}
            >
              {isAnalyzing ? (
                <ActivityIndicator color={HasamiEarth.textOnPrimary} size="small" />
              ) : (
                <Sparkles size={16} color={HasamiEarth.textOnPrimary} />
              )}
              <Text style={styles.analyzeBtnText}>
                {isAnalyzing ? 'Lyra AI Ingesting Video...' : 'Extract Recipe with Lyra AI'}
              </Text>
            </TouchableOpacity>

            {/* Ingestion Loading State */}
            {isAnalyzing && (
              <View style={styles.analyzingBox}>
                <Image
                  source={TOAST_EMOTIONS['toast_14_inspecting_magnifier']}
                  style={styles.mascotLoadingImg}
                  resizeMode="contain"
                />
                <Text style={styles.analyzingStatusText}>{analysisStep}</Text>
              </View>
            )}

            {/* Extracted Recipe Result Card */}
            {extractedResult && !isAnalyzing && (
              <View style={styles.resultCard}>
                <View style={styles.resultTopRow}>
                  <View style={styles.resultBadge}>
                    <Text style={styles.resultBadgeText}>
                      {extractedResult.sourceType.toUpperCase()} EXTRACTED
                    </Text>
                  </View>
                  <Image
                    source={TOAST_EMOTIONS[extractedResult.emotionKey]}
                    style={styles.resultMascot}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.recipeTitle}>{extractedResult.title}</Text>
                <Text style={styles.recipeCreator}>By {extractedResult.creator} • {extractedResult.prepTimeMinutes} mins prep</Text>
                <Text style={styles.recipeSummary}>{extractedResult.summary}</Text>

                {/* Pantry Parity Breakdown */}
                <View style={styles.parityBox}>
                  <Text style={styles.parityHeader}>PANTRY COMPATIBILITY AUDIT:</Text>
                  {extractedResult.ingredientsAvailable.map((item, idx) => (
                    <View key={idx} style={styles.parityRow}>
                      <CheckCircle2 size={13} color={HasamiEarth.statusFresh} />
                      <Text style={styles.parityTextInStock}>{item}</Text>
                    </View>
                  ))}

                  {extractedResult.ingredientsMissing.map((item, idx) => (
                    <View key={idx} style={styles.parityRowMissing}>
                      <AlertCircle size={13} color={HasamiEarth.primaryTerracotta} />
                      <Text style={styles.parityTextMissing}>
                        Missing: {item.name} (est. ₹{item.estimatedCost.toFixed(2)})
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Steps Accordion */}
                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsHeader}>INFERRED COOKING STEPS ({extractedResult.steps.length}):</Text>
                  {extractedResult.steps.map((st, sIdx) => (
                    <View key={sIdx} style={styles.stepItem}>
                      <View style={styles.stepNumCircle}>
                        <Text style={styles.stepNumText}>{sIdx + 1}</Text>
                      </View>
                      <Text style={styles.stepBodyText}>{st}</Text>
                    </View>
                  ))}
                </View>

                {/* Dispatch Action Buttons */}
                <View style={styles.actionButtonGroup}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleQueueDinner}
                    style={[styles.dispatchBtn, styles.dinnerBtn]}
                  >
                    <Utensils size={15} color={HasamiEarth.textOnPrimary} />
                    <Text style={styles.dispatchBtnText}>Queue as Tonight's Dinner</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSendToPod}
                    style={[styles.dispatchBtn, styles.podBtn]}
                  >
                    <Tv size={15} color={HasamiEarth.textEspresso} />
                    <Text style={[styles.dispatchBtnText, { color: HasamiEarth.textEspresso }]}>
                      Send to Kitchen Pod Screen
                    </Text>
                  </TouchableOpacity>

                  {extractedResult.ingredientsMissing.length > 0 && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleQuickOrderMissing}
                      style={[styles.dispatchBtn, styles.zeptoBtn]}
                    >
                      <ShoppingCart size={15} color={HasamiEarth.textEspresso} />
                      <Text style={[styles.dispatchBtnText, { color: HasamiEarth.textEspresso }]}>
                        1-Tap Zepto Cart (₹{extractedResult.ingredientsMissing[0].estimatedCost})
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 27, 24, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: HasamiEarth.canvasBone,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sparkleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.accentSageLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  modalSub: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  modalScroll: {
    maxHeight: 560,
  },
  scrollContent: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: HasamiEarth.textMuted,
    marginBottom: 8,
  },
  presetScroll: {
    marginBottom: 14,
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginRight: 8,
    gap: 6,
  },
  presetChipActive: {
    backgroundColor: HasamiEarth.primaryTerracotta,
    borderColor: HasamiEarth.primaryTerracotta,
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  presetChipTextActive: {
    color: HasamiEarth.canvasBone,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  urlInput: {
    flex: 1,
    height: 44,
    fontSize: 13,
    color: HasamiEarth.textEspresso,
  },
  clearBtn: {
    padding: 6,
  },
  analyzeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
    marginBottom: 16,
  },
  analyzeBtnDisabled: {
    opacity: 0.7,
  },
  analyzeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  analyzingBox: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  mascotLoadingImg: {
    width: 64,
    height: 64,
  },
  analyzingStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
    fontStyle: 'italic',
  },
  resultCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    padding: 18,
  },
  resultTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultBadge: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  resultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  resultMascot: {
    width: 44,
    height: 44,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  recipeCreator: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.primaryTerracotta,
    marginTop: 2,
    marginBottom: 4,
  },
  recipeSummary: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  parityBox: {
    backgroundColor: HasamiEarth.canvasBone,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 12,
  },
  parityHeader: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: HasamiEarth.textMuted,
    marginBottom: 6,
  },
  parityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 3,
  },
  parityRowMissing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 3,
    marginTop: 2,
  },
  parityTextInStock: {
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    fontWeight: '500',
  },
  parityTextMissing: {
    fontSize: 11,
    color: HasamiEarth.primaryTerracotta,
    fontWeight: '600',
  },
  stepsContainer: {
    marginBottom: 14,
  },
  stepsHeader: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: HasamiEarth.textMuted,
    marginBottom: 6,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  stepNumCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: HasamiEarth.borderSand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  stepBodyText: {
    flex: 1,
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    lineHeight: 16,
  },
  actionButtonGroup: {
    gap: 8,
  },
  dispatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  dinnerBtn: {
    backgroundColor: HasamiEarth.primaryTerracotta,
  },
  podBtn: {
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  zeptoBtn: {
    backgroundColor: HasamiEarth.accentOchreLight,
    borderWidth: 1,
    borderColor: HasamiEarth.accentOchre,
  },
  dispatchBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
});
