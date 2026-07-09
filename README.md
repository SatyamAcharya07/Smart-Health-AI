# 🏥 Smart Health AI

An AI-powered Health Center & Supply Chain Management System designed to improve the efficiency of Primary Health Centres (PHCs) and Community Health Centres (CHCs) by providing real-time monitoring of medicine inventory, bed availability, and AI-assisted healthcare recommendations.

---

## 📌 Problem Statement

Healthcare centers often face challenges such as:

- Medicine stock shortages
- Poor resource management
- Lack of real-time bed availability
- Manual inventory tracking
- Delayed decision making

Smart Health AI addresses these challenges through an intelligent dashboard that enables healthcare administrators to monitor resources efficiently and make informed decisions.

---

## 🚀 Features

- 📊 Interactive Dashboard
- 💊 Medicine Inventory Management
- 🏥 Bed Availability Monitoring
- 🏢 Health Centre Management
- 🤖 AI-powered Recommendations using Google Gemini
- 📈 Critical Stock Alerts
- 📁 Excel-based Data Seeding
- ☁️ Cloud Deployment (Frontend & Backend)

---

## 🧠 AI Features

Google Gemini AI analyzes healthcare resource information and generates intelligent recommendations for:

- Medicine redistribution
- Resource optimization
- Healthcare management insights

If the Gemini API quota is exceeded, the application gracefully falls back to a predefined response while keeping all other features fully functional.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python

### Database
- Firebase Firestore

### Artificial Intelligence
- Google Gemini API

### Data Processing
- Pandas
- Excel (.xlsx)

### Version Control
- Git
- GitHub

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
Smart-Health-AI
│
├── smart-health-backend
│   ├── app
│   ├── data
│   ├── requirements.txt
│   └── README.md
│
├── smart-health-frontend
│   └── frontend
│       ├── src
│       ├── package.json
│       └── vite.config.js
│
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/SatyamAcharya07/Smart-Health-AI.git
cd Smart-Health-AI
```

---

## Backend Setup

```bash
cd smart-health-backend

python -m venv env

env\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd smart-health-frontend/frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
FIREBASE_KEY_PATH=firebase_key.json
```

> **Note:** Do not upload `.env` or Firebase credentials to GitHub.

---

## Deployment

### Frontend

- Hosted on **Vercel**

### Backend

- Hosted on **Render**

---

## Future Enhancements

- Machine Learning based medicine demand forecasting
- Patient footfall prediction
- Authentication & Role-based Access Control
- Multilingual Support
- SMS/Email Notifications
- District-level Healthcare Analytics
- Advanced AI Decision Support

---

## Demo

### Live Prototype

https://smart-health-ai-delta.vercel.app/

### Backend API

https://smart-health-backend-9wfu.onrender.com/docs

### Demo Video

https://drive.google.com/drive/folders/1g_4ESLntWEhquDG7hCw1RxL-FlE1t1q4

---

## Contributors

- **Satyam Acharya**
- Team Members

---

## License

This project was developed for a Hackathon and is intended for educational and demonstration purposes.
