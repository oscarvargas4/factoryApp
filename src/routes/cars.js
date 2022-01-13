const express = require('express');
const router = express.Router();
const sequelize = require('../database/db');
const Car = require('../models/Car');

router.get('/', async (req, res) => {
  const newUser = await Car.create({
    brand: 'toyota',
    prodTime: 5,
  });

  res.send({ newUser });
});

module.exports = router;
