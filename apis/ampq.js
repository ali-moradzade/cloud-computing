const amqp = require('amqplib/callback_api');
require('dotenv').config();
const processAd = require('../services/processAd.service');

// if the connection is closed or fails to be established at all, we will reconnect
let amqpConn = null;

function start() {
    amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function (err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }

        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });

        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });

        console.log("[AMQP] connected");
        amqpConn = conn;

        startPublisher();
        startWorker();
    });
}


let pubChannel = null;
let offlinePubQueue = [];

function startPublisher() {
    amqpConn.createConfirmChannel(function (err, ch) {
        if (closeOnErr(err))
            return;

        ch.on("error", function (err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function () {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
            let m = offlinePubQueue.shift();
            if (!m)
                break;
            publish(m[2].toString());
        }
    });
}

function publish(postId) {
    let postIdBuffer = Buffer.from(postId);
    let exchange = "";
    let routingKey = "jobs";

    try {
        pubChannel.publish(exchange, routingKey, postIdBuffer, {persistent: true},
            function (err) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, postIdBuffer]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, postIdBuffer]);
    }
}

function startWorker() {
    amqpConn.createChannel(function (err, ch) {
        if (closeOnErr(err))
            return;

        ch.on("error", function (err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function () {
            console.log("[AMQP] channel closed");
        });
        ch.prefetch(10);
        ch.assertQueue("jobs", {durable: true}, function (err, _ok) {
            if (closeOnErr(err)) return;
            ch.consume("jobs", processMsg, {noAck: false});
            console.log("Worker is started");
        });

        function processMsg(msg) {
            work(msg, function (ok) {
                try {
                    if (ok)
                        ch.ack(msg);
                    else
                        ch.reject(msg, true);
                } catch (e) {
                    closeOnErr(e);
                }
            });
        }
    });
}

function work(msg, cb) {
    const postId = msg.content.toString();

    // Process the received message
    processAd(postId)
        .then(() => {
            cb(true);
        })
        .catch((err) => {
            console.log(err);
            cb(false);
        });
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

exports.start = start;

exports.startWorker = startWorker;

exports.publish = publish;
