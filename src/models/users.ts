import {  DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class User extends Model {
   declare balance: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          min: 0,
        },
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10000,
      validate: {
        min: 0,
      },
    },
  }, { sequelize, modelName: 'User' })
