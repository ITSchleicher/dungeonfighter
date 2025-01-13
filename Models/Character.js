import { Model, DataTypes } from 'sequelize';
import sequelize from '../server/connection.js'; // path to  Sequelize connection

class Character extends Model {}

// Define the Character model
Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Refers to the 'users' table
        key: 'id',
      },
      onDelete: 'CASCADE', // Deletes character if user is deleted
    },
    char_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    class_level: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    background: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    player_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    alignment: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    experience_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Passing the `sequelize` instance is required
    modelName: 'character', // Model name
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
    underscored: true, // Use snake_case for database fields
  }
);

export default Character;