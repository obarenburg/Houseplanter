# Houseplanter

## Overview
Houseplanter is a **browser-based plant collection game** where users can **grow, collect, and manage** their own virtual plants. It provides an interactive and educational experience, making plant ownership fun and accessible.

This project is currently hosted at [Houseplanter on Render](https://houseplanter-1.onrender.com/), but you can also run it locally by following the steps below.

---

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Strapi (PostgreSQL Database)
- **Hosting:** Render (for both frontend & backend)
- **APIs:** Perenual API for plant data, Cloudinary for image hosting

---

## Running Houseplanter Locally

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later recommended)
- **npm** (for dependency management)
- **Strapi CLI** (for backend management)

### Clone the Repository
```sh
  git clone https://github.com/your-repo/Houseplanter.git
  cd Houseplanter
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install && npm run build
   ```
3. Run the database migrations:
   ```sh
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run build
   ```

### Accessing the Application
- The **frontend** should now be running at `http://localhost:3000`
- The **backend API (Strapi CMS)** should be available at `http://localhost:1337`

---

## Repository Structure
```
Houseplanter/
│-- backend/        # Strapi CMS backend
│   ├── config/     # Configuration files
│   ├── src/        # API models, controllers, and services
│   ├── database/   # Database settings and migrations
│   ├── public/     # Static assets
│   └── .env        # Environment variables (excluded from repo)
│
│-- frontend/       # React frontend
│   ├── src/        # Main application source code
│   ├── components/ # Reusable UI components
│   ├── pages/      # Page views and routing
│   ├── assets/     # Images and icons
│   └── .env        # Frontend environment variables (excluded from repo)
│
│-- README.md       # Documentation
│-- package.json    # Dependency management
│-- .gitignore      # Files to ignore in Git
```

---

## Future Enhancements
- **Onboarding tutorial for new users**
- **Expanded plant database**
- **Social features for plant sharing**
- **Achievements and daily rewards**
- **Mobile optimization**
