import 'reflect-metadata';
import MockInstrumentDataSource from '../datasources/mock/InstrumentDataSource';
import MockProposalDataSource from '../datasources/mock/ProposalDataSource';
import { MockQueueConsumer } from '../queue/consumers/mock/MockQueueConsumer';
import { configureConsoleLogger } from './logger/configureConsoleLogger';
import { Tokens } from './Tokens';
import { mapClass, mapValue } from './utils';

mapClass(Tokens.InstrumentDataSource, MockInstrumentDataSource);
mapClass(Tokens.ProposalDataSource, MockProposalDataSource);
mapClass(Tokens.QueueConsumer, MockQueueConsumer);
mapValue(Tokens.ConfigureLogger, configureConsoleLogger);
