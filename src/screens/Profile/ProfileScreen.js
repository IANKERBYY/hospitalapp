import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../styles/theme';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation, CommonActions } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const MenuOption = ({ icon, title, onPress, color = COLORS.gray[600] }) => (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.menuText, { color }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray[400]} />
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await logout();
              if (success) {
                // This is the key change - use navigation.replace instead
                navigation.replace('Login');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return COLORS.primary;
      case 'TECHNICIAN':
        return COLORS.warning;
      case 'STAFF':
        return COLORS.success;
      default:
        return COLORS.gray[500];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuContainer}>
          <MenuOption
            icon="person-outline"
            title="Edit Profile"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
          <MenuOption
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
          <MenuOption
            icon="notifications-outline"
            title="Notification Settings"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.menuContainer}>
          <MenuOption
            icon="moon-outline"
            title="Dark Mode"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
          <MenuOption
            icon="language-outline"
            title="Language"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuContainer}>
          <MenuOption
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
          />
          <MenuOption
            icon="information-circle-outline"
            title="About"
            onPress={() => Alert.alert('About', 'Hospital Equipment Management System v1.0.0')}
          />
        </View>
      </View>

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
        textStyle={{ color: COLORS.danger }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    ...FONTS.bold,
    fontSize: FONTS.sizes['2xl'],
    color: COLORS.white,
  },
  name: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.gray[900],
    marginBottom: SPACING.xs,
  },
  roleBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    marginBottom: SPACING.sm,
  },
  roleText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  email: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[700],
    marginBottom: SPACING.sm,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    ...SHADOWS.sm,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    flex: 1,
  },
  logoutButton: {
    margin: SPACING.xl,
    marginTop: SPACING.xl * 2,
    borderColor: COLORS.danger,
  },
});

export default ProfileScreen;