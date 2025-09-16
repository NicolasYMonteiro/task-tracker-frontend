# 🎯 TaskTracker Frontend

> 📄 Leia esta documentação em [Português 🇧🇷](./README.ptBR.md)

A modern, responsive task management application built with Next.js 15, React 19, and TypeScript. Features beautiful UI components, real-time productivity analytics, and seamless user experience.

## 🏗️ Architecture Overview

This frontend application follows modern React patterns and Next.js best practices:

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Login page
│   │   └── sign-up/       # Registration page
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── profille/      # User profile & analytics
│   │   ├── study/         # Study session page
│   │   └── task/          # Task management
│   ├── (root)/            # Public routes
│   │   └── home/          # Landing page
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── card/             # Card components
│   ├── charts/           # Chart components
│   ├── form/             # Form components
│   ├── modal/            # Modal components
│   └── ui/               # Base UI components
├── actions/              # Server actions
├── lib/                  # Utility libraries
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Styling
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Icons](https://react-icons.github.io/)** - Popular icon sets
- **[Tailwind Animate](https://tailwindcss-animate.vercel.app/)** - Animation utilities

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolvers

### Charts & Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Date-fns](https://date-fns.org/)** - Modern date utility library

### State Management & Data Fetching
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Server-side data mutations
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications (alternative)

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/pack)** - Fast bundler (Next.js 15)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running (see [backend README](../task-tracker-backend/README.md))

### 1. Clone and Install
```bash
git clone https://github.com/NicolasYMonteiro/task-tracker.git
cd task-tracker/task-tracker-frontend
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_BASE_URL="http://localhost:3001"

# App Configuration
NEXT_PUBLIC_APP_NAME="TaskTracker"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📱 Features Overview

### 🔐 Authentication
- **Secure Login/Registration** with JWT tokens
- **Form Validation** with real-time feedback
- **Protected Routes** with middleware
- **Automatic Token Refresh** and logout handling

### 📋 Task Management
- **Create, Edit, Delete** tasks with rich forms
- **Priority Levels** and due date management
- **Task Filtering** by date, status, and priority
- **Drag & Drop** task organization (planned)
- **Bulk Operations** for multiple tasks

### 📊 Analytics & Insights
- **Productivity Charts** with Recharts
- **Daily/Weekly/Monthly** activity tracking
- **Completion Rates** and efficiency metrics
- **Streak Tracking** for motivation
- **Priority Distribution** analysis

### 🎨 User Experience
- **Responsive Design** for all devices
- **Dark/Light Mode** support (planned)
- **Loading States** with skeleton components
- **Toast Notifications** for user feedback
- **Smooth Animations** and transitions

### 📚 Study Session
- **Pomodoro Timer** for focused work
- **Task Integration** with study sessions
- **Notes Taking** during sessions
- **Session History** and statistics

## 🎨 UI Components

### Base Components
```typescript
// Button variants
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Form components
<Input placeholder="Enter text..." />
<Textarea placeholder="Enter description..." />
<Select>
  <SelectItem value="option1">Option 1</SelectItem>
</Select>

// Loading components
<LoadingSpinner size="md" />
<LoadingSkeleton lines={3} />
<LoadingPage title="Loading..." />
```

### Card Components
```typescript
// Task cards
<TaskCard task={task} />
<TaskMinimalist task={task} />

// Statistics cards
<StatCard 
  icon={<FiCheckCircle />}
  title="Completed"
  value={25}
  percentage={80}
/>

// Notes card
<NotesCard />
```

### Chart Components
```typescript
// Productivity charts
<ProductivityCharts data={productivityData} />

// Individual charts
<LineChart data={data} />
<BarChart data={data} />
<PieChart data={data} />
```

## 🔧 Configuration

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['localhost'],
  },
}
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

## 📊 Data Flow

### Server Actions
```typescript
// actions/user/user.actions.ts
'use server'

export async function getUserProfile() {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
```

### Client Components
```typescript
'use client'

import { useEffect, useState } from 'react';
import { getUserProfile } from '@actions/user/user.actions';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, []);

  if (loading) return <LoadingPage />;
  
  return <div>{/* Profile content */}</div>;
}
```

## 🚀 Deployment

### Environment Variables
```env
# Production
NEXT_PUBLIC_BASE_URL="https://api.yourdomain.com"
NEXT_PUBLIC_APP_NAME="TaskTracker"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel --prod
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards
- **ESLint** configuration for code quality
- **Prettier** for code formatting
- **TypeScript** strict mode
- **Conventional Commits** for commit messages
- **Component Documentation** with JSDoc

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nícolas Yan Santos Monteiro**
- GitHub: [@NicolasYMonteiro](https://github.com/NicolasYMonteiro)
- LinkedIn: [Nícolas Monteiro](https://linkedin.com/in/nicolas-monteiro)

---

## 🎯 Roadmap

### Upcoming Features
- [ ] Dark mode support
- [ ] Drag & drop task organization
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Advanced task templates
- [ ] Integration with calendar apps
- [ ] AI-powered task suggestions
- [ ] Team workspaces

### Performance Improvements
- [ ] Service worker for offline support
- [ ] Virtual scrolling for large task lists
- [ ] Image optimization and lazy loading
- [ ] Bundle size optimization
- [ ] CDN integration

### UI/UX Enhancements
- [ ] Micro-interactions and animations
- [ ] Accessibility improvements
- [ ] Keyboard shortcuts
- [ ] Custom themes
- [ ] Advanced filtering options

---

*Built with ❤️ and modern web technologies*
