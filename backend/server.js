const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - FIXED to allow your frontend port
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection - FIXED
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Handle MongoDB events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Import Routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog API' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blog server running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 BLOG SERVER STARTED');
  console.log('='.repeat(50));
  console.log(` Port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(` CORS: Allowing ports 3000 and 5173`);
  console.log('='.repeat(50));
});