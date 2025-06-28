import React from 'react';
import { TextInput, TextInputProps, ViewStyle, TextStyle, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}

export function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#94a3b8"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#334155',
    color: '#ffffff',
    fontSize: 14,
  },
});