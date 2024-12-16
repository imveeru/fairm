# FAIrm - AI-Powered Farming Assistant

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Setup & Deployment](#setup--deployment)

## Overview

FAIrm is a modern web application providing AI-powered assistance for farming operations, featuring:

- 🌱 Intelligent crop planning
- 📊 Real-time monitoring
- 📅 Task management
- 💬 AI assistance
- 📈 Market insights
- 👤 Profile management

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend Core | React 18, TypeScript, Vite |
| Styling | TailwindCSS, Radix UI |
| State Management | Zustand, React Query |
| Data Visualization | Recharts |
| Calendar | React Big Schedule |
| Backend | FastAPI (Python) |
| Database | Supabase |

## Components

### Layout Components

| Component | Description | Props | Usage |
|-----------|-------------|-------|--------|
| `DashboardLayout` | Main authenticated layout | `children: ReactNode` | Wraps authenticated pages with sidebar |
| `AuthLayout` | Authentication pages layout | `children: ReactNode, title: string` | Wraps login/signup pages |
| `Sidebar` | Navigation sidebar | None | Used in DashboardLayout |
| `Header` | Top navigation bar | None | Used in both layouts |

### Feature Components

| Component | Description | Props | Features |
|-----------|-------------|-------|----------|
| `TaskScheduler` | Calendar interface | None | - Week/Month views<br>- Drag-drop tasks<br>- Resource allocation |
| `AISummary` | AI insights display | `summary: string` | - Markdown rendering<br>- Gradient background |
| `TagInput` | Multi-value input | `value: string[], onChange: Function, placeholder: string` | - Comma separation<br>- Tag deletion |

### Form Components

| Component | Description | Props | Validation |
|-----------|-------------|-------|------------|
| `AuthForm` | Authentication form | `type: 'login' \| 'signup'` | Email & password |
| `OnboardingForm` | User onboarding | None | Multi-step validation |
| `ProfileForm` | Profile editing | `profile: UserProfile` | All fields required |

## Pages

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| Landing | `/` | Public landing page | - Hero section<br>- Features<br>- Newsletter |
| Auth | `/auth` | Authentication | - Login<br>- Signup<br>- Password reset |
| Onboarding | `/onboarding` | User onboarding | - Multi-step form<br>- Progress tracking |
| Dashboard | `/dashboard` | Main dashboard | - KPIs<br>- Charts<br>- Recent activities |
| Crop Planner | `/crop-planner` | Crop planning | - AI recommendations<br>- Weather analysis |
| Tasks | `/tasks` | Task management | - Calendar view<br>- Task details |
| Ask AI | `/ask-ai` | AI chat interface | - Real-time chat<br>- Image upload |
| Market Hub | `/market` | Market insights | - Price forecasting<br>- Logistics |
| Profile | `/profile` | User profile | - Profile details<br>- Farm statistics |

## API Routes

### Authentication Routes

| Endpoint | Method | Request | Response |
|----------|--------|----------|----------|
| `/auth/login` | POST | `{ email: string, password: string }` | `{ user: User, token: string }` |
| `/auth/signup` | POST | `{ email: string, password: string }` | `{ user: User, token: string }` |
| `/auth/logout` | POST | None | `{ success: boolean }` |

### Weather API

| Endpoint | Method | Parameters | Response |
|----------|--------|------------|----------|
| `/api/weather/{location_id}` | GET | `location_id: string` | `{ temperature: number, humidity: number, forecast: Array }` |

### Soil Data API

| Endpoint | Method | Parameters | Response |
|----------|--------|------------|----------|
| `/api/soil/{farm_id}` | GET | `farm_id: string` | `{ moisture: number[], ph: number, nutrients: Object }` |

### Market Data API

| Endpoint | Method | Parameters | Response |
|----------|--------|------------|----------|
| `/api/market/prices` | GET | None | `{ crop_prices: Object, demand_forecast: Object }` |

### AI Chat API

| Endpoint | Method | Request | Response |
|----------|--------|----------|----------|
| `/api/ai/chat` | POST | `{ message: string }` | `{ response: string, suggestions: string[] }` |

## State Management

### Zustand Stores

| Store | Purpose | Key States |
|-------|---------|------------|
| `authStore` | Authentication state | `user, isAuthenticated` |
| `onboardingStore` | Onboarding progress | `currentStep, data, isComplete` |
| `profileStore` | User profile data | `profile, isLoading, error` |
| `configStore` | App configuration | `isTestMode` |

### React Query Keys

| Query Key | Purpose | Invalidation Triggers |
|-----------|---------|----------------------|
| `['profile', email]` | User profile data | Profile updates |
| `['weather']` | Weather data | Every 30 minutes |
| `['soil']` | Soil data | Daily |
| `['market']` | Market prices | Hourly |

## Setup & Deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Deployment Steps

#### Frontend (GitHub Pages)

1. Configure base URL in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/fairm/',
  // ... other config
});
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

#### Backend (Render.com)

1. Environment setup:
   - Set Python version to 3.9
   - Configure Supabase credentials

2. Build command:
```bash
pip install -r requirements.txt
```

3. Start command:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Database Schema (Supabase)

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  location TEXT,
  climate JSONB,
  soil JSONB,
  equipment TEXT[],
  machinery TEXT[],
  irrigation_systems TEXT[],
  resource_constraints TEXT[],
  financial_capacity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.