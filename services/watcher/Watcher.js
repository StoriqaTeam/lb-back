import {logger} from "../../logger";

export class Watcher {

    static STATUS_STOPPED = "stopped";
    static STATUS_STARTED = "started";

    timer = null;
    interval;
    status = Watcher.STATUS_STOPPED;
    locked = false;
    logger;

    constructor(interval = 10000) {
        this.interval = interval;
        this.logger = logger;
    }

    start() {
        if (this.status !== Watcher.STATUS_STOPPED) return;

        this.status = Watcher.STATUS_STARTED;
        this.logger.info(`Watcher ${this.getName()} started.`);

        this.timer = setInterval(async () => {
            if (this.status !== Watcher.STATUS_STOPPED) await this.cycle();
        }, this.interval);
    }

    stop() {
        if (this.status !== Watcher.STATUS_STARTED) return;

        this.status = Watcher.STATUS_STOPPED;
        this.logger.info(`Watcher ${this.getName()} stopped.`);

        clearInterval(this.timer);
    }

    getName() {
        return this.constructor.name;
    }

    async cycle() {
        if (this.locked) {
            this.logger.warn("Previous cycle was not completed");
            return;
        }

        this.locked = true;

        try {
            this.logger.info("Running new cycle");
            await this.run();

        } catch (error) {
            this.logger.warn(error, "Unable to complete cycle");

        } finally {
            this.locked = false;
        }
    }

    async run() {
        throw new Error(`Method not implemented: ${this.run.name}`);
    }

}
