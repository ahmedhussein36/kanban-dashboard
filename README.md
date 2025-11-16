# Kanban Dashboard

A modern, interactive Kanban board application built with Next.js, React, and TypeScript. Manage your tasks with drag-and-drop functionality and real-time updates.

## Features

- 📋 **Kanban Board**: Organize tasks across multiple columns (To Do, In Progress, Done)
- 🎯 **Drag & Drop**: Intuitive drag-and-drop interface using dnd-kit and react-beautiful-dnd
- ➕ **Task Management**: Create, update, and delete tasks easily
- 🔍 **Search**: Find tasks quickly with the search functionality
- 📱 **Responsive Design**: Fully responsive UI using Tailwind CSS
- 🎨 **Modern UI**: Beautiful components built with Radix UI
- 💾 **Data Persistence**: Tasks stored with JSON Server backend
- ⚡ **Real-time Updates**: React Query for efficient data synchronization

## Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **State Management**: Zustand, React Query
- **Drag & Drop**: dnd-kit, react-beautiful-dnd
- **Forms**: React Hook Form
- **Backend API**: JSON Server
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn** (v1.22 or higher)

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd kanban-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp example.env .env.local
```

Edit `.env.local` and set your API URL:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Step 4: Verify Configuration

Ensure your `.env.local` file is properly configured with the correct API endpoint.

## Running the Application

### Option 1: Run Everything Concurrently (Recommended)

Run both the JSON Server and Next.js development server at the same time:

```bash
npm run start:all
```

This command:
- Starts JSON Server on `http://localhost:4000`
- Starts Next.js dev server on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Start JSON Server:**
```bash
npm run json-server
```
The API will be available at `http://localhost:4000`

**Terminal 2 - Start Next.js Dev Server:**
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Option 3: Production Build

Build and start the production version:

```bash
npm run build
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server on port 3000 |
| `npm run build` | Build the Next.js application for production |
| `npm start` | Start the production server |
| `npm run json-server` | Start JSON Server on port 4000 |
| `npm run start:all` | Run JSON Server and Next.js dev server concurrently |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
kanban-dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── board/              # Kanban board components
│   │   ├── KanbanBoard.tsx
│   │   ├── Column.tsx
│   │   └── TaskCard.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   └── ...other UI components
│   ├── TaskDialog.tsx      # Task creation dialog
│   ├── TaskUpdateDialog.tsx # Task update dialog
│   └── ...other components
├── hooks/                  # Custom React hooks
│   ├── useTasks.ts         # Tasks data fetching
│   ├── useKanbanDrag.ts    # Drag & drop logic
│   ├── useDebounce.ts      # Debounce hook
│   └── use-toast.ts        # Toast notifications
├── lib/                    # Utility functions
│   ├── api.ts              # API client
│   └── utils.ts            # Helper functions
├── store/                  # Zustand stores
│   └── useKanbanStore.ts   # Kanban state management
├── types/                  # TypeScript types
│   └── task.ts             # Task type definitions
├── public/                 # Static assets
├── db.json                 # JSON Server database
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.mjs         # Next.js configuration
└── README.md               # Project documentation
```

## Database

The application uses JSON Server for the backend API. The database file is `db.json`:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Example Task",
      "description": "Task description",
      "status": "todo",
      "priority": "high",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Available Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Usage

### Creating a Task

1. Click the **"+ New Task"** button
2. Fill in the task details (title, description, priority)
3. Select a status (To Do, In Progress, Done)
4. Click **Save**

### Updating a Task

1. Click on a task card to open the update dialog
2. Modify the task details
3. Click **Update**

### Deleting a Task

1. Click on a task card
2. Click the **Delete** button
3. Confirm the deletion

### Moving Tasks

Simply drag and drop tasks between columns to change their status.

### Searching Tasks

Use the search box at the top to filter tasks by title or description.

## API Configuration

The application communicates with JSON Server API. Ensure the `NEXT_PUBLIC_API_URL` environment variable is set correctly:

- **Development**: `http://localhost:4000`
- **Production**: Update based on your deployment environment

## Troubleshooting
### Choosing Between `axios.patch` and `axios.put`

- Use `axios.patch` for **local development** with JSON Server. JSON Server supports partial updates, making `PATCH` ideal for modifying specific fields of a task.

- Use `axios.put` for **online servers** or **mock APIs** like MockAPI.io. These services often expect a full object replacement when using `PUT`.

### Example Usage

#### Local Server (`PATCH`):
```typescript
await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
  title: "Updated Title"
});
```

#### Online Server (`PUT`):
```typescript
await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
  id: taskId,
  title: "Updated Title",
  description: "Updated Description",
  status: "in-progress",
  priority: "medium",
  createdAt: "2024-01-01T00:00:00Z"
});
```

Ensure the API behavior aligns with the HTTP method you choose.

### Port Already in Use

If port 3000 or 4000 is already in use, you can specify a different port:

```bash
# Change Next.js port (default is 3000)
PORT=3001 npm run dev

# JSON Server uses default port 4000 in the package.json script
```

### API Connection Issues

1. Ensure JSON Server is running: `npm run json-server`
2. Verify the API URL in `.env.local` matches where JSON Server is running
3. Check that port 4000 is not blocked by a firewall

### Build Errors

Clear the build cache and reinstall dependencies:

```bash
rm -r .next node_modules
npm install
npm run build
```

## Development

### Code Style

The project uses ESLint for code quality. Run the linter:

```bash
npm run lint
```

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test your changes with `npm run dev`
4. Commit and push your branch
5. Create a pull request

## Performance Optimization

- **React Query**: Efficient server state management and caching
- **Tailwind CSS**: Optimized CSS with PurgeCSS in production
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Author

**Ahmed Hussein**
- Email: contact.ahmedhussein@gmail.com
- LinkedIn: [ahmed-hussein36](https://linkedin.com/in/ahmed-hussein36)

## License

This project is private and not licensed for external use.

## Support

For issues or questions, please contact the author or create an issue in the repository.

---

**Last Updated**: November 2024
