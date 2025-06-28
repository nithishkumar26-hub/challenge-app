import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Industry } from '../types/app';

interface IndustrySelectionProps {
  onSelect: (industry: Industry) => void;
  onBack: () => void;
}

const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Industrial production and supply chain',
    icon: '🏭',
    color: '#3b82f6'
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    description: 'Shipping, delivery, and supply chain management',
    icon: '🚛',
    color: '#22c55e'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, hardware, and digital solutions',
    icon: '💻',
    color: '#a855f7'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical services and pharmaceutical',
    icon: '🏥',
    color: '#ef4444'
  },
  {
    id: 'finance',
    name: 'Financial Services',
    description: 'Banking, insurance, and investment',
    icon: '💼',
    color: '#eab308'
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Consumer goods and online sales',
    icon: '🛍️',
    color: '#ec4899'
  }
];

export default function IndustrySelection({ onSelect, onBack }: IndustrySelectionProps) {
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
          <Text style={styles.title}>Select Your Industry</Text>
        </View>
        
        <Text style={styles.subtitle}>
          Choose the industry you work in or want to focus on
        </Text>

        <View style={styles.grid}>
          {industries.map((industry) => (
            <TouchableOpacity
              key={industry.id}
              onPress={() => onSelect(industry)}
              activeOpacity={0.7}
              style={styles.cardWrapper}
            >
              <Card style={styles.card}>
                <CardHeader style={styles.cardHeader}>
                  <Text style={styles.icon}>{industry.icon}</Text>
                  <CardTitle>
                    <Text style={styles.cardTitle}>{industry.name}</Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text style={styles.description}>
                    {industry.description}
                  </Text>
                  <View style={styles.colorBarContainer}>
                    <View style={[
                      styles.colorBar,
                      { backgroundColor: industry.color }
                    ]} />
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
  colorBarContainer: {
    alignItems: 'center',
  },
  colorBar: {
    width: 48,
    height: 8,
    borderRadius: 4,
  },
});