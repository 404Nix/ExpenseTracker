# 💸 Expense Tracker (MERN + Redux)

A modern, full-stack Expense Tracker built using the MERN stack with Redux for state management. This app helps users track expenses, manage budgets, and visualize spending through analytics.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication

### 💰 Transactions

* Add, delete transactions
* Real-time updates using Redux
* Notes and date tracking

### 🏷️ Categories

* Create & delete categories
* Used for organizing transactions

### 📊 Dashboard

* Monthly analytics
* Budget vs spending insights
* Alerts for 80% and 100% usage
* Interactive charts (Pie + Line)

### 💵 Budget System

* Monthly budget tracking
* Incremental budget updates (adds to existing budget)
* Auto sync with dashboard

### 🎨 UI

* Clean dark (black) theme
* Responsive layout
* Smooth UX with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Recharts (for charts)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📂 Project Structure

```
frontend/
  src/
    components/
    pages/
    features/ (Redux slices)
    app/

backend/
  src/
    models/
    routes/
    controllers/
    middlewares/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd expense-tracker
```

### 2️⃣ Install dependencies

#### Frontend

```
cd frontend
npm install
```

#### Backend

```
cd backend
npm install
```

---

### 3️⃣ Environment Variables

Create `.env` file in backend:

```
MONGODB_URI=
CORS_ORIGIN=*
JWT_SECRET=
JWT_EXPIRY=1d
```

---

### 4️⃣ Run the app

#### Backend

```
npm run dev
```

#### Frontend

```
npm run dev
```

---

## 🔗 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Transactions

* GET `/api/transactions`
* POST `/api/transactions`
* DELETE `/api/transactions/:id`

### Categories

* GET `/api/categories`
* POST `/api/categories`
* DELETE `/api/categories/:id`

### Budget

* PUT `/api/budgets`
* GET `/api/budgets/summary`

### Analytics

* GET `/api/analytics?month=YYYY-MM`

---

## 🧠 Key Concepts Implemented

* Redux for global state management
* Async operations using createAsyncThunk
* Protected routes using JWT
* Aggregation pipelines in MongoDB
* Real-time UI updates without refresh

---

## 📸 Future Improvements

* Animations & micro-interactions
* Export reports (PDF/CSV)
* Yearly analytics
* Mobile optimization

---

## 🏁 Conclusion

This project demonstrates a complete full-stack application with clean architecture, scalable state management, and real-world features like budgeting and analytics.

---

## 👨‍💻 Author

Built with ❤️ by me 🚀
