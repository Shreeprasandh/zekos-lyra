import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { X, LayoutGrid } from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';
import { GlanceBannerWidget } from './widgets/GlanceBannerWidget';
import { HearthSquareWidget } from './widgets/HearthSquareWidget';

export const WidgetsModal: React.FC = () => {
  const { widgetsModalVisible, setWidgetsModalVisible } = useZekosStore();

  return (
    <Modal
      visible={widgetsModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setWidgetsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconBadge}>
                <LayoutGrid size={16} color={HasamiEarth.primaryTerracotta} />
              </View>
              <View>
                <Text style={styles.modalTitle}>MOBILE HOME SCREEN WIDGETS</Text>
                <Text style={styles.modalSub}>Interactive 1x2 & 2x2 Widget Previews</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setWidgetsModalVisible(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={HasamiEarth.textEspresso} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.descriptionText}>
              Add these widgets to your iOS or Android home screen for instant culinary glance and cooker whistle tracking:
            </Text>

            <View style={styles.widgetWrapper}>
              <GlanceBannerWidget />
            </View>

            <View style={styles.widgetWrapper}>
              <HearthSquareWidget />
            </View>
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
    maxHeight: '85%',
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
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.surfaceLinen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
  },
  modalTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  modalSub: {
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
  modalScroll: {
    maxHeight: 520,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  descriptionText: {
    fontSize: 12,
    color: HasamiEarth.textMuted,
    lineHeight: 16,
    marginBottom: 4,
  },
  widgetWrapper: {
    marginBottom: 8,
  },
});
