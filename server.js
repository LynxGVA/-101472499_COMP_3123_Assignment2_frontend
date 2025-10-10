const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { User, createSampleUser } = require('./models/userModel'); 

dotenv.config();

const DB_URL = process.env.MONGO_URL || "mongodb+srv://generalgva_db_user:Sv6F0mUEuHZazL0c@101472499comp3123assign.qrl9usp.mongodb.net/?retryWrites=true&w=majority&appName=101472499COMP3123Assignment1";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('MongoDB connected');

    await createSampleUser(); 
  })
  .catch(err => console.log('MongoDB connection error:', err));


const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to COMP3123 - Assignment 1 API</h1>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
