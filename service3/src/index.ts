import {start} from "./apis/ampq";

start().then(() => {
    console.log('RabbitMQ started');
}).catch((err) => {
    console.error('Error starting RabbitMQ', err);
});
