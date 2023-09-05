import { MidwayConfig } from '@midwayjs/core';

export default (): MidwayConfig => {
  const config = {} as MidwayConfig;

  config.keys = '_1693812038762_6929';
  config.accessLogConfig = {
    ignore: [/\/swagger-u.*/u],
  };

  config.koa = {
    port: 7001,
  };

  config.jwt = {
    secret: '123456',
    expiresIn: 1000 * 60 * 60 * 24,
  };

  config.jwtWhitelist = [
    '/swagger-ui',
    '/api/admin/login',
    '/api',
    '/api/user',
  ];

  config.sequelize = {
    dataSource: {
      default: {
        database: 'testUser',
        username: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        entities: ['entity'],
        // 本地的时候，可以通过 sync: true 直接 createTable
        sync: true,
      },
    },
  };

  return config;
};
