# Todo App

A modern todo application with daily goals and productivity tracking. Built with React, TypeScript, and Firebase.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Zustand (state management)
- **UI:** Tailwind CSS v4, shadcn/ui components, Lucide icons
- **Backend:** Firebase Firestore
- **Build Tool:** Vite
- **Code Quality:** ESLint + Prettier

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Get your Firebase config from:
**Firebase Console → Project Settings → General → Your apps → SDK setup and configuration**

Fill in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIRESTORE_COLLECTION=todos
```

### 3. Run development server
```bash
npm run dev
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint check |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |

## ✨ Features

### Core
- ✅ **Add, edit, delete todos** — Manage your tasks with ease
- ✅ **Mark as complete** — Check off tasks when done
- ✅ **Filter** — Quickly find tasks by status or priorities (All / Active / Completed, All / High / Medium / Low)
- ✅ **Search by text** — Search through todo titles and descriptions
- ✅ **Cloud sync** — Your todos are saved to Firebase and sync across devices
- ✅ **Mobile-friendly** — Works great on any screen size

### Smart Productivity
- 🎯 **Daily Goal** — Set a target for how many tasks you want to complete each day. Your goal is saved automatically and persists between sessions
- 📊 **Progress Tracking** — Watch a visual progress bar fill up as you complete tasks
- 📈 **Stats Dashboard** — See your completed tasks, pending tasks, and productivity percentage at a glance
- ⚙️ **Flexible Settings** — Change your daily goal anytime (1-10 tasks) via the settings modal
- 🎨 **Priority Levels** — Assign High, Medium, or Low priority to tasks with color-coded badges

### Data Storage
- 💾 **Todos** — Stored securely in Firebase Firestore
- 🎯 **Daily Goal** — Stored locally in your browser's localStorage

## 📁 Project Structure

```
src/
├── components/          # Shared UI components
│   ├── common/          # Common components
│   │   ├── Filter.tsx
│   │   ├── PriorityFilter.tsx
│   │   ├── Search.tsx
│   │   └── Stats.tsx
│   └── ui/              # shadcn/ui primitives
│       ├── button.tsx
│       ├── dialog.tsx
│       └── input.tsx
├── constants/           # App constants
│   └── index.ts
├── css/                 # Global styles
│   └── index.css
├── features/            # Feature-based modules
│   ├── daily-goals/     # Daily goal feature
│   │   ├── components/
│   │   │   ├── DailyGoal.tsx
│   │   │   └── GoalSettingsModal.tsx
│   │   ├── hooks/
│   │   │   └── useDailyGoal.ts
│   │   ├── store/
│   │   │   └── dailyGoalStore.ts
│   │   └── index.ts
│   └── todos/           # Todos feature
│       ├── components/
│       │   ├── TodoCard.tsx
│       │   ├── TodoListView.tsx
│       │   └── TodoModal.tsx
│       ├── hooks/
│       │   ├── index.ts
│       │   ├── useTodoActions.ts
│       │   ├── useTodoFilters.ts
│       │   ├── useTodoModal.ts
│       │   ├── useTodos.ts
│       │   └── useTodoStats.ts
│       ├── store/
│       │   └── todoStore.tsx
│       └── index.ts
├── lib/                 # Utilities and configs
│   ├── firebase.ts      # Firebase initialization
│   ├── storage.ts       # LocalStorage utilities
│   └── utils.ts         # Helper functions
├── pages/               # Page components
│   └── TodoPage.tsx
├── services/            # API/Backend services
│   └── firebase.ts      # Firebase CRUD operations
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx              # Root component
└── main.tsx             # App entry point
```

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Firestore Database**
4. Get your app credentials from Project Settings
5. Add credentials to `.env`

## 📝 Code Style

- **Indentation:** 4 spaces
- **Quotes:** Single quotes `'`
- **Semicolons:** Required `;`
- **Formatter:** Prettier (auto-formats on save)
- **Width:** Maximum 100 characters

## 🎯 How to Use Daily Goal

1. Open the app — you'll see the Daily Goal widget
2. Default goal is **3 tasks per day**
3. Complete tasks by clicking the checkbox
4. Watch the progress bar fill up
5. Click ⚙️ to change your goal (1-10 tasks)

## 📊 Stats Explained

- **Completed** — Total number of completed tasks
- **Active** — Tasks still pending
- **Productivity** — Percentage of completed vs total tasks
