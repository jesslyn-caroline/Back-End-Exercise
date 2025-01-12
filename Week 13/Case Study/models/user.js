import { sequelize, DataTypes } from './model.js';

const User = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.INTEGER
})

export default User;