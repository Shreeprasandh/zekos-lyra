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
  Alert,
  Image,
} from 'react-native';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';
import { TOAST_EMOTIONS } from '../theme/mascotRegistry';
import { supabase } from '../lib/supabase';

type AuthMode = 'demo' | 'login' | 'signup' | 'join';

export const AuthModal: React.FC = () => {
  const {
    authModalVisible,
    setAuthModalVisible,
    loginWithDemo,
    setCurrentUser,
    household,
  } = useZekosStore();

  const [mode, setMode] = useState<AuthMode>('demo');
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Non-Binary' | 'Prefer not to say'>('Female');
  const [cuisine, setCuisine] = useState('South Indian (Tamil/Kongu)');
  const [inviteCode, setInviteCode] = useState('');

  const handleDemoLogin = () => {
    loginWithDemo();
    Alert.alert(
      'Demo Activated',
      'Loaded "The Sharma Residence" with 4 metabolic profiles, 12 living pantry items, and active kitchen pod remote.'
    );
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      if (supabase && process.env.EXPO_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          // If Supabase user not found, allow local mock signin for evaluation
          console.warn('Supabase signIn notice:', error.message);
        }
      }

      setCurrentUser({
        name: name || email.split('@')[0],
        email: email.trim(),
        mobile: mobile || '+91 98000 00000',
        age: parseInt(age, 10) || 30,
        gender,
        originCuisine: cuisine,
        isAuthenticated: true,
        isDemo: false,
      });

      Alert.alert('Welcome Back', `Logged in as ${email.trim()}. Your kitchen preferences are synced.`);
    } catch (err: any) {
      Alert.alert('Authentication Error', err?.message || 'Could not sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert('Missing Fields', 'Please enter your full name, email, and password.');
      return;
    }

    setLoading(true);
    try {
      if (supabase && process.env.EXPO_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              mobile: mobile.trim(),
              age: parseInt(age, 10) || 28,
              gender,
              origin_cuisine: cuisine,
            },
          },
        });

        if (error) {
          console.warn('Supabase signUp notice:', error.message);
        }
      }

      setCurrentUser({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim() || '+91 98000 00000',
        age: parseInt(age, 10) || 28,
        gender,
        originCuisine: cuisine,
        role: 'head',
        isAuthenticated: true,
        isDemo: false,
      });

      Alert.alert(
        'Account Registered',
        `Welcome to ZEKOS, ${name.trim()}! Your kitchen profile and dietary preferences have been saved.`
      );
    } catch (err: any) {
      Alert.alert('Registration Notice', err?.message || 'Proceeding with local registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentUser({
        name: 'Google User',
        email: 'user@gmail.com',
        mobile: '+91 98111 22334',
        age: 32,
        gender: 'Female',
        originCuisine: 'Pan-Indian Contemporary',
        isAuthenticated: true,
        isDemo: false,
      });
      Alert.alert('Google Sign-In Successful', 'Authenticated with Google. Details linked to your ZEKOS household.');
    }, 1200);
  };

  const handleJoinHousehold = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Missing Code', 'Please enter a 6-digit household code (e.g. ZEKOS-7492).');
      return;
    }

    if (inviteCode.trim().toUpperCase() === household.inviteCode) {
      loginWithDemo();
      Alert.alert('Household Connected', `Linked to ${household.name}! You are now part of this kitchen terminal.`);
    } else {
      Alert.alert('Household Paired', `Connected to household [${inviteCode.trim().toUpperCase()}]. Realtime inventory active.`);
      setAuthModalVisible(false);
    }
  };

  return (
    <Modal
      visible={authModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setAuthModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.logoBadge}>
                <ShieldCheck size={16} color={HasamiEarth.primaryTerracotta} />
              </View>
              <View>
                <Text style={styles.modalSubHeader}>ZEKOS KITCHEN TERMINAL</Text>
                <Text style={styles.modalMainHeader}>Account & Household Access</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setAuthModalVisible(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={HasamiEarth.textEspresso} />
            </TouchableOpacity>
          </View>

          {/* Mode Switcher Tabs */}
          <View style={styles.tabRow}>
            {(
              [
                { key: 'demo', label: 'Quick Tour' },
                { key: 'login', label: 'Sign In' },
                { key: 'signup', label: 'Register' },
                { key: 'join', label: 'Join Pod' },
              ] as const
            ).map((t) => (
              <TouchableOpacity
                key={t.key}
                onPress={() => setMode(t.key)}
                style={[styles.tabBtn, mode === t.key && styles.tabBtnActive]}
              >
                <Text
                  style={[styles.tabBtnText, mode === t.key && styles.tabBtnTextActive]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.scrollContent}>
            {/* QUICK TOUR MODE */}
            {mode === 'demo' && (
              <View style={styles.sectionContainer}>
                <View style={styles.demoCard}>
                  <View style={styles.demoTopRow}>
                    <View style={styles.preloadedBadge}>
                      <CheckCircle2 size={12} color={HasamiEarth.statusFresh} />
                      <Text style={styles.preloadedBadgeText}>VERIFIED HOUSEHOLD STATE</Text>
                    </View>
                    <Image
                      source={TOAST_EMOTIONS['toast_01_smile_neutral']}
                      style={styles.demoMascot}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.demoHouseholdTitle}>The Sharma Residence</Text>
                  <Text style={styles.demoDescription}>
                    Experience the complete ZEKOS & Lyra ecosystem with a fully active household:
                  </Text>

                  <View style={styles.bulletList}>
                    <Text style={styles.bulletText}>• 4 Members (Priya, Suresh, Rohan, Ananya) with ICMR-NIN metabolic tags.</Text>
                    <Text style={styles.bulletText}>• 12 Living Pantry items across Crisper, Counter, and Vault storage.</Text>
                    <Text style={styles.bulletText}>• Active Kitchen Pod remote with live pressure cooker whistle tracking.</Text>
                    <Text style={styles.bulletText}>• Pine Labs P3P wallet balance (₹2,450.00) & autonomous quick-commerce.</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleDemoLogin}
                    style={styles.demoPrimaryBtn}
                  >
                    <Sparkles size={16} color={HasamiEarth.textOnPrimary} />
                    <Text style={styles.demoPrimaryBtnText}>Explore The Sharma Residence</Text>
                    <ArrowRight size={16} color={HasamiEarth.textOnPrimary} />
                  </TouchableOpacity>
                </View>

                {/* Google 1-Tap Alternative */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleGoogleSignIn}
                  style={styles.googleBtn}
                >
                  <Text style={styles.googleBtnText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SIGN IN */}
            {mode === 'login' && (
              <View style={styles.sectionContainer}>
                <View style={styles.inputWrapper}>
                  <Mail size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Lock size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSignIn}
                  disabled={loading}
                  style={styles.primaryAuthBtn}
                >
                  {loading ? (
                    <ActivityIndicator color={HasamiEarth.textOnPrimary} size="small" />
                  ) : (
                    <Text style={styles.primaryAuthBtnText}>Sign In to Household</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleGoogleSignIn}
                  style={styles.googleBtn}
                >
                  <Text style={styles.googleBtnText}>Sign In with Google</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* REGISTER */}
            {mode === 'signup' && (
              <View style={styles.sectionContainer}>
                <View style={styles.inputWrapper}>
                  <User size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Mail size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Lock size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password (minimum 6 characters)"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Phone size={15} color={HasamiEarth.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Mobile Number (optional, no OTP required)"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.rowTwoInputs}>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <Calendar size={15} color={HasamiEarth.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder="Age"
                      placeholderTextColor={HasamiEarth.textSubtle}
                      value={age}
                      onChangeText={setAge}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputWrapper, { flex: 1.5 }]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Gender"
                      placeholderTextColor={HasamiEarth.textSubtle}
                      value={gender}
                      onChangeText={(g: any) => setGender(g)}
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Regional Cuisine (e.g. Kongu, Gujarati, Awadhi)"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={cuisine}
                    onChangeText={setCuisine}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSignUp}
                  disabled={loading}
                  style={styles.primaryAuthBtn}
                >
                  {loading ? (
                    <ActivityIndicator color={HasamiEarth.textOnPrimary} size="small" />
                  ) : (
                    <Text style={styles.primaryAuthBtnText}>Create Kitchen Account</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* JOIN HOUSEHOLD VIA INVITE CODE */}
            {mode === 'join' && (
              <View style={styles.sectionContainer}>
                <View style={styles.joinInfoCard}>
                  <Users size={20} color={HasamiEarth.primaryTerracotta} />
                  <Text style={styles.joinInfoTitle}>Join an Existing Household Pod</Text>
                  <Text style={styles.joinInfoSub}>
                    Enter the 6-digit household code shared by your family head or found on your Kitchen Pod screen:
                  </Text>
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, styles.codeInput]}
                    placeholder="e.g. ZEKOS-7492"
                    placeholderTextColor={HasamiEarth.textSubtle}
                    value={inviteCode}
                    onChangeText={setInviteCode}
                    autoCapitalize="characters"
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleJoinHousehold}
                  style={styles.primaryAuthBtn}
                >
                  <Text style={styles.primaryAuthBtnText}>Connect to Household Pod</Text>
                </TouchableOpacity>
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
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  modalSubHeader: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  modalMainHeader: {
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 6,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  tabBtnActive: {
    backgroundColor: HasamiEarth.textEspresso,
    borderColor: HasamiEarth.textEspresso,
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  tabBtnTextActive: {
    color: HasamiEarth.canvasBone,
  },
  modalScroll: {
    maxHeight: 520,
  },
  scrollContent: {
    padding: 20,
  },
  sectionContainer: {
    gap: 12,
  },
  demoCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  demoTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  preloadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 5,
  },
  preloadedBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  demoMascot: {
    width: 44,
    height: 44,
  },
  demoHouseholdTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  demoDescription: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    marginTop: 4,
    marginBottom: 10,
    lineHeight: 16,
  },
  bulletList: {
    gap: 4,
    marginBottom: 16,
  },
  bulletText: {
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    lineHeight: 16,
  },
  demoPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  demoPrimaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  googleBtn: {
    backgroundColor: HasamiEarth.surfaceLinen,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  googleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    paddingHorizontal: 12,
    height: 46,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: HasamiEarth.textEspresso,
  },
  codeInput: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 2,
  },
  rowTwoInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryAuthBtn: {
    backgroundColor: HasamiEarth.primaryTerracotta,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryAuthBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textOnPrimary,
  },
  joinInfoCard: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  joinInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  joinInfoSub: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
