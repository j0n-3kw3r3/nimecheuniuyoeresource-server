const express = require("express");
const Counter = require("../Models/counter");
const router = express.Router();

router.post("/", async (req, res) => {
  const counter = await Counter.findOne();

  if (counter) {
     counter.count++;
    await counter.save();
    res.json({ message: "Counter added successfully" });
  } else {
      await Counter.create({});
  }
});


// Route to get the current count
router.get('/count', async (req, res) => {
  const counter = await Counter.findOne();
  
  if (counter) {
    res.json({ count: counter.count });
  } else {
    res.json({ count: 0 });
  }
});


// Route to reset the counter
router.post('/count/reset', async (req, res) => {
  const counter = await Counter.findOne();
  
  if (counter) {
    counter.count = 0;
    await counter.save();
    res.json({ message: 'Counter reset successfully' });
  } else {
    res.json({ message: 'Counter not found' });
  }
});

module.exports = router;
