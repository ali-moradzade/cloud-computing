import client from 'amqplib'

export async function publish(fileId: string) {
    const queue: string = process.env.QUEUE_NAME || 'queue';
    const conn = await client.connect(process.env.CLOUDAMQP_URL || 'amqp://localhost');

    const ch2 = await conn.createChannel();
    await ch2.assertQueue(queue);
    ch2.sendToQueue(queue, Buffer.from(fileId));
}
