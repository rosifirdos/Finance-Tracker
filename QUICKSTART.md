# Finance Tracker - Quick Start Guide

## 🎯 What You Have Now

✅ **Backend API** (Node.js + Express + Prisma + SQLite)
✅ **Frontend App** (React + Vite + Tailwind CSS)
✅ **Transaction Form** with live API integration

---

## 🚀 How to Run Both Servers

### Terminal 1: Backend
```powershell
cd d:\proyek_desain_web\finance-tracker\backend
npm run dev
```
🌐 Backend runs on: **http://localhost:3001**

### Terminal 2: Frontend
```powershell
cd d:\proyek_desain_web\finance-tracker\frontend
npm run dev
```
🌐 Frontend runs on: **http://localhost:5173**

---

## 🧪 Test the Application

1. **Open your browser:** http://localhost:5173

2. **You'll see a beautiful transaction form:**
   - Toggle between Income/Expense
   - Select a wallet (Cash, Bank, E-Wallet)
   - Choose a category
   - Enter an amount
   - Pick a date
   - Add a note
   - Submit!

3. **Verify it works:**
   - Check the success message
   - See the updated wallet balance
   - Form automatically clears after submission

---

## 📊 View Your Data

### API Endpoints (Test in Browser)

**Dashboard Stats:**
```
http://localhost:3001/api/stats/overview?userId=1
```

**All Transactions:**
```
http://localhost:3001/api/transactions?userId=1
```

**All Wallets:**
```
http://localhost:3001/api/wallets?userId=1
```

**Categories:**
```
http://localhost:3001/api/categories?userId=1
```

---

## 📁 Project Structure

```
finance-tracker/
├── backend/                           ← Node.js API
│   ├── src/
│   │   ├── controllers/              ← Business logic
│   │   ├── routes/                   ← API routes
│   │   └── index.js                  ← Server entry
│   ├── prisma/
│   │   ├── schema.prisma             ← Database schema
│   │   ├── seed.js                   ← Demo data
│   │   └── dev.db                    ← SQLite database
│   ├── API_REFERENCE.md              ← Complete API docs
│   └── README.md
│
└── frontend/                          ← React App
    ├── src/
    │   ├── components/
    │   │   └── AddTransactionForm.jsx ← Main form
    │   ├── App.jsx
    │   └── index.css                  ← Tailwind styles
    ├── SETUP.md                       ← Frontend guide
    └── tailwind.config.js
```

---

## 🎨 Current Features

### ✅ Backend
- Transaction CRUD with automatic balance updates
- Multi-wallet management
- Category system (income/expense)
- Dashboard statistics
- Bulk operation support (for offline sync)

### ✅ Frontend
- Mobile-first responsive design
- Modern gradient UI
- Real-time data from API
- Form validation
- Success/error handling
- Loading states

---

## 💡 Quick Tips

### 1. View Database with Prisma Studio
```powershell
cd backend
npm run db:studio
```
Opens a web interface at http://localhost:5555

### 2. Add More Sample Data
```powershell
cd backend
npm run db:seed
```

### 3. Test API with PowerShell
```powershell
# Get overview
curl http://localhost:3001/api/stats/overview?userId=1

# Create transaction
curl -X POST http://localhost:3001/api/transactions -H "Content-Type: application/json" -d '{\"userId\":1,\"walletId\":1,\"categoryId\":1,\"type\":\"expense\",\"amount\":50,\"date\":\"2026-01-16T10:00:00.000Z\",\"note\":\"Test\"}'
```

---

## 🐛 Troubleshooting

### Backend Not Starting
- Check if port 3001 is already in use
- Run `npm install` in backend folder
- Check `.env` file exists

### Frontend Not Starting
- Check if port 5173 is already in use
- Run `npm install` in frontend folder
- Clear browser cache

### CORS Errors
- Make sure backend is running on port 3001
- Backend already has CORS enabled for all origins

### Transactions Not Saving
- Check browser console (F12) for errors
- Verify backend is running and accessible
- Check Network tab in DevTools

---

## 📖 Documentation

- **Backend API:** `backend/API_REFERENCE.md`
- **Backend Setup:** `backend/README.md`
- **Frontend Setup:** `frontend/SETUP.md`

---

## 🎯 Next Steps to Build

1. **Dashboard Page** - Show balance, charts, recent transactions
2. **Transaction List** - View and filter all transactions
3. **Wallet Management** - Create/edit wallets
4. **Budget Tracking** - Set and monitor spending limits
5. **Dark Mode** - Theme toggle
6. **PWA Features** - Install prompt, offline support
7. **Data Export** - CSV/PDF downloads

---

## 🔥 Currently Running

Your servers should be running:
- ✅ Backend: http://localhost:3001
- ✅ Frontend: http://localhost:5173

**Open http://localhost:5173 in your browser to start using the app!**

---

**Happy coding!** 💻✨
