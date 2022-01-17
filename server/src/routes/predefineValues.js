const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const ProductionDay = require('../models/ProductionDay');

// POST "/predefineValues": Set initial car and days values:
router.post('/', async (req, res) => {
  try {
    let cars = await Car.findAll({});
    if (cars.length === 0) {
      await Car.bulkCreate([
        {
          brand: 'toyota',
          prodTime: 4,
        },
        {
          brand: 'ford',
          prodTime: 3,
        },
        {
          brand: 'chevrolet',
          prodTime: 2,
        },
        {
          brand: 'renault',
          prodTime: 1,
        },
      ]);

      // ProductionDays

      await ProductionDay.bulkCreate([
        {
          dayName: 'Monday',
          hoursLimit: 16,
          cumulativeHours: 0,
        },
        {
          dayName: 'Tuesday',
          hoursLimit: 16,
          cumulativeHours: 0,
        },
        {
          dayName: 'Wednesday',
          hoursLimit: 16,
          cumulativeHours: 0,
        },
        {
          dayName: 'Thursday',
          hoursLimit: 16,
          cumulativeHours: 0,
        },
        {
          dayName: 'Friday',
          hoursLimit: 16,
          cumulativeHours: 0,
        },
        {
          dayName: 'Saturday',
          hoursLimit: 4,
          cumulativeHours: 0,
        },
        {
          dayName: 'Sunday',
          hoursLimit: 0,
          cumulativeHours: 0,
        },
      ]);

      res.status(201).json({ msg: 'predefineValues executed successfully' });
    } else {
      res.status(200).json({ msg: 'predefineValues already executed' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
