const express = require('express');
const router = express.Router();
//! const sequelize = require('../database/db');
const Car = require('../models/Car');

// POST "/cars": create a car
router.post('/', async (req, res) => {
  if (!req.body.brand || req.body.brand == '') {
    res.status(400).json({ Error: 'Incorrect brand name' });
  } else if (!req.body.prodTime || req.body.prodTime == 0) {
    res.status(400).json({ Error: 'Incorrect prodTime value' });
  } else {
    try {
      const findCar = await Car.findOne({
        where: {
          brand: req.body.brand.toLowerCase(),
        },
      });

      if (findCar === null) {
        const newCar = await Car.create({
          brand: req.body.brand.toLowerCase(),
          prodTime: req.body.prodTime,
        });

        res.status(201).json({ newCar });
      } else {
        res.status(400).json({ Error: 'Brand already exists' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// GET "/cars": read a car by brand name:
router.get('/', async (req, res) => {
  if (!req.body.brand || req.body.brand == '') {
    res
      .status(400)
      .json({ Error: 'Please provide a brand value for the query' });
  } else {
    try {
      const findCar = await Car.findOne({
        where: {
          brand: req.body.brand.toLowerCase(),
        },
      });
      if (findCar === null) {
        res.status(404).json({ Error: 'Car not found' });
      } else {
        res.status(200).json({ findCar });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// GET "/cars": read all cars:
router.get('/all', async (req, res) => {
  try {
    const findCars = await Car.findAll({});
    if (findCars === null) {
      res.status(404).json({ Error: "There isn't any car" });
    } else {
      findCars.forEach((car) => {
        let initialLetter = car.brand[0].toUpperCase();
        car.brand = car.brand.slice(1);
        car.brand = initialLetter + car.brand;
      })
      res.status(200).json({ findCars });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// PUT "/cars/newBrand": update name car
router.put('/newBrand', async (req, res) => {
  if (!req.body.brand) {
    res.status(400).json({ Error: 'Please provide a brand name to update' });
  } else if (!req.body.newBrand) {
    res.status(400).json({
      Error: 'Please provide a new brand name to update',
    });
  } else {
    try {
      const updateCar = await Car.findOne({
        where: {
          brand: req.body.brand.toLowerCase(),
        },
      });

      const findNewName = await Car.findOne({
        where: {
          brand: req.body.newBrand.toLowerCase(),
        },
      });

      if (updateCar === null) {
        res.status(404).json({ Error: 'Car not found' });
      } else if (findNewName) {
        res
          .status(400)
          .json({ Error: 'Brand name already exists, try another brand name' });
      } else {
        await updateCar.update({
          brand: req.body.newBrand.toLowerCase(),
        });

        res.json(updateCar);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// PUT "/cars/newProdTime": update prodTime car
router.put('/newProdTime', async (req, res) => {
  if (!req.body.brand) {
    res.status(400).json({ Error: 'Please provide a brand name to update' });
  } else if (!req.body.newProdTime || req.body.newProdTime === 0) {
    res.status(400).json({
      Error: 'Please provide a production time to update',
    });
  } else {
    try {
      const updateCar = await Car.findOne({
        where: {
          brand: req.body.brand.toLowerCase(),
        },
      });

      if (updateCar === null) {
        res.status(404).json({ Error: 'Car not found' });
      } else {
        await updateCar.update({
          prodTime: req.body.newProdTime,
        });

        res.json(updateCar);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// DELETE "/cars": delete a car
router.delete('/', async (req, res) => {
  try {
    const updateCar = await Car.findOne({
      where: {
        brand: req.body.brand.toLowerCase(),
      },
    });

    if (updateCar === null) {
      res.status(404).json({ Error: 'Car not found' });
    } else {
      await Car.destroy({
        where: {
          brand: req.body.brand,
        },
      });

      res.status(200).json({ msg: 'Car deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
