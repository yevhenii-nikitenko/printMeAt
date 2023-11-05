import { Redis } from "ioredis";
import Queue from "../queue/index.js";

const redis = new Redis({
  host: "localhost" || process.env.REDIS_HOST,
  port: 6379 || process.env.REDIS_PORT,
  db: 0 || process.env.REDIS_DB,
});

const queue = new Queue("printQueue", redis);

export class PrintAtTimeService {
  constructor(queue) {
    this.queue = queue;

    setInterval(async () => {
      await this.queue.process(this.print);
    }, 1);
  }

  async schedule(job) {
    await this.queue.add(job);
  }

  print(job) {
    console.log(job.message);
  }
}

export default new PrintAtTimeService(queue);
