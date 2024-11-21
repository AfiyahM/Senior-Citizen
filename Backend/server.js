
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const express = require('express'); 
const router = express.Router();   



const feedbackRoutes = require('./routes/feedbackRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userAuthRoutes = require('./routes/UserauthRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {

  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/auth', userAuthRoutes); 
app.use('/api/users', userRoutes); 



// Root route
app.get('/', (res) => res.send('Senior Connect API is running'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
