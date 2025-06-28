import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ 
  children, 
  onPress, 
  variant = 'default',
  size = 'default',
  disabled = false,
  style
}: ButtonProps) {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#475569',
        };
      default:
        return {
          backgroundColor: '#22c55e',
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          minHeight: 36,
        };
      case 'lg':
        return {
          paddingHorizontal: 32,
          paddingVertical: 12,
          minHeight: 44,
        };
      case 'icon':
        return {
          width: 40,
          height: 40,
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 40,
        };
    }
  };

  const getTextColor = (): string => {
    if (variant === 'ghost' || variant === 'outline') {
      return '#ffffff';
    }
    return '#ffffff';
  };

  const baseStyle: ViewStyle = {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.5 : 1,
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  const textStyle: TextStyle = {
    color: getTextColor(),
    fontSize: 14,
    fontWeight: '500',
  };

  return (
    <TouchableOpacity
      style={[baseStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}