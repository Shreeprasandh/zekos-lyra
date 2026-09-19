import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  CheckCircle2,
  AlertCircle,
  Truck,
  Plus,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';
import { StorageZone } from '../types';

export const PantryScreen: React.FC = () => {
  const { pantry, setMascotEmotion } = useZekosStore();
  const [selectedZone, setSelectedZone] = useState<StorageZone | 'all' | 'expiring'>('all');

  const expiringCount = pantry.filter((item) => item.daysRemaining <= 2).length;

  const filteredItems =
    selectedZone === 'all'
      ? pantry
      : selectedZone === 'expiring'
      ? pantry.filter((item) => item.daysRemaining <= 2)
      : pantry.filter((item) => item.storageZone === selectedZone);

  const handleSimulateDelivery = () => {
    setMascotEmotion('toast_30_fresh_herbs_stem');
    Alert.alert(
      'Delivery Order Synced',
      '1x Nandini Milk (1L) and Fresh Coriander added to Refrigerator stock.',
      [{ text: 'Great' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Banner */}
      <View style={styles.headerBox}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>KITCHEN PANTRY & FRESHNESS</Text>
          <Text style={styles.headerSub}>Real-time stock across refrigerator, baskets and dry pantry</Text>
        </View>
      </View>

      {/* Storage Zone Selector */}
      <View style={styles.zoneRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.zoneScroll}>
          {[
            { key: 'all', label: 'All Items' },
            { key: 'expiring', label: `Expiring Soon (${expiringCount})` },
            { key: 'crisper', label: 'Cold Refrigerator' },
            { key: 'counter', label: 'Counter Baskets' },
            { key: 'vault', label: 'Dry Staples' },
          ].map((zone) => {
            const isSelected = selectedZone === zone.key;
            return (
              <TouchableOpacity
                key={zone.key}
                onPress={() => setSelectedZone(zone.key as any)}
                style={[
                  styles.zonePill,
                  isSelected && styles.zonePillActive,
                  zone.key === 'expiring' && styles.expiringPill,
                  zone.key === 'expiring' && isSelected && styles.expiringPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.zonePillText,
                    isSelected && styles.zonePillTextActive,
                    zone.key === 'expiring' && styles.expiringPillText,
                    zone.key === 'expiring' && isSelected && styles.expiringPillTextActive,
                  ]}
                >
                  {zone.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Quick-Commerce Sync Card */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSimulateDelivery}
        style={styles.deliverySyncCard}
      >
        <View style={styles.deliveryIcon}>
          <Truck size={18} color={HasamiEarth.primaryTerracotta} />
        </View>
        <View style={styles.deliveryTextCol}>
          <Text style={styles.deliveryTitle}>Quick Commerce Auto-Sync</Text>
          <Text style={styles.deliverySub}>
            Digital invoices from Zepto, Blinkit & Swiggy update stock automatically
          </Text>
        </View>
        <View style={styles.syncBadge}>
          <Text style={styles.syncBadgeText}>Active</Text>
        </View>
      </TouchableOpacity>

      {/* Inventory List */}
      <View style={styles.inventoryContainer}>
        {filteredItems.map((item) => {
          const isExpiring = item.daysRemaining <= 2;
          const isWarning = item.daysRemaining > 2 && item.daysRemaining <= 5;
          const statusColor = isExpiring
            ? HasamiEarth.statusExpiring
            : isWarning
            ? HasamiEarth.statusWarning
            : HasamiEarth.statusFresh;

          return (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemMainCol}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemMetaRow}>
                  <Text style={styles.itemQty}>{item.quantity}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.itemZone}>
                    {item.storageZone === 'crisper'
                      ? 'REFRIGERATOR'
                      : item.storageZone === 'counter'
                      ? 'BASKET'
                      : 'DRY STAPLE'}
                  </Text>
                </View>
              </View>

              {/* Freshness Bar & Days */}
              <View style={styles.decayCol}>
                <View style={styles.decayBadgeRow}>
                  {isExpiring ? (
                    <AlertCircle size={12} color={statusColor} />
                  ) : (
                    <CheckCircle2 size={12} color={statusColor} />
                  )}
                  <Text style={[styles.daysText, { color: statusColor }]}>
                    {item.daysRemaining}d left
                  </Text>
                </View>

                {/* Micro Progress Bar */}
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${item.freshnessPercent}%`,
                        backgroundColor: statusColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
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
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  headerSub: {
    fontSize: 11,
    color: HasamiEarth.textSubtle,
    marginTop: 1,
  },
  calibrateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  calibrateBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  zoneRow: {
    marginBottom: 16,
  },
  zoneScroll: {
    gap: 8,
  },
  zonePill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: HasamiEarth.surfaceLinen,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zonePillActive: {
    backgroundColor: HasamiEarth.textEspresso,
    borderColor: HasamiEarth.textEspresso,
  },
  zonePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: HasamiEarth.textMuted,
  },
  zonePillTextActive: {
    color: HasamiEarth.canvasBone,
  },
  expiringPill: {
    borderColor: HasamiEarth.accentOchre,
    backgroundColor: HasamiEarth.accentOchreLight,
  },
  expiringPillActive: {
    backgroundColor: HasamiEarth.primaryTerracotta,
    borderColor: HasamiEarth.primaryTerracotta,
  },
  expiringPillText: {
    color: HasamiEarth.primaryTerracotta,
    fontWeight: '700',
  },
  expiringPillTextActive: {
    color: HasamiEarth.canvasBone,
  },
  deliverySyncCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 18,
  },
  deliveryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: HasamiEarth.canvasBone,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deliveryTextCol: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  deliverySub: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
    marginTop: 1,
  },
  syncBadge: {
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  syncBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  inventoryContainer: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderLight,
  },
  itemMainCol: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  itemQty: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.textMuted,
  },
  metaDot: {
    marginHorizontal: 5,
    color: HasamiEarth.textSubtle,
  },
  itemZone: {
    fontSize: 9,
    fontWeight: '700',
    color: HasamiEarth.textSubtle,
    letterSpacing: 0.5,
  },
  decayCol: {
    alignItems: 'flex-end',
    width: 90,
  },
  decayBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  daysText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressBar: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: HasamiEarth.borderSand,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
