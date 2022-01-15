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
      let weekSchedule = {};
      let cars = await Car.findAll({ raw: true });

      for (let j = 0; j < cars.length; j++) {
        let toyotaDays = await ProductionDay.findAll({
          raw: true,
          attributes: ['id', 'dayName'],
          include: [
            {
              model: Order,
              where: { CarId: cars[j].id },
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

        let newToyotaDays = toyotaDays.filter((element) => {
          return element['Orders.OrdersProductionDay.quantity'] > 0;
        });

        let toyotaProgram = {};

        for (let i = 0; i < newToyotaDays.length; i++) {
          toyotaProgram[newToyotaDays[i].dayName] =
            newToyotaDays[i]['Orders.OrdersProductionDay.quantity'];
        }

        weekSchedule[cars[j].brand] = toyotaProgram;
      }

      res.json({ weekSchedule });

      // !

      // let toyotaDays = await ProductionDay.findAll({
      //   raw: true,
      //   attributes: ['id', 'dayName'],
      //   include: [
      //     {
      //       model: Order,
      //       where: { CarId: 1 },
      //       attributes: ['id', 'CarId'],
      //       include: [
      //         {
      //           model: Car,
      //           attributes: ['brand'],
      //         },
      //       ],
      //     },
      //   ],
      // });

      // let newToyotaDays = toyotaDays.filter((element) => {
      //   return element['Orders.OrdersProductionDay.quantity'] > 0;
      // });

      // let toyotaProgram = {};

      // for (let i = 0; i < newToyotaDays.length; i++) {
      //   toyotaProgram[newToyotaDays[i].dayName] =
      //     newToyotaDays[i]['Orders.OrdersProductionDay.quantity'];
      // }

      // !
      // console.log(newToyotaDays);

      // res.json({ toyotaProgram });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

module.exports = router;
