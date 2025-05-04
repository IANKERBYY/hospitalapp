import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../styles/theme';
import { dashboardData, equipment, reports } from '../../data/mockData';
import Card from '../../components/common/Card';

const StatCard = ({ title, value, icon, color, onPress }) => (
  <TouchableOpacity
    style={[styles.statCard, onPress && styles.pressable]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color={COLORS.white} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </TouchableOpacity>
);

const AdminDashboardScreen = ({ navigation }) => {
  const recentReports = reports
    .sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported))
    .slice(0, 3);

  const getEquipmentName = (equipmentId) => {
    const item = equipment.find(e => e.id === equipmentId);
    return item ? item.name : 'Unknown Equipment';
  };

  const renderRecentReports = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reports')}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {recentReports.map((report) => (
        <Card
          key={report.id}
          title={getEquipmentName(report.equipmentId)}
          subtitle={`Severity: ${report.severity}`}
          description={report.description}
          status={report.status}
          onPress={() => navigation.navigate('ReportDetails', { id: report.id })}
          style={styles.reportCard}
        />
      ))}
    </View>
  );

  const renderDepartmentStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Department Usage</Text>
      <View style={styles.departmentStats}>
        {Object.entries(dashboardData.departmentUsage).map(([dept, usage]) => (
          <View key={dept} style={styles.departmentRow}>
            <Text style={styles.departmentName}>{dept}</Text>
            <View style={styles.usageBarContainer}>
              <View
                style={[styles.usageBar, { width: `${usage}%` }]}
              />
            </View>
            <Text style={styles.usageText}>{usage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Equipment"
          value={dashboardData.totalEquipment}
          icon="medical"
          color={COLORS.primary}
          onPress={() => navigation.navigate('EquipmentList')}
        />
        <StatCard
          title="Under Maintenance"
          value={dashboardData.underMaintenance}
          icon="construct"
          color={COLORS.warning}
        />
        <StatCard
          title="Overdue Repairs"
          value={dashboardData.overdueRepairs}
          icon="alert-circle"
          color={COLORS.danger}
        />
      </View>

      {renderDepartmentStats()}
      {renderRecentReports()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  pressable: {
    opacity: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    ...FONTS.bold,
    fontSize: FONTS.sizes['2xl'],
    color: COLORS.gray[900],
    marginBottom: SPACING.xs,
  },
  statTitle: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
  },
  section: {
    padding: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray[900],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  reportCard: {
    marginBottom: SPACING.md,
  },
  departmentStats: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  departmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  departmentName: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[700],
    width: 100,
  },
  usageBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray[200],
    borderRadius: 4,
    marginHorizontal: SPACING.md,
  },
  usageBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  usageText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    width: 40,
    textAlign: 'right',
  },
});

export default AdminDashboardScreen;
