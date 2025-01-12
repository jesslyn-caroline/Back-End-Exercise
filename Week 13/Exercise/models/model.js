import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('231111664_store_db', 'root', 'K!tsun3kitsune', {
    host: 'localhost',
    dialect: 'mysql'
});

export { sequelize, DataTypes };