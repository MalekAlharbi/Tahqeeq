# 🚀 Tahqeeq (تحقيق) - Modern Agile Kanban & Project Management Platform

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-v5-443E38?style=for-the-badge&logo=react&logoColor=white)

**Tahqeeq (تحقيق)** is a sleek, modern, and high-performance Agile Project Management application designed for developers and teams to track tasks, organize categories, and manage sprints step-by-step with an interactive drag-and-drop Kanban interface.

---

## ✨ Features

- 📋 **Interactive Drag & Drop Kanban Board**: Effortlessly drag and drop tasks across customizable categories powered by `@hello-pangea/dnd`.
- ⚡ **Optimistic Updates & Server Caching**: Built with **TanStack React Query v5** for instant UI feedback, automated query invalidation, and background state synchronization.
- 🌍 **Multi-Lingual Localization (i18n)**: Native support for **Arabic (RTL)**, **English (LTR)**, and **Spanish (LTR)** with seamless dynamic language switching.
- 📊 **Analytics Dashboard**: High-level KPI metrics, project statistics, and quick-action shortcuts for active tasks.
- ⚙️ **Profile & User Settings**: Real-time user profile management, persisted session state with **Zustand**, and theme customizations.
- 🔐 **Protected Routes & Layouts**: Secure navigation with authentication wrappers and responsive layouts.
- 🎨 **Modern Design & Typography**: Built with **Tailwind CSS v4**, curated color schemes, Lucide icons, and responsive layouts.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **State Management** | [TanStack React Query v5](https://tanstack.com/query/latest), [Zustand](https://zustand-demo.pmnd.rs/) (Persist) |
| **Styling & Icons** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/) |
| **Drag & Drop** | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) |
| **Localization** | [i18next](https://www.i18next.com/), [react-i18next](https://react.i18next.com/) |
| **Routing & HTTP** | [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/) |

---

## 📁 Project Architecture

```
tahqeeq/
├── public/
│   └── locales/           # Translation JSON files (ar, en, es)
├── src/
│   ├── api/               # Axios instances & API endpoint functions
│   ├── components/        # Reusable UI components
│   │   └── kanban/        # Kanban sub-components (TaskCard, Column, Modals)
│   ├── hooks/             # Custom React Query hooks (useTask, useCategory, useProject, useAuth)
│   ├── layouts/           # Page layouts (MainLayout, DashboardLayout)
│   ├── pages/             # Page components (Dashboard, ProjectKanban, Projects, Settings, Login, Register)
│   ├── routes/            # Protected route wrappers
│   ├── stores/            # Zustand global state stores (authStore)
│   └── types/             # TypeScript type definitions and interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MalekAlharbi/Tahqeeq.git
   cd tahqeeq
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
