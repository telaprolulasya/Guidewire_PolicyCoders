# 🚀 Deployment Guide: GigGuard AI to Vercel

This project is set up for easy deployment to **Vercel**. I have already created `vercel.json` files for both the frontend and the backend.

## 1. Prepare your Repository
Make sure all your changes are committed and pushed to GitHub:
```bash
git add .
git commit -m "chore: prepared for vercel deployment"
git push origin main
```

---

## 2. Deploy the Backend (Node.js)
1.  Login to [Vercel](https://vercel.com).
2.  Click **"Add New" > "Project"**.
3.  Import your GitHub repo.
4.  In the Project Settings:
    *   **Project Name:** `gigguard-api`
    *   **Root Directory:** Select `backend`
    *   **Framework Preset:** Other
5.  **Environment Variables:**
    *   Add `MONGO_URI` with your MongoDB connection string.
6.  Click **Deploy**.
7.  **IMPORTANT:** Copy your deployed backend URL (e.g., `https://gigguard-api.vercel.app`).

---

## 3. Deploy the Frontend (React/Vite)
1.  Click **"Add New" > "Project"** again.
2.  Import the same GitHub repo.
3.  In the Project Settings:
    *   **Project Name:** `gigguard-ui`
    *   **Root Directory:** Select `frontend`
    *   **Framework Preset:** Vite
4.  **Environment Variables:**
    *   Add `VITE_API_URL` and paste your **Backend URL** from Step 2.
5.  Click **Deploy**.

---

## 4. Troubleshooting Python Backend
The Python backend (`/backend_python`) is still set up to use SQLite. Vercel's serverless environment is **ReadOnly**, so SQLite database updates will not persist. 

**Recommendation:** For a persistent Python backend, we recommend using **Render.com** or **Railway.app**, or migrating to a cloud database (like MongoDB or PostgreSQL).

---

## 5. Live Testing
Once done, visit your `gigguard-ui.vercel.app` URL. You can now use the registration and dashboard functions live!
