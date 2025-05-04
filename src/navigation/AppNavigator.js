import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { USER_ROLES } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

// Import all screens
import LoginScreen from '../screens/Auth/LoginScreen';
import EquipmentListScreen from '../screens/Equipment/EquipmentListScreen';
import EquipmentDetailsScreen from '../screens/Equipment/EquipmentDetailsScreen';
import QRScannerScreen from '../screens/QRScanner/QRScannerScreen';
import ReportsScreen from '../screens/Report/ReportsScreen';
import CreateReportScreen from '../screens/Report/CreateReportScreen';
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import TechnicianDashboardScreen from '../screens/Technician/TechnicianDashboardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Component
const MainTabNavigator = () => {
  const { user } = useAuth();

  const getTabNavigator = () => {
    switch(user?.role) {
      case USER_ROLES.ADMIN:
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === 'Dashboard') {
                  iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'Equipment') {
                  iconName = focused ? 'medical' : 'medical-outline';
                } else if (route.name === 'Reports') {
                  iconName = focused ? 'document-text' : 'document-text-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={24} color={color} />;
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.gray[400],
              tabBarStyle: {
                backgroundColor: COLORS.white,
                borderTopWidth: 1,
                borderTopColor: COLORS.gray[200],
                paddingBottom: 5,
                paddingTop: 5,
              },
            })}
          >
            <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
            <Tab.Screen name="Equipment" component={EquipmentListScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        );
      
      case USER_ROLES.TECHNICIAN:
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === 'Dashboard') {
                  iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'Equipment') {
                  iconName = focused ? 'medical' : 'medical-outline';
                } else if (route.name === 'Scan') {
                  iconName = focused ? 'qr-code' : 'qr-code-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={24} color={color} />;
              },
              // Same style options as above
            })}
          >
            <Tab.Screen name="Dashboard" component={TechnicianDashboardScreen} />
            <Tab.Screen name="Equipment" component={EquipmentListScreen} />
            <Tab.Screen name="Scan" component={QRScannerScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        );
      
      default: // STAFF
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === 'Equipment') {
                  iconName = focused ? 'medical' : 'medical-outline';
                } else if (route.name === 'Scan') {
                  iconName = focused ? 'qr-code' : 'qr-code-outline';
                } else if (route.name === 'Reports') {
                  iconName = focused ? 'document-text' : 'document-text-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={24} color={color} />;
              },
              // Same style options as above
            })}
          >
            <Tab.Screen name="Equipment" component={EquipmentListScreen} />
            <Tab.Screen name="Scan" component={QRScannerScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        );
    }
  };

  return getTabNavigator();
};

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log('[AppNavigator] Auth state updated', { 
      isAuthenticated, 
      loading 
    });
  }, [isAuthenticated, loading]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="MainApp"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ 
              headerShown: false,
              animationTypeForReplace: isAuthenticated ? 'push' : 'pop'
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;