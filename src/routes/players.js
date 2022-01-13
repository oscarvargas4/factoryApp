const express = require("express");
const router = express.Router();
const sequelize = require("../database/db");
const Player = require("../models/Player");
const Game = require("../models/Game");
const { Op } = require("sequelize");

// POST /players: crea un jugador
router.post("/", async (req, res) => {
  if (!req.body.name || req.body.name == "ANONIM") {
    try {
      const anonim = await Player.create({
        name: "ANONIM",
      });

      res.status(201).json(anonim);
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.body.name) {
    try {
      const player = await Player.findOne({ where: { name: req.body.name } });
      if (player) {
        res.status(400).json({ Error: "User already exists" });
      } else {
        const player = await Player.create({
          name: req.body.name,
        });

        res.status(200).json(player);
      }
    } catch (error) {
      if (error.errors[0].message) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(400).send(error);
      }
    }
  }
});

// PUT /players: modifica el nom del jugador
router.put("/", async (req, res) => {
  if (req.body.name && req.body.newName) {
    try {
      const player = await Player.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (!player) {
        res.status(404).json({ Error: "User not found" });
      } else {
        const newName = await Player.findOne({
          where: {
            name: req.body.newName,
          },
        });
        if (!newName) {
          await player.update({ name: req.body.newName });
          res.status(200).json(player);
        } else {
          res.status(400).json({ Error: "User already exists" });
        }
      }
    } catch (error) {
      if (error.errors[0].message) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(400).send(error);
      }
    }
  } else {
    res.status(400).json({
      Error: "You must indicate an username & the new username for update",
    });
  }
});

// POST /players/{id}/games: un jugador específic realitza una tirada
router.post("/:id/games", async (req, res) => {
  // TODO Non-existent user
  try {
    const dice1 = Math.floor(Math.random() * (6 - 1) + 1);
    const dice2 = Math.floor(Math.random() * (6 - 1) + 1);
    const dices = dice1 + dice2;
    let win = 0;

    if (Math.round(dices) == 7) {
      win = 100;
    }

    const game = await Game.create({
      gameResult: dices,
      PlayerId: req.params.id,
      winGame: win,
      diceOne: dice1,
      diceTwo: dice2,
    });

    let winRatePercentageCalc = await Game.findAll({
      attributes: [
        [sequelize.fn("avg", sequelize.col("winGame")), "averageWin"],
      ],
      where: {
        PlayerId: req.params.id,
      },
    });

    winRatePercentageCalc = winRatePercentageCalc[0].get({
      plain: false,
    }).averageWin;

    await Player.update(
      {
        // ! Sequelize wraps all it's return values in a virtual object that contains meta data. If you have an object and you just want the undecorated data values, you can unwrap them
        winRatePercentage: winRatePercentageCalc, // ! unwrapping virtual object https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ game });
  } catch (error) {
    if (error.name == "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ Error: "User id not found" });
    } else {
      res.status(400).send(error);
    }
  }
});

// DELETE /players/{id}/games: elimina les tirades del jugador
router.delete("/:id/games", async (req, res) => {
  // TODO Delete non-existent Player
  try {
    const gamesDeleted = await Game.destroy({
      where: {
        PlayerId: req.params.id,
      },
    });

    res.json({
      Success: `${gamesDeleted} Games deleted for the PlayerId = #${req.params.id}`,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
router.get("/", async (req, res) => {
  try {
    let players = await Player.findAll({
      attributes: ["id", "name", "winRatePercentage"],
    });

    res.json({ players });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read Games with average
router.get("/:id/gamesAvg", async (req, res) => {
  // TODO Non-existent Player
  try {
    let totalValues = await Game.findAll({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("gameResult")), "averageScore"],
      ],
      where: {
        PlayerId: req.params.id,
      },
    });

    res.json(totalValues[0].get({ plain: true })); // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /players/{id}/games: retorna el llistat de jugades per un jugador. // TODO Non existent user
router.get("/:id/games", async (req, res) => {
  try {
    const totalValues = await Game.findAll({
      where: {
        PlayerId: req.params.id,
      },
    });

    res.json({ totalValues }); // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
  } catch (error) {
    res.status(404).send(error);
  }
});

// GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
router.get("/ranking", async (req, res) => {
  try {
    const avgValue = await Game.findAll({
      attributes: [[sequelize.fn("AVG", sequelize.col("winGame")), "avgWin"]],
    });

    res.json({ avgValue });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
router.get("/ranking/loser", async (req, res) => {
  try {
    const minRate = await Player.findAll({
      attributes: [
        [sequelize.fn("MIN", sequelize.col("winRatePercentage")), "loserRate"],
      ],
    });

    let rankingLoser = await Player.findOne({
      where: {
        winRatePercentage: {
          [Op.eq]: minRate[0].dataValues.loserRate,
        },
      },
      raw: true, // ! The main difference when setting raw to true is the absence of virtual setters, getters and a bunch of Sequelize data https://javascript.plainenglish.io/why-you-should-be-cautious-with-sequelize-raw-options-5aaae9fc3ebd
    });

    res.json({ rankingLoser });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
// ! This endpoint is coded without "raw: true" because it was giving null in findOne()
router.get("/ranking/winner", async (req, res) => {
  try {
    const maxRate = await Player.findAll({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("winRatePercentage")), "winnerRate"],
      ],
    });

    let rankingWinner = await Player.findOne({
      where: {
        winRatePercentage: {
          [Op.eq]: maxRate[0].dataValues.winnerRate,
        },
      },
    });

    res.json({ rankingWinner });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
