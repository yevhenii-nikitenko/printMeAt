import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import printService from "../printAtTimeService/printService.js";

const router = Router();

router.post("/echoAtTime", async (req, res, next) => {
  const printTime = req.body.time || new Date().valueOf();
  const message = req.body.message;

  if (printTime < new Date().valueOf()) {
    return next(new Error("Past time provided"));
  }

  if (!message) {
    return next(new Error("No message provided"));
  }

  const job = {
    message,
    printTime,
    id: uuidv4()
  };

  await printService.schedule(job);

  res.json({
    message: `message will be printed not not before ${new Date(
      job.printTime
    ).toLocaleDateString()} : ${new Date(job.printTime).toLocaleTimeString()}`,
  });
});

export default router;
