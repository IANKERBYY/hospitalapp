import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/styles/theme';
import { LogBox } from 'react-native';

export default function App() {
  // Ignore specific warnings (optional but recommended)
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted',
    'Setting a timer',
    'Remote debugger'
  ]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}