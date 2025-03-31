const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT tokens
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
// In your server.js
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js app URL
  credentials: true
}));
app.use(express.json());

// MongoDB Connection URI and Database Name
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-change-in-production';

// MongoDB Client
let dbInstance = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined. Check your .env file.");
  }

  // Remove deprecated options
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Get database instance (creates connection if needed)
async function getDb() {
  if (!dbInstance) {
    return await connectToDatabase();
  }
  return dbInstance;
}

// Middleware to validate registration input
function validateRegistration(req, res, next) {
  const { firstName, lastName, phoneNumber, email, password, confirmPassword } = req.body;
  
  if (!firstName || !lastName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Password strength validation
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }
  
  // Continue to the next middleware/route handler
  next();
}

// Registration endpoint
app.post('/api/auth/register', validateRegistration, async (req, res) => {
  try {
    const db = await getDb();
    const { firstName, lastName, phoneNumber, email, password, confirmPassword, role } = req.body;

    const userRole = role || "Customer";


        // Check for valid role (with a default if not provided)
        if (userRole !== "Customer" && userRole !== "Vendor") {
          return res.status(400).json({ error: 'Invalid role selected' });
        }
        
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'ACCOUNT_EXISTS' });
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user
    const newUser = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      role: userRole,
      createdAt: new Date(),
    };
    
    // Insert user into database
    const result = await db.collection('users').insertOne(newUser);
    
    // Generate JWT token
const token = jwt.sign(
  { userId: user._id, email: user.email, role: user.role },  
  JWT_SECRET,
  { expiresIn: '24h' }
);
    
    // Return success with token (don't include password in response)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: 'User registered successfully',
      user: userWithoutPassword,
      token
    });

    // Return success with token
res.json({ 
  message: 'Login successful',
  user: userWithoutPassword,
  accessToken: token  // Rename to match what your frontend expects
});
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const db = await getDb();
    const { email, password } = req.body;
    
    // Find user by email
    const user = await db.collection('users').findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'ACCOUNT_NOT_FOUND' });
    }
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return success with token (don't include password in response)
    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Authentication middleware for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Example of a protected route
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: req.user.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't return password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Your existing products/services endpoint
app.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const products = await db.collection('products').find().toArray();
    const stores = await db.collection('stores').find().toArray();

    // Fetch products and stores from MongoDB
    const prodLimit = req.query.prodLimit ? parseInt(req.query.prodLimit) : 8;
    const servLimit = req.query.servLimit ? parseInt(req.query.servLimit) : 8;
    const storeLimit = req.query.storeLimit ? parseInt(req.query.storeLimit) : 3;

    // Populate the product store object
    const populatedProducts = products.slice(0, prodLimit).map(product => {
      const store = stores.find(store => store._id.toString() === product.store.toString());
      return {...product, store: store || {}};
    });

    res.json({
      products: populatedProducts,
      services: Array(parseInt(servLimit)).fill().map((_, i) => ({
        id: i + 1,
        name: `Service ${i + 1}`,
        price: Math.floor(Math.random() * 200) + 50,
      })),
      stores: stores.slice(0, storeLimit).map(store => ({
        ...store,
        rating: (Math.random() * 5).toFixed(1),
        business: {
          category: `Category ${Math.floor(Math.random() * 5) + 1}`,
        },
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });