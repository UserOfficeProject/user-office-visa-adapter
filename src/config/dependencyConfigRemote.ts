import 'reflect-metadata';
import PostgresExperimentDataSource from '../datasources/postgres/ExperimentDataSource';
import PostgresExperimentUserDataSource from '../datasources/postgres/ExperimentUserDataSource';
import PostgresInstrumentDataSource from '../datasources/postgres/InstrumentDataSource';
import PostgresProposalDataSource from '../datasources/postgres/ProposalDataSource';
import PostgresUserDataSource from '../datasources/postgres/UserDataSource';
import { RabbitMQConsumer } from '../queue/consumers/rabbitMQ/RabbitMQConsumer';
import { configureConsoleLogger } from './logger/configureConsoleLogger';
import { Tokens } from './Tokens';
import { mapClass, mapValue } from './utils';

mapClass(Tokens.InstrumentDataSource, PostgresInstrumentDataSource);
mapClass(Tokens.ProposalDataSource, PostgresProposalDataSource);
mapClass(Tokens.ExperimentDataSource, PostgresExperimentDataSource);
mapClass(Tokens.ExperimentUserDataSource, PostgresExperimentUserDataSource);
mapClass(Tokens.UserDataSource, PostgresUserDataSource);
mapClass(Tokens.QueueConsumer, RabbitMQConsumer);
mapValue(Tokens.ConfigureLogger, configureConsoleLogger);
