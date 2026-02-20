# Todo App

A modern todo application built with React, TypeScript, and Firebase.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Zustand (state management)
- **UI:** Tailwind CSS v4, shadcn/ui components, Lucide icons
- **Backend:** Firebase Firestore
- **Build Tool:** Vite
- **Code Quality:** ESLint + Prettier (4 spaces, single quotes, semicolons)

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

- ✅ Add, edit, delete todos
- ✅ Mark todos as complete
- ✅ Real-time sync with Firebase Firestore
- ✅ Smooth animations (slide in/out)
- ✅ Dark mode support
- ✅ Responsive design (mobile-first)
- ✅ Loading states

## 📁 Project Structure

```
src/
├── components/       # UI components (TodoCard, TodoForm, TodoModal)
├── hooks/           # Custom hooks (useTodos)
├── pages/           # Page components (TodoPage)
├── services/        # Firebase service layer
├── store/           # Zustand store
├── lib/             # Utilities and Firebase config
└── index.css        # Global styles and theme
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
