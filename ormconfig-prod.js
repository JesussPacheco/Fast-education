module.exports = {
  type: 'mysql',
  url: process.env.BANKING_DDD_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  bigNumberStrings: false,
  entities: [__dirname + '/src/**/infrastructure/persistence/typeorm/entities/*.js'],
  migrations: [__dirname + 'src/common/infrastructure/persistence/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: __dirname + '/src/common/infrastructure/persistence/typeorm/migrations',
  },
};