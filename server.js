require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const winston = require('winston');
const orderRoutes = require("./routes/orders");

// express app
const app = express();

// Configure winston logger
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'server.log' }),
//   ],
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
// });

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // logger.info(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/orders", orderRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
