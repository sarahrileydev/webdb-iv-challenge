const router = require("express").Router();

const Dishes = require("./dish-model");

router.get("/", (req, res) => {
  Dishes.getDishes()
    .then(dishes => {
      res.status(200).json(dishes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error retrieving the dishes." });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const dishes = await Dishes.getDish(req.params.id);
    if (dishes) {
      res.status(200).json(dishes);
    } else {
      res.status(404).json({ message: "Error retrieving the dish" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the dish" });
  }
});

router.post("/", async (req, res) => {
  const dish = req.body;
  if (dish.name) {
    try {
      const inserted = await Dishes.addDish(dish);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating the dish" });
    }
  } else {
    res.status(400).json({ message: "Please provide name of the dish" });
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;

  if (changes.name) {
    try {
      const updated = await Dishes.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: "The dish does not exist"
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating the dish" });
    }
  } else {
    res.status(400).json({
      message: "Please provide the name of the dish"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dishes = await Dishes.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The dish does not exist"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing the dish" });
  }
});

module.exports = router;
