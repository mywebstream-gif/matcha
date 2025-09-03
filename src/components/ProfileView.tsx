import React from 'react';
import { MapPin, Briefcase, GraduationCap, Heart, Edit, Camera } from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onEditProfile: () => void;
}

export default function ProfileView({ user, onEditProfile }: ProfileViewProps) {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <button
              onClick={onEditProfile}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white -mt-4 rounded-t-2xl p-6">
          {/* Photo Section */}
          <div className="relative mb-6">
            <div className="grid grid-cols-2 gap-4">
              {user.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={`${user.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <Camera size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 text-lg">{user.age} years old</p>
              </div>
              <div className={`flex items-center px-3 py-2 rounded-full ${
                user.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  user.isOnline ? 'bg-green-400' : 'bg-gray-400'
                }`} />
                <span className="text-sm font-medium">
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Quick Details */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin size={20} className="mr-3 text-gray-500" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase size={20} className="mr-3 text-gray-500" />
                <span>{user.occupation}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <GraduationCap size={20} className="mr-3 text-gray-500" />
                <span>{user.education}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Heart size={20} className="mr-3 text-gray-500" />
                <span className="capitalize">Looking for {user.relationshipType} relationships</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">About Me</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">My Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {user.interests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
                  <span className="text-gray-700 font-medium">{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Looking For</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Age range</span>
                <span className="font-medium text-gray-800">
                  {user.preferences.ageRange[0]} - {user.preferences.ageRange[1]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance</span>
                <span className="font-medium text-gray-800">
                  Within {user.preferences.maxDistance} miles
                </span>
              </div>
              <div>
                <span className="text-gray-600">Interested in</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.preferences.interestedIn.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}