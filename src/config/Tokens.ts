// This file contains unique tokens for each dependency
export const Tokens = {
  InstrumentDataSource: Symbol('InstrumentDataSource'),
  ProposalDataSource: Symbol('ProposalDataSource'),
  ExperimentDataSource: Symbol('ExperimentDataSource'),
  ExperimentUserDataSource: Symbol('ExperimentUserDataSource'),
  UserDataSource: Symbol('UserDataSource'),
  QueueConsumer: Symbol('ListenToMessageQueue'),
  ConfigureLogger: Symbol('ConfigureLogger'),
  Database: Symbol('Database'),
};
