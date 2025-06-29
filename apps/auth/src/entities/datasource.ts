import { DataSource } from 'typeorm';
import { LoginEntity } from './login.entity';

export default new DataSource({
    type: 'better-sqlite3',
    database: 'db/auth.sqlite3',
    entities: [LoginEntity],
    migrations: ['migrations/auth/*.ts'],
});
