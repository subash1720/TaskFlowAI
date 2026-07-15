# TaskFlow AI - Smart Task Management System

TaskFlow AI is a modern, responsive, full-stack task management application built using **Angular (v21)**, **Node.js/Express**, and **MongoDB**. 

It features an intelligent **AI Smart Task Assistant** simulation that automatically analyzes task titles to generate custom action items (subtasks), estimate effort, recommend priority levels, and classify categories, complete with a dark-themed glassmorphism user interface.

---

## 🚀 Key Features

1. **Secure Authentication**: User registration and login utilizing JWT tokens, protected routes (`authGuard` and `guestGuard`), and dynamic navigation bars.
2. **Complete Task CRUD**: Interactive interface to create, read, update, and delete tasks.
3. **✨ AI Smart Assistant**: A special AI analysis panel that parses task titles to automatically generate subtasks, recommend priority levels, classify tasks, and estimate project hours.
4. **Interactive Dashboard**: Overview statistics (Total, Pending, In Progress, Completed, High Priority counts), a task completion progress bar, and quick status toggle controls.
5. **Advanced Task Manager**: Complete text search, sorting (creation date, due date, priority, alphabetical), and category/priority filters.
6. **Premium Aesthetics**: Fully responsive glassmorphism dark-themed design built using custom CSS, Google Fonts (Outfit), and Material 3 variables.

---

## 🛠️ Tech Stack

- **Frontend**: Angular (Standalone Components, Routing, Form Modules, HttpClient, Angular Material 3)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas cloud cluster configuration)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## 💻 Setup & Running Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   A MongoDB connection string is pre-configured in `backend/.env` pointing to a cloud Atlas cluster:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=TaskFlowSuperSecretKey2026
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will start running on **`http://localhost:5000`**.

### 2. Frontend Application Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/taskflow-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular dev server:
   ```bash
   npm run start
   ```
   Open **`http://localhost:4200`** in your browser to view the application.

---

## 🤖 AI Integration & Development Workflow

### AI Tools Used
- **Antigravity (Gemini)**: An agentic coding assistant used to pair-program, explore the codebase, generate boilerplate, write components, design modern CSS, and refactor code.

### Where AI Helped
- **Formulating the AI Smart Endpoint**: Implementing the mock AI classifier on the backend which scans task titles for key terms (e.g., "urgent", "bug", "design") to return simulated suggestions.
- **Material 3 Integration**: Constructing custom overrides for Angular Material 3 elements globally in `styles.css` using system variables (such as `--mat-sys-primary` and `--mat-sys-surface`) to quickly convert the application to dark mode.
- **Form Layouts**: Writing responsive grid systems to place form controls and the interactive AI Panel side-by-side.

### What was Implemented Manually (Intern Role)
- **Error Resolution & Refactoring**: Discovered and resolved strict-null template type-checking compilation failures by refactoring complex inline template comparisons into a clean component helper (`isOverdue`).
- **State Management Refined**: Managed state duplication and dates parsing issues in the Task Form component to ensure dates are correctly formatted inside HTML5 date controls.
- **Git Commit Workflow**: Staging, structuring, and executing commits sequentially for transparent version control.

---

## ⚠️ Challenges Faced & Solutions

### 1. Angular template strict null check
- **Problem**: Comparing the result of Angular's `date` pipe using comparative operators inside the template (e.g. `(task.dueDate | date) < today`) triggered compiler error `TS2531: Object is possibly 'null'`.
- **Solution**: Moved comparison logic into a component helper method `isOverdue(task: any): boolean`. This sanitizes the values in TypeScript, clears time markers, and outputs a simple boolean indicator for the CSS class.

### 2. Angular Material 3 Dark-mode Styling overrides
- **Problem**: Overriding individual Material 3 elements' styles can be tedious and prone to breaking.
- **Solution**: Targeted Material 3 system-level CSS variables on the global `body` tag (e.g., `--mat-sys-surface` for cards/popups, and `--mat-sys-outline` for borders) to establish a clean and robust dark theme.

---

## 🔮 Future Improvements (With More Time)

1. **Real LLM Integration**: Connect the backend `/api/ai/analyze` route to Google Gemini Developer API or OpenAI to provide real, generative description extensions and subtasks.
2. **Drag-and-Drop KanBan Board**: Implement Angular CDK Drag-and-Drop to allow users to visually drag cards between Pending, In Progress, and Completed columns.
3. **Collaboration Features**: Support multi-user workspaces where tasks can be assigned to other team members with automated email notifications.
4. **Enhanced Analytics**: Add visual charts (using Chart.js or ng2-charts) on the dashboard to track task completion trends over time.
