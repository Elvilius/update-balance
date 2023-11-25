import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string);

  const umzug = new Umzug({
    migrations: [],
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  (async () => {
    try {
    sequelize.authenticate();
    sequelize.sync()
    await umzug.up();

    }catch(e) {
        console.error(e)
        process.exit(1);
    }
  })();

