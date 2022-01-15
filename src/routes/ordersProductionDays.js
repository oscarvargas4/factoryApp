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

    try {
      let toyotaDays = await ProductionDay.findAll({
        raw: true,
        attributes: ['id', 'dayName'],
        include: [
          {
            model: Order,
            where: { CarId: 1 },
            attributes: ['id', 'CarId'],
            include: [
              {
                model: Car,
                attributes: ['brand'],
              },
            ],
          },
        ],
      });

      let toyotaProgram = {};

      // toyotaProgram[toyotaDays[0].dayName] =
      //   toyotaDays[0]['Orders.OrdersProductionDay.quantity'];

      // toyotaProgram[toyotaDays[1].dayName] =
      //   toyotaDays[0]['Orders.OrdersProductionDay.quantity'];

      // toyotaProgram[toyotaDays[2].dayName] =
      //   toyotaDays[0]['Orders.OrdersProductionDay.quantity'];

      for (let i = 0; i < toyotaDays.length; i++) {
        toyotaProgram[toyotaDays[i].dayName] =
          toyotaDays[0]['Orders.OrdersProductionDay.quantity'];
      }

      console.log(toyotaProgram);

      res.json({ toyotaDays });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

module.exports = router;
