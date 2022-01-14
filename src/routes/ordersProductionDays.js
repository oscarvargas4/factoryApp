const express = require('express');
const router = express.Router();
const OrdersProductionDay = require('../models/OrdersProductionDay');

// GET "/ordersProductionDays" Read
router.get('/', async (req, res) => {
  const ordersProductionDays = await OrdersProductionDay.findAll({}); // ! Warning: When findAll is null
  if (ordersProductionDays.length === 0) {
    res.status(200).json({ Error: "There isn't any ordersProductionDays" });
  } else {
    res.status(200).json({ ordersProductionDays });
  }
});

module.exports = router;
