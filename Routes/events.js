const express = require("express");
const router = express.Router();
const Event = require("../Models/Event");

// upoad event
router.post("/upload", async (req, res) => {
  const { image, venue, time, date, title, description } = req.body;

  if (!image || !venue || !time || !date || !title || !description) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  // Function to check if a base64-encoded image is over 1MB
  function isBase64ImageOver1MB(base64String) {
    // Remove the data URI prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

    // Calculate the size in bytes
    const sizeInBytes = Buffer.from(base64Data, "base64").length;

    // Convert bytes to megabytes
    const sizeInMB = sizeInBytes / (1024 * 1024);

    // Check if the size is over 1MB
    return sizeInMB > 1;
  }

  // Check if the image is over 1MB
  if (isBase64ImageOver1MB(image)) {
    console.log("Image is over 1MB");
    return res.status(422).json({ error: "Image is over 1MB" });
  } else {
    console.log("Image is within 1MB limit");
  }

  const data = new Event({
    image: image,
    venue: venue,
    time: time,
    date: date,
    title: title,
    description: description,
  });
  try {
    const savedImage = await data.save();
    return res.status(200).json(savedImage);
  } catch (error) {
    console.log(error);
  }
});

// get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.json({ message: error });
  }
});

// update event
router.put("/update/:id", async (req, res) => {
  // Function to check if a base64-encoded image is over 1MB
  function isBase64ImageOver1MB(base64String) {
    // Remove the data URI prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

    // Calculate the size in bytes
    const sizeInBytes = Buffer.from(base64Data, "base64").length;

    // Convert bytes to megabytes
    const sizeInMB = sizeInBytes / (1024 * 1024);

    // Check if the size is over 1MB
    return sizeInMB > 1;
  }

  try {
    const event = await Event.findById(req.params.id);
    if (req.body.image) {
      const newImage = req.body.image;

      // Check if the image is over 1MB
      if (isBase64ImageOver1MB(newImage)) {
        console.log("Image is over 1MB");
        return res.status(422).json({ error: "Image is over 1MB" });
      } else {
        event.image = newImage;

        console.log("Image is within 1MB limit");
      }
    }
    event.venue = req.body.venue;
    event.time = req.body.time;
    event.date = req.body.date;
    event.title = req.body.title;
    event.description = req.body.description;
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete event
router.delete("/delete/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    await event.deleteOne({ $set: req.body });
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
