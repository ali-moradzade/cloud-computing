import client from 'amqplib'

/**
 * Use closure to cache the connection
 */
const connection = (function () {
    let conn: client.Connection;

    return async function () {
        if (!conn) {
            conn = await client.connect(process.env.CLOUDAMQP_URL || 'amqp://localhost');
        }
        return conn;
    }
})();

export async function publish(uploadId: string) {
    const queue: string = process.env.QUEUE_NAME || 'queue';
    const conn = await connection();

    const ch2 = await conn.createChannel();
    await ch2.assertQueue(queue);

    ch2.sendToQueue(queue, Buffer.from(uploadId));
    console.log(`[x] Sent ${uploadId} to: '${queue}'`);
}
