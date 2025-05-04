import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  disabled = false,
  style,
  containerStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    return (
      <View style={styles.leftIcon}>
        <Ionicons name={leftIcon} size={20} color={COLORS.gray[500]} />
      </View>
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.gray[500]}
          />
        </TouchableOpacity>
      );
    }

    if (!rightIcon) return null;
    return (
      <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
        <Ionicons name={rightIcon} size={20} color={COLORS.gray[500]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          multiline && styles.multiline,
        ]}
      >
        {renderLeftIcon()}
        <TextInput
          style={[
            styles.input,
            leftIcon && { paddingLeft: 40 },
            (rightIcon || secureTextEntry) && { paddingRight: 40 },
            multiline && styles.multilineInput,
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray[400]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {renderRightIcon()}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...FONTS.regular,
    flex: 1,
    color: COLORS.gray[900],
    fontSize: FONTS.sizes.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 44,
  },
  multiline: {
    minHeight: 100,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  inputDisabled: {
    backgroundColor: COLORS.gray[100],
    borderColor: COLORS.gray[200],
  },
  errorText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
  leftIcon: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: SPACING.md,
    zIndex: 1,
  },
});

export default Input;
