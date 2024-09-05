const amqp = require('amqplib')
class RabbitMQ {
    constructor(connectionString) {
    this.connectionString = connectionString
        this.instance = null
    }

    async connect(){
        if(!this.instance){
            try {
                this.instance = await amqp.connect(this.connectionString || 'amqp://localhost');
                console.log('RabbitMQ connected successfully');
                this.instance.on('close', () => {
                    console.error('RabbitMQ connection closed, reconnecting...');
                    this.instance = null;
                    this.reconnect();
                });
            } catch (e) {
                console.error('Error connecting to RabbitMQ:', e);
                this.reconnect();
            }
        }
    }

    async reconnect() {
        setTimeout(async () => {
            console.log('Reconnecting to RabbitMQ...');
            await this.connect();
        }, 5000);
    }
    async createChannel (){
        if(!this.instance){
            await this.connect()
        }
        const channel = await  this.instance.createChannel()
        return channel
    }

    async closeConnection() {
        if (this.instance) {
            await this.instance.close();
            console.log('RabbitMQ connection closed');
            this.instance = null;
        }
    }
}

let rabbitInstance = null
if(!rabbitInstance){
    rabbitInstance = new RabbitMQ('amqp://localhost')
}
module.exports.rabbitInstance = rabbitInstance


