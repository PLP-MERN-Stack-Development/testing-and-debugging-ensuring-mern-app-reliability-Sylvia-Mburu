const express = require("express");
const Buggy = require("../models/Buggy");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const buggy = await Buggy.create({ title: req.body.title });
    res.status(201).json(buggy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const buggys = await Buggy.find().sort({ createdAt: 1 });
    res.json(buggys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const buggy = await Buggy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!buggy) return res.status(404).json({ message: "Not found" });
    res.json(buggy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const buggy = await Buggy.findByIdAndDelete(req.params.id);
    if (!buggy) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
