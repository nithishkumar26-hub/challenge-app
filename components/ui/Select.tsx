import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ViewStyle, TextStyle, StyleSheet } from 'react-native';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  items: SelectItem[];
}

export function Select({ value, onValueChange, placeholder, items }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = items.find(item => item.value === value);

  return (
    <View>
      <TouchableOpacity style={styles.trigger} onPress={() => setIsOpen(true)}>
        <Text style={[styles.text, !selectedItem && styles.placeholder]}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity style={styles.modal} onPress={() => setIsOpen(false)}>
          <View style={styles.content}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    index === items.length - 1 && styles.lastItem
                  ]}
                  onPress={() => {
                    onValueChange?.(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 40,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#334155',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
  },
  placeholder: {
    color: '#94a3b8',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#334155',
    margin: 20,
    borderRadius: 8,
    maxHeight: 300,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 14,
  },
});