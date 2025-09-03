import React from 'react';
import { Shield, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface SettingsViewProps {
  onLogout: () => void;
}

export default function SettingsView({ onLogout }: SettingsViewProps) {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: Lock, label: 'Privacy Settings', description: 'Control your profile visibility' },
        { icon: Bell, label: 'Notifications', description: 'Manage push notifications' },
        { icon: Shield, label: 'Safety & Security', description: 'Blocking and reporting tools' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', description: 'FAQs and support articles' },
      ]
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white px-6 py-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        {/* Settings Groups */}
        <div className="bg-white">
          {settingsGroups.map((group) => (
            <div key={group.title} className="px-6 py-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{group.title}</h2>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="text-gray-500 mr-4" />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Logout */}
          <div className="px-6 py-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 text-red-600 font-medium transform hover:scale-105"
            >
              <LogOut size={20} className="mr-2" />
              Sign Out
            </button>
          </div>

          {/* App Info */}
          <div className="px-6 py-6 text-center text-gray-500">
            <p className="text-sm">Version 1.0.0</p>
            <p className="text-xs mt-1">© 2024 SoulConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}