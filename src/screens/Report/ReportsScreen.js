import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../styles/theme';
import Button from '../../components/common/Button';
import { reports, equipment, users, SEVERITY_LEVELS } from '../../data/mockData';

const ReportsScreen = ({ navigation }) => {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return COLORS.warning;
      case 'IN_PROGRESS':
        return COLORS.primary;
      case 'COMPLETED':
        return COLORS.success;
      default:
        return COLORS.gray[500];
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toUpperCase()) {
      case SEVERITY_LEVELS.HIGH:
        return COLORS.danger;
      case SEVERITY_LEVELS.MEDIUM:
        return COLORS.warning;
      case SEVERITY_LEVELS.LOW:
        return COLORS.success;
      default:
        return COLORS.gray[500];
    }
  };

  const getEquipmentName = (equipmentId) => {
    const item = equipment.find(e => e.id === equipmentId);
    return item ? item.name : 'Unknown Equipment';
  };

  const getReporterName = (reporterId) => {
    const user = users.find(u => u.id === reporterId);
    return user ? user.name : 'Unknown User';
  };

  const filteredReports = reports.filter(report => 
    filterStatus === 'ALL' || report.status === filterStatus
  );

  const renderReport = ({ item }) => (
    <TouchableOpacity
      style={styles.reportCard}
      onPress={() => navigation.navigate('ReportDetails', { id: item.id })}
    >
      <View style={styles.reportHeader}>
        <View style={styles.equipmentInfo}>
          <Text style={styles.equipmentName}>
            {getEquipmentName(item.equipmentId)}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
          <Text style={styles.severityText}>{item.severity}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.reportFooter}>
        <View style={styles.reporterInfo}>
          <Ionicons name="person-outline" size={16} color={COLORS.gray[500]} />
          <Text style={styles.reporterName}>{getReporterName(item.reporterId)}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.dateReported).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.filterButtons}>
        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(status)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === status && styles.filterButtonTextActive,
              ]}
            >
              {status.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color={COLORS.gray[300]} />
      <Text style={styles.emptyText}>No reports found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredReports}
        renderItem={renderReport}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
      />
      <Button
        title="Create New Report"
        onPress={() => navigation.navigate('CreateReport')}
        style={styles.createButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 16,
    backgroundColor: COLORS.gray[100],
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  list: {
    padding: SPACING.md,
  },
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  equipmentInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  equipmentName: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[900],
    marginBottom: SPACING.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
    marginTop: SPACING.xs,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
  },
  severityBadge: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
  },
  severityText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
  },
  description: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginBottom: SPACING.md,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporterName: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[600],
    marginLeft: SPACING.xs,
  },
  date: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[500],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray[400],
    marginTop: SPACING.md,
  },
  createButton: {
    margin: SPACING.md,
  },
});

export default ReportsScreen;
