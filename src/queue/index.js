export default class Queue {
  constructor(name, redis) {
    this.queueName = name;
    this.redis = redis;
  }

  async add(job) {
    await this.redis.zadd(this.queueName, job.printTime, JSON.stringify(job));
  }

  async process(cb) {
    const jobData = await this.redis.zrangebyscore(
      this.queueName,
      0,
      Date.now()
    );

    if (jobData?.length) {
      const job = JSON.parse(jobData[0]);

      if (job.printTime <= Date.now()) {
        await cb(job);

        await this.redis.zrem(this.queueName, jobData[0]);
      }
    }
  }
}
