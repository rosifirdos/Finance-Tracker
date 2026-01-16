# Finance Tracker Backend - API Reference

## Base URL
```
http://localhost:3001/api
```

## Demo Credentials
- **User ID:** 1
- **Email:** demo@finance.app
- **Username:** demo

## Available Wallets (userId=1)
1. Cash (ID: 1) - Balance: $500
2. Bank Account (ID: 2) - Balance: $5000
3. E-Wallet (ID: 3) - Balance: $250

## Available Categories
**Expense Categories:**
1. Food & Dining (ID: 1) 🍔
2. Transportation (ID: 2) 🚗
3. Shopping (ID: 3) 🛍️
4. Bills & Utilities (ID: 4) 📄
5. Entertainment (ID: 5) 🎮

**Income Categories:**
6. Salary (ID: 6) 💰
7. Freelance (ID: 7) 💼
8. Investment (ID: 8) 📈

---

## API Endpoints

### Health Check
```http
GET /api/health
```

### Transactions

#### Get All Transactions
```http
GET /api/transactions?userId=1&startDate=2026-01-01&endDate=2026-01-31
```
**Query Parameters:**
- `userId` (required)
- `walletId` (optional)
- `categoryId` (optional)
- `type` (optional): "income" or "expense"
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

#### Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "userId": 1,
  "walletId": 1,
  "categoryId": 1,
  "type": "expense",
  "amount": 45.50,
  "date": "2026-01-16T10:00:00.000Z",
  "note": "Coffee with friends"
}
```
**Note:** Automatically updates wallet balance!

#### Update Transaction
```http
PUT /api/transactions/:id
Content-Type: application/json

{
  "amount": 50.00,
  "note": "Updated note"
}
```

#### Delete Transaction
```http
DELETE /api/transactions/:id
```

#### Bulk Create (for offline sync)
```http
POST /api/transactions/bulk
Content-Type: application/json

{
  "transactions": [
    {
      "userId": 1,
      "walletId": 1,
      "categoryId": 1,
      "type": "expense",
      "amount": 25.00,
      "date": "2026-01-16T10:00:00.000Z"
    }
  ]
}
```

### Wallets

#### Get All Wallets
```http
GET /api/wallets?userId=1
```

#### Create Wallet
```http
POST /api/wallets
Content-Type: application/json

{
  "userId": 1,
  "name": "Savings Account",
  "type": "bank",
  "balance": 1000,
  "icon": "🏦",
  "color": "#3b82f6"
}
```

#### Update Wallet
```http
PUT /api/wallets/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "color": "#10b981"
}
```

#### Get Wallet Balance
```http
GET /api/wallets/:id/balance
```

### Categories

#### Get All Categories
```http
GET /api/categories?userId=1&type=expense
```

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "userId": 1,
  "name": "Healthcare",
  "type": "expense",
  "icon": "🏥",
  "color": "#06b6d4"
}
```

### Statistics

#### Get Dashboard Overview
```http
GET /api/stats/overview?userId=1&startDate=2026-01-01&endDate=2026-01-31
```
**Returns:**
- Total Balance (all wallets combined)
- Total Income
- Total Expenses
- Cash Flow (income - expenses)
- Cash Flow Status ("surplus" or "deficit")

#### Get Category Breakdown
```http
GET /api/stats/category-breakdown?userId=1&type=expense
```
**Returns:** Array of categories with total spending and transaction count

---

## Testing with cURL

### Create a transaction:
```bash
curl -X POST http://localhost:3001/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "walletId": 1,
    "categoryId": 1,
    "type": "expense",
    "amount": 12.50,
    "date": "2026-01-16T10:00:00.000Z",
    "note": "Test transaction"
  }'
```

### Get overview:
```bash
curl http://localhost:3001/api/stats/overview?userId=1
```

---

## Important Notes

1. **Automatic Balance Updates:** Creating, updating, or deleting transactions automatically adjusts wallet balances using database transactions for data integrity.

2. **Date Format:** All dates should be in ISO 8601 format (e.g., "2026-01-16T10:00:00.000Z")

3. **Decimal Precision:** Amounts support up to 2 decimal places

4. **Cascade Deletes:** Deleting a wallet or category will delete all associated transactions

5. **Database Location:** `backend/prisma/dev.db` (SQLite)

---

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio (database GUI)
