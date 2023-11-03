import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import router from "./router/index.js";

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use(async (err, req, res, next) => {
  if (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
});

process.on("uncaughtException", (err) => {
  console.error(err);

  process.exit(1);
});
