import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto, MessageStatus } from './dto/response-message.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(private kafkaService: KafkaService) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    this.logger.log(`Creating message: ${createMessageDto.content}`);

    const result = await this.kafkaService.sendMessage(createMessageDto);

    const response: MessageResponseDto = {
      id: result.message.id || 'unknown',
      content: createMessageDto.content,
      sender: createMessageDto.sender,
      correlationId: createMessageDto.correlationId,
      timestamp: new Date(),
      status: MessageStatus.SENT,
      kafkaTopic: result.topic,
    };

    this.logger.log(`Message created successfully with ID: ${response.id}`);
    return response;
  }
}
