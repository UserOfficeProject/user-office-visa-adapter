import 'reflect-metadata';

switch (process.env.DEPENDENCY_CONFIG) {
  case 'run':
    require('./dependencyConfigRun');
    break;
  case 'test':
    require('./dependencyConfigTest');
    break;
  default:
    throw new Error(
      `process.env.DEPENDENCY_CONFIG contains invalid value '${process.env.DEPENDENCY_CONFIG}'.
       Available values are <run|test>`
    );
}

export {};
