const amqp = require('amqplib');

const queueName = 'notifications';

async function receiveMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (msg) => {
      const message = JSON.parse(msg.content.toString()); // Parse JSON message
      console.log("Received message:", message);

      // Process the message data here
      // ...

      channel.ack(msg); // Acknowledge the message
    }, { noAck: false });

  } catch (error) {
    console.error("Error receiving messages:", error);
  }
}

receiveMessages();
