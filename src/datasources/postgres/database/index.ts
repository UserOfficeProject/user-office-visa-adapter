import LocalDB from './local';
import RemoteDB from './remote';

const database = process.env.DEPENDENCY_CONFIG == 'remote' ? RemoteDB : LocalDB;

export default database;
