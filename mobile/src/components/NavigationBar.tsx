import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Package, Radio, CreditCard, User } from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';

export const NavigationBar: React.FC = () => {
  const { activeTab, setActiveTab } = useZekosStore();

  const tabs = [
    { key: 'home', label: 'Home', Icon: Home },
    { key: 'pantry', label: 'Pantry', Icon: Package },
    { key: 'remote', label: 'Remote', Icon: Radio },
    { key: 'wallet', label: 'Wallet', Icon: CreditCard },
    { key: 'profile', label: 'Profile', Icon: User },
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map(({ key, label, Icon }) => {
        const isActive = activeTab === key;
        const color = isActive ? HasamiEarth.primaryTerracotta : HasamiEarth.textMuted;

        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.7}
            onPress={() => setActiveTab(key)}
            style={styles.tabButton}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Icon size={20} color={color} strokeWidth={isActive ? 2.2 : 1.6} />
            </View>
            <Text style={[styles.tabLabel, { color, fontWeight: isActive ? '700' : '500' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: HasamiEarth.canvasBone,
    borderTopWidth: 1,
    borderTopColor: HasamiEarth.borderSand,
    paddingTop: 8,
    paddingBottom: 24, // extra padding for bottom navigation bar on mobile
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  iconContainer: {
    width: 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  activeIconContainer: {
    backgroundColor: HasamiEarth.surfaceLinen,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.2,
  },
});
