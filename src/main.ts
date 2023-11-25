import { User } from './models/users';
import express, { Express } from 'express';
import { Transaction } from 'sequelize';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/update-balance', async (req, res) => {
  const { userId, amount } = req.body;

  const t = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED  });

  try {
    const user = await User.findByPk(userId, { transaction: t, lock:  Transaction.LOCK.UPDATE });

    if (!user) {
      await t.rollback();
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance + amount < 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    await user.update({ balance: user.balance + amount }, { transaction: t });

    await t.commit();

    return res.status(200).json({ success: true, newBalance: user.balance });
  } catch (error) {
    console.error('Error updating balance:', error);
    await t.rollback();
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/create-user', async (req, res) => {    
    const user = await User.create();
    return res.status(200).json({ user });
  });


app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});



