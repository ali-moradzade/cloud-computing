const amqplib = require('amqplib');
const processAdService = require('../services/processAd.service');

exports.start = async () => {
    try {
        const queue = 'jobs';
        const conn = await amqplib.connect(process.env.CLOUDAMQP_URL);
        console.log('Connected to RabbitMQ ..\n');

        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue);

        await ch1.consume(queue, async (msg) => {
            if (msg !== null) {
                let postId = msg.content.toString();
                const result = await processAdService(postId);
                if (result) {
                    console.log("Ad with id: " + postId + " processed");
                    ch1.ack(msg);
                } else {
                    console.log("Error processing ad with id: " + postId);
                    ch1.reject(msg, true);
                }
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    } catch (e) {
        console.log('Error connecting to RabbitMQ', e);
    }
};

exports.publish = async (postId) => {
    const queue = 'jobs';
    const conn = await amqplib.connect(process.env.CLOUDAMQP_URL);

    const ch2 = await conn.createChannel();
    await ch2.assertQueue(queue);
    await ch2.sendToQueue(queue, Buffer.from(postId));
};
