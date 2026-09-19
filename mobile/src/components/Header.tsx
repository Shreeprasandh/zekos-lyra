import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HasamiEarth } from '../theme/colors';
import { BRAND_ASSETS, TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { useZekosStore } from '../store/useZekosStore';
import { ToastEmotion } from '../types';

export const Header: React.FC = () => {
  const { currentMascotEmotion, setMascotEmotion, household, pod } = useZekosStore();

  // Emotion quick cycle on mascot tap
  const cycleEmotion = () => {
    const sequence: ToastEmotion[] = [
      'toast_01_smile_neutral',
      'toast_02_excited_cheer',
      'toast_05_coffee_mug',
      'toast_26_chef_hat_spatula',
      'toast_35_sick_wrapped_blanket',
      'toast_09_cool_sunglasses',
    ];
    const nextIdx = (sequence.indexOf(currentMascotEmotion) + 1) % sequence.length;
    setMascotEmotion(sequence[nextIdx]);
  };

  const mascotSource = TOAST_EMOTIONS[currentMascotEmotion] || BRAND_ASSETS.mainMascot;

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={BRAND_ASSETS.logoWithText}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: pod.isConnected ? HasamiEarth.statusFresh : HasamiEarth.statusExpiring }]} />
          <Text style={styles.locationText}>
            {household.name} • {pod.localLanLatencyMs}ms Local Wi-Fi
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={cycleEmotion}
        style={styles.mascotWrapper}
      >
        <Image
          source={mascotSource}
          style={styles.mascotImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: HasamiEarth.canvasBone,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  leftColumn: {
    flex: 1,
  },
  logo: {
    width: 140,
    height: 38,
    alignSelf: 'flex-start',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  locationText: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    fontFamily: 'System',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  mascotWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  mascotImage: {
    width: 42,
    height: 42,
  },
});
