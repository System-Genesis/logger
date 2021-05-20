import menash, { ConsumerMessage } from 'menashmq';
import iLog from './logger/iLog';
import { preProccessLog, initLogger, insertLog } from './logger';
import config from './config';

const { rabbit } = config;

const initializeRabbit = async () => {
    console.log('Connecting to Rabbit...');

    await menash.connect(rabbit.uri, rabbit.retryOptions);

    console.log('Rabbit connected');

    const logConsume = (msg: ConsumerMessage) => {
        console.log('Received message: ', msg.getContent());
        const payload: iLog = msg.getContent() as iLog;
        const log = preProccessLog(payload);
        insertLog(log);
        msg.ack();
    };

    // await menash.declareQueue('logger', { durable: true });

    await menash.declareTopology({
        queues: [{ name: 'logger', options: { durable: true } }],
        // exchanges: [{ name: 'feature-exchange', type: 'fanout', options: { durable: true } }],
        // bindings: [{ source: 'feature-exchange', destination: 'feature-queue' }],
        consumers: [{ queueName: 'logger', onMessage: logConsume }],
    });

    console.log('Rabbit initialized');
};

const main = async () => {
    initLogger();
    await initializeRabbit();
};

main().catch((err) => {
    console.log(err);
    console.log('failed starting up, shutting down');
    process.exit(1);
});
