import { sequelize, DataTypes } from "./model.js";

// for table 'product' in database
const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
})

export default Product;