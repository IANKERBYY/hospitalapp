import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const Card = ({
  title,
  subtitle,
  description,
  image,
  status,
  statusColor,
  rightIcon,
  onPress,
  style,
  imageStyle,
  badges = [],
}) => {
  const getStatusColor = () => {
    if (statusColor) return statusColor;
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return COLORS.success;
      case 'IN_USE':
        return COLORS.primary;
      case 'UNDER_MAINTENANCE':
        return COLORS.warning;
      case 'OUT_OF_ORDER':
        return COLORS.danger;
      default:
        return COLORS.gray[500];
    }
  };

  const renderBadges = () => {
    return badges.map((badge, index) => (
      <View
        key={index}
        style={[
          styles.badge,
          { backgroundColor: badge.color || COLORS.primary },
        ]}
      >
        <Text style={styles.badgeText}>{badge.text}</Text>
      </View>
    ));
  };

  const CardContent = () => (
    <View style={[styles.container, style]}>
      {image && (
        <Image
          source={{ uri: image }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {status && (
              <View
                style={[styles.status, { backgroundColor: getStatusColor() }]}
              >
                <Text style={styles.statusText}>{status}</Text>
              </View>
            )}
          </View>
          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={24}
              color={COLORS.gray[500]}
              style={styles.rightIcon}
            />
          )}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        {badges.length > 0 && <View style={styles.badgeContainer}>{renderBadges()}</View>}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray[900],
    marginRight: SPACING.sm,
    flex: 1,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray[600],
    marginTop: SPACING.xs,
  },
  description: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[500],
    marginTop: SPACING.xs,
  },
  status: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    marginLeft: SPACING.xs,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  rightIcon: {
    marginLeft: SPACING.sm,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  badgeText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
  },
});

export default Card;
