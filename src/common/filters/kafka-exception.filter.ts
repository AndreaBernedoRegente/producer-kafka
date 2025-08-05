import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { KafkaException } from '../exceptions/kafka.exception';

@Catch(KafkaException)
export class KafkaExceptionFilter implements ExceptionFilter {
  catch(exception: KafkaException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).json(exception.getResponse());
  }
}
