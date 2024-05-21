const amqp = require('amqplib');

const queueName = 'notifications';
const exchangeName = 'notifications';

async function sendNotification(notification) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    const msg = Buffer.from(JSON.stringify(notification)); // Convert notification to JSON buffer

    channel.publish(exchangeName, '', msg);

    console.log(" [x] Sent %s", notification);

    await connection.close(); // Close connection after sending

  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

// You can export the sendNotification function if needed
// module.exports = sendNotification;

(async () => {
  try {
    const notification = { // Replace with your actual notification data
      title: "Your Notification Title",
      content: "This is the message content",
    };
    await sendNotification(notification);
  } catch (error) {
    console.error(error);
  }
})();
