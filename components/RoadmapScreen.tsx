import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, Star, Lock, CheckCircle, MapPin, RotateCcw, ArrowDown } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { UserProfile, ConversationType, Industry, LessonNode, Progress } from '../types/app';

interface RoadmapScreenProps {
  userProfile: UserProfile;
  conversationType: ConversationType;
  industry: Industry;
  onLessonStart: (lesson: LessonNode) => void;
  onBack: () => void;
  onChangePreferences: () => void;
  onResetApp: () => void;
}

export default function RoadmapScreen({
  userProfile,
  conversationType,
  industry,
  onLessonStart,
  onBack,
  onChangePreferences,
  onResetApp
}: RoadmapScreenProps) {
  const [progress, setProgress] = useState<Progress>({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const generateLessons = (): LessonNode[] => {
    const baseScenarios = [
      'Introduction and rapport building',
      'Identifying customer needs',
      'Presenting solutions effectively',
      'Handling objections',
      'Closing techniques',
      'Follow-up strategies',
      'Advanced negotiation',
      'Building long-term relationships'
    ];

    return baseScenarios.map((scenario, index) => ({
      id: `lesson-${index}`,
      title: `${scenario}`,
      difficulty: index < 3 ? 'easy' : index < 6 ? 'intermediate' : 'hard',
      position: { x: 0, y: 0 },
      unlocked: index === 0 || progress[`lesson-${index - 1}`]?.completed || false,
      completed: progress[`lesson-${index}`]?.completed || false,
      prerequisites: index > 0 ? [`lesson-${index - 1}`] : undefined,
      scenario: `${scenario} in ${industry.name} for ${conversationType.title}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`
    }));
  };

  const [lessons, setLessons] = useState<LessonNode[]>([]);

  useEffect(() => {
    loadProgress();
  }, [conversationType.id, industry.id]);

  useEffect(() => {
    setLessons(generateLessons());
  }, [progress, conversationType, industry]);

  const loadProgress = async () => {
    try {
      const progressKey = `progress_${conversationType.id}_${industry.id}`;
      const savedProgress = await AsyncStorage.getItem(progressKey);
      const progressData = savedProgress ? JSON.parse(savedProgress) : {};
      setProgress(progressData);

      const completedCount = Object.keys(progressData).length;
      setCurrentLessonIndex(completedCount);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'intermediate': return '#eab308';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'intermediate': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>
                {conversationType.title} - {industry.name}
              </Text>
              <Text style={styles.subtitle}>Welcome back, {userProfile.name}!</Text>
            </View>
            
            <View style={styles.headerRight}>
              {/* Progress Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>
                    {Object.keys(progress).length}
                  </Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={[styles.statNumber, { color: '#60a5fa' }]}>
                    {lessons.length}
                  </Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>

              {/* Settings Button */}
              <TouchableOpacity
                onPress={() => setShowSettings(true)}
                style={styles.settingsButton}
              >
                <Settings color="#ffffff" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Roadmap */}
          <Card>
            <CardContent style={styles.roadmapContent}>
              <View style={styles.roadmapContainer}>
                {lessons.map((lesson, index) => (
                  <View key={lesson.id} style={styles.lessonContainer}>
                    {/* "You are here" indicator */}
                    {index === currentLessonIndex && !lesson.completed && (
                      <View style={styles.youAreHereContainer}>
                        <View style={styles.youAreHereBadge}>
                          <MapPin color="#ffffff" size={12} />
                          <Text style={styles.youAreHereText}>You are here</Text>
                        </View>
                      </View>
                    )}

                    {/* Lesson Node */}
                    <TouchableOpacity
                      onPress={() => lesson.unlocked && onLessonStart(lesson)}
                      disabled={!lesson.unlocked}
                      style={[
                        styles.lessonNode,
                        {
                          backgroundColor: lesson.completed 
                            ? '#22c55e' 
                            : lesson.unlocked 
                            ? '#3b82f6' 
                            : '#6b7280',
                          opacity: lesson.unlocked ? 1 : 0.5
                        }
                      ]}
                      activeOpacity={0.7}
                    >
                      {lesson.completed ? (
                        <CheckCircle color="#ffffff" size={24} />
                      ) : lesson.unlocked ? (
                        <Star color="#ffffff" size={24} />
                      ) : (
                        <Lock color="#ffffff" size={24} />
                      )}
                    </TouchableOpacity>

                    {/* Lesson Info */}
                    <Card style={styles.lessonCard}>
                      <CardContent style={styles.lessonCardContent}>
                        <View style={styles.lessonHeader}>
                          <Text style={styles.lessonNumber}>
                            Lesson {index + 1}
                          </Text>
                          <View style={styles.starsContainer}>
                            {[...Array(getDifficultyStars(lesson.difficulty))].map((_, i) => (
                              <Star key={i} color="#eab308" size={14} />
                            ))}
                          </View>
                        </View>
                        <Text style={styles.lessonTitle}>
                          {lesson.title}
                        </Text>
                        <View style={[
                          styles.difficultyBadge,
                          { backgroundColor: getDifficultyColor(lesson.difficulty) }
                        ]}>
                          <Text style={styles.difficultyText}>
                            {lesson.difficulty}
                          </Text>
                        </View>
                      </CardContent>
                    </Card>

                    {/* Connecting Line */}
                    {index < lessons.length - 1 && (
                      <View style={styles.connectingLine}>
                        <ArrowDown color="#475569" size={16} />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowSettings(false)}
        >
          <View style={styles.modalContent}>
            <Button
              onPress={() => {
                setShowSettings(false);
                onChangePreferences();
              }}
              style={[styles.modalButton, { backgroundColor: '#3b82f6' }]}
            >
              Change Preferences
            </Button>
            <Button
              onPress={() => {
                setShowSettings(false);
                onResetApp();
              }}
              style={[styles.modalButton, { backgroundColor: '#ef4444' }]}
            >
              <View style={styles.resetButtonContent}>
                <RotateCcw color="#ffffff" size={16} />
                <Text style={styles.resetButtonText}>Reset App</Text>
              </View>
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94a3b8',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadmapContent: {
    padding: 24,
  },
  roadmapContainer: {
    gap: 32,
  },
  lessonContainer: {
    alignItems: 'center',
  },
  youAreHereContainer: {
    marginBottom: 8,
  },
  youAreHereBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  youAreHereText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonNode: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  lessonCard: {
    width: '100%',
    maxWidth: 300,
  },
  lessonCardContent: {
    padding: 16,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonNumber: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  lessonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  connectingLine: {
    width: 2,
    height: 20,
    backgroundColor: '#475569',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    minWidth: 200,
    gap: 12,
  },
  modalButton: {
    marginBottom: 0,
  },
  resetButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetButtonText: {
    color: '#ffffff',
  },
});