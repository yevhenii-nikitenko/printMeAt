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
      Date.now()
    );

    jobs.map(job => cb(JSON.parse(job)));

    jobs.length && await this.redis.zrem(this.queueName, ...jobs);
  }
}
