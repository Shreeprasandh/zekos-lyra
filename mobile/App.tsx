import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HasamiEarth } from './src/theme/colors';
import { useZekosStore } from './src/store/useZekosStore';
import { Header } from './src/components/Header';
import { NavigationBar } from './src/components/NavigationBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { PantryScreen } from './src/screens/PantryScreen';
import { RemoteScreen } from './src/screens/RemoteScreen';
import { WalletScreen } from './src/screens/WalletScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

import { ReelRecipeModal } from './src/components/ReelRecipeModal';
import { AuthModal } from './src/components/AuthModal';
import { LyraChatModal } from './src/components/LyraChatModal';
import { WidgetsModal } from './src/components/WidgetsModal';

function AppContent() {
  const {
    activeTab,
    setActiveTab,
    chatModalVisible,
    setChatModalVisible,
    reelModalVisible,
    setReelModalVisible,
    authModalVisible,
    setAuthModalVisible,
    widgetsModalVisible,
    setWidgetsModalVisible,
  } = useZekosStore();

  const lastBackPressRef = useRef<number>(0);

  // Gold-Standard Android Hardware Back Navigation
  useEffect(() => {
    const onBackPress = () => {
      // 1. Close open modals first
      if (chatModalVisible) {
        setChatModalVisible(false);
        return true;
      }
      if (widgetsModalVisible) {
        setWidgetsModalVisible(false);
        return true;
      }
      if (reelModalVisible) {
        setReelModalVisible(false);
        return true;
      }
      if (authModalVisible) {
        setAuthModalVisible(false);
        return true;
      }

      // 2. Return to Home tab from any other screen
      if (activeTab !== 'home') {
        setActiveTab('home');
        return true;
      }

      // 3. Double-tap to exit from Home tab
      const now = Date.now();
      if (lastBackPressRef.current && now - lastBackPressRef.current < 2000) {
        BackHandler.exitApp();
        return true;
      }

      lastBackPressRef.current = now;
      if (Platform.OS === 'android') {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      }
      return true;
    };

    const backSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backSubscription.remove();
  }, [
    activeTab,
    chatModalVisible,
    widgetsModalVisible,
    reelModalVisible,
    authModalVisible,
  ]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'pantry':
        return <PantryScreen />;
      case 'remote':
        return <RemoteScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={HasamiEarth.canvasBone} />
      <Header />
      <View style={styles.body}>{renderActiveScreen()}</View>
      <NavigationBar />
      <ReelRecipeModal />
      <AuthModal />
      <LyraChatModal />
      <WidgetsModal />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HasamiEarth.canvasBone,
  },
  body: {
    flex: 1,
    backgroundColor: HasamiEarth.canvasBone,
  },
});
