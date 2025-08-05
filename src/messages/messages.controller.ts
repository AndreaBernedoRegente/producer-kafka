import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/response-message.dto';
import { KafkaExceptionFilter } from '../common/filters/kafka-exception.filter';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';

@Controller('messages')
@UseFilters(KafkaExceptionFilter)
@UseGuards(ApiKeyGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    return await this.messagesService.createMessage(createMessageDto);
  }
}
