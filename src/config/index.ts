import 'reflect-metadata';

switch (process.env.DEPENDENCY_CONFIG) {
  case 'test':
    require('./dependencyConfigTest');
    break;
  case 'remote':
    require('./dependencyConfigRemote');
    break;
  default:
    require('./dependencyConfigRun');
}
