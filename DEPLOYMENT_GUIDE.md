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

## 3. Deploy to Render (Alternative)
I have added a `render.yaml` file in the root. You can now use **Render Blueprint** for a one-click setup:
1.  Connect your GitHub repo to **Render.com**.
2.  Choose "Blueprint" and it will automatically detect the configuration.
3.  Fill in the environment variables:
    *   `MONGO_URI`
    *   `VITE_API_URL` (Frontend)
    *   `OPENWEATHER_API_KEY` (Python Backend)

---

## 4. Live Testing
Once done, visit your `render.com` or `vercel.app` URL. You can now use the registration and dashboard functions live!
