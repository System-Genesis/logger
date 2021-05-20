import { createLogger } from 'winston';
import * as winston from 'winston';
import { preProccessLog, initLogger } from '../src/logger';
import iLog from '../src/logger/iLog';
import config from '../src/config';
//initLogger , format, transports
const { logger } = config;

const extraFields: any = { user: 'city@city.com' };
const properLog: iLog = { level: 'info', message: 'got user from city', system: 'karting', service: 'start', extraFields };
const brokenLog: any = { system: 'karting', service: 'start', extraFields };

describe('logger validations', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should return proper log', () => {
        const log = preProccessLog(properLog);
        expect(log.broken).toBe(undefined);
        expect(log.level).toBe('info');
        expect(log.system).toBe('karting');
    });
    it('should return broken log', () => {
        const log = preProccessLog(brokenLog);
        expect(log.extraFields.broken).toBe(true);
        expect(log.message).toBe(undefined);
        expect(log.level).toBe(undefined);
    });
});

describe('logger test', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should create needed amount of loggers', () => {
        jest.spyOn(winston, 'createLogger');
        initLogger();
        expect(createLogger).toBeCalledTimes(logger.levels.length);
    });
});
