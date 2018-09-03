import {createHash} from "crypto";
import config from "config";
import Logger from 'bunyan';

export const logger = Logger.createLogger({name: config.get('logger.name')});

logger.addSerializers({
    err: (err) => {
        const msg = Logger.stdSerializers.err(err);
        if (!!msg.stack) msg.md5 = createHash("md5").update(msg.stack).digest("hex");

        return msg;
    }
});
