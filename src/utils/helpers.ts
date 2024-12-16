// Date formatting utilities
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Number formatting utilities
export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// Storage utilities
export const storage = {
  set: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
  get: (key: string) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },
  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },
};

// Validation utilities
export const validators = {
  isEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  isPassword: (password: string): boolean => {
    return password.length >= 8;
  },
};

// Error handling utilities
export const handleError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};