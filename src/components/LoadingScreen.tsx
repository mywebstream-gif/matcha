import React from 'react';
import { Heart } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-spin mx-auto" 
               style={{ borderTopColor: 'transparent' }} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading SoulConnect</h2>
        <p className="text-gray-500">Preparing your perfect matches...</p>
      </div>
    </div>
  );
}