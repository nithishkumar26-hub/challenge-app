import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { X, Play, Square, Mic, MicOff } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { LessonNode } from '../types/app';

interface SparringScreenProps {
  lesson: LessonNode;
  onComplete: () => void;
  onStop: () => void;
}

export default function SparringScreen({ lesson, onComplete, onStop }: SparringScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setTimer(0);
  };

  const handleStop = () => {
    setIsActive(false);
    onStop();
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'intermediate': return '#eab308';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'intermediate': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{lesson.title}</Text>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(lesson.difficulty) }
            ]}>
              <Text style={styles.difficultyText}>
                {getDifficultyIcon(lesson.difficulty)} {lesson.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Button variant="ghost" onPress={handleStop}>
            <View style={styles.stopButtonContent}>
              <X color="#ffffff" size={16} />
              <Text style={styles.stopButtonText}>Stop Session</Text>
            </View>
          </Button>
        </View>

        {/* Main sparring area */}
        <View style={styles.mainContent}>
          {/* Avatar and scenario */}
          <Card style={styles.sparringCard}>
            <CardHeader style={styles.sparringCardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <CardTitle>
                <Text style={styles.partnerTitle}>Your Sparring Partner</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.scenarioContainer}>
                <Text style={styles.scenarioLabel}>Scenario:</Text>
                <Text style={styles.scenarioText}>
                  {lesson.scenario}
                </Text>
              </View>
              
              {!isActive ? (
                <Button
                  onPress={handleStart}
                  style={styles.startButton}
                >
                  <View style={styles.startButtonContent}>
                    <Play color="#ffffff" size={16} />
                    <Text style={styles.startButtonText}>Start Sparring</Text>
                  </View>
                </Button>
              ) : (
                <View style={styles.activeSession}>
                  <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                      {formatTime(timer)}
                    </Text>
                    <Text style={styles.timerLabel}>Session Time</Text>
                  </View>
                  
                  <View style={styles.actionButtons}>
                    <Button
                      onPress={() => setIsRecording(!isRecording)}
                      style={[
                        styles.actionButton,
                        { backgroundColor: isRecording ? '#ef4444' : '#3b82f6' }
                      ]}
                    >
                      <View style={styles.actionButtonContent}>
                        {isRecording ? (
                          <MicOff color="#ffffff" size={16} />
                        ) : (
                          <Mic color="#ffffff" size={16} />
                        )}
                        <Text style={styles.actionButtonText}>
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </Text>
                      </View>
                    </Button>
                    
                    <Button
                      onPress={handleComplete}
                      style={[styles.actionButton, { backgroundColor: '#22c55e' }]}
                    >
                      <View style={styles.actionButtonContent}>
                        <Square color="#ffffff" size={16} />
                        <Text style={styles.actionButtonText}>Complete</Text>
                      </View>
                    </Button>
                  </View>
                </View>
              )}
            </CardContent>
          </Card>

          {/* Tips and guidelines */}
          <Card style={styles.guidelinesCard}>
            <CardHeader>
              <CardTitle>
                <Text style={styles.guidelinesTitle}>Session Guidelines</Text>
              </CardTitle>
            </CardHeader>
            <CardContent style={styles.guidelinesContent}>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Tips for Success:</Text>
                <View style={styles.tipsList}>
                  <Text style={styles.tipItem}>• Start with a warm greeting and introduction</Text>
                  <Text style={styles.tipItem}>• Listen actively to understand their needs</Text>
                  <Text style={styles.tipItem}>• Ask open-ended questions to gather information</Text>
                  <Text style={styles.tipItem}>• Present solutions that match their requirements</Text>
                  <Text style={styles.tipItem}>• Handle objections with empathy and facts</Text>
                </View>
              </View>

              <View style={styles.objectivesContainer}>
                <Text style={styles.objectivesTitle}>🎯 Objectives:</Text>
                <View style={styles.objectivesList}>
                  <Text style={styles.objectiveItem}>• Build rapport within the first 30 seconds</Text>
                  <Text style={styles.objectiveItem}>• Identify at least 2 pain points</Text>
                  <Text style={styles.objectiveItem}>• Present a tailored solution</Text>
                  <Text style={styles.objectiveItem}>• Close with a clear next step</Text>
                </View>
              </View>

              {isActive && (
                <View style={styles.activeIndicator}>
                  <View style={styles.activeIndicatorHeader}>
                    <View style={styles.activeDot} />
                    <Text style={styles.activeIndicatorTitle}>Session Active</Text>
                  </View>
                  <Text style={styles.activeIndicatorText}>
                    Practice your conversation skills now!
                  </Text>
                </View>
              )}
            </CardContent>
          </Card>
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
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  stopButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stopButtonText: {
    color: '#ffffff',
  },
  mainContent: {
    gap: 24,
  },
  sparringCard: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  sparringCardHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
  },
  partnerTitle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  scenarioContainer: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  scenarioLabel: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 8,
  },
  scenarioText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activeSession: {
    gap: 16,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 8,
  },
  timerLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  actionButtons: {
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
  },
  guidelinesCard: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  guidelinesTitle: {
    color: '#ffffff',
  },
  guidelinesContent: {
    gap: 16,
  },
  tipsContainer: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 8,
  },
  tipsTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  objectivesContainer: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 8,
  },
  objectivesTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 8,
  },
  objectivesList: {
    gap: 4,
  },
  objectiveItem: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  activeIndicator: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    padding: 16,
    borderRadius: 8,
  },
  activeIndicatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
  },
  activeIndicatorTitle: {
    color: '#4ade80',
    fontWeight: '600',
  },
  activeIndicatorText: {
    color: '#86efac',
    fontSize: 14,
  },
});