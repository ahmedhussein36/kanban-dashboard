# 🧩 Kanban Task Board — Next.js + Zustand + React Query

A clean, minimal, and fully interactive **Kanban-style To-Do Dashboard** built with **Next.js 15**, **React Query**, and **Zustand**.  
The goal was to keep it simple, fast, and realistic — something you'd actually see in production.

---

## 🚀 Features

✅ **Four Columns Workflow**
> Backlog → In Progress → Review → Done

✅ **Create / Update / Delete** tasks  
✅ **Drag & Drop** support (smooth & animated)  
✅ **Pagination / Infinite Scroll** for long lists  
✅ **Search** tasks by title or description  
✅ **Server-side rendering (SSR)** for fast load & SEO  
✅ **React Query Caching** to reduce API calls  
✅ **Global State Management** with Zustand  
✅ **Form Validation** with XSS protection  
✅ **Mobile-first responsive design** using Tailwind + Shadcn UI  

---

## 🛠️ Tech Stack

### ⚛️ **Next.js 15 (App Router)**
Used as the main framework for server-side rendering and optimized performance.  
It gives us **SSR**, **caching**, and **server components** for faster UI updates.

### 💾 **Zustand**
Super lightweight global state manager.  
It’s simpler than Redux, yet powerful enough for this project — perfect for syncing drag-and-drop changes instantly.

### 🔁 **React Query**
Handles API requests and caching automatically.  
It’s amazing for background refetching and keeping the UI synced with server data.

### 🧱 **Tailwind CSS + Shadcn/UI**
Used for styling and components.  
This combo keeps the UI modern, responsive, and easy to customize without writing tons of CSS.

### 💻 **json-server**
A quick mock REST API used for local development.  
It makes testing CRUD operations easy without setting up a real backend.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/kanban-todo.git
cd kanban-todo
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the mock API (json-server)
Make sure you have json-server installed globally:
```bash
npm install -g json-server
```

Then run it:
```bash
json-server --watch db.json --port 4000
```

> This will start the API on:  
> **http://localhost:4000/tasks**

### 4️⃣ Start the Next.js app
```bash
npm run dev
```

Now open your browser and go to 👉 **http://localhost:3000**

---

## 📁 Folder Structure

```
src/
 ┣ components/         # UI components (TaskCard, Column, FormModal, etc.)
 ┣ hooks/              # Custom hooks (useTasks, usePagination, etc.)
 ┣ store/              # Zustand global state
 ┣ types/              # Centralized TypeScript interfaces
 ┣ utils/              # Helper functions & API utils
 ┣ app/                # Next.js app router (server components)
 ┣ lib/                # React Query client & API config
 ┗ db.json             # Mock data for json-server
```

---

## 💡 Why This Stack?

I picked this setup because it reflects **real-world** frontend development:
- **Next.js** gives server-rendered pages and built-in routing.
- **React Query** removes the pain of manual fetches and caching.
- **Zustand** keeps state handling small and simple.
- **Tailwind + Shadcn** speed up UI building while keeping it clean and modern.
- **json-server** lets us simulate a real API for testing CRUD logic.

It’s clean, fast to set up, and easy to extend later — exactly how a short hiring assessment should be.

---

## 🧠 Notes
- Fully typed with **TypeScript** for better maintainability.
- All inputs are sanitized to prevent **XSS** attacks.
- Written with readability and simplicity in mind — no unnecessary abstractions.
- Designed **mobile-first**, then scaled up for desktop.

---

## ✨ Final Thoughts

This project is focused on **clarity, usability, and performance**.  
It’s small enough to understand quickly, but structured in a way that’s scalable if it grows into a real app.

If you’re reviewing this — I hope it feels like it’s written by a real developer, not an AI 😉
