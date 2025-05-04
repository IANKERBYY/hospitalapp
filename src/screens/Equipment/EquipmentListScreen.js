import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../../styles/theme';
import Card from '../../components/common/Card';
import { equipment } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../data/mockData';

const EquipmentListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card
      title={item.name}
      subtitle={`${item.modelNumber} • ${item.department}`}
      description={`Serial: ${item.serialNumber}`}
      image={item.image}
      status={item.status}
      badges={[
        {
          text: `Next Maintenance: ${new Date(item.nextMaintenance).toLocaleDateString()}`,
          color: COLORS.gray[500],
        },
      ]}
      onPress={() => navigation.navigate('EquipmentDetails', { id: item.id })}
      style={styles.card}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search equipment..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.gray[400]}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.gray[400]} />
          </TouchableOpacity>
        )}
      </View>
      {user?.role === USER_ROLES.ADMIN && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEquipment')}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredEquipment}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    marginRight: SPACING.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[900],
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: SPACING.md,
  },
  card: {
    marginBottom: SPACING.md,
  },
});

export default EquipmentListScreen;
