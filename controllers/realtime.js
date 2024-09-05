const express = require('express')
const {rabbitInstance} = require("../services/rabbitMQ");
const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const message = 'hello world'
        // Create a channel
        const channel =  await rabbitInstance.createChannel();
        // Declare a queue
        const queue = 'testQueue';
        await channel.assertQueue(queue, {durable: false});

        // Send a message to the queue
        channel.sendToQueue(queue, Buffer.from(message));
        console.log('Sent:', message);

        return res.status(200).json({message: 'Message sent to queue'});
    } catch (e) {
        console.error('Error sending message:', e);
        return res.status(500).json({error: 'Failed to send message'});
    }
})
router.get('/receive', async (req, res) => {
    try {
        // Create a channel
        const channel =  await rabbitInstance.createChannel();
        // Declare a queue
        const queue = 'testQueue';
        await channel.assertQueue(queue, { durable: false });
        // Set up a consumer to listen for messages
        await channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log('Received:', msg.content.toString());
                channel.ack(msg);
            }
        });

        return res.status(200).json({ message: 'Consuming messages from queue' });
    } catch (e) {
        console.error('Error consuming message:', e);
        return res.status(500).json({ error: 'Failed to consume messages' });
    }
})

module.exports = router

