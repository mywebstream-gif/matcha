import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import DiscoverView from './components/DiscoverView';
import MatchesView from './components/MatchesView';
import ChatView from './components/ChatView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import { AuthService } from './utils/auth';
import { currentUser, mockUsers } from './data/mockUsers';
import { generateMatches } from './utils/matchingAlgorithm';
import { Match, ChatMessage, AuthUser, AuthState } from './types';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });
  const [activeTab, setActiveTab] = useState('discover');
  const [matches, setMatches] = useState<Match[]>([]);
  const [likedMatches, setLikedMatches] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Array<{
    id: string;
    participant: any;
    messages: ChatMessage[];
    lastMessage?: ChatMessage;
  }>>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing authentication
    const checkAuth = async () => {
      try {
        const user = AuthService.getCurrentUser();
        setAuthState({
          user,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Failed to load user session'
        });
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Generate initial matches only when user is authenticated
    if (authState.user) {
      const generatedMatches = generateMatches(currentUser, mockUsers);
      setMatches(generatedMatches);
    }
  }, [authState.user]);

  const handleSignIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await AuthService.signIn(email, password);
      setAuthState({
        user,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign in failed'
      });
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await AuthService.signUp(email, password, name);
      setAuthState({
        user,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign up failed'
      });
    }
  };

  const handleLogout = () => {
    AuthService.signOut();
    setAuthState({
      user: null,
      isLoading: false,
      error: null
    });
    setActiveTab('discover');
    setLikedMatches([]);
    setConversations([]);
    setActiveConversation(null);
  };

  // Show loading screen while checking authentication
  if (authState.isLoading) {
    return <LoadingScreen />;
  }

  // Show authentication form if user is not signed in
  if (!authState.user) {
    return (
      <AuthForm
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        isLoading={authState.isLoading}
        error={authState.error}
      />
    );
  }

  const handleLike = (matchId: string) => {
    setLikedMatches(prev => [...prev, matchId]);
    
    // Create a conversation for high compatibility matches (70%+)
    const match = matches.find(m => m.id === matchId);
    if (match && match.compatibilityScore >= 70) {
      const conversationId = `conv-${match.user.id}`;
      const existingConv = conversations.find(c => c.id === conversationId);
      
      if (!existingConv) {
        const initialMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: match.user.id,
          content: `Hi ${currentUser.name}! I saw we have a lot in common. How's your day going?`,
          timestamp: new Date().toISOString(),
          read: false
        };

        setConversations(prev => [...prev, {
          id: conversationId,
          participant: match.user,
          messages: [initialMessage],
          lastMessage: initialMessage
        }]);
      }
    }
  };

  const handlePass = (matchId: string) => {
    // In a real app, this would remove the match from the pool
    console.log('Passed on match:', matchId);
  };

  const handleStartChat = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const conversationId = `conv-${match.user.id}`;
      const existingConv = conversations.find(c => c.id === conversationId);
      
      if (!existingConv) {
        setConversations(prev => [...prev, {
          id: conversationId,
          participant: match.user,
          messages: [],
        }]);
      }
      
      setActiveConversation(conversationId);
      setActiveTab('chat');
    }
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      read: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = [...conv.messages, newMessage];
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage
        };
      }
      return conv;
    }));

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more about that.",
        "I love that too! We should definitely talk more about this.",
        "Wow, that sounds amazing! I'd love to hear more.",
        "That's so cool! I've always wanted to try that.",
        "Great question! What made you think of that?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: conversations.find(c => c.id === conversationId)?.participant.id || '',
        content: randomResponse,
        timestamp: new Date().toISOString(),
        read: false
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, responseMessage];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: responseMessage
          };
        }
        return conv;
      }));
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  const handleBackFromChat = () => {
    setActiveConversation(null);
  };

  const handleEditProfile = () => {
    // In a real app, this would open an edit profile modal/page
    console.log('Edit profile');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <DiscoverView
            matches={matches}
            onLike={handleLike}
            onPass={handlePass}
          />
        );
      case 'matches':
        return (
          <MatchesView
            matches={matches}
            onStartChat={handleStartChat}
          />
        );
      case 'chat':
        return (
          <ChatView
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
            onSendMessage={handleSendMessage}
            onBack={handleBackFromChat}
          />
        );
      case 'profile':
        return (
          <ProfileView
            user={currentUser}
            onEditProfile={handleEditProfile}
          />
        );
      case 'settings':
        return (
          <SettingsView
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SoulConnect
            </h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 lg:pb-4">
        {renderActiveView()}
      </main>

      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;