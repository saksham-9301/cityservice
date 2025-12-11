# Quick Command Reference - City Services Application

## 🚀 Start Application

### Start Backend Server
```bash
cd server
npm start
# Runs on http://localhost:5000
# Auto-restarts on code changes (using nodemon)
```

### Start Frontend Server
```bash
cd frontend
npm run dev
# Runs on http://localhost:5174
# Auto-refreshes on code changes
```

### Seed Service Categories (one-time setup)
```bash
cd server
node seedCategories.js
# Adds 8 sample service categories to database
# Safe to run multiple times (checks for existing data)
```

---

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5174 |
| Backend API | http://localhost:5000/api |
| MongoDB Categories | `GET http://localhost:5000/api/categories` |
| MongoDB Providers | `GET http://localhost:5000/api/providers` |

---

## 🧪 API Testing Commands

### Test Categories Endpoint
```bash
curl http://localhost:5000/api/categories
```

### Test Providers Endpoint
```bash
curl http://localhost:5000/api/providers
```

### Test Provider by Category
```bash
# First get a category ID from the categories endpoint
# Then use it here:
curl http://localhost:5000/api/providers/category/CATEGORY_ID
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "phone": "555-1234",
    "password": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123"
  }'
```

### Test Create Provider (with token)
```bash
# Replace TOKEN with actual JWT token from login response
# Replace CATEGORY_ID with actual category ID

curl -X POST http://localhost:5000/api/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "categoryId": "CATEGORY_ID",
    "price": 65,
    "experience": "10 years experience",
    "description": "Professional service provider",
    "availability": [
      {"day": "Monday", "timeStart": "09:00", "timeEnd": "17:00"}
    ]
  }'
```

---

## 🛠️ Development Commands

### Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd frontend
npm install
```

### Build Frontend for Production
```bash
cd frontend
npm run build
# Creates optimized build in `dist` folder
```

### Run Tests (if configured)
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd frontend
npm test
```

### Code Formatting
```bash
# Format code with prettier
cd frontend
npm run format
```

---

## 🔍 Debugging

### View Backend Logs
```bash
# Terminal where backend is running (npm start)
# All request logs and errors displayed here
```

### View Frontend Logs
```bash
# Browser Console (F12)
# All JavaScript errors and console.log output
```

### View API Response
```bash
# Browser Network Tab (F12 → Network)
# View all API requests and responses
```

### Check LocalStorage
```bash
# Browser Console (F12)
# View JWT token and user data
localStorage.getItem('authToken')
localStorage.getItem('user')
```

### Clear LocalStorage
```bash
# Browser Console (F12)
localStorage.clear()
# Clears login data, must re-login
```

---

## 📊 Database Commands

### Check MongoDB Categories
```javascript
// MongoDB Atlas Console
db.servicecategories.find({})
```

### Check MongoDB Users
```javascript
// MongoDB Atlas Console
db.users.find({})
```

### Check MongoDB Providers
```javascript
// MongoDB Atlas Console
db.serviceproviders.find({})
```

### Count Documents
```javascript
// MongoDB Atlas Console
db.servicecategories.countDocuments({})
db.users.countDocuments({})
db.serviceproviders.countDocuments({})
```

### Delete Collections (careful!)
```javascript
// MongoDB Atlas Console - This deletes all data!
db.servicecategories.deleteMany({})
db.users.deleteMany({})
db.serviceproviders.deleteMany({})
```

---

## 🔐 Security Commands

### Generate New JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Hash Password
```bash
node -e "require('bcryptjs').hash('password123', 10).then(h => console.log(h))"
```

---

## 🚨 Troubleshooting Commands

### Check if Port is in Use
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5174

# Kill process on port
taskkill /PID <PID> /F
```

### Check Node Modules
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Clear npm Cache
```bash
npm cache clean --force
npm install
```

### Check Git Status
```bash
git status
git log --oneline
git diff
```

---

## 📝 File Locations

### Key Backend Files
```
server/
├── index.js              (Main server file)
├── seedCategories.js     (Seed script)
├── package.json          (Dependencies)
├── config/
│   └── connectDB.js      (MongoDB connection)
├── controller/
│   ├── authController.js
│   ├── categoryController.js
│   ├── providerController.js
│   └── bookingController.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── providerRoutes.js
│   └── bookingRoutes.js
└── models/
    ├── User.js
    ├── ServiceCategory.js
    ├── ServiceProvider.js
    └── Booking.js
```

### Key Frontend Files
```
frontend/
├── src/
│   ├── main.jsx          (Entry point)
│   ├── App.jsx           (Routes)
│   ├── App.css
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ServicesWeOffer.jsx
│   │   ├── BookingModal.jsx
│   │   └── ... (other components)
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── BecomeProviderPage.jsx
│   │   ├── ProvidersPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ... (other pages)
│   └── services/
│       ├── apiService.js (API calls)
│       └── authService.js (Auth logic)
├── vite.config.js
├── tailwind.config.js
├── package.json
└── index.html
```

---

## 🔄 Deployment Commands

### Backend Deployment (Heroku example)
```bash
cd server
heroku login
heroku create app-name
git push heroku main
heroku logs --tail
```

### Frontend Deployment (Vercel example)
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts
```

### Environment Variables
```bash
# Backend (.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production

# Frontend (.env)
VITE_API_URL=https://your-api-domain.com/api
```

---

## 📚 Documentation Files

All documentation is in the root directory:
```
c:\Users\MY PC\Desktop\city\
├── FINAL_IMPLEMENTATION_REPORT.md      (This implementation)
├── HOW_TO_ADD_PROVIDERS.md             (User guide)
├── COMPLETE_API_DOCUMENTATION.md       (API reference)
├── TESTING_COMPLETE_WORKFLOW.md        (Testing guide)
├── QUICK_REFERENCE.md                  (API quick ref)
├── README_COMPLETE.md                  (Project overview)
├── VERIFICATION_REPORT.md              (Verification)
└── IMPLEMENTATION_SUMMARY.md           (Summary)
```

---

## ⚡ Quick Workflow

```bash
# 1. Install dependencies (first time only)
cd server && npm install
cd ../frontend && npm install

# 2. Seed database (first time only)
cd ../server && node seedCategories.js

# 3. Start development servers (in 2 terminals)
# Terminal 1
cd server && npm start

# Terminal 2
cd frontend && npm run dev

# 4. Open browser
# http://localhost:5174

# 5. Test workflow
# - Register user
# - Click "Become Provider"
# - Fill form and create profile
# - View yourself in providers list

# 6. When done, stop servers (Ctrl+C in each terminal)
```

---

## 💾 Backup Commands

### Backup MongoDB Atlas
```bash
# Export data
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net" --out ./backup

# Import data
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net" ./backup
```

### Backup Local Files
```bash
# Create backup
tar -czf city-services-backup.tar.gz ./server ./frontend

# Restore backup
tar -xzf city-services-backup.tar.gz
```

---

## 🎯 Important URLs & Credentials

### MongoDB Atlas
- **Database**: Cluster0
- **Connection**: mongodb+srv://sakshamjain_db_user:0000@cluster0.unw8kvr.mongodb.net

### API Base URL (Local)
- **Development**: http://localhost:5000/api

### Frontend (Local)
- **Development**: http://localhost:5174
- **Build Output**: frontend/dist/

---

## 🆘 Emergency Procedures

### Server won't start?
```bash
# Kill hanging processes
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows

# Start fresh
npm install
npm start
```

### Port already in use?
```bash
# Use different port
PORT=5001 npm start  # Backend on 5001
npm run dev -- --port 5175   # Frontend on 5175
```

### Database connection failing?
```bash
# Check MongoDB URI in config/connectDB.js
# Ensure IP is whitelisted in MongoDB Atlas
# Test connection separately
```

### localStorage corrupted?
```bash
# Clear everything
localStorage.clear()
# Refresh browser
# Re-login
```

---

**Last Updated**: December 11, 2025  
**Version**: 1.0.0

