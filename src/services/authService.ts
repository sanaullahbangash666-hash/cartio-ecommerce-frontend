import { User, Role } from '../types';
import { storage, DEMO_USERS } from './storage';

export class AuthService {
  getCurrentUser(): User | null {
    return storage.getCurrentUser();
  }

  setCurrentUser(user: User | null): void {
    storage.setCurrentUser(user);
  }

  loginWithEmail(email: string, password?: string): { success: boolean; user?: User; error?: string } {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail) {
      return { success: false, error: 'Please enter your email address.' };
    }

    if (!trimmedPassword) {
      return { success: false, error: 'Please enter your password to sign in.' };
    }

    const users = storage.getUsers();

    // Find account by primary email or accepted alias
    const found = users.find((u) => {
      const uEmail = u.email.toLowerCase();
      if (uEmail === trimmedEmail) return true;
      if (u.role === 'admin' && (trimmedEmail === 'admin@cartio.com' || trimmedEmail === 'admin@cartio.demo')) return true;
      if (u.role === 'cybersecurity' && (trimmedEmail === 'cyber@cartio.com' || trimmedEmail === 'security@cartio.demo' || trimmedEmail === 'security@cartio.com')) return true;
      if (u.role === 'data_analyst' && (trimmedEmail === 'analyst@cartio.com' || trimmedEmail === 'analyst@cartio.demo')) return true;
      if (u.role === 'customer' && (trimmedEmail === 'customer@cartio.com' || trimmedEmail === 'customer@cartio.demo')) return true;
      return false;
    });

    if (!found) {
      return {
        success: false,
        error: 'No account found with this email. Switch to "Create Account" to register a new customer account.',
      };
    }

    // Expected password lookup
    const expectedPassword = found.password || (
      found.role === 'admin' ? 'admin123' :
      found.role === 'cybersecurity' ? 'cyber123' :
      found.role === 'data_analyst' ? 'analyst123' :
      'customer123'
    );

    const isMatch =
      trimmedPassword === expectedPassword ||
      trimmedPassword.toLowerCase() === expectedPassword.toLowerCase() ||
      (found.role === 'admin' && (trimmedPassword === 'Admin@123' || trimmedPassword === 'admin@123')) ||
      (found.role === 'cybersecurity' && (trimmedPassword === 'Cyber@123' || trimmedPassword === 'cyber@123')) ||
      (found.role === 'data_analyst' && (trimmedPassword === 'Analyst@123' || trimmedPassword === 'analyst@123'));

    if (!isMatch) {
      return {
        success: false,
        error: 'Incorrect password for this account. Please check your password and try again.',
      };
    }

    storage.setCurrentUser(found);
    return { success: true, user: found };
  }

  loginAsDemoRole(role: Role): User {
    const demo = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    storage.setCurrentUser(demo);
    return demo;
  }

  loginWithProvider(provider: 'Google' | 'Facebook' | 'Apple'): User {
    const user: User = {
      id: `user-${provider.toLowerCase()}-${Date.now()}`,
      name: `${provider} Verified User`,
      email: `${provider.toLowerCase()}.user@cartio.com`,
      role: 'customer',
      password: `${provider.toLowerCase()}123`,
      createdAt: new Date().toISOString(),
      avatar: undefined,
    };
    storage.addUser(user);
    storage.setCurrentUser(user);
    return user;
  }

  register(name: string, email: string, password?: string, role: Role = 'customer'): { success: boolean; user?: User; error?: string } {
    const trimmed = email.trim().toLowerCase();
    const users = storage.getUsers();
    if (users.some((u) => u.email.toLowerCase() === trimmed)) {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmed,
      role,
      password: (password || '').trim(),
      createdAt: new Date().toISOString(),
    };
    storage.addUser(newUser);
    storage.setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  logout(): void {
    storage.setCurrentUser(null);
  }

  canAccess(user: User | null, requiredRole: Role): boolean {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admins have elevated supervisor access
    return user.role === requiredRole;
  }
}

export const authService = new AuthService();
