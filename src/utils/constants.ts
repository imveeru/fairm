// Application-wide constants
export const APP_NAME = 'FAIrm';
export const APP_DESCRIPTION = 'AI-Powered Farming Assistant';

// API endpoints
export const API_ENDPOINTS = {
  WEATHER: '/api/weather',
  SOIL: '/api/soil',
  MARKET: '/api/market/prices',
  AI_CHAT: '/api/ai/chat',
};

// Resource levels
export const RESOURCE_LEVELS = ['High', 'Medium', 'Low', 'None'];

// Climate zones
export const CLIMATE_ZONES = [
  'Tropical',
  'Subtropical',
  'Mediterranean',
  'Temperate',
  'Continental',
  'Polar',
];

// Soil types
export const SOIL_TYPES = [
  'Sandy',
  'Clay',
  'Silt',
  'Loam',
  'Sandy Loam',
  'Clay Loam',
  'Silty Clay',
];

// Fertility levels
export const FERTILITY_LEVELS = ['high', 'medium', 'low'];

// Task status
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};