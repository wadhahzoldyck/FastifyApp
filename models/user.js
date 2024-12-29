import { DataTypes } from 'sequelize';  
import sequelize from '../config/database.js';  

const User = sequelize.define('User', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,  
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  
},{
  tableName: 'users',  
},);

export default User;
