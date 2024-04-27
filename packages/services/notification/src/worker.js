const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 7788;

// RabbitMQ consumer
const receiveNotifications = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'notifications';
        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        const q = await channel.assertQueue('', {
            exclusive: true
        });

        console.log(" [*] Waiting for notifications. To exit press CTRL+C");
        channel.bindQueue(q.queue, exchange, '');

        channel.consume(q.queue, (msg) => {
            const notification = msg.content.toString();
            console.log(" [x] Received notification:", notification);
            io.emit('notification', notification); // Emit notification to all connected clients
        }, {
            noAck: true
        });
    } catch (error) {
        console.error("Error in RabbitMQ consumer:", error);
    }
};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

receiveNotifications();
