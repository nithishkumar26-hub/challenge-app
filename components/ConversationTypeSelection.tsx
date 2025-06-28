import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ArrowLeft, Phone, Flame, Snowflake, Handshake, UserPlus, Coffee } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
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
    icon: 'phone',
    category: 'sales',
    warmth: 'cold'
  },
  {
    id: 'sales-warm',
    title: 'Sales Warm Leads',
    description: 'Convert warm prospects into customers',
    icon: 'flame',
    category: 'sales',
    warmth: 'warm'
  },
  {
    id: 'service-cold',
    title: 'Service Cold Contact',
    description: 'Handle first-time customer service interactions',
    icon: 'snowflake',
    category: 'service',
    warmth: 'cold'
  },
  {
    id: 'service-warm',
    title: 'Service Warm Follow-up',
    description: 'Maintain relationships with existing customers',
    icon: 'handshake',
    category: 'service',
    warmth: 'warm'
  },
  {
    id: 'in-person-cold',
    title: 'In-Person Cold Approach',
    description: 'Face-to-face conversations with new prospects',
    icon: 'user-plus',
    category: 'in-person',
    warmth: 'cold'
  },
  {
    id: 'in-person-warm',
    title: 'In-Person Warm Meetings',
    description: 'Build rapport in face-to-face meetings',
    icon: 'coffee',
    category: 'in-person',
    warmth: 'warm'
  }
];

const getIcon = (iconName: string, color: string) => {
  const iconProps = { size: 32, color };
  
  switch (iconName) {
    case 'phone':
      return <Phone {...iconProps} />;
    case 'flame':
      return <Flame {...iconProps} />;
    case 'snowflake':
      return <Snowflake {...iconProps} />;
    case 'handshake':
      return <Handshake {...iconProps} />;
    case 'user-plus':
      return <UserPlus {...iconProps} />;
    case 'coffee':
      return <Coffee {...iconProps} />;
    default:
      return <Phone {...iconProps} />;
  }
};

const getIconColor = (type: ConversationType) => {
  if (type.warmth === 'cold') {
    switch (type.category) {
      case 'sales':
        return '#ef4444'; // Red for sales cold
      case 'service':
        return '#3b82f6'; // Blue for service cold
      case 'in-person':
        return '#3b82f6'; // Blue for in-person cold
      default:
        return '#3b82f6';
    }
  } else {
    switch (type.category) {
      case 'sales':
        return '#f97316'; // Orange for sales warm
      case 'service':
        return '#eab308'; // Yellow for service warm
      case 'in-person':
        return '#f97316'; // Orange for in-person warm
      default:
        return '#f97316';
    }
  }
};

export default function ConversationTypeSelection({ onSelect, onBack }: ConversationTypeSelectionProps) {
  const screenWidth = Dimensions.get('window').width;
  // Reduce overall container width and card size
  const containerWidth = Math.min(screenWidth * 0.85, 900); // Max 85% of screen or 900px
  const cardWidth = (containerWidth - 60) / 3; // 3 columns with smaller spacing

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { maxWidth: containerWidth, alignSelf: 'center' }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ArrowLeft color="#ffffff" size={18} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Choose Your Focus</Text>
          </View>
          
          <Text style={styles.subtitle}>
            Select the type of conversations you want to excel at
          </Text>

          {/* Grid - 3 columns, 2 rows */}
          <View style={styles.grid}>
            {conversationTypes.map((type, index) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => onSelect(type)}
                activeOpacity={0.8}
                style={[styles.cardWrapper, { width: cardWidth }]}
              >
                <Card style={styles.card}>
                  <CardContent style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      {getIcon(type.icon, getIconColor(type))}
                    </View>
                    
                    <Text style={styles.cardTitle}>{type.title}</Text>
                    <Text style={styles.cardDescription}>
                      {type.description}
                    </Text>
                    
                    <View style={[
                      styles.badge,
                      { 
                        backgroundColor: type.warmth === 'cold' ? '#3b82f6' : '#f97316'
                      }
                    ]}>
                      <Text style={styles.badgeText}>
                        {type.warmth.toUpperCase()}
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 50,
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 32,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderRadius: 12,
    height: 180, // Reduced height
  },
  cardContent: {
    padding: 16, // Reduced padding
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  iconContainer: {
    width: 60, // Smaller icon container
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15, // Smaller font
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  cardDescription: {
    fontSize: 12, // Smaller description
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10, // Smaller badge text
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});