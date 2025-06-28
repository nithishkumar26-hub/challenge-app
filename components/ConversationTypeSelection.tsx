import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ConversationType } from '../types/app';

interface ConversationTypeSelectionProps {
  onSelect: (type: ConversationType) => void;
  onBack: () => void;
}

const conversationTypes: ConversationType[] = [
  {
    id: 'sales-cold',
    title: 'Sales Cold Calling',
    description: 'Master cold outreach and initial contact techniques',
    icon: '📞',
    category: 'sales',
    warmth: 'cold'
  },
  {
    id: 'sales-warm',
    title: 'Sales Warm Leads',
    description: 'Convert warm prospects into customers',
    icon: '🔥',
    category: 'sales',
    warmth: 'warm'
  },
  {
    id: 'service-cold',
    title: 'Service Cold Contact',
    description: 'Handle first-time customer service interactions',
    icon: '❄️',
    category: 'service',
    warmth: 'cold'
  },
  {
    id: 'service-warm',
    title: 'Service Warm Follow-up',
    description: 'Maintain relationships with existing customers',
    icon: '🤝',
    category: 'service',
    warmth: 'warm'
  },
  {
    id: 'in-person-cold',
    title: 'In-Person Cold Approach',
    description: 'Face-to-face conversations with new prospects',
    icon: '👋',
    category: 'in-person',
    warmth: 'cold'
  },
  {
    id: 'in-person-warm',
    title: 'In-Person Warm Meetings',
    description: 'Build rapport in face-to-face meetings',
    icon: '☕',
    category: 'in-person',
    warmth: 'warm'
  }
];

export default function ConversationTypeSelection({ onSelect, onBack }: ConversationTypeSelectionProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Button variant="ghost" onPress={onBack} style={styles.backButton}>
            <View style={styles.backButtonContent}>
              <ArrowLeft color="#ffffff" size={16} />
              <Text style={styles.backButtonText}>Back</Text>
            </View>
          </Button>
          <Text style={styles.title}>Choose Your Focus</Text>
        </View>
        
        <Text style={styles.subtitle}>
          Select the type of conversations you want to excel at
        </Text>

        <View style={styles.grid}>
          {conversationTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => onSelect(type)}
              activeOpacity={0.7}
              style={styles.cardWrapper}
            >
              <Card style={styles.card}>
                <CardHeader style={styles.cardHeader}>
                  <Text style={styles.icon}>{type.icon}</Text>
                  <CardTitle>
                    <Text style={styles.cardTitle}>{type.title}</Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text style={styles.description}>
                    {type.description}
                  </Text>
                  <View style={styles.badgeContainer}>
                    <View style={[
                      styles.badge,
                      { backgroundColor: type.warmth === 'cold' ? '#3b82f6' : '#f97316' }
                    ]}>
                      <Text style={styles.badgeText}>
                        {type.warmth.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 32,
    fontSize: 16,
  },
  grid: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    borderColor: '#334155',
  },
  cardHeader: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});