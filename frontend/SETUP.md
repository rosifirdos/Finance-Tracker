# Finance Tracker Frontend - Setup Instructions

## ✅ Project Created Successfully!

Your React + Vite + Tailwind CSS frontend is ready!

## 🚀 Quick Start

### 1. Navigate to Frontend Directory
```powershell
cd d:\proyek_desain_web\finance-tracker\frontend
```

### 2. Start Development Server
```powershell
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 📦 Installed Dependencies

### Core
- ✅ **React** - UI library
- ✅ **Vite** - Build tool (fast HMR)
- ✅ **Tailwind CSS** - Utility-first CSS framework

### Additional
- ✅ **axios** - HTTP client for API calls
- ✅ **react-router-dom** - Routing (ready for use)

---

## 🎨 Tailwind CSS Configuration

Tailwind is already configured! Here's what was set up:

### 1. `tailwind.config.js`
- Custom color palette for income/expense
- Extended primary colors
- Content paths configured for all JSX/TSX files

### 2. `postcss.config.js`
- Tailwind CSS plugin
- Autoprefixer plugin

### 3. `src/index.css`
- Tailwind directives imported
- Custom scrollbar styles
- CSS variables for theme colors
- Mobile-optimized utilities

---

## 🧩 Component Structure

### `AddTransactionForm.jsx`

Located at: `src/components/AddTransactionForm.jsx`

**Features:**
- ✅ Mobile-first responsive design
- ✅ Type toggle (Income/Expense)
- ✅ Real-time wallet dropdown (fetches from API)
- ✅ Real-time category dropdown (filtered by type)
- ✅ Amount input with validation
- ✅ Date picker (max: today)
- ✅ Optional note textarea
- ✅ Success/Error alerts
- ✅ Loading state with spinner
- ✅ Auto-updates wallet balance after submission

**API Integration:**
- `GET /api/wallets?userId=1` - Fetch wallets
- `GET /api/categories?userId=1&type={income|expense}` - Fetch categories
- `POST /api/transactions` - Create transaction

---

## 🔧 Configuration Details

### API Base URL
Currently set to: `http://localhost:3001/api`

To change, edit in `AddTransactionForm.jsx`:
```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

### Hardcoded User ID
Temporarily hardcoded to `userId: 1` for testing.

Update in `AddTransactionForm.jsx`:
```javascript
const [formData, setFormData] = useState({
  userId: 1, // Change this when auth is added
  ...
});
```

---

## 📱 Mobile-First Design Features

- **Touch-optimized buttons** (min 44px tap targets)
- **Responsive layout** (max-width: 28rem on mobile)
- **Gradient background** for visual appeal
- **Shadow effects** for depth
- **Smooth transitions** on interactions
- **Custom scrollbar** for better UX
- **Safe area insets** for notched devices

---

## 🎨 Color Scheme

### System Colors
- **Primary**: Blue (#3b82f6)
- **Income**: Green (#10b981)
- **Expense**: Red (#ef4444)

### Gradients
- Background: `from-blue-50 to-indigo-100`
- Submit button: `from-blue-500 to-indigo-600`

---

## 🧪 Testing the Form

### 1. Make sure backend is running
```powershell
cd d:\proyek_desain_web\finance-tracker\backend
npm run dev
```

### 2. Start frontend
```powershell
cd d:\proyek_desain_web\finance-tracker\frontend
npm run dev
```

### 3. Open browser
Visit: `http://localhost:5173`

### 4. Test transaction creation
1. Select **Income** or **Expense**
2. Enter an amount (e.g., 100.00)
3. Choose a wallet (Cash, Bank, or E-Wallet)
4. Select a category
5. Pick a date
6. Add a note (optional)
7. Click **Add Transaction**

✅ You should see a success message with the updated wallet balance!

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🐛 Troubleshooting

### CORS Error
If you see CORS errors in the browser console:
- ✅ Backend already has CORS enabled
- Check that backend is running on port 3001
- Verify API_BASE_URL in the component

### API Not Found (404)
- Make sure backend server is running
- Check network tab in browser DevTools
- Verify endpoints match backend routes

### Wallets/Categories Not Loading
- Check browser console for errors
- Verify backend `/api/wallets` and `/api/categories` endpoints are working
- Test with: `curl http://localhost:3001/api/wallets?userId=1`

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── AddTransactionForm.jsx  ← Main form component
│   ├── App.jsx                     ← Root component
│   ├── main.jsx                    ← Entry point
│   └── index.css                   ← Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## 🎯 Next Steps

### Immediate
1. ✅ Test the transaction form
2. Add more components (Dashboard, TransactionList)
3. Implement routing with react-router-dom

### Future Enhancements
- [ ] User authentication
- [ ] Dark mode toggle
- [ ] PWA configuration (manifest + service worker)
- [ ] Transaction history with filters
- [ ] Charts and visualizations
- [ ] Budget tracking
- [ ] Multi-wallet dashboard

---

## 💡 Tips

1. **HMR (Hot Module Replacement)**: Changes to components will reflect immediately without full page reload

2. **Tailwind IntelliSense**: Install the VS Code extension "Tailwind CSS IntelliSense" for autocomplete

3. **Mobile Testing**: Open DevTools → Toggle device toolbar (Ctrl+Shift+M) to test mobile view

4. **API Testing**: Use browser Network tab to inspect API requests/responses

---

**Great work! Your frontend is ready to use!** 🎉

Visit `http://localhost:5173` to see your app in action!
