const express = require("express");
const router = express.Router();
const { register, login } = require("./auth");
const { userAuth, getUsername } = require("../Auth/auth");
router.route("/register").post(register);
router.route("/login").post(login);
const Task = require("../model/task");
router.get("/", userAuth, async (req, res) => {
  const username = getUsername(req.cookies.jwt);
  const tasks = await Task.find({}).where("createdBy", username);
  res.send(tasks);
});
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.send("Logged out.");
});
router.post("/add", async (req, res) => {
  try {
    const name = req.body.name;
    const date = new Date();
    const username = getUsername(req.cookies.jwt);
    if (!name) {
      res.status(400).send("fill all values");
    } else {
      const newTask = new Task({ name, date, createdBy: username });
      const savedTask = await newTask.save();
      res.send(savedTask);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/remove", async (req, res) => {
  try {
    const id = req.body.id;
    const username = getUsername(req.cookies.jwt);
    if (!id) {
      res.status(400).send("fill all values");
    } else {
      const removedTask = await Task.findByIdAndDelete(id);
      res.send(removedTask);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/update", async (req, res) => {
  try {
    const name = req.body.name;
    const username = getUsername(req.cookies.jwt);
    const id = req.body.id;
    const done = req.body.done;
    if (!name || typeof done == "undefined" || !id) {
      res.status(400).send("fill all values");
    } else {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id },
        { done, name }
      );
      res.send(updatedTask);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
