# Finance Tracker Backend

A RESTful API backend for the Personal Finance Tracker application, built with Node.js, Express, and Prisma ORM.

## Features

✅ **Transaction Management**
- Full CRUD operations for financial transactions
- Automatic wallet balance updates using database transactions
- Bulk transaction creation for offline sync support
- Transaction filtering by date, wallet, category, and type

✅ **Multi-Wallet Support**
- Create and manage multiple wallets (Cash, Bank, E-Wallet, etc.)
- Track balances separately across wallets
- Colorful icons and customization

✅ **Category Management**
- Pre-seeded income and expense categories
- Create custom categories with icons and colors
- Filter by transaction type

✅ **Dashboard Statistics**
- Total balance across all wallets
- Income vs. Expense tracking
- Cash flow calculations (surplus/deficit)
- Category breakdown for visualizations

✅ **Database**
- SQLite for development (easily upgradable to PostgreSQL)
- Prisma ORM for type-safe database operations
- Complete schema with 6 models supporting all features

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma (v6.1.0)
- **Database:** SQLite
- **Dev Tools:** Nodemon for hot-reload

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Seed script with demo data
│   └── dev.db                 # SQLite database file
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── transactionController.js
│   │   ├── walletController.js
│   │   ├── categoryController.js
│   │   └── statsController.js
│   ├── routes/                # API routes
│   │   ├── transactionRoutes.js
│   │   ├── walletRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── statsRoutes.js
│   └── index.js               # App entry point
├── .env                        # Environment variables
├── package.json
└── API_REFERENCE.md           # Complete API documentation
```

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   ```bash
   npm run db:push
   ```

3. **Seed with demo data:**
   ```bash
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3001`

### Verify Installation

Test the health endpoint:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"ok","message":"Finance Tracker API is running"}
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with nodemon (auto-reload) |
| `npm start` | Start production server |
| `npm run db:push` | Push Prisma schema changes to database |
| `npm run db:seed` | Seed database with demo user and sample data |
| `npm run db:studio` | Open Prisma Studio (visual database editor) |

## Demo Data

After seeding, you'll have:

- **1 Demo User** (ID: 1)
  - Email: demo@finance.app
  - Username: demo

- **3 Wallets**
  - Cash: $500
  - Bank Account: $5,000
  - E-Wallet: $250

- **8 Categories**
  - 5 Expense categories (Food, Transport, Shopping, Bills, Entertainment)
  - 3 Income categories (Salary, Freelance, Investment)

- **5 Sample Transactions** from the past week

## API Documentation

See [API_REFERENCE.md](./API_REFERENCE.md) for complete endpoint documentation, request/response examples, and testing instructions.

### Quick API Examples

**Get all transactions:**
```bash
curl "http://localhost:3001/api/transactions?userId=1"
```

**Create a transaction:**
```bash
curl -X POST http://localhost:3001/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "walletId": 1,
    "categoryId": 1,
    "type": "expense",
    "amount": 25.50,
    "date": "2026-01-16T10:00:00.000Z",
    "note": "Lunch"
  }'
```

**Get dashboard overview:**
```bash
curl "http://localhost:3001/api/stats/overview?userId=1"
```

## Database Schema

### Models

- **User**: User accounts
- **Wallet**: Multiple wallet/account management
- **Category**: Transaction categories (income/expense)
- **Transaction**: Financial transactions with automatic balance updates
- **Budget**: Budget limits per category (schema ready, endpoints pending)
- **RecurringTransaction**: Scheduled recurring transactions (schema ready, endpoints pending)

### Key Features

- Cascade deletes for data integrity
- Automatic timestamp tracking (`createdAt`, `updatedAt`)
- Decimal precision for accurate financial calculations
- Foreign key relationships enforced at database level

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
```

## CORS Configuration

Currently configured to allow all origins for development. Update `src/index.js` for production:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## Database Transactions

All transaction create/update/delete operations use Prisma's `$transaction` API to ensure:
- Atomic operations (all-or-nothing)
- Wallet balance consistency
- Data integrity across related tables

## Troubleshooting

**Port already in use:**
- Change `PORT` in `.env` file
- Or kill the process using port 3001

**Database locked:**
- Close Prisma Studio if open
- Restart the development server

**Prisma Client not generated:**
```bash
npx prisma generate
```

## Future Enhancements

- [ ] Budget endpoints with limit tracking
- [ ] Recurring transaction processing endpoints
- [ ] CSV/PDF export functionality  
- [ ] User authentication (JWT)
- [ ] Transaction search and filters
- [ ] Data analytics endpoints

## License

ISC

---

**Need help?** Check the [API_REFERENCE.md](./API_REFERENCE.md) for detailed endpoint documentation.
