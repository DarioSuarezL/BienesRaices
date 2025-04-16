import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/db.js';

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
},{
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    underscored: true,
})

export default Category