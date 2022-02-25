'use strict'

const { User } = require("../utils/models/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const testEmail = "Test@test.test"

module.exports.up = function (next) {


  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      const user = User.findOne({ email: testEmail });
      if (user) {
        console.log("User already exists, skip create");
        return
      }

      console.log("-----> mongoDB connected for migration...");
      const newUser = new User({
        name: "Test name",
        email: testEmail,
        password: "$2b$10$07dj4AL7Pj9QHawKLkghWe9Om0BsLF2BKTkrLtvzF7rUc59MjuMEO",
        accepted: true,
        status: "active"
      });

      return newUser.save();
    }).then(() => {
      console.log("User has been created")
    })
    .then(() => next()
    )
    .catch((err) =>
      console.log("-----> Error trying to connect to mongoDB on migration: ", err)
    );

}

module.exports.down = function (next) {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      return User.deleteOne({ email: testEmail, });
    }).then(() => {
      console.log("User has been deleted")
    })
    .then(() => next()
    )
    .catch((err) =>
      console.log("-----> Error trying to connect to mongoDB on migration: ", err)
    );
}
