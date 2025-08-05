# Kafka Producer API

REST API built with NestJS that sends messages to Kafka. Part of a producer and consumer messaging challenge.

## Description

This API allows sending messages through Kafka using a microservices architecture. The producer is built in NestJS and connects to a Kafka broker to send messages that will be consumed by a Python application.

## Technologies

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Message Broker**: Kafka (kafkajs)
- **Validation**: class-validator
- **Authentication**: API Key
- **Logging**: NestJS Logger

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (for the consumer)

### Installation Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd producer-kafka
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

````bash
# Create .env file
cp .env

4. **Set environment variables**
```bash
# .env
API_KEY=my-super-secret-key-2024
KAFKA_CLIENT_ID=producer-kafka
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=messages
KAFKA_RETRY_INITIAL_TIME=100
KAFKA_RETRY_ATTEMPTS=8
KAFKA_TRANSACTION_TIMEOUT=30000
NODE_ENV=development
````

## Usage

### Development

```bash
# Run in development mode
npm run start:dev
```
