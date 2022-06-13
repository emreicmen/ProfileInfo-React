const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://server:12345@cluster0.w4kmp.mongodb.net/user-app?retryWrites=true&w=majority"
);

//Users.js'de oluşturdugumuz tabloyu burada get metodu yazarak cagırmsı olacagız
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.put("/updateUser", async (req, res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const id = req.body.id;
  try {
    await UserModel.findById(id, (error, updatedUser) => {
      updatedUser.name = newName;
      updatedUser.age = newAge;
      updatedUser.save();
    });
  } catch (error) {
    console.log(error);
  }
  res.json("updated");
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

//3050 portunu dınle ve serverı bu portta calıstır
app.listen(3050, () => {
  console.log("Server çalışıyor....");
});
