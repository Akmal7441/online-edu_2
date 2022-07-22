const { Router } = require("express");
const router = Router();

const Card = require("../model/card");
const Lesson = require("../model/lesson");

// Get home page
router.get("/", async (req, res) => {
  const { price, items } = await Card.find();
  res.render("card", {
    title: "Shopping card",
    isCard: true,
    total: price,
    items,
  });
});

router.post("/add", async (req, res) => {
  //   const lessons = await Card.add(req.body.id);
  const lesson = await Lesson.findById(req.body.id);
  const cart = new Card({
    name: lesson.name,
    price: lesson.price,
    author: lesson.author,
    year: lesson.year,
    img: lesson.img,
  });

  await cart.save();

  //   if (!lessons) {
  //     return res.status(500).send("Server error");
  //   }

  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.removeById(req.params.id);
  if (!card) {
    // demak qanaqadur oshibka bor
    return res.send("Error");
  }

  res.status(200).send(card);
});

module.exports = router;
