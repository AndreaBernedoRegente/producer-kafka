import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => {
  const config = {
    clientId: process.env.KAFKA_CLIENT_ID || 'producer-kafka',
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    topic: process.env.KAFKA_TOPIC || 'messages',
    retry: {
      initialRetryTime: parseInt(process.env.KAFKA_RETRY_INITIAL_TIME || '100'),
      retries: parseInt(process.env.KAFKA_RETRY_ATTEMPTS || '3'),
    },
    producer: {
      allowAutoTopicCreation: true, //always false in production
      transactionTimeout: parseInt(
        process.env.KAFKA_TRANSACTION_TIMEOUT || '30000',
      ),
    },
  };
  console.log('DEBUG: Final kafka config:', config);
  return config;
});
