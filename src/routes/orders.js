const express = require('express');
const Car = require('../models/Car');
const router = express.Router();
//! const sequelize = require('../database/db');
const Order = require('../models/Order');
const ProductionDay = require('../models/ProductionDay');
const OrdersProductionDay = require('../models/OrdersProductionDay');

// POST "/order": create an order
router.post('/', async (req, res) => {
  if (!req.body.clientName || !req.body.CarId) {
    res.status(400).json({
      Error:
        'You must provide all required values: clientName, quantity, CarId',
    });
  } else if (req.body.quantity < 1 || req.body.quantity > 10) {
    res.status(400).json({
      Error: 'Product quantity must be between 1 unit and 10 units',
    });
  } else if (req.body.desiredDay < 0 || req.body.desiredDay > 6) {
    res.status(400).json({
      Error: 'Factory does not work on that day',
    });
  } else {
    try {
      // Order with client requirements
      //const clientOrder =
      const newOrder = await Order.create({
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

      let availableTime = desiredDay.hoursLimit - desiredDay.cumulativeHours;

      let availableCarsDesiredDay = Math.floor(
        availableTime / carRequired.prodTime
      );

      let pendingCars = req.body.quantity;

      if (
        availableCarsDesiredDay >= req.body.quantity ||
        (desiredDay.id == 6 &&
          carRequired.prodTime * newOrder.quantity <= availableTime)
      ) {
        await desiredDay.update({
          cumulativeHours:
            desiredDay.cumulativeHours +
            req.body.quantity * carRequired.prodTime,
        });

        await newOrder.update({
          deliverDay: desiredDay.id,
        });

        await OrdersProductionDay.create({
          OrderId: newOrder.id,
          ProductionDayId: desiredDay.id,
          quantity: req.body.quantity,
        });

        pendingCars = pendingCars - req.body.quantity;

        res
          .status(201)
          .json({ Available: 'assigned successfully', order: newOrder });
        // TODO Necesario modificar acceso en este caso
      } else if (
        desiredDay.id == 6 &&
        carRequired.prodTime * newOrder.quantity > availableTime
      ) {
        res.status(400).json({
          Error:
            'No time available at production factory, please try next week',
        });
      } else {
        let availableCars = Math.floor(availableTime / carRequired.prodTime);

        await desiredDay.update({
          cumulativeHours:
            desiredDay.cumulativeHours + availableCars * carRequired.prodTime,
        });

        // ! Estos ceros en quntity puede ser una medida importante para realizar KPIs de rendimiento
        await OrdersProductionDay.create({
          OrderId: newOrder.id,
          ProductionDayId: desiredDay.id,
          quantity: availableCars,
        });

        pendingCars = pendingCars - availableCars;

        let i = 0;

        while (pendingCars > 0) {
          i++;
          let deliverDay = await ProductionDay.findOne({
            where: {
              id: req.body.desiredDay + i,
            },
          });

          // TODO necesario modificar acceso a este caso
          if (deliverDay.id == 6) {
            newOrder.update({
              quantity: newOrder.quantity - pendingCars,
            });
            res.status(400).json({
              Error: `No time available at production factory, please wait until next week for your pending ${pendingCars} units `,
              order: newOrder,
            });

            //!

            if (newOrder.quantity - pendingCars >= 0) {
              await OrdersProductionDay.create({
                OrderId: newOrder.id,
                ProductionDayId: deliverDay.id,
                quantity: newOrder.quantity - pendingCars,
              });
            }

            pendingCars = 0;
          } else {
            availableTime = deliverDay.hoursLimit - deliverDay.cumulativeHours;

            let availableCars = Math.floor(
              availableTime / carRequired.prodTime
            );

            if (availableCars >= pendingCars) {
              await deliverDay.update({
                cumulativeHours:
                  deliverDay.cumulativeHours +
                  pendingCars * carRequired.prodTime,
              });

              await newOrder.update({
                deliverDay: deliverDay.id,
              });

              await OrdersProductionDay.create({
                OrderId: newOrder.id,
                ProductionDayId: deliverDay.id,
                quantity: pendingCars,
              });

              pendingCars = 0;
              res
                .status(201)
                .json({ Available: 'assigned successfully', order: newOrder });
            } else {
              await deliverDay.update({
                cumulativeHours:
                  deliverDay.cumulativeHours +
                  availableCars * carRequired.prodTime,
              });

              pendingCars = pendingCars - availableCars;

              // !
              await OrdersProductionDay.create({
                OrderId: newOrder.id,
                ProductionDayId: deliverDay.id,
                quantity: availableCars,
              });
            }
          }
        }
      }
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
