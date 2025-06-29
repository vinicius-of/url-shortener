import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';

export default new DataSource({
    type: 'better-sqlite3',
    database: 'db/users.sqlite3',
    entities: [UserEntity],
    migrations: ['migrations/users/*.ts'],
});
