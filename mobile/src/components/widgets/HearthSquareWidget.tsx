import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, RefreshCw } from 'lucide-react-native';
import { HasamiEarth } from '../../theme/colors';
import { TOAST_EMOTIONS } from '../../theme/mascotRegistry';
import { useZekosStore } from '../../store/useZekosStore';

export const HearthSquareWidget: React.FC = () => {
  const { meals, members, approveMeal, swapMeal } = useZekosStore();
  const dinner = meals['dinner_today'];

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.widgetHeader}>2×2 HEARTH SQUARE PREVIEW</Text>
        <Image
          source={TOAST_EMOTIONS[dinner.isApproved ? 'toast_02_excited_cheer' : 'toast_34_peeking_counter']}
          style={styles.mascotPeek}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.mealSlot}>TONIGHT'S MEAL PROPOSAL</Text>
      <Text style={styles.dishTitle}>{dinner.title}</Text>
      <Text style={styles.dishSubtitle}>{dinner.subtitle}</Text>

      {/* Family presence pills */}
      <View style={styles.presenceRow}>
        {members.map((m) => (
          <View key={m.id} style={styles.memberTag}>
            <View
              style={[
                styles.presenceDot,
                { backgroundColor: m.attendance === 'home' ? HasamiEarth.statusFresh : HasamiEarth.statusExpiring },
              ]}
            />
            <Text style={styles.memberName}>{m.name.split(' ')[0]}</Text>
          </View>
        ))}
      </View>

      {/* 2 Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => approveMeal('dinner_today')}
          style={[styles.btn, dinner.isApproved ? styles.btnApproved : styles.btnApprove]}
        >
          <Check size={14} color={dinner.isApproved ? HasamiEarth.textOnPrimary : HasamiEarth.textOnPrimary} />
          <Text style={styles.btnText}>{dinner.isApproved ? 'Approved' : 'Approve'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => swapMeal('dinner_today')}
          style={[styles.btn, styles.btnSwap]}
        >
          <RefreshCw size={13} color={HasamiEarth.textEspresso} />
          <Text style={[styles.btnText, { color: HasamiEarth.textEspresso }]}>Swap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  widgetHeader: {
    fontSize: 9,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  mascotPeek: {
    width: 36,
    height: 36,
  },
  mealSlot: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginTop: 2,
  },
  dishSubtitle: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    marginTop: 2,
  },
  presenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  memberTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.canvasBone,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  presenceDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  memberName: {
    fontSize: 10,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 5,
  },
  btnApprove: {
    backgroundColor: HasamiEarth.primaryTerracotta,
  },
  btnApproved: {
    backgroundColor: HasamiEarth.statusFresh,
  },
  btnSwap: {
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  btnText: {
    color: HasamiEarth.textOnPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
});
