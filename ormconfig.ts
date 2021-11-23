module.exports = {
  type: 'mysql',
  url: process.env.BANKING_DDD_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  bigNumberStrings: false,
  entities: [process.env.NODE_ENV === 'migration' ? 'src/**/infrastructure/persistence/typeorm/entities/*.ts' : 'dist/src/**/infrastructure/persistence/typeorm/entities/*.js'],
  migrations: [process.env.NODE_ENV === 'migration' ? 'src/common/infrastructure/persistence/typeorm/migrations/*.ts' : 'dist/src/common/infrastructure/persistence/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};
