import { createLogger, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
import config from '../config';
import iLog from './iLog';

const { logger } = config;

const loggers = {};

const initLogger = () => {
    logger.levels.forEach((level: string) => {
        console.log(level);
        let loggerMethod = createMyLogger(level);
        loggers[level] = loggerMethod;
    });
    console.log('logger configured');
};

const createMyLogger = (type) => {
    const logPathResolver = config.env === 'test' ? `../../logsTest/test.log` : `../../logs/${type}/%DATE%-${type}.log`;

    const dailyRotates = new DailyRotateFile({
        filename: path.resolve(__dirname, logPathResolver),
        datePattern: 'DD-MM-YYYY',
        maxSize: '50m',
    });

    const loggerInstance = createLogger({
        format: format.combine(
            format.timestamp({
                format: 'DD-MM-YYYY HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json(),
        ),
        // levels: logger.levels,
        transports: [dailyRotates],
    });

    return loggerInstance;
};

const preProccessLog = (log: iLog) => {
    if (!log.level || !log.message || !log.system || !log.service) {
        console.log('broken log format detected, marking as broken format');
        log.extraFields.broken = true;
    }
    return log;
};

const insertLog = (log: iLog) => {
    const level = logger.levels.includes(log.level) ? log.level : 'info';
    const { message, system, service } = log;
    loggers[level].log({ level, message, system, service, ...log.extraFields });
};

export { preProccessLog, initLogger, insertLog };
