import amqp from "amqplib";
import {defaultSender, transporter} from '@/config'


const receiveFromQueue = async (queue: string, callback: (message: string) => void) => {
    
}