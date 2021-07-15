const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("./socketIO");
const compression = require("compression");
const csurf = require("csurf");
const path = require("path");
<<<<<<< HEAD
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const dotenv = require("dotenv");
dotenv.config();
=======
const io = require('socket.io')(http);
>>>>>>> fbc9760b007a28469d4b833d12eeb0d65c8cf610

const port = process.env.PORT;

// #mongoDB
require("./utils/db");

// #Middleware
app.use(compression());
//cors for local react app running
if (port === 5000) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}
app.use(express.json());

// Serve static ressources in production
let staticPath = path.join(__dirname, "../build");
app.use(express.static(staticPath));
let staticUploads = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(staticUploads));

// #Cookie Session
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: false,
  })
);

// #CSRF security for Production

app.use(csurf());
app.use((req, res, next) => {
  res.set("x-frame-options", "DENY");
  res.cookie("mytoken", req.csrfToken());
  res.cookie("session", req.session.token);
  next();
});

// #SocketIO

socketIO(io);

// #Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/users"));
app.use("/api/follow", require("./routes/follow"));
app.use("/api/news", require("./routes/news"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api", require("./routes/index"));
// Serve the build in production
let index = path.join(__dirname, "../build/index.html");
app.get("*", (req, res) => {
  res.sendFile(index);
});

http.listen(port, () => console.log(`Server listening on port ${port}`));
