# 🚀 GigGuard AI – Instant Income Protection for Gig Workers

## 💡 Problem Statement

Gig workers (delivery partners, drivers, etc.) depend on daily earnings for their livelihood. However, external disruptions such as heavy rainfall, poor air quality (AQI), and local restrictions can significantly reduce their working hours and income.

Traditional insurance models do not address this real-time income loss, leaving gig workers financially vulnerable.

---

## 💡 Our Solution

GigGuard AI is an **AI-powered parametric insurance platform** designed to protect gig workers from income loss.

Instead of manual claims, our system:
- Monitors real-time conditions (weather, AQI, activity)
- Detects disruptions using predefined thresholds
- Calculates income loss
- Automatically triggers payouts

👉 **No claims. No delays. Instant compensation.**

---

## ⚙️ How It Works

1. User selects a weekly insurance plan  
2. System monitors environmental and activity data  
3. AI calculates risk score and disruption probability  
4. Disruption is detected  
5. Income loss is calculated  
6. Payout is automatically credited

---

## 🤖 AI Features

- Risk Score (Low / Medium / High)  
- Smart Plan Recommendation  
- Disruption Confidence Score  
- Automated Payout System  
- Fraud Detection (duplicate/anomaly detection)  

---

## 👷 User Features

- 📊 Dashboard with Risk Insights  
- 💡 Plan Recommendation  
- 🌧 Live Monitoring (Rain, AQI, Activity)  
- 💰 Automatic Payout Notifications  
- 📈 Income Loss Tracker  
- 📜 Payout History  

---

## 🧑‍💼 Admin Features

- 📊 Analytics Dashboard (Graphs)  
- ⚠️ Disruption Monitoring  
- 🎛 Event Trigger Simulation  
- 🛡 Fraud Detection Insights  
- 📈 Payout Trends & Risk Analysis  

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Deployment:**
  - Frontend → Vercel  
  - Backend → Render  

---

## 🌐 Live Demo

- Frontend: https://policycoder.vercel.app/ 
- Backend: https://gigguard-backend.onrender.com  

---

## 🎥 Demo Video

https://youtu.be/5dXI-GSawjk

---

## 📊 Pitch Deck

https://docs.google.com/presentation/d/12Sen0WyIlth-axrVTLY-EgUP4oFGbaZT/edit?usp=sharing&ouid=111279301489401494620&rtpof=true&sd=true 

---

## ⚙️ How to Run Locally

### Clone Repository
git clone https://github.com/telaprolulasya/Guidewire_PolicyCoders.git
cd Guidewire_PolicyCoders

## ⚙️ Running the Project Locally

## 📦 Backend Setup
cd backend  
npm install  
Create a `.env` file in backend folder and add:
PORT=5000  
MONGO_URI=your_mongodb_connection_string  

Start backend:
node server.js  
Backend runs on: http://localhost:5000  

---

## 💻 Frontend Setup

cd frontend  
npm install  
Create a `.env` file in frontend folder and add:
VITE_API_URL=http://localhost:5000  

Run frontend:
npm run dev  
Frontend runs on: http://localhost:5174

---

## 🔗 API Connection
Make sure frontend uses:
const API = import.meta.env.VITE_API_URL;

---

## ⚠️ Notes
- Start backend before frontend  
- Ensure MongoDB connection is correct  
- Update `.env` values if needed

> “We eliminate the need for claims by enabling automatic, AI-driven payouts for income loss.”
