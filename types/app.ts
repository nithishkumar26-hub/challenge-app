export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'sales' | 'service' | 'both';
  experience: 'beginner' | 'intermediate' | 'advanced';
  avatar?: string;
}

export interface ConversationType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sales' | 'service' | 'in-person';
  warmth: 'cold' | 'warm';
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LessonNode {
  id: string;
  title: string;
  difficulty: 'easy' | 'intermediate' | 'hard';
  position: { x: number; y: number };
  unlocked: boolean;
  completed: boolean;
  prerequisites?: string[];
  scenario: string;
  avatar: string;
}

export interface Progress {
  [lessonId: string]: {
    completed: boolean;
    completedAt: string;
    score?: number;
  };
}