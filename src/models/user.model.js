import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../config/db.js';
import { generateToken } from '../helpers/tokens.js';

class User extends Model {
    
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generateToken(),
        allowNull: true, 
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
})

export default User