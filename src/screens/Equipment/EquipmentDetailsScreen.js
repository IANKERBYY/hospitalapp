import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../styles/theme';
import Button from '../../components/common/Button';
import { equipment, USER_ROLES } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const EquipmentDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { user } = useAuth();
  const item = equipment.find(e => e.id === id);

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Equipment not found</Text>
      </View>
    );
  }

  const InfoRow = ({ label, value, icon }) => (
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}>
        <Ionicons name={icon} size={20} color={COLORS.gray[500]} style={styles.infoIcon} />
        <Text style={styles.infoLabelText}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const StatusBadge = ({ status }) => (
    <View style={[styles.statusBadge, getStatusStyle(status)]}>
      <Text style={styles.statusText}>{status.replace('_', ' ')}</Text>
    </View>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return { backgroundColor: COLORS.success };
      case 'IN_USE':
        return { backgroundColor: COLORS.primary };
      case 'UNDER_MAINTENANCE':
        return { backgroundColor: COLORS.warning };
      case 'OUT_OF_ORDER':
        return { backgroundColor: COLORS.danger };
      default:
        return { backgroundColor: COLORS.gray[500] };
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        user?.role === USER_ROLES.ADMIN && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('EditEquipment', { id: item.id })}
          >
            <Ionicons name="create-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )
      ),
    });
  }, [navigation, user]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <StatusBadge status={item.status} />
        </View>

        <View style={styles.infoSection}>
          <InfoRow
            label="Model Number"
            value={item.modelNumber}
            icon="barcode-outline"
          />
          <InfoRow
            label="Serial Number"
            value={item.serialNumber}
            icon="key-outline"
          />
          <InfoRow
            label="Department"
            value={item.department}
            icon="business-outline"
          />
          <InfoRow
            label="Date Acquired"
            value={new Date(item.dateAcquired).toLocaleDateString()}
            icon="calendar-outline"
          />
          <InfoRow
            label="Last Maintenance"
            value={new Date(item.lastMaintenance).toLocaleDateString()}
            icon="construct-outline"
          />
          <InfoRow
            label="Next Maintenance"
            value={new Date(item.nextMaintenance).toLocaleDateString()}
            icon="alarm-outline"
          />
        </View>

        <View style={styles.actions}>
          <Button
            title="Report Issue"
            onPress={() => navigation.navigate('CreateReport', { equipmentId: item.id })}
            style={styles.reportButton}
          />
          <Button
            title="View QR Code"
            variant="outline"
            onPress={() => {/* Show QR code modal */}}
            style={styles.qrButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray[600],
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes['2xl'],
    color: COLORS.gray[900],
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: SPACING.sm,
  },
  infoLabelText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  infoValue: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[900],
  },
  actions: {
    marginTop: SPACING.xl,
  },
  reportButton: {
    marginBottom: SPACING.sm,
  },
  qrButton: {
    backgroundColor: COLORS.white,
  },
  headerButton: {
    marginRight: SPACING.md,
  },
});

export default EquipmentDetailsScreen;
