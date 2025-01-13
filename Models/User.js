import { Model, DataTypes } from 'sequelize';
import sequelize from '../server/connection.js'; // path to  Sequelize connection

class User extends Model {}

// Define User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(28),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'User', // Name of the model
    tableName: 'users', // Name of the table in the database
    timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
  }
);

export default User; 