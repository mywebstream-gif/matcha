import { User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  age: 28,
  photos: [
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  bio: 'Adventure seeker, coffee enthusiast, and dog lover. Looking for genuine connections and shared experiences.',
  interests: ['Travel', 'Photography', 'Hiking', 'Coffee', 'Dogs', 'Music'],
  location: 'San Francisco, CA',
  occupation: 'Software Engineer',
  education: 'Stanford University',
  relationshipType: 'serious',
  preferences: {
    ageRange: [25, 35],
    maxDistance: 50,
    interestedIn: ['Travel', 'Photography', 'Fitness', 'Food'],
    dealBreakers: ['Smoking', 'No pets'],
    importantQualities: ['Kindness', 'Intelligence', 'Humor']
  },
  isOnline: true,
  lastActive: new Date().toISOString()
};

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Sarah Chen',
    age: 26,
    photos: [
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    bio: 'Artist by day, foodie by night. I believe in creating beautiful moments and sharing great conversations over amazing meals.',
    interests: ['Art', 'Food', 'Photography', 'Travel', 'Yoga', 'Wine'],
    location: 'San Francisco, CA',
    occupation: 'Graphic Designer',
    education: 'UC Berkeley',
    relationshipType: 'serious',
    preferences: {
      ageRange: [24, 32],
      maxDistance: 30,
      interestedIn: ['Art', 'Travel', 'Food', 'Photography'],
      dealBreakers: ['Smoking'],
      importantQualities: ['Creativity', 'Kindness', 'Intelligence']
    },
    isOnline: true,
    lastActive: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    age: 31,
    photos: [
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    bio: 'Fitness enthusiast and outdoor adventurer. Love exploring new trails and pushing my limits. Looking for someone to share adventures with.',
    interests: ['Fitness', 'Hiking', 'Rock Climbing', 'Cooking', 'Travel', 'Books'],
    location: 'Oakland, CA',
    occupation: 'Personal Trainer',
    education: 'San Jose State',
    relationshipType: 'serious',
    preferences: {
      ageRange: [22, 35],
      maxDistance: 40,
      interestedIn: ['Fitness', 'Travel', 'Hiking', 'Food'],
      dealBreakers: ['Smoking', 'Sedentary lifestyle'],
      importantQualities: ['Health-conscious', 'Adventure-loving', 'Positive']
    },
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '4',
    name: 'Emma Thompson',
    age: 29,
    photos: [
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    bio: 'Music lover and bookworm. I spend my weekends at concerts, coffee shops, or exploring new neighborhoods. Always up for deep conversations.',
    interests: ['Music', 'Books', 'Coffee', 'Travel', 'Museums', 'Photography'],
    location: 'Berkeley, CA',
    occupation: 'Music Teacher',
    education: 'Berkeley Conservatory',
    relationshipType: 'serious',
    preferences: {
      ageRange: [26, 34],
      maxDistance: 25,
      interestedIn: ['Music', 'Books', 'Art', 'Travel'],
      dealBreakers: ['No common interests'],
      importantQualities: ['Intelligence', 'Creativity', 'Empathy']
    },
    isOnline: true,
    lastActive: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: '5',
    name: 'David Kim',
    age: 27,
    photos: [
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    bio: 'Tech entrepreneur with a passion for innovation and sustainability. Love traveling, trying new cuisines, and learning about different cultures.',
    interests: ['Technology', 'Travel', 'Food', 'Sustainability', 'Innovation', 'Startups'],
    location: 'Palo Alto, CA',
    occupation: 'Tech Entrepreneur',
    education: 'MIT',
    relationshipType: 'any',
    preferences: {
      ageRange: [23, 32],
      maxDistance: 60,
      interestedIn: ['Technology', 'Travel', 'Food', 'Innovation'],
      dealBreakers: ['Close-minded'],
      importantQualities: ['Intelligence', 'Ambition', 'Open-mindedness']
    },
    isOnline: false,
    lastActive: new Date(Date.now() - 1800000).toISOString()
  }
];