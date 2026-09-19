import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { HasamiEarth } from '../theme/colors';
import { BRAND_ASSETS, TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { useZekosStore } from '../store/useZekosStore';

export const Header: React.FC = () => {
  const {
    currentMascotEmotion,
    isMascotSleeping,
    setMascotSleeping,
    setMascotEmotion,
    household,
    pod,
    setChatModalVisible,
  } = useZekosStore();

  const breathAnim = useRef(new Animated.Value(1)).current;
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 20-Second Ambient Inactivity Sleep Engine
  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (isMascotSleeping) {
      setMascotSleeping(false);
    }
    idleTimerRef.current = setTimeout(() => {
      setMascotSleeping(true);
    }, 20000); // 20 seconds of ambient silence
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Subtle breathing pulse while sleeping
  useEffect(() => {
    if (isMascotSleeping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnim, {
            toValue: 0.6,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(breathAnim, {
            toValue: 1.0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      breathAnim.setValue(1);
    }
  }, [isMascotSleeping]);

  // Handle Mascot Tap: Wake up & Open Conversational Chat
  const handleMascotPress = () => {
    resetIdleTimer();
    setMascotSleeping(false);
    setMascotEmotion('toast_02_excited_cheer');
    setChatModalVisible(true);
  };

  const mascotSource = isMascotSleeping
    ? TOAST_EMOTIONS['toast_40_sleeping_zzz']
    : TOAST_EMOTIONS[currentMascotEmotion] || BRAND_ASSETS.mainMascot;

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={BRAND_ASSETS.logoWithText}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: pod.isConnected
                  ? HasamiEarth.statusFresh
                  : HasamiEarth.statusExpiring,
              },
            ]}
          />
          <Text style={styles.locationText}>
            {household.name} • Kitchen Pod Connected
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleMascotPress}
        style={[
          styles.mascotWrapper,
          isMascotSleeping && styles.mascotSleepingWrapper,
        ]}
      >
        <Animated.View style={{ opacity: breathAnim }}>
          <Image
            source={mascotSource}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </Animated.View>
        {isMascotSleeping && (
          <View style={styles.sleepingZzzBadge}>
            <Text style={styles.sleepingZzzText}>zzz</Text>
          </View>
        )}
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
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: HasamiEarth.canvasBone,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderSand,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 145,
    height: 36,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
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
    position: 'relative',
  },
  mascotSleepingWrapper: {
    borderColor: HasamiEarth.borderLight,
    backgroundColor: HasamiEarth.canvasBone,
  },
  mascotImage: {
    width: 42,
    height: 42,
  },
  sleepingZzzBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  sleepingZzzText: {
    fontSize: 8,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
    fontStyle: 'italic',
  },
});
