import 'reflect-metadata';
import PostgresInstrumentDataSource from '../datasources/postgres/InstrumentDataSource';
import PostgresProposalDataSource from '../datasources/postgres/ProposalDataSource';
import PostgresUserDataSource from '../datasources/postgres/UserDataSource';
import { RabbitMQConsumer } from './../queue/consumers/rabbitMQ/RabbitMQConsumer';
import { configureConsoleLogger } from './logger/configureConsoleLogger';
import { Tokens } from './Tokens';
import { mapClass, mapValue } from './utils';

mapClass(Tokens.InstrumentDataSource, PostgresInstrumentDataSource);
mapClass(Tokens.ProposalDataSource, PostgresProposalDataSource);
mapClass(Tokens.UserDataSource, PostgresUserDataSource);

mapClass(Tokens.QueueConsumer, RabbitMQConsumer);
mapValue(Tokens.ConfigureLogger, configureConsoleLogger);
