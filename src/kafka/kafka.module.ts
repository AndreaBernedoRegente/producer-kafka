import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaProducer } from './kafka.producer';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule],
  providers: [KafkaProducer, KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
