const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { createSampleUser } = require('./models/userModel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/comp3123";

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/emp', require('./routes/employeeRoutes'));

app.get('/', (req, res) => {
  res.send("API Running");
});

mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log('MongoDB connected');
    await createSampleUser();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log("DB Error:", err));

