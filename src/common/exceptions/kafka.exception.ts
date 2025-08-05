import { HttpException } from '@nestjs/common';

export class KafkaException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: 500,
        message: 'Failed to send message to Kafka',
        error: message,
      },
      500,
    );
  }
}
