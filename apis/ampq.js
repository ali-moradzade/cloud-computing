// const amqp = require('amqplib/callback_api');
const processAdService = require('../services/processAd.service');
//
// // if the connection is closed or fails to be established at all, we will reconnect
// let amqpConn = null;
//
// function start() {
//     amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function (err, conn) {
//         if (err) {
//             console.error("[AMQP]", err.message);
//             return setTimeout(start, 1000);
//         }
//
//         conn.on("error", function (err) {
//             if (err.message !== "Connection closing") {
//                 console.error("[AMQP] conn error", err.message);
//             }
//         });
//         conn.on("close", function () {
//             console.error("[AMQP] reconnecting");
//             return setTimeout(start, 1000);
//         });
//
//         console.log("[AMQP] connected");
//         amqpConn = conn;
//         whenConnected();
//     });
// }
//
// function whenConnected() {
//     startPublisher();
//     startWorker();
// }
//
// let pubChannel = null;
// let offlinePubQueue = [];
//
// function startPublisher() {
//     amqpConn.createConfirmChannel(function (err, ch) {
//         if (closeOnErr(err))
//             return;
//         ch.on("error", function (err) {
//             console.error("[AMQP] channel error", err.message);
//         });
//         ch.on("close", function () {
//             console.log("[AMQP] channel closed");
//         });
//
//         pubChannel = ch;
//         while (true) {
//             let m = offlinePubQueue.shift();
//             if (!m)
//                 break;
//             publish(m[0], m[1], m[2]);
//         }
//     });
// }
//
// function publish(exchange, routingKey, content) {
//     try {
//         pubChannel.publish(exchange, routingKey, content, {persistent: true}, function (err) {
//             if (err) {
//                 console.error("[AMQP] publish", err);
//                 offlinePubQueue.push([exchange, routingKey, content]);
//                 pubChannel.connection.close();
//             }
//         });
//     } catch (e) {
//         console.error("[AMQP] publish", e.message);
//         offlinePubQueue.push([exchange, routingKey, content]);
//     }
// }
//
// function startWorker() {
//     amqpConn.createChannel(function (err, ch) {
//         if (closeOnErr(err))
//             return;
//
//         ch.on("error", function (err) {
//             console.error("[AMQP] channel error", err.message);
//         });
//
//         ch.on("close", function () {
//             console.log("[AMQP] channel closed");
//         });
//
//         ch.prefetch(10);
//         ch.assertQueue("jobs", {durable: true}, function (err, _ok) {
//             if (closeOnErr(err)) return;
//             ch.consume("jobs", processMsg, {noAck: false});
//             console.log("Worker is started");
//         });
//
//         async function processMsg(msg) {
//              await work(msg, function (ok) {
//                 try {
//                     if (ok) ch.ack(msg); else ch.reject(msg, true);
//                 } catch (e) {
//                     closeOnErr(e);
//                 }
//             });
//         }
//     });
// }
//
// async function work(msg, cb) {
// }
//
// function closeOnErr(err) {
//     if (!err) return false;
//     console.error("[AMQP] error", err);
//     amqpConn.close();
//     return true;
// }
//
// function customPublish(postId) {
//     publish("", "jobs", new Buffer.from(postId));
// }
//
// exports.start = start;
// exports.publish = customPublish;


const amqplib = require('amqplib');
exports.start = async () => {
    try {
        const queue = 'jobs';
        const conn = await amqplib.connect(process.env.CLOUDAMQP_URL);
        console.log('Connected to RabbitMQ');

        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue);

        // Consumer
//     try {
//         cb(true);
//     } catch (error) {
//         console.log("Error processing ad with id: " + postId);
//         console.log(error);
//         cb(false);
//     }
        await ch1.consume(queue, async (msg) => {
            if (msg !== null) {
                let postId = msg.content.toString();
                try {
                    await processAdService(postId);
                    console.log("Ad with id: " + postId + " processed");
                    ch1.ack(msg);
                } catch (error) {
                    console.log("Error processing ad with id: " + postId);
                    console.log(error);
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
