const express = require('express');
const router = express.Router();
//! const sequelize = require('../database/db');
const ProductionDay = require('../models/ProductionDay');

// GET "/productionDays": read all production days status:
router.get('/', async (req, res) => {
  try {
    const days = await ProductionDay.findAll({});
    res.status(200).json({ days });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
