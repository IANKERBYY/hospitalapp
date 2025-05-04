import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await login(credentials.username, credentials.password);
      if (!result.success) {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg' }}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <View style={styles.form}>
            <Input
              label="Username"
              value={credentials.username}
              onChangeText={(text) => {
                setCredentials((prev) => ({ ...prev, username: text }));
                setError('');
              }}
              placeholder="Enter your username"
              leftIcon="person-outline"
              autoCapitalize="none"
              error={error ? ' ' : ''}
            />

            <Input
              label="Password"
              value={credentials.password}
              onChangeText={(text) => {
                setCredentials((prev) => ({ ...prev, password: text }));
                setError('');
              }}
              placeholder="Enter your password"
              leftIcon="lock-closed-outline"
              secureTextEntry
              error={error}
            />

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.demoCredentials}>
              <Button
                title="Demo Admin"
                onPress={() => {
                  setCredentials({ username: 'admin', password: 'admin123' });
                }}
                variant="outline"
                size="sm"
                style={styles.demoButton}
              />
              <Button
                title="Demo Tech"
                onPress={() => {
                  setCredentials({ username: 'tech', password: 'tech123' });
                }}
                variant="outline"
                size="sm"
                style={styles.demoButton}
              />
              <Button
                title="Demo Staff"
                onPress={() => {
                  setCredentials({ username: 'nurse', password: 'nurse123' });
                }}
                variant="outline"
                size="sm"
                style={styles.demoButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 120,
    marginBottom: SPACING.xl,
  },
  form: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  demoCredentials: {
    marginTop: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});

export default LoginScreen;
