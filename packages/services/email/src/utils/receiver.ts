import amqp from "amqplib";
import { defaultSender, transporter } from "@/config";

const receiveFromQueue = async (
  queue: string,
  callback: (message: string) => void
) => {
  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, (message) => {
      if (message) {
        callback(message.content.toString());
      }

      channel.ack(message);

      connection.close();
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendToQueue = async (queue: string, message: string) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

export default receiveFromQueue;
