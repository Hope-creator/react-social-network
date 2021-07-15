const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("-----> mongoDB connected..."))
  .catch((err) =>
    console.log("-----> Error trying to connect to mongoDB: ", err)
  );

mongoose.connection.on(
  "error",
  console.error.bind(console, "-----> mongoDB connection error")
);
