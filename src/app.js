const express = require('express');
const app = express();
const sequelize = require('./database/db');
require('./models/associations');

const PORT = process.env.PORT || 3000;

// Middleware for fill the req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Endpoints
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Routes
app.use('/players', require('./routes/players'));
app.use('/cars', require('./routes/cars'));

app.listen(PORT, async function () {
  console.log(`App runining on http://localhost:${PORT}`);

  // Database connection
  //! Force: true -> DROP TABLES
  try {
    await sequelize.sync({ force: true });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection failed', error);
  }
});
