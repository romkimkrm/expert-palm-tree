const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
const deviceRoutes = require('./routes/deviceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const userRoutes = require('./routes/userRoutes');

// Route Middleware
app.use('/devices', deviceRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('dashboard');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
