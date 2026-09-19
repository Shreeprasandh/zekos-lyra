import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
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

function AppContent() {
  const { activeTab } = useZekosStore();

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
