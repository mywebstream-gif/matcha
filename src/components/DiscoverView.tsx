import React, { useState } from 'react';
import { Heart, X, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Match } from '../types';

interface DiscoverViewProps {
  matches: Match[];
  onLike: (matchId: string) => void;
  onPass: (matchId: string) => void;
}

export default function DiscoverView({ matches, onLike, onPass }: DiscoverViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentMatch = matches[currentIndex];

  const handleAction = (action: 'like' | 'pass') => {
    if (!currentMatch || isAnimating) return;

    setIsAnimating(true);
    
    setTimeout(() => {
      if (action === 'like') {
        onLike(currentMatch.id);
      } else {
        onPass(currentMatch.id);
      }
      
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  if (!currentMatch) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center p-8">
          <Heart className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No More Profiles</h2>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto">
        <div className={`relative transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Photo */}
            <div className="relative h-96 bg-gray-200">
              <img
                src={currentMatch.user.photos[0]}
                alt={currentMatch.user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-sm font-bold text-purple-600">
                  {currentMatch.compatibilityScore}% Match
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentMatch.user.name}
                  </h2>
                  <p className="text-gray-600">{currentMatch.user.age} years old</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  currentMatch.user.isOnline ? 'bg-green-400' : 'bg-gray-300'
                }`} />
              </div>

              {/* Quick Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{currentMatch.user.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase size={16} className="mr-2" />
                  <span className="text-sm">{currentMatch.user.occupation}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={16} className="mr-2" />
                  <span className="text-sm">{currentMatch.user.education}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{currentMatch.user.bio}</p>

              {/* Interests */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.user.interests.map((interest) => (
                    <span
                      key={interest}
                      className={`px-3 py-1 rounded-full text-sm ${
                        currentMatch.sharedInterests.includes(interest)
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Reasons */}
              {currentMatch.reasonsForMatch.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Why you match</h3>
                  <ul className="space-y-1">
                    {currentMatch.reasonsForMatch.map((reason, index) => (
                      <li key={index} className="text-sm text-purple-700 flex items-center">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-8 mt-6">
            <button
              onClick={() => handleAction('pass')}
              className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
            >
              <X className="w-6 h-6 text-gray-500 group-hover:text-red-500" />
            </button>
            <button
              onClick={() => handleAction('like')}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}