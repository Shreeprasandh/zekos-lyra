import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Wifi,
  Lightbulb,
  Bell,
  Play,
  Pause,
  Plus,
  Volume2,
  Mic,
  MicOff,
  Flame,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';

export const RemoteScreen: React.FC = () => {
  const {
    pod,
    togglePodLight,
    toggleSpotifyPlay,
    incrementWhistle,
    broadcastDinnerIntercom,
    setMascotEmotion,
  } = useZekosStore();

  const handleBroadcast = () => {
    broadcastDinnerIntercom();
    Alert.alert(
      '📢 Intercom Broadcasted!',
      '"Dinner is Ready!" has been spoken through the kitchen terminal and pushed to all family phones.',
      [{ text: 'Great' }]
    );
  };

  const handleMicToggle = () => {
    setMascotEmotion('toast_02_excited_cheer');
    Alert.alert(
      'Kitchen Microphone',
      pod.isMicMuted ? 'Physical microphone unmuted.' : 'Physical microphone muted for privacy.'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Pod Connection Status Header */}
      <View style={styles.statusBanner}>
        <View style={styles.statusLeft}>
          <Wifi size={16} color={HasamiEarth.statusFresh} />
          <Text style={styles.statusTitle}>ZEKOS KITCHEN POD MIRROR</Text>
        </View>
        <View style={styles.latencyBadge}>
          <Text style={styles.latencyText}>{pod.localLanLatencyMs}ms Local Wi-Fi</Text>
        </View>
      </View>

      {/* Active Cooking Step Card */}
      <View style={styles.liveCard}>
        <View style={styles.liveHeader}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveTag}>LIVE ON KITCHEN WALL DISPLAY</Text>
        </View>

        <Text style={styles.activeDish}>{pod.activeDish}</Text>
        <Text style={styles.stepNum}>
          STEP {pod.currentStepNumber} OF {pod.totalSteps}
        </Text>
        <Text style={styles.stepText}>{pod.currentStepText}</Text>
      </View>

      {/* Whistle Counter & Timers Row */}
      <View style={styles.countersRow}>
        {/* Pressure Cooker Whistle Counter */}
        <View style={styles.counterBox}>
          <View style={styles.counterHeader}>
            <Flame size={15} color={HasamiEarth.primaryTerracotta} />
            <Text style={styles.counterHeading}>PRESSURE COOKER</Text>
          </View>
          <Text style={styles.counterLargeValue}>
            {pod.whistleCurrent} <Text style={styles.counterSub}>/ {pod.whistleTarget}</Text>
          </Text>
          <Text style={styles.counterLabel}>Whistles Counted</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={incrementWhistle}
            style={styles.whistlePlusBtn}
          >
            <Plus size={13} color={HasamiEarth.textOnPrimary} />
            <Text style={styles.whistlePlusText}>Simulate Whistle</Text>
          </TouchableOpacity>
        </View>

        {/* Dum Simmer Countdown Timer */}
        <View style={styles.counterBox}>
          <View style={styles.counterHeader}>
            <Bell size={15} color={HasamiEarth.statusWarning} />
            <Text style={styles.counterHeading}>SIMMER DUM TIMER</Text>
          </View>
          <Text style={styles.counterLargeValue}>08:05</Text>
          <Text style={styles.counterLabel}>Minutes Remaining</Text>

          <View style={styles.timerBadge}>
            <Text style={styles.timerBadgeText}>Slow Flame</Text>
          </View>
        </View>
      </View>

      {/* Household Intercom Giant Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleBroadcast}
        style={styles.intercomBtn}
      >
        <Bell size={20} color={HasamiEarth.textOnPrimary} />
        <View style={styles.intercomTextCol}>
          <Text style={styles.intercomTitle}>Broadcast "Dinner is Ready!"</Text>
          <Text style={styles.intercomSub}>
            Speaks over kitchen terminal speaker & alerts family phones
          </Text>
        </View>
      </TouchableOpacity>

      {/* Ambient Hardware Remote Toggles */}
      <View style={styles.hardwareControlsContainer}>
        <Text style={styles.controlsHeader}>HARDWARE CONTROLS</Text>

        {/* 3000K Countertop Warm Light */}
        <View style={styles.controlRow}>
          <View style={styles.controlLeft}>
            <Lightbulb
              size={20}
              color={pod.countertopLightOn ? HasamiEarth.accentOchre : HasamiEarth.textMuted}
            />
            <View style={styles.controlTextCol}>
              <Text style={styles.controlTitle}>3000K Warm Countertop Light</Text>
              <Text style={styles.controlSub}>Downward LED illuminator on wall unit</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={togglePodLight}
            style={[styles.toggleSwitch, pod.countertopLightOn && styles.toggleSwitchActive]}
          >
            <View
              style={[styles.switchThumb, pod.countertopLightOn && styles.switchThumbActive]}
            />
          </TouchableOpacity>
        </View>

        {/* Mute Physical Mic */}
        <View style={styles.controlRow}>
          <View style={styles.controlLeft}>
            {pod.isMicMuted ? (
              <MicOff size={20} color={HasamiEarth.primaryTerracotta} />
            ) : (
              <Mic size={20} color={HasamiEarth.statusFresh} />
            )}
            <View style={styles.controlTextCol}>
              <Text style={styles.controlTitle}>Acoustic Microphone Array</Text>
              <Text style={styles.controlSub}>
                {pod.isMicMuted ? 'Muted for privacy' : 'Active (AEC Whistle Detection)'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleMicToggle}
            style={[styles.micBtn, pod.isMicMuted && styles.micBtnMuted]}
          >
            <Text style={styles.micBtnText}>{pod.isMicMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spotify Audio Player Card */}
      <View style={styles.spotifyCard}>
        <View style={styles.spotifyLeft}>
          <Volume2 size={20} color={HasamiEarth.primaryTerracotta} />
          <View style={styles.spotifyInfo}>
            <Text style={styles.spotifyNowText}>KITCHEN SPEAKER SPOTIFY</Text>
            <Text style={styles.spotifyTrack} numberOfLines={1}>
              {pod.spotifyNowPlaying.title}
            </Text>
            <Text style={styles.spotifyArtist}>{pod.spotifyNowPlaying.artist}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleSpotifyPlay}
          style={styles.playBtn}
        >
          {pod.spotifyNowPlaying.isPlaying ? (
            <Pause size={18} color={HasamiEarth.textOnPrimary} />
          ) : (
            <Play size={18} color={HasamiEarth.textOnPrimary} />
          )}
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
    paddingBottom: 40,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: HasamiEarth.textEspresso,
  },
  latencyBadge: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  latencyText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  liveCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: HasamiEarth.primaryTerracotta,
  },
  liveTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.primaryTerracotta,
  },
  activeDish: {
    fontSize: 18,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
    marginTop: 6,
  },
  stepText: {
    fontSize: 14,
    color: HasamiEarth.textEspresso,
    lineHeight: 20,
    marginTop: 3,
  },
  countersRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  counterBox: {
    flex: 1,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  counterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  counterHeading: {
    fontSize: 9,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
    letterSpacing: 0.5,
  },
  counterLargeValue: {
    fontSize: 26,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  counterSub: {
    fontSize: 16,
    fontWeight: '500',
    color: HasamiEarth.textMuted,
  },
  counterLabel: {
    fontSize: 10,
    color: HasamiEarth.textSubtle,
    marginBottom: 10,
  },
  whistlePlusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  whistlePlusText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  timerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: HasamiEarth.accentOchreLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.accentOchre,
  },
  intercomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
    gap: 12,
  },
  intercomTextCol: {
    flex: 1,
  },
  intercomTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  intercomSub: {
    fontSize: 11,
    color: '#FFE8DF',
    marginTop: 2,
  },
  hardwareControlsContainer: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  controlsHeader: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
    marginBottom: 12,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  controlTextCol: {
    flex: 1,
  },
  controlTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  controlSub: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
  },
  toggleSwitch: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: HasamiEarth.borderSand,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: HasamiEarth.accentOchre,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: HasamiEarth.canvasBone,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  micBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  micBtnMuted: {
    borderColor: HasamiEarth.primaryTerracotta,
  },
  micBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  spotifyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HasamiEarth.surfaceLinen,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  spotifyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  spotifyInfo: {
    flex: 1,
  },
  spotifyNowText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: HasamiEarth.textMuted,
  },
  spotifyTrack: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginTop: 1,
  },
  spotifyArtist: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: HasamiEarth.primaryTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
