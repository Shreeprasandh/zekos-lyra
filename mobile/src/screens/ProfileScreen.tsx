import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import {
  MapPin,
  Share2,
  RefreshCw,
  Globe,
  Sliders,
  Check,
  User,
  LogIn,
  LogOut,
  ShieldCheck,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';

export const ProfileScreen: React.FC = () => {
  const {
    household,
    members,
    currentUser,
    setAuthModalVisible,
    logout,
    resetToDemo,
    setMascotEmotion,
  } = useZekosStore();

  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `Join our home on ZEKOS Kitchen Pod!\nHousehold: ${household.name}\nInvite Code: ${household.inviteCode}\nTap to connect: https://zekos.app/join?code=${household.inviteCode}`,
      });
      setMascotEmotion('toast_02_excited_cheer');
    } catch {
      // Ignored
    }
  };

  const handleReset = () => {
    resetToDemo();
    Alert.alert('Demo Reset', 'All household meal plans, inventory and wallet states have been restored to initial demo.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Active User Account Card */}
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.cardHeading}>ACTIVE USER & ACCOUNT</Text>
          <View style={[styles.codeBadge, { backgroundColor: HasamiEarth.accentSageLight }]}>
            <Text style={[styles.codeText, { color: HasamiEarth.statusFresh }]}>
              VERIFIED
            </Text>
          </View>
        </View>

        <View style={styles.userProfileRow}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfoCol}>
            <Text style={styles.userName}>{currentUser.name}</Text>
            <Text style={styles.userEmail}>{currentUser.email}</Text>
            <Text style={styles.userDemographics}>
              {currentUser.mobile} • {currentUser.age} yrs • {currentUser.gender}
            </Text>
          </View>
        </View>

        <View style={styles.authBtnRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAuthModalVisible(true)}
            style={styles.switchAccountBtn}
          >
            <LogIn size={14} color={HasamiEarth.textEspresso} />
            <Text style={styles.switchAccountBtnText}>Switch Account / Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logout}
            style={styles.logoutBtn}
          >
            <LogOut size={14} color={HasamiEarth.primaryTerracotta} />
            <Text style={styles.logoutBtnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Household Identity Card */}
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.cardHeading}>HOUSEHOLD CODE & PAIRING</Text>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{household.inviteCode}</Text>
          </View>
        </View>

        <Text style={styles.householdName}>{household.name}</Text>
        <Text style={styles.householdSub}>
          Family members enter this 6-digit code or tap WhatsApp invite to sync immediately.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShareCode}
          style={styles.shareBtn}
        >
          <Share2 size={16} color={HasamiEarth.textOnPrimary} />
          <Text style={styles.shareBtnText}>Share WhatsApp Invite Link</Text>
        </TouchableOpacity>
      </View>

      {/* Cultural Heritage Card */}
      <View style={styles.card}>
        <View style={styles.matrixHeader}>
          <MapPin size={16} color={HasamiEarth.primaryTerracotta} />
          <Text style={styles.cardHeading}>CUISINE TRADITIONS & SUBSTITUTIONS</Text>
        </View>

        <View style={styles.matrixRow}>
          <Text style={styles.matrixLabel}>Cuisine Heritage:</Text>
          <Text style={styles.matrixValue}>{household.originCuisine}</Text>
        </View>

        <View style={styles.matrixRow}>
          <Text style={styles.matrixLabel}>Current Residence:</Text>
          <Text style={styles.matrixValue}>{household.currentCity}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.subHeading}>Local Market Substitutions (Adapted by Lyra):</Text>
        {household.marketSubstitutions.map((sub, idx) => (
          <View key={idx} style={styles.subBox}>
            <Text style={styles.subOriginal}>
              {sub.original} → <Text style={styles.subNew}>{sub.substitute}</Text>
            </Text>
            <Text style={styles.subNote}>{sub.note}</Text>
          </View>
        ))}
      </View>

      {/* Food Preferences & Dislikes */}
      <View style={styles.card}>
        <View style={styles.matrixHeader}>
          <Sliders size={16} color={HasamiEarth.primaryTerracotta} />
          <Text style={styles.cardHeading}>FOOD PREFERENCES & DISLIKES</Text>
        </View>
        <Text style={styles.householdSub}>
          Household taste rules. Lyra automatically respects these across all recipes:
        </Text>

        {household.hardExclusions.map((ex, idx) => (
          <View key={idx} style={styles.exclusionTag}>
            <Check size={13} color={HasamiEarth.statusFresh} />
            <Text style={styles.exclusionText}>{ex}</Text>
          </View>
        ))}
      </View>

      {/* Family Member Health Matrix */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>FAMILY METABOLIC PROFILES</Text>
        <Text style={styles.householdSub}>
          Grounds recipe recommendations strictly on ICMR-NIN glycemic guidelines:
        </Text>

        {members.map((m) => (
          <View key={m.id} style={styles.memberProfileRow}>
            <View style={styles.memberProfileLeft}>
              <View style={styles.miniAvatar}>
                <Text style={styles.miniAvatarText}>{m.avatarInitials}</Text>
              </View>
              <View>
                <Text style={styles.memberName}>{m.name}</Text>
                <Text style={styles.memberRole}>{m.role.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.tagsCol}>
              {m.healthTags.map((tag, tIdx) => (
                <View key={tIdx} style={styles.healthBadge}>
                  <Text style={styles.healthBadgeText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Language Switcher */}
      <View style={styles.card}>
        <View style={styles.matrixHeader}>
          <Globe size={16} color={HasamiEarth.primaryTerracotta} />
          <Text style={styles.cardHeading}>APP INTERFACE LANGUAGE</Text>
        </View>
        <View style={styles.langRow}>
          {[
            { key: 'en', label: 'English' },
            { key: 'hi', label: 'हिन्दी' },
            { key: 'ta', label: 'தமிழ்' },
            { key: 'te', label: 'తెలుగు' },
            { key: 'kn', label: 'ಕನ್ನಡ' },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.key}
              style={[
                styles.langPill,
                household.language === lang.key && styles.langPillActive,
              ]}
            >
              <Text
                style={[
                  styles.langPillText,
                  household.language === lang.key && styles.langPillTextActive,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Terminal Resync Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleReset}
        style={styles.resetBtn}
      >
        <RefreshCw size={14} color={HasamiEarth.textMuted} />
        <Text style={styles.resetBtnText}>Resync Terminal Inventory & Settings</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardHeading: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  codeBadge: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  householdName: {
    fontSize: 18,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginTop: 2,
  },
  householdSub: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 14,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 11,
    borderRadius: 12,
    gap: 8,
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  matrixHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  matrixLabel: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
  },
  matrixValue: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  divider: {
    height: 1,
    backgroundColor: HasamiEarth.borderLight,
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginBottom: 6,
  },
  subBox: {
    backgroundColor: HasamiEarth.canvasBone,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 6,
  },
  subOriginal: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  subNew: {
    color: HasamiEarth.statusFresh,
  },
  subNote: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
    marginTop: 2,
  },
  exclusionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.canvasBone,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 6,
    gap: 6,
  },
  exclusionText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  memberProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderLight,
  },
  memberProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.canvasBone,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  miniAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  memberName: {
    fontSize: 13,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  memberRole: {
    fontSize: 9,
    color: HasamiEarth.textMuted,
    letterSpacing: 0.5,
  },
  tagsCol: {
    flexDirection: 'row',
    gap: 4,
  },
  healthBadge: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  healthBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  langPillActive: {
    backgroundColor: HasamiEarth.textEspresso,
    borderColor: HasamiEarth.textEspresso,
  },
  langPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  langPillTextActive: {
    color: HasamiEarth.canvasBone,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 10,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  userInfoCol: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  userEmail: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    marginTop: 1,
  },
  userDemographics: {
    fontSize: 10,
    color: HasamiEarth.textSubtle,
    marginTop: 2,
  },
  authBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  switchAccountBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.canvasBone,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  switchAccountBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.accentOchreLight,
    borderWidth: 1,
    borderColor: HasamiEarth.accentOchre,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    gap: 4,
  },
  logoutBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
  },
});
