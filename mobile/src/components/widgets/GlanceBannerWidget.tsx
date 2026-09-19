import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HasamiEarth } from '../../theme/colors';
import { TOAST_EMOTIONS } from '../../theme/mascotRegistry';
import { useZekosStore } from '../../store/useZekosStore';

export const GlanceBannerWidget: React.FC = () => {
  const { meals, members, toggleAttendance } = useZekosStore();
  const dinner = meals['dinner_today'];
  const rohan = members.find((m) => m.name === 'Rohan');
  const rohanHome = rohan?.attendance === 'home';

  return (
    <View style={styles.container}>
      <View style={styles.badgeRow}>
        <Text style={styles.widgetLabel}>1×2 GLANCE WIDGET PREVIEW</Text>
        <View style={styles.freshnessDot} />
      </View>

      <View style={styles.contentRow}>
        {/* Toast Mascot */}
        <Image
          source={TOAST_EMOTIONS['toast_04_blushing_love']}
          style={styles.mascotImage}
          resizeMode="contain"
        />

        {/* Info Center */}
        <View style={styles.infoCol}>
          <Text style={styles.slotText}>TONIGHT • 8:00 PM</Text>
          <Text style={styles.dishTitle} numberOfLines={1}>
            {dinner.title}
          </Text>
          <Text style={styles.subText}>
            {dinner.servings} Portions • {dinner.clearsPerishablesText}
          </Text>
        </View>

        {/* 1-Tap Quick Action */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => rohan && toggleAttendance(rohan.id)}
          style={[styles.toggleBtn, rohanHome ? styles.toggleBtnHome : styles.toggleBtnOut]}
        >
          <Text style={[styles.toggleBtnText, rohanHome ? styles.toggleBtnTextHome : styles.toggleBtnTextOut]}>
            {rohanHome ? 'Rohan: In' : 'Rohan: Out'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginVertical: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  widgetLabel: {
    fontSize: 9,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  freshnessDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: HasamiEarth.statusFresh,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascotImage: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  slotText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
    letterSpacing: 0.5,
  },
  dishTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginVertical: 1,
  },
  subText: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 8,
  },
  toggleBtnHome: {
    backgroundColor: HasamiEarth.accentSageLight,
    borderColor: HasamiEarth.accentSage,
  },
  toggleBtnOut: {
    backgroundColor: HasamiEarth.accentOchreLight,
    borderColor: HasamiEarth.accentOchre,
  },
  toggleBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
  toggleBtnTextHome: {
    color: HasamiEarth.statusFresh,
  },
  toggleBtnTextOut: {
    color: HasamiEarth.primaryTerracotta,
  },
});
