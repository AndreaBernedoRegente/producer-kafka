import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MessageStatus {
  SENT = 'sent',
  FAILED = 'failed',
  PENDING = 'pending',
  PROCESSING = 'processing',
}

export class MessageResponseDto {
  @ApiProperty({
    description: 'Unique message ID',
    example: 'msg_1705312200123_abc123def',
  })
  id: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Test kafka message',
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Message sender',
    example: 'User Test',
  })
  sender?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracking',
    example: 'xxxxx',
  })
  correlationId?: string;

  @ApiProperty({
    description: 'Timestamp of message creation',
    example: '2025-01-01T00:00:00.000Z',
  })
  timestamp: Date;

  @ApiProperty({
    description: 'Status of message processing',
    example: 'sent',
  })
  status: MessageStatus;

  @ApiProperty({
    description: 'Kafka topic where the message was sent',
    example: 'test-topic',
  })
  kafkaTopic: string;
}
