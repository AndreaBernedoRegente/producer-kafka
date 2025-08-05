import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaProducer } from './kafka.producer';
import { v4 as uuidv4 } from 'uuid';
import { KafkaException } from '../common/exceptions/kafka.exception';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    private configService: ConfigService,
    private kafkaProducer: KafkaProducer,
  ) {}

  async sendMessage(message: any) {
    const topic = this.configService.get('kafka.topic');

    try {
      const result = await this.kafkaProducer.sendMessage(topic, {
        ...message,
        timestamp: new Date().toISOString(),
        id: uuidv4(),
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to send message to Kafka:', error);
      throw new KafkaException(error.message);
    }
  }
}
