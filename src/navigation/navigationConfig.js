import { COLORS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

// Screen names
export const SCREENS = {
  // Auth
  LOGIN: 'Login',
  
  // Main Tabs
  EQUIPMENT_LIST: 'EquipmentList',
  SCAN_QR: 'ScanQR',
  REPORTS: 'Reports',
  PROFILE: 'Profile',
  
  // Equipment Stack
  EQUIPMENT_DETAILS: 'EquipmentDetails',
  ADD_EQUIPMENT: 'AddEquipment',
  EDIT_EQUIPMENT: 'EditEquipment',
  
  // Report Stack
  CREATE_REPORT: 'CreateReport',
  REPORT_DETAILS: 'ReportDetails',
  
  // Admin Stack
  ADMIN_DASHBOARD: 'AdminDashboard',
  
  // Technician Stack
  TECHNICIAN_DASHBOARD: 'TechnicianDashboard',
};

// Tab navigation configuration
export const TAB_CONFIG = {
  // Staff/Nurse Tabs
  staff: [
    {
      name: SCREENS.EQUIPMENT_LIST,
      label: 'Equipment',
      icon: 'medical-outline',
    },
    {
      name: SCREENS.SCAN_QR,
      label: 'Scan',
      icon: 'qr-code-outline',
    },
    {
      name: SCREENS.REPORTS,
      label: 'Reports',
      icon: 'document-text-outline',
    },
    {
      name: SCREENS.PROFILE,
      label: 'Profile',
      icon: 'person-outline',
    },
  ],
  // Technician Tabs
  technician: [
    {
      name: SCREENS.TECHNICIAN_DASHBOARD,
      label: 'Dashboard',
      icon: 'grid-outline',
    },
    {
      name: SCREENS.EQUIPMENT_LIST,
      label: 'Equipment',
      icon: 'medical-outline',
    },
    {
      name: SCREENS.SCAN_QR,
      label: 'Scan',
      icon: 'qr-code-outline',
    },
    {
      name: SCREENS.PROFILE,
      label: 'Profile',
      icon: 'person-outline',
    },
  ],
  // Admin Tabs
  admin: [
    {
      name: SCREENS.ADMIN_DASHBOARD,
      label: 'Dashboard',
      icon: 'grid-outline',
    },
    {
      name: SCREENS.EQUIPMENT_LIST,
      label: 'Equipment',
      icon: 'medical-outline',
    },
    {
      name: SCREENS.REPORTS,
      label: 'Reports',
      icon: 'document-text-outline',
    },
    {
      name: SCREENS.PROFILE,
      label: 'Profile',
      icon: 'person-outline',
    },
  ],
};

// Default screen options for stack navigation
export const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

// Tab bar options
export const tabBarOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: COLORS.gray[400],
  style: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingBottom: 5,
    paddingTop: 5,
  },
};

// Helper function to get tab icon
export const getTabIcon = (route, focused, color) => {
  let iconName;
  const tabs = TAB_CONFIG.staff.concat(TAB_CONFIG.technician, TAB_CONFIG.admin);
  const tab = tabs.find(t => t.name === route.name);
  
  if (tab) {
    iconName = tab.icon;
  }

  return <Ionicons name={iconName} size={24} color={color} />;
};
