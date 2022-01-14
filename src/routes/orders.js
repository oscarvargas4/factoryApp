const express = require('express');
const router = express.Router();
//! const sequelize = require('../database/db');
const Order = require('../models/Order');

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
    const newOrder = await Order.create({
      clientName: req.body.clientName.toLowerCase(),
      desiredDay: req.body.desiredDay,
      quantity: req.body.quantity,
      CarId: req.body.CarId,
    });

    res.status(201).json({ Order: newOrder });
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
