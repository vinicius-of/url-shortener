import { DataSource } from 'typeorm';
import configs from './ormconfig';

async function runAllMigrations() {
    for (const config of configs) {
        const dataSource = new DataSource(config);
        await dataSource.initialize();
        console.log(`Executing migrations on: ${config.name}`);
        await dataSource.runMigrations();
        await dataSource.destroy();
    }
}

runAllMigrations().catch(err => {
    console.error('Error to execute migration:', err);
    process.exit(1);
});
