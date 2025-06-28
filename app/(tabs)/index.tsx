import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserRegistration from '../../components/UserRegistration';
import ConversationTypeSelection from '../../components/ConversationTypeSelection';
import IndustrySelection from '../../components/IndustrySelection';
import RoadmapScreen from '../../components/RoadmapScreen';
import SparringScreen from '../../components/SparringScreen';
import { UserProfile, ConversationType, Industry, LessonNode } from '../../types/app';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<'registration' | 'conversation-type' | 'industry' | 'roadmap' | 'sparring'>('registration');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedConversationType, setSelectedConversationType] = useState<ConversationType | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonNode | null>(null);

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      const savedConversationType = await AsyncStorage.getItem('conversationType');
      const savedIndustry = await AsyncStorage.getItem('industry');
      
      if (savedProfile && savedConversationType && savedIndustry) {
        setUserProfile(JSON.parse(savedProfile));
        setSelectedConversationType(JSON.parse(savedConversationType));
        setSelectedIndustry(JSON.parse(savedIndustry));
        setCurrentScreen('roadmap');
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const handleUserRegistration = async (profile: UserProfile) => {
    setUserProfile(profile);
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentScreen('conversation-type');
  };

  const handleConversationTypeSelection = async (type: ConversationType) => {
    setSelectedConversationType(type);
    await AsyncStorage.setItem('conversationType', JSON.stringify(type));
    setCurrentScreen('industry');
  };

  const handleIndustrySelection = async (industry: Industry) => {
    setSelectedIndustry(industry);
    await AsyncStorage.setItem('industry', JSON.stringify(industry));
    setCurrentScreen('roadmap');
  };

  const handleLessonStart = (lesson: LessonNode) => {
    setCurrentLesson(lesson);
    setCurrentScreen('sparring');
  };

  const handleSparringComplete = async () => {
    if (currentLesson) {
      try {
        const progressKey = `progress_${selectedConversationType?.id}_${selectedIndustry?.id}`;
        const currentProgressStr = await AsyncStorage.getItem(progressKey);
        const currentProgress = currentProgressStr ? JSON.parse(currentProgressStr) : {};
        currentProgress[currentLesson.id] = { completed: true, completedAt: new Date().toISOString() };
        await AsyncStorage.setItem(progressKey, JSON.stringify(currentProgress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
    setCurrentScreen('roadmap');
  };

  const handleChangePreferences = () => {
    setCurrentScreen('conversation-type');
  };

  const handleResetApp = async () => {
    try {
      await AsyncStorage.multiRemove(['userProfile', 'conversationType', 'industry']);
      setUserProfile(null);
      setSelectedConversationType(null);
      setSelectedIndustry(null);
      setCurrentScreen('registration');
    } catch (error) {
      console.error('Error resetting app:', error);
    }
  };

  if (currentScreen === 'registration') {
    return <UserRegistration onComplete={handleUserRegistration} />;
  }
  
  if (currentScreen === 'conversation-type') {
    return (
      <ConversationTypeSelection 
        onSelect={handleConversationTypeSelection}
        onBack={() => userProfile ? setCurrentScreen('roadmap') : setCurrentScreen('registration')}
      />
    );
  }
  
  if (currentScreen === 'industry') {
    return (
      <IndustrySelection 
        onSelect={handleIndustrySelection}
        onBack={() => setCurrentScreen('conversation-type')}
      />
    );
  }
  
  if (currentScreen === 'roadmap' && userProfile && selectedConversationType && selectedIndustry) {
    return (
      <RoadmapScreen 
        userProfile={userProfile}
        conversationType={selectedConversationType}
        industry={selectedIndustry}
        onLessonStart={handleLessonStart}
        onBack={() => setCurrentScreen('industry')}
        onChangePreferences={handleChangePreferences}
        onResetApp={handleResetApp}
      />
    );
  }
  
  if (currentScreen === 'sparring' && currentLesson) {
    return (
      <SparringScreen 
        lesson={currentLesson}
        onComplete={handleSparringComplete}
        onStop={() => setCurrentScreen('roadmap')}
      />
    );
  }

  return <UserRegistration onComplete={handleUserRegistration} />;
}