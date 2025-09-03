import { User, Match } from '../types';

export function calculateCompatibilityScore(user1: User, user2: User): number {
  let score = 0;
  
  // Age compatibility (20% weight)
  const ageCompatibility = calculateAgeCompatibility(user1, user2);
  score += ageCompatibility * 0.2;
  
  // Interest overlap (30% weight)
  const interestCompatibility = calculateInterestCompatibility(user1, user2);
  score += interestCompatibility * 0.3;
  
  // Location proximity (15% weight)
  const locationCompatibility = calculateLocationCompatibility(user1, user2);
  score += locationCompatibility * 0.15;
  
  // Relationship type compatibility (20% weight)
  const relationshipCompatibility = calculateRelationshipCompatibility(user1, user2);
  score += relationshipCompatibility * 0.2;
  
  // Preference matching (15% weight)
  const preferenceCompatibility = calculatePreferenceCompatibility(user1, user2);
  score += preferenceCompatibility * 0.15;
  
  return Math.round(score);
}

function calculateAgeCompatibility(user1: User, user2: User): number {
  const [minAge1, maxAge1] = user1.preferences.ageRange;
  const [minAge2, maxAge2] = user2.preferences.ageRange;
  
  const user1InRange = user2.age >= minAge1 && user2.age <= maxAge1;
  const user2InRange = user1.age >= minAge2 && user1.age <= maxAge2;
  
  if (user1InRange && user2InRange) return 100;
  if (user1InRange || user2InRange) return 50;
  
  // Calculate how far outside the range
  const user1Distance = Math.min(Math.abs(user2.age - minAge1), Math.abs(user2.age - maxAge1));
  const user2Distance = Math.min(Math.abs(user1.age - minAge2), Math.abs(user1.age - maxAge2));
  const avgDistance = (user1Distance + user2Distance) / 2;
  
  return Math.max(0, 100 - (avgDistance * 10));
}

function calculateInterestCompatibility(user1: User, user2: User): number {
  const commonInterests = user1.interests.filter(interest => 
    user2.interests.includes(interest)
  );
  
  const totalInterests = new Set([...user1.interests, ...user2.interests]).size;
  const commonPercentage = (commonInterests.length / Math.min(user1.interests.length, user2.interests.length)) * 100;
  
  return Math.min(100, commonPercentage);
}

function calculateLocationCompatibility(user1: User, user2: User): number {
  // Simple location matching based on city
  const city1 = user1.location.split(',')[0].trim();
  const city2 = user2.location.split(',')[0].trim();
  
  if (city1 === city2) return 100;
  
  // Bay Area cities compatibility
  const bayAreaCities = ['San Francisco', 'Oakland', 'Berkeley', 'Palo Alto', 'San Jose'];
  const city1InBayArea = bayAreaCities.includes(city1);
  const city2InBayArea = bayAreaCities.includes(city2);
  
  if (city1InBayArea && city2InBayArea) return 80;
  
  return 40; // Different regions
}

function calculateRelationshipCompatibility(user1: User, user2: User): number {
  if (user1.relationshipType === user2.relationshipType) return 100;
  if (user1.relationshipType === 'any' || user2.relationshipType === 'any') return 80;
  
  const compatibilityMatrix: Record<string, Record<string, number>> = {
    'serious': { 'friendship': 30, 'casual': 40 },
    'casual': { 'friendship': 60, 'serious': 40 },
    'friendship': { 'serious': 30, 'casual': 60 }
  };
  
  return compatibilityMatrix[user1.relationshipType]?.[user2.relationshipType] || 20;
}

function calculatePreferenceCompatibility(user1: User, user2: User): number {
  let score = 0;
  let factors = 0;
  
  // Check if user2's interests match user1's preferences
  const user1InterestedInUser2 = user1.preferences.interestedIn.some(interest =>
    user2.interests.includes(interest)
  );
  const user2InterestedInUser1 = user2.preferences.interestedIn.some(interest =>
    user1.interests.includes(interest)
  );
  
  if (user1InterestedInUser2) {
    score += 50;
    factors++;
  }
  if (user2InterestedInUser1) {
    score += 50;
    factors++;
  }
  
  factors = Math.max(factors, 1); // Avoid division by zero
  return score / factors;
}

export function generateMatchReasons(user1: User, user2: User): string[] {
  const reasons: string[] = [];
  const commonInterests = user1.interests.filter(interest => 
    user2.interests.includes(interest)
  );
  
  if (commonInterests.length > 0) {
    reasons.push(`Both love ${commonInterests.slice(0, 2).join(' and ')}`);
  }
  
  const city1 = user1.location.split(',')[0].trim();
  const city2 = user2.location.split(',')[0].trim();
  if (city1 === city2) {
    reasons.push(`Both live in ${city1}`);
  }
  
  if (user1.relationshipType === user2.relationshipType) {
    reasons.push(`Both looking for ${user1.relationshipType} relationships`);
  }
  
  const educationLevel1 = user1.education.toLowerCase();
  const educationLevel2 = user2.education.toLowerCase();
  if (educationLevel1.includes('university') && educationLevel2.includes('university')) {
    reasons.push('Both have university education');
  }
  
  return reasons.slice(0, 3);
}

export function generateMatches(currentUser: User, users: User[]): Match[] {
  return users
    .filter(user => user.id !== currentUser.id)
    .map(user => ({
      id: `match-${user.id}`,
      user,
      compatibilityScore: calculateCompatibilityScore(currentUser, user),
      sharedInterests: currentUser.interests.filter(interest => 
        user.interests.includes(interest)
      ),
      reasonsForMatch: generateMatchReasons(currentUser, user),
      matchedAt: new Date().toISOString()
    }))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}