import client from 'amqplib'
import {createJob} from "../services/createJob.service";

export async function start() {
    try {
        const queue: string = process.env.QUEUE_NAME || 'queue';
        const conn = await client.connect(process.env.CLOUDAMQP_URL || 'amqp://localhost');
        console.log('Connected to RabbitMQ ..\n');

        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue);

        await ch1.consume(queue, async (msg) => {
            if (msg !== null) {
                let uploadId = msg.content.toString();
                const result = await createJob(uploadId);

                if (result) {
                    console.log(`Upload with id: ${uploadId} processed`);
                    ch1.ack(msg);
                } else {
                    console.log(`Error processing upload with id: ${uploadId}`);
                    ch1.reject(msg, true);
                }
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    } catch (e) {
        console.log('Error connecting to RabbitMQ', e);
    }
}
