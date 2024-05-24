const amqp = require('amqplib');

// Function to send notifications
const sendNotification = async (notification) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'notifications';
        const msg = process.argv.slice(2).join(' ') || 'Notification message Sender';


        channel.assertExchange(exchange, 'fanout', {
            durable: false
        })

        channel.publish(exchange, '', Buffer.from(msg));

        console.log(" [x] Sent %s", msg);


        setTimeout(() => {
            connection.close();
            process.exit(0)
        }, 500)

    } catch (error) {
        console.error("Error sending notification:", error);
    }
};


export default sendNotification;
