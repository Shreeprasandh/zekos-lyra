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
  ShieldCheck,
  Plus,
  ArrowDownLeft,
  CheckCircle,
  Lock,
  Sparkles,
} from 'lucide-react-native';
import { HasamiEarth } from '../theme/colors';
import { useZekosStore } from '../store/useZekosStore';

export const WalletScreen: React.FC = () => {
  const { wallet, topUpWallet, setDailyLimit, setMascotEmotion } = useZekosStore();

  const handleTopUp = (amount: number) => {
    topUpWallet(amount);
    Alert.alert(
      'Wallet Recharged!',
      `₹${amount} added successfully via UPI Reserve Pay.\nNew Balance: ₹${(
        wallet.balance + amount
      ).toLocaleString('en-IN')}`,
      [{ text: 'Done' }]
    );
  };

  const handleVoiceOrderSim = () => {
    setMascotEmotion('toast_16_cozy_drinking_mug');
    Alert.alert(
      'Autonomous Voice Order',
      'Mom said: "Hey Lyra, order 1 packet Nandini milk fast!"\nConfirmed in 1 second via P3P UPI Reserve Pay without OTP.\nArriving in 8 mins via Zepto.',
      [{ text: 'View Receipt' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Security Banner */}
      <View style={styles.securityBanner}>
        <ShieldCheck size={16} color={HasamiEarth.statusFresh} />
        <Text style={styles.securityText}>DEDICATED GROCERY FUND • MERCHANT LOCKED</Text>
      </View>

      {/* Hero Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceHeading}>HOUSEHOLD GROCERY BALANCE</Text>
        <Text style={styles.balanceAmount}>
          ₹ {wallet.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.balanceSub}>Automated replenishment for household kitchen essentials</Text>

        {/* Quick Top-Up Pills */}
        <View style={styles.topUpRow}>
          {[500, 1000, 2000].map((amt) => (
            <TouchableOpacity
              key={amt}
              activeOpacity={0.8}
              onPress={() => handleTopUp(amt)}
              style={styles.topUpBtn}
            >
              <Plus size={12} color={HasamiEarth.textEspresso} />
              <Text style={styles.topUpBtnText}>+₹{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Monthly Waste-Savings ROI Card */}
      <View style={styles.savingsRoiCard}>
        <View style={styles.savingsIconBadge}>
          <Sparkles size={16} color={HasamiEarth.statusFresh} />
        </View>
        <View style={styles.savingsTextCol}>
          <Text style={styles.savingsTitle}>₹1,420 Saved This Month</Text>
          <Text style={styles.savingsSub}>
            Estimated food savings by consuming vegetables and dairy before spoilage.
          </Text>
        </View>
      </View>

      {/* Daily Spend Guardrail Card */}
      <View style={styles.guardrailCard}>
        <View style={styles.guardrailTop}>
          <View>
            <Text style={styles.guardrailTitle}>DAILY SPEND LIMIT & PROTECTION</Text>
            <Text style={styles.guardrailLimit}>
              ₹{wallet.todaySpendSoFar} spent of ₹{wallet.dailySpendLimit} limit today
            </Text>
          </View>
          <View style={styles.lockBadge}>
            <Lock size={12} color={HasamiEarth.statusFresh} />
            <Text style={styles.lockBadgeText}>Groceries Only</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(100, (wallet.todaySpendSoFar / wallet.dailySpendLimit) * 100)}%`,
                backgroundColor: HasamiEarth.accentSage,
              },
            ]}
          />
        </View>

        <Text style={styles.guardrailNote}>
          Hardware lock: Funds can strictly be debited by Quick Commerce groceries (Zepto / Blinkit / Instamart). Never misrouted.
        </Text>
      </View>

      {/* Smart Cart Consolidation Surcharge Saver */}
      <View style={styles.smartCartCard}>
        <Sparkles size={18} color={HasamiEarth.statusFresh} />
        <View style={styles.smartCartTextCol}>
          <Text style={styles.smartCartTitle}>Smart Cart Surcharge Elimination</Text>
          <Text style={styles.smartCartSub}>
            Bundled Nandini Milk with expiring bread to surpass the ₹100 minimum order threshold, saving ₹30 small-cart delivery fee!
          </Text>
        </View>
      </View>

      {/* Autonomous Ledger Header */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>AUTONOMOUS ORDER LEDGER</Text>
        <TouchableOpacity onPress={handleVoiceOrderSim}>
          <Text style={styles.testVoiceText}>Simulate Voice Order</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View style={styles.transactionContainer}>
        {wallet.transactions.map((tx) => (
          <View key={tx.id} style={styles.txRow}>
            <View style={styles.txIconBox}>
              <ArrowDownLeft size={16} color={HasamiEarth.primaryTerracotta} />
            </View>
            <View style={styles.txDetailsCol}>
              <Text style={styles.txDesc}>{tx.itemDescription}</Text>
              <Text style={styles.txMeta}>
                {tx.timestamp} • {tx.merchant} • {tx.orderedBy}
              </Text>
            </View>
            <Text style={styles.txAmount}>-₹{tx.amount.toFixed(2)}</Text>
          </View>
        ))}
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
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  securityText: {
    fontSize: 9,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: 0.5,
    color: HasamiEarth.statusFresh,
  },
  balanceCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  balanceHeading: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginVertical: 4,
  },
  balanceSub: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    marginBottom: 16,
  },
  topUpRow: {
    flexDirection: 'row',
    gap: 10,
  },
  topUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HasamiEarth.canvasBone,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    gap: 4,
  },
  topUpBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  guardrailCard: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    marginBottom: 16,
  },
  guardrailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  guardrailTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: HasamiEarth.textMuted,
  },
  guardrailLimit: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
    marginTop: 2,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: HasamiEarth.accentSageLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  lockBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  progressBar: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: HasamiEarth.borderSand,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  guardrailNote: {
    fontSize: 10,
    color: HasamiEarth.textSubtle,
    lineHeight: 14,
  },
  smartCartCard: {
    flexDirection: 'row',
    backgroundColor: HasamiEarth.accentSageLight,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.accentSage,
    marginBottom: 16,
    gap: 10,
  },
  smartCartTextCol: {
    flex: 1,
  },
  smartCartTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  smartCartSub: {
    fontSize: 11,
    color: HasamiEarth.textEspresso,
    lineHeight: 15,
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.0,
    color: HasamiEarth.textMuted,
  },
  testVoiceText: {
    fontSize: 11,
    fontWeight: '700',
    color: HasamiEarth.primaryTerracotta,
  },
  transactionContainer: {
    backgroundColor: HasamiEarth.surfaceLinen,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: HasamiEarth.borderSand,
    overflow: 'hidden',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: HasamiEarth.borderLight,
  },
  txIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: HasamiEarth.canvasBone,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txDetailsCol: {
    flex: 1,
  },
  txDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: HasamiEarth.textEspresso,
  },
  txMeta: {
    fontSize: 10,
    color: HasamiEarth.textMuted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.textEspresso,
  },
  savingsRoiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HasamiEarth.surfaceLinen,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HasamiEarth.accentSage,
    marginBottom: 16,
    gap: 12,
  },
  savingsIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: HasamiEarth.accentSageLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingsTextCol: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HasamiEarth.statusFresh,
  },
  savingsSub: {
    fontSize: 11,
    color: HasamiEarth.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
});
