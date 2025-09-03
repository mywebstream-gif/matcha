export interface User {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  interests: string[];
  location: string;
  occupation: string;
  education: string;
  relationshipType: 'casual' | 'serious' | 'friendship' | 'any';
  preferences: UserPreferences;
  isOnline: boolean;
  lastActive: string;
}

export interface UserPreferences {
  ageRange: [number, number];
  maxDistance: number;
  interestedIn: string[];
  dealBreakers: string[];
  importantQualities: string[];
}

export interface Match {
  id: string;
  user: User;
  compatibilityScore: number;
  sharedInterests: string[];
  reasonsForMatch: string[];
  matchedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}