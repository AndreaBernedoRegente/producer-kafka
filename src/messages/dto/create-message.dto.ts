import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message content',
    example: 'Test kafka message',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'Message sender',
    example: 'User Test',
  })
  @IsString()
  @IsOptional()
  sender?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracking',
    example: 'xxxxx',
  })
  @IsUUID()
  @IsOptional()
  correlationId?: string;
}
