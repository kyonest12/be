import { join } from 'path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as postgres from 'pg';

config();

export const options: PostgresConnectionOptions = {
    type: 'postgres',
    driver: postgres,
    synchronize: false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    entities: [join(__dirname, '/entities/*{.ts,.js}')],
    migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
    logging: process.env.MODE === 'development',
};

const dataSource = new DataSource(options);
dataSource.initialize();

export default dataSource;
