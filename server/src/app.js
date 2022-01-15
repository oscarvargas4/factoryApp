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
app.use('/predefineValues', require('./routes/predefineValues'));
app.use('/cars', require('./routes/cars'));
app.use('/order', require('./routes/orders'));
app.use('/productionDays', require('./routes/productionDays'));
app.use('/ordersProductionDays', require('./routes/ordersProductionDays'));

app.listen(PORT, async function () {
  console.log(`App runining on http://localhost:${PORT}`);

  // Database connection
  //! Force: true -> DROP TABLES
  try {
    await sequelize.sync({ force: false });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection failed', error);
  }
});