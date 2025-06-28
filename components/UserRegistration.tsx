import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { User, Mail, Briefcase, Award } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { UserProfile } from '../types/app';

interface UserRegistrationProps {
  onComplete: (profile: UserProfile) => void;
}

export default function UserRegistration({ onComplete }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experience: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.role && formData.experience) {
      const profile: UserProfile = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role as 'sales' | 'service' | 'both',
        experience: formData.experience as 'beginner' | 'intermediate' | 'advanced'
      };
      onComplete(profile);
    }
  };

  const roleItems = [
    { label: 'Sales Professional', value: 'sales' },
    { label: 'Customer Service', value: 'service' },
    { label: 'Both Sales & Service', value: 'both' },
  ];

  const experienceItems = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.card}>
          <CardHeader style={styles.cardHeader}>
            <Text style={styles.title}>
              Welcome to ConvoQuest
            </Text>
            <Text style={styles.subtitle}>
              Master your conversation skills through gamified training
            </Text>
          </CardHeader>
          <CardContent>
            <View style={styles.form}>
              <View style={styles.field}>
                <View style={styles.labelContainer}>
                  <User color="#ffffff" size={16} />
                  <Label style={styles.labelText}>Full Name</Label>
                </View>
                <Input
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Enter your full name"
                />
              </View>

              <View style={styles.field}>
                <View style={styles.labelContainer}>
                  <Mail color="#ffffff" size={16} />
                  <Label style={styles.labelText}>Email Address</Label>
                </View>
                <Input
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.field}>
                <View style={styles.labelContainer}>
                  <Briefcase color="#ffffff" size={16} />
                  <Label style={styles.labelText}>Your Role</Label>
                </View>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  placeholder="Select your role"
                  items={roleItems}
                />
              </View>

              <View style={styles.field}>
                <View style={styles.labelContainer}>
                  <Award color="#ffffff" size={16} />
                  <Label style={styles.labelText}>Experience Level</Label>
                </View>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  placeholder="Select your experience"
                  items={experienceItems}
                />
              </View>

              <Button 
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                Start Your Journey
              </Button>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  cardHeader: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelText: {
    marginBottom: 0,
  },
  submitButton: {
    backgroundColor: '#22c55e',
    marginTop: 8,
    paddingVertical: 12,
  },
});