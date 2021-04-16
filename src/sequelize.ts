import { Sequelize, Options } from 'sequelize';
import { initImage } from './models/image';

// @ts-ignore
// const isDev = process.env.NODE_ENV === 'development';

async function syncTables(sequelize: Sequelize) {
  initImage(sequelize);

  await sequelize.sync({ force: false, hooks: true });
}

async function initTestData(): Promise<void> {

}

async function initDatabase(): Promise<void> {
  try {
    const database = process.env.DB_NAME;
    const options: Options = {
      logging: process.env.NODE_ENV === 'development',
      dialect: 'mysql',
      host: (process.env.DB_HOST as string) || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      database,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      pool: {
        max: 200,
        maxUses: 1,
        idle: 10000,
      },
    };
    let sequelize: Sequelize;
    // 配置数据库 DB_NAME 可能不存在，导致初始化失败，然后尝试重新创建
    try {
      sequelize = new Sequelize(options);

      await syncTables(sequelize);
    } catch (e) {
      console.log(`[Sequelize] Try to create database ${database}`);

      delete options.database;
      sequelize = new Sequelize(options);

      await sequelize.query(`create database if not exists \`${database}\`;`);
      // await sequelize.query(`use ${database};`);
      await sequelize.close();

      sequelize = new Sequelize({
        ...options,
        ...{
          database,
        },
      });

      await syncTables(sequelize);
    }

    await initTestData();
  } catch (e) {
    console.log(e);
  }
}

export { initDatabase };
