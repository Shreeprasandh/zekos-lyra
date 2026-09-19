import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Check,
  RefreshCw,
  Clock,
  AlertTriangle,
  Share2,
  Users,
  Sparkles,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { useZekosStore } from '../store/useZekosStore';
import { GlanceBannerWidget } from '../components/widgets/GlanceBannerWidget';
import { HearthSquareWidget } from '../components/widgets/HearthSquareWidget';

export const HomeScreen: React.FC = () => {
  const {
    meals,
    members,
    toggleAttendance,
    approveMeal,
    swapMeal,
    setMascotEmotion,
    setReelModalVisible,
  } = useZekosStore();

  const [activeSlot, setActiveSlot] = useState<'dinner' | 'lunch' | 'tiffin'>('dinner');

  const mealKey =
    activeSlot === 'dinner'
      ? 'dinner_today'
      : activeSlot === 'lunch'
      ? 'lunch_today'
      : 'tiffin_morning';

  const meal = meals[mealKey] || meals['dinner_today'];

  const handleShareReelPress = () => {
    setMascotEmotion('toast_10_thinking_question');
    setReelModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Slot Selector Pills */}
      <View style={styles.slotRow}>
        {(['tiffin', 'lunch', 'dinner'] as const).map((slot) => {
          const isSelected = activeSlot === slot;
          const label =
            slot === 'tiffin'
              ? '🍱 6:45 AM Tiffin'
              : slot === 'lunch'
              ? '☀️ Lunch'
              : '🌙 Dinner';
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

      {/* Hero Meal Proposal Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.slotBadge}>
            <Text style={styles.slotBadgeText}>
              {activeSlot.toUpperCase()} PROPOSAL
            </Text>
          </View>
          <Image
            source={TOAST_EMOTIONS[meal.emotionKey || 'toast_26_chef_hat_spatula']}
            style={styles.heroMascot}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.heroTitle}>{meal.title}</Text>
        <Text style={styles.heroSubtitle}>{meal.subtitle}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock size={13} color={HasamiEarth.textMuted} />
            <Text style={styles.metaText}>{meal.prepTimeMinutes} mins prep</Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={13} color={HasamiEarth.textMuted} />
            <Text style={styles.metaText}>{meal.servings} portions</Text>
          </View>
          {meal.clearsPerishablesText && (
            <View style={[styles.metaItem, styles.wasteTag]}>
              <Sparkles size={12} color={HasamiEarth.statusFresh} />
              <Text style={styles.wasteText}>Zero Waste</Text>
            </View>
          )}
        </View>

        {/* Ingredients Bullet Strip */}
        <View style={styles.ingredientBox}>
          <Text style={styles.ingredientHeading}>INGREDIENTS UTILIZED:</Text>
          <Text style={styles.ingredientList} numberOfLines={2}>
            {meal.ingredients.join(' • ')}
          </Text>
        </View>

        {/* Hero Actions */}
        <View style={styles.heroActionRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => approveMeal(meal.id)}
            style={[styles.actionBtn, meal.isApproved ? styles.approvedBtn : styles.approveBtn]}
          >
            <Check size={16} color={HasamiEarth.textOnPrimary} />
            <Text style={styles.actionBtnText}>
              {meal.isApproved ? 'Approved for Cook' : 'Approve Meal'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => swapMeal(meal.id)}
            style={[styles.actionBtn, styles.swapBtn]}
          >
            <RefreshCw size={14} color={HasamiEarth.textEspresso} />
            <Text style={[styles.actionBtnText, { color: HasamiEarth.textEspresso }]}>
              Swap Dish
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 1-Tap Attendance Row */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>FAMILY DINNER ATTENDANCE</Text>
        <Text style={styles.sectionHelp}>Tap to toggle who is eating at home</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
        {members.map((m) => {
          const isHome = m.attendance === 'home';
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.7}
              onPress={() => toggleAttendance(m.id)}
              style={[
                styles.memberCard,
                isHome ? styles.memberCardHome : styles.memberCardOut,
              ]}
            >
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: isHome ? HasamiEarth.accentSageLight : HasamiEarth.accentOchreLight },
                ]}
              >
                <Text style={styles.avatarText}>{m.avatarInitials}</Text>
              </View>
              <Text style={styles.memberCardName}>{m.name}</Text>
              <Text
                style={[
                  styles.memberStatusText,
                  { color: isHome ? HasamiEarth.statusFresh : HasamiEarth.primaryTerracotta },
                ]}
              >
                {isHome ? 'Eating Home' : 'Eating Out'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Spoilage Urgent Alert */}
      <View style={styles.alertCard}>
        <View style={styles.alertIconCol}>
          <AlertTriangle size={20} color={HasamiEarth.primaryTerracotta} />
        </View>
        <View style={styles.alertTextCol}>
          <Text style={styles.alertTitle}>2 Perishables Expiring within 24 Hours</Text>
          <Text style={styles.alertBody}>
            Fresh Spinach (250g) and Nandini Milk (1L) will spoil if unconsumed today. Tonight's Palak Paneer plan clears them completely.
          </Text>
        </View>
      </View>

      {/* Social Recipe Ingestion Bar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleShareReelPress}
        style={styles.shareReelBar}
      >
        <Share2 size={16} color={HasamiEarth.primaryTerracotta} />
        <View style={styles.shareTextCol}>
          <Text style={styles.shareBarTitle}>Share Instagram Reel or YouTube Short</Text>
          <Text style={styles.shareBarSub}>Tap to extract recipe & cross-reference pantry inventory</Text>
        </View>
      </TouchableOpacity>

      {/* Interactive Widgets Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>MOBILE HOME SCREEN WIDGETS</Text>
        <Text style={styles.sectionHelp}>Live interactive previews with Lyra Mascot</Text>
      </View>

      <GlanceBannerWidget />
      <HearthSquareWidget />
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
    paddingBottom: 40,
  },
  slotRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  slotPill: {
    paddingVertical: 7,
    paddingHorizontal: 12,
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
  heroCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 20,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  slotBadge: {
    backgroundColor: HasamiEarth.canvasBone,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  slotBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
    letterSpacing: 0.5,
  },
  heroMascot: {
    width: 46,
    height: 46,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginTop: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
    color: HasamiEarth.textMuted,
  },
  wasteTag: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  wasteText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  ingredientBox: {
    backgroundColor: HasamiEarth.canvasBone,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 14,
  },
  ingredientHeading: {
    fontSize: 9,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  ingredientList: {
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    lineHeight: 16,
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  approveBtn: {
    backgroundColor: HasamiEarth.primaryTerracotta,
  },
  approvedBtn: {
    backgroundColor: HasamiEarth.statusFresh,
  },
  swapBtn: {
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  actionBtnText: {
    color: HasamiEarth.textOnPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  sectionHelp: {
    fontSize: 11,
    color: HasamiEarth.textSubtle,
    marginTop: 1,
  },
  membersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  memberCard: {
    width: 105,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  memberCardHome: {
    borderColor: HasamiEarth.accentSage,
  },
  memberCardOut: {
    borderColor: HasamiEarth.accentOchre,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  memberCardName: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  memberStatusText: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.primaryTerracotta,
    marginBottom: 14,
  },
  alertIconCol: {
    marginRight: 10,
    marginTop: 2,
  },
  alertTextCol: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
  },
  alertBody: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    lineHeight: 16,
    marginTop: 2,
  },
  shareReelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  shareTextCol: {
    marginLeft: 10,
    flex: 1,
  },
  shareBarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  shareBarSub: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
  },
});
