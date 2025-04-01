const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
// Routes
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);
// Routes
const locationTrackerRoutes = require('./routes/locationTracker.routes');
app.use('/api/location', locationTrackerRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
