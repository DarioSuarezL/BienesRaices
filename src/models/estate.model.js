import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/db.js';

class Estate extends Model {}

Estate.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(96),
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking_lots: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },       
},{
    sequelize,
    modelName: 'Estate',
    tableName: 'estates',
    timestamps: true,
    underscored: true,
})

export default Estate