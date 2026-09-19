import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ChefHat,
  RefreshCw,
  Clock,
  Share2,
  LayoutGrid,
  Sparkles,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { useZekosStore } from '../store/useZekosStore';

export const HomeScreen: React.FC = () => {
  const {
    meals,
    members,
    currentUser,
    toggleAttendance,
    swapMeal,
    startCookingMeal,
    setReelModalVisible,
    setWidgetsModalVisible,
  } = useZekosStore();

  const [activeSlot, setActiveSlot] = useState<'dinner' | 'lunch' | 'tiffin'>('dinner');

  const mealKey =
    activeSlot === 'dinner'
      ? 'dinner_today'
      : activeSlot === 'lunch'
      ? 'lunch_today'
      : 'tiffin_morning';

  const meal = meals[mealKey] || meals['dinner_today'];

  const homeMembersCount = members.filter((m) => m.attendance === 'home').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Warm Personal Greeting */}
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greetingTitle}>
            Good evening, {currentUser.name.split(' ')[0]}
          </Text>
          <Text style={styles.greetingSub}>
            Tonight's home dining plan for {homeMembersCount} family members
          </Text>
        </View>
      </View>

      {/* Clean Slot Selector */}
      <View style={styles.slotRow}>
        {(['tiffin', 'lunch', 'dinner'] as const).map((slot) => {
          const isSelected = activeSlot === slot;
          const label =
            slot === 'tiffin'
              ? 'Tiffin'
              : slot === 'lunch'
              ? 'Lunch'
              : 'Dinner';
          return (
            <TouchableOpacity
              key={slot}
              onPress={() => setActiveSlot(slot)}
              style={[styles.slotPill, isSelected && styles.slotPillActive]}
            >
              <Text
                style={[
                  styles.slotPillText,
                  isSelected && styles.slotPillTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Meal Card (Human-Centric Hearth) */}
      <View style={styles.mealCard}>
        <View style={styles.mealTopRow}>
          <View style={styles.dishInfoCol}>
            <Text style={styles.mealSlotLabel}>
              {activeSlot.toUpperCase()}
            </Text>
            <Text style={styles.mealTitle}>{meal.title}</Text>
            <Text style={styles.mealSubtitle}>{meal.subtitle}</Text>
          </View>
          <Image
            source={TOAST_EMOTIONS[meal.emotionKey || 'toast_26_chef_hat_spatula']}
            style={styles.mealMascot}
            resizeMode="contain"
          />
        </View>

        {/* Quiet Meta Line */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock size={13} color={HasamiEarth.textMuted} />
            <Text style={styles.metaText}>{meal.prepTimeMinutes} mins</Text>
          </View>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{meal.servings} portions</Text>
          {meal.clearsPerishablesText && (
            <>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.perishableHighlight}>
                {meal.clearsPerishablesText}
              </Text>
            </>
          )}
        </View>

        {/* Minimal Ingredient Preview */}
        <View style={styles.ingredientBox}>
          <Text style={styles.ingredientList} numberOfLines={1}>
            {meal.ingredients.join(' • ')}
          </Text>
        </View>

        {/* Clean Home Actions */}
        <View style={styles.mealActionRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => startCookingMeal(meal.id)}
            style={styles.cookBtn}
          >
            <ChefHat size={16} color={HasamiEarth.textOnPrimary} />
            <Text style={styles.cookBtnText}>Start Cooking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => swapMeal(meal.id)}
            style={styles.changeBtn}
          >
            <RefreshCw size={13} color={HasamiEarth.textMuted} />
            <Text style={styles.changeBtnText}>Change Dish</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Who's Eating Tonight? */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>WHO'S EATING TONIGHT?</Text>
        <Text style={styles.sectionSub}>Tap to toggle portions</Text>
      </View>

      <View style={styles.familyGrid}>
        {members.map((m) => {
          const isHome = m.attendance === 'home';
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.7}
              onPress={() => toggleAttendance(m.id)}
              style={[
                styles.memberPill,
                isHome ? styles.memberPillHome : styles.memberPillOut,
              ]}
            >
              <View
                style={[
                  styles.avatarDot,
                  { backgroundColor: isHome ? HasamiEarth.statusFresh : HasamiEarth.borderSand },
                ]}
              />
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.memberStatus}>
                {isHome ? 'Eating home' : 'Eating out'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Freshness Nudge (Quiet & Non-Alarmist) */}
      <View style={styles.freshnessCard}>
        <Sparkles size={15} color={HasamiEarth.statusFresh} />
        <Text style={styles.freshnessText}>
          Fresh Spinach in your crisper is best consumed tonight.
        </Text>
      </View>

      {/* Quick Utilities Strip */}
      <View style={styles.toolsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setReelModalVisible(true)}
          style={styles.toolBtn}
        >
          <Share2 size={14} color={HasamiEarth.primaryTerracotta} />
          <Text style={styles.toolBtnText}>Import Reel or YouTube Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setWidgetsModalVisible(true)}
          style={styles.toolBtn}
        >
          <LayoutGrid size={14} color={HasamiEarth.textEspresso} />
          <Text style={styles.toolBtnText}>Widgets Preview</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HasamiEarth.canvasBone,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 36,
  },
  greetingRow: {
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  greetingSub: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    marginTop: 2,
  },
  slotRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  slotPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  slotPillActive: {
    backgroundColor: HasamiEarth.textEspresso,
    borderColor: HasamiEarth.textEspresso,
  },
  slotPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  slotPillTextActive: {
    color: HasamiEarth.canvasBone,
  },
  mealCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 20,
  },
  mealTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dishInfoCol: {
    flex: 1,
    paddingRight: 10,
  },
  mealSlotLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
    letterSpacing: 1.0,
    marginBottom: 4,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    lineHeight: 26,
  },
  mealSubtitle: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    marginTop: 3,
  },
  mealMascot: {
    width: 48,
    height: 48,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDot: {
    color: HasamiEarth.textSubtle,
    fontSize: 11,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
    color: HasamiEarth.textMuted,
  },
  perishableHighlight: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.statusFresh,
  },
  ingredientBox: {
    backgroundColor: HasamiEarth.canvasBone,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  ingredientList: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
  },
  mealActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  cookBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 5,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  sectionSub: {
    fontSize: 11,
    color: HasamiEarth.textSubtle,
  },
  familyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  memberPill: {
    flex: 1,
    minWidth: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    gap: 8,
  },
  memberPillHome: {
    borderColor: HasamiEarth.accentSage,
  },
  memberPillOut: {
    borderColor: HasamiEarth.borderLight,
    opacity: 0.7,
  },
  avatarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  memberName: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  memberStatus: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
    marginLeft: 'auto',
  },
  freshnessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 18,
    gap: 8,
  },
  freshnessText: {
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    flex: 1,
  },
  toolsRow: {
    gap: 8,
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    gap: 8,
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
});
