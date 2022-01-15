const express = require('express');
const router = express.Router();
const OrdersProductionDay = require('../models/OrdersProductionDay');
const Order = require('../models/Order');
const ProductionDay = require('../models/ProductionDay');
const Car = require('../models/Car');

// GET "/ordersProductionDays" Read
router.get('/', async (req, res) => {
  let ordersProductionDays = await OrdersProductionDay.findAll({});
  if (ordersProductionDays.length === 0) {
    res.status(200).json({ Error: "There isn't any ordersProductionDays" });
  } else {
    // Cleaning quantities = 0
    ordersProductionDays = ordersProductionDays.filter(
      (orderProductionDay) => orderProductionDay.quantity > 0
    );
    res.status(200).json({ ordersProductionDays });
  }
});

// GET "/ordersProductionDays" Read
router.get('/dayToDay', async (req, res) => {
  let ordersProductionDays = await OrdersProductionDay.findAll({});
  if (ordersProductionDays.length === 0) {
    res.status(200).json({ Error: "There isn't any ordersProductionDays" });
  } else {
    // Cleaning quantities = 0
    ordersProductionDays = ordersProductionDays.filter(
      (orderProductionDay) => orderProductionDay.quantity > 0
    );
    // let days = [];

    try {
      let days = await ProductionDay.findAll({
        attributes: ['id', 'dayName'],
        include: [
          {
            model: Order,
            attributes: ['id'],
            include: [
              {
                model: Car,
                attributes: ['brand'],
              },
            ],
          },
        ],
      });

      res.json({ days });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

module.exports = router;
