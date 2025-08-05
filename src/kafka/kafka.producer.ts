import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Producer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducer {
  private readonly logger = new Logger(KafkaProducer.name);
  private producer: Producer;
  private kafka: Kafka;

  constructor(private configService: ConfigService) {
    this.initializeKafka();
  }

  private async initializeKafka() {
    const config = this.configService.get('kafka');

    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: config.producer.allowAutoTopicCreation,
      transactionTimeout: config.producer.transactionTimeout,
    });

    await this.producer.connect();
    this.logger.log('Kafka producer connected');
  }

  async sendMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
            timestamp: Date.now().toString(),
          },
        ],
      });

      this.logger.log(`Message sent to topic: ${topic}`);
      return { success: true, topic, message };
    } catch (error) {
      this.logger.error(`Failed to send message to topic ${topic}:`, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
  }
}
