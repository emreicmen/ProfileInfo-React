const mongoose = require("mongoose");
//burada tabloda olmasını ıstedıgımız ozellıklerı gırıyoruz
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
