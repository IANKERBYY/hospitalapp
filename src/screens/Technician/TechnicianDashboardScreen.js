import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../styles/theme';
import Card from '../../components/common/Card';
import { reports, equipment, useAuth } from '../../data/mockData';

const TechnicianDashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const { user } = useAuth();

  // Filter reports assigned to the current technician
  const technicianReports = reports.filter(report => {
    const equipmentItem = equipment.find(e => e.id === report.equipmentId);
    return equipmentItem?.assignedTechnician === user.id;
  });

  const filteredReports = technicianReports.filter(report => {
    switch (activeTab) {
      case 'pending':
        return report.status === 'PENDING';
      case 'inProgress':
        return report.status === 'IN_PROGRESS';
      case 'completed':
        return report.status === 'COMPLETED';
      default:
        return true;
    }
  });

  const getEquipmentDetails = (equipmentId) => {
    return equipment.find(e => e.id === equipmentId) || {};
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
        onPress={() => setActiveTab('pending')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'pending' && styles.activeTabText,
          ]}
        >
          Pending
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {technicianReports.filter(r => r.status === 'PENDING').length}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
        onPress={() => setActiveTab('inProgress')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'inProgress' && styles.activeTabText,
          ]}
        >
          In Progress
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
        onPress={() => setActiveTab('completed')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'completed' && styles.activeTabText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderTaskCard = (report) => {
    const equipment = getEquipmentDetails(report.equipmentId);
    
    return (
      <Card
        key={report.id}
        title={equipment.name}
        subtitle={`Department: ${equipment.department}`}
        description={report.description}
        status={report.status}
        badges={[
          {
            text: `Severity: ${report.severity}`,
            color: getSeverityColor(report.severity),
          },
          {
            text: `Reported: ${new Date(report.dateReported).toLocaleDateString()}`,
            color: COLORS.gray[500],
          },
        ]}
        onPress={() => navigation.navigate('ReportDetails', { id: report.id })}
        style={styles.card}
      />
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity.toUpperCase()) {
      case 'HIGH':
        return COLORS.danger;
      case 'MEDIUM':
        return COLORS.warning;
      case 'LOW':
        return COLORS.success;
      default:
        return COLORS.gray[500];
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="checkmark-done-circle-outline"
        size={64}
        color={COLORS.gray[300]}
      />
      <Text style={styles.emptyText}>No tasks found</Text>
      <Text style={styles.emptySubtext}>
        {activeTab === 'pending'
          ? 'You have no pending maintenance tasks'
          : activeTab === 'inProgress'
          ? 'No tasks are currently in progress'
          : 'No completed tasks yet'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>

      {renderTabs()}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredReports.length > 0 ? (
          filteredReports.map(renderTaskCard)
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  welcomeText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[100],
  },
  nameText: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.white,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  activeTabText: {
    color: COLORS.white,
  },
  badge: {
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginLeft: SPACING.xs,
  },
  badgeText: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  card: {
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray[400],
    marginTop: SPACING.md,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[400],
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});

export default TechnicianDashboardScreen;
