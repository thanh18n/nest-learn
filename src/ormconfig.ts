import { DataSource } from "typeorm"
import { config } from 'dotenv';

config({ path: './.env.development' });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,
    entities: [__dirname + "/entities/*.entity.{ts,js}"],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
})
