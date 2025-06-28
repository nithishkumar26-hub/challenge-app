import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ArrowLeft, Phone, Flame, Snowflake, Handshake, UserPlus, Coffee } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
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
  const iconProps = { size: 40, color };
  
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

// Animated Card Component
const AnimatedCard = ({ type, onSelect, index }: { 
  type: ConversationType; 
  onSelect: (type: ConversationType) => void;
  index: number;
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const iconScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  // Entry animation
  React.useEffect(() => {
    const delay = index * 100; // Stagger animation
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withSpring(0, { 
      damping: 15,
      stiffness: 100,
      mass: 1,
    });
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    translateY.value = withSpring(-8, { damping: 15, stiffness: 300 });
    iconScale.value = withSpring(1.1, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(0.3, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    iconScale.value = withSpring(1, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(0, { duration: 300 });
  };

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
      opacity: opacity.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onPress={() => onSelect(type)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.cardWrapper}
      >
        <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
          {/* Glow effect */}
          <Animated.View 
            style={[
              styles.glowEffect, 
              animatedGlowStyle,
              { 
                shadowColor: getIconColor(type),
                backgroundColor: getIconColor(type) + '20',
              }
            ]} 
          />
          
          <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
              <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                {getIcon(type.icon, getIconColor(type))}
              </Animated.View>
              
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
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default function ConversationTypeSelection({ onSelect, onBack }: ConversationTypeSelectionProps) {
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ArrowLeft color="#ffffff" size={20} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Choose Your Focus</Text>
          </View>
          
          <Text style={styles.subtitle}>
            Select the type of conversations you want to excel at
          </Text>

          {/* Grid - 3 columns, 2 rows */}
          <View style={styles.gridContainer}>
            {conversationTypes.map((type, index) => (
              <AnimatedCard 
                key={type.id} 
                type={type} 
                onSelect={onSelect} 
                index={index}
              />
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
    maxWidth: 1200,
    alignSelf: 'center',
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
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 40,
    lineHeight: 22,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  gridItem: {
    width: '31%', // 3 columns with spacing: (100% - 2*gap) / 3
    minWidth: 280, // Minimum width for smaller screens
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '31%',
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
  },
  glowEffect: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderRadius: 16,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});