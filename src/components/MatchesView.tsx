import React from 'react';
import { Heart, MessageCircle, MapPin } from 'lucide-react';
import { Match } from '../types';

interface MatchesViewProps {
  matches: Match[];
  onStartChat: (matchId: string) => void;
}

export default function MatchesView({ matches, onStartChat }: MatchesViewProps) {
  const likedMatches = matches.filter(match => match.compatibilityScore >= 70);

  return (
    <div className="flex-1 bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Matches</h1>
          <p className="text-gray-600">{likedMatches.length} people liked you back</p>
        </div>

        {likedMatches.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h2>
            <p className="text-gray-500">Start swiping to find your perfect match!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                {/* Photo */}
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={match.user.photos[0]}
                    alt={match.user.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1">
                    <span className="text-sm font-bold">{match.compatibilityScore}%</span>
                  </div>
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                    match.user.isOnline ? 'bg-green-400' : 'bg-gray-400'
                  } border-2 border-white`} />
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {match.user.name}
                      </h3>
                      <p className="text-gray-600">{match.user.age} years old</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">{match.user.location}</span>
                  </div>

                  {/* Shared Interests */}
                  {match.sharedInterests.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Shared interests</p>
                      <div className="flex flex-wrap gap-1">
                        {match.sharedInterests.slice(0, 3).map((interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                        {match.sharedInterests.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{match.sharedInterests.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => onStartChat(match.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Start Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}