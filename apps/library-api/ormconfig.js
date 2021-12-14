const isProd = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : false;
const rootDir = isProd ? 'dist' : 'src';

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA || 'public',
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [rootDir + '/infra/TypeORM/entities/*.**'],
    subscribers: [rootDir + '/modules/**/subscribers/*.**'],
    migrations: [rootDir + '/infra/TypeORM/migrations/*.**'],
    cli: {
        migrationsDir: rootDir + '/infra/TypeORM/migrations',
    },
}
