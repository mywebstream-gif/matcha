import { AuthUser } from '../types';

// Mock authentication service
export class AuthService {
  private static readonly STORAGE_KEY = 'soulconnect_user';
  
  static async signIn(email: string, password: string): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo account
    if (email === 'demo@soulconnect.com' && password === 'demo123') {
      const user: AuthUser = {
        id: '1',
        email: 'demo@soulconnect.com',
        name: 'Alex Johnson',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    
    // Check if user exists in localStorage (for previously registered users)
    const existingUsers = this.getStoredUsers();
    const user = existingUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Account not found. Please sign up first.');
    }
    
    // In a real app, you'd verify the password hash
    const storedPassword = localStorage.getItem(`password_${email}`);
    if (storedPassword !== password) {
      throw new Error('Invalid password. Please try again.');
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  
  static async signUp(email: string, password: string, name: string): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUsers = this.getStoredUsers();
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }
    
    const user: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    // Store user and password (in a real app, password would be hashed)
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem('soulconnect_users', JSON.stringify(updatedUsers));
    localStorage.setItem(`password_${email}`, password);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    
    return user;
  }
  
  static signOut(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
  
  static getCurrentUser(): AuthUser | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  
  private static getStoredUsers(): AuthUser[] {
    const stored = localStorage.getItem('soulconnect_users');
    return stored ? JSON.parse(stored) : [];
  }
}