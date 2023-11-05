export default class Queue {
  constructor(name, redis) {
    this.queueName = name;
    this.redis = redis;
  }

  async add(job) {
    await this.redis.zadd(this.queueName, job.printTime, JSON.stringify(job));
  }

  async process(cb) {
    const jobs = await this.redis.zrangebyscore(
      this.queueName,
      0,
      Date.now(),
      (err, data) => {
        data.length && this.redis.zrem(this.queueName, ...data);
      }
    );

    jobs.map(async jobString => {
      const job = JSON.parse(jobString);

      const set = await this.redis.setnx(job.id, true);

      if (set) {
        cb(job);

        await this.redis.del(job.id)
      } else {
        return;
      }
    });
  }
}
