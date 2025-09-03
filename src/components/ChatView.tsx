import React, { useState } from 'react';
import { Send, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { User, ChatMessage } from '../types';

interface ChatViewProps {
  conversations: Array<{
    id: string;
    participant: User;
    messages: ChatMessage[];
    lastMessage?: ChatMessage;
  }>;
  activeConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
  onSendMessage: (conversationId: string, content: string) => void;
  onBack: () => void;
}

export default function ChatView({
  conversations,
  activeConversation,
  onSelectConversation,
  onSendMessage,
  onBack
}: ChatViewProps) {
  const [messageInput, setMessageInput] = useState('');

  const currentConversation = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    onSendMessage(activeConversation, messageInput.trim());
    setMessageInput('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (activeConversation && currentConversation) {
    // Individual Chat View
    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center">
                <img
                  src={currentConversation.participant.photos[0]}
                  alt={currentConversation.participant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">
                    {currentConversation.participant.name}
                  </h3>
                  <p className={`text-sm ${
                    currentConversation.participant.isOnline 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {currentConversation.participant.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Phone size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Video size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === '1' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                  message.senderId === '1'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === '1' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Conversations List
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          </div>

          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h2>
              <p className="text-gray-500">Start chatting with your matches!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className="w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={conversation.participant.photos[0]}
                        alt={conversation.participant.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.participant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {conversation.participant.name}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-sm text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-gray-600 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}