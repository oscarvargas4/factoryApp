const express = require('express');
const Car = require('../models/Car');
const router = express.Router();
//! const sequelize = require('../database/db');
const Order = require('../models/Order');
const ProductionDay = require('../models/ProductionDay');

// POST "/order": create an order
router.post('/', async (req, res) => {
  if (
    !req.body.clientName ||
    !req.body.desiredDay ||
    !req.body.quantity ||
    !req.body.CarId
  ) {
    res.status(400).json({
      Error:
        'You must provide all required values: clientName, desiredDay, quantity, CarId',
    });
  } else {
    try {
      // Order with client requirements
      //const clientOrder =
      await Order.create({
        clientName: req.body.clientName.toLowerCase(),
        desiredDay: req.body.desiredDay, // by id
        quantity: req.body.quantity,
        CarId: req.body.CarId,
      });

      // Find required Car
      const carRequired = await Car.findOne({
        where: {
          id: req.body.CarId,
        },
      });

      // Hoy many cars can produce on that day
      const desiredDay = await ProductionDay.findOne({
        where: {
          id: req.body.desiredDay,
        },
      });

      const availableTime = desiredDay.hoursLimit - desiredDay.cumulativeHours;

      let availableCarsDesiredDay = Math.floor(
        availableTime / carRequired.prodTime
      );

      if (availableCarsDesiredDay >= req.body.quantity) {
        await desiredDay.update({
          cumulativeHours:
            desiredDay.cumulativeHours +
            req.body.quantity * carRequired.prodTime,
        });
      } else {
        await desiredDay.update({
          cumulativeHours:
            desiredDay.cumulativeHours +
            availableCarsDesiredDay * carRequired.prodTime,
        });

        const pendingCars = req.body.quantity - availableCarsDesiredDay;

        const deliverDay = await ProductionDay.findOne({
          where: {
            id: req.body.desiredDay + 1,
          },
        });

        await deliverDay.update({
          cumulativeHours:
            deliverDay.cumulativeHours + pendingCars * carRequired.prodTime,
        });
      }

      res.status(201).json({ Available: availableCarsDesiredDay });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// GET "/order/:id": read an order by Id
router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ Error: 'please provide an order Id' });
  } else {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ order });
  }
});

module.exports = router;
