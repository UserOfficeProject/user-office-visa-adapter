import 'reflect-metadata';
import PostgresInstrumentDataSource from '../datasources/postgres/InstrumentDataSource';
import { RabbitMQConsumer } from './../queue/consumers/rabbitMQ/RabbitMQConsumer';
import { configureConsoleLogger } from './logger/configureConsoleLogger';
import { Tokens } from './Tokens';
import { mapClass, mapValue } from './utils';

mapClass(Tokens.InstrumentDataSource, PostgresInstrumentDataSource);
mapClass(Tokens.QueueConsumer, RabbitMQConsumer);
mapValue(Tokens.ConfigureLogger, configureConsoleLogger);
