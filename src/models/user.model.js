import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../config/db.js';
import { generateToken } from '../helpers/tokens.js';

class User extends Model {
    static async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    
    static async findById(id) {
        return await User.findOne({ where: { id } });
    }
    
    // static async findByToken(token) {
    //     return await User.findOne({ where: { token } });
    // }

    // static async confirmUser(token){
    //     await User.update({ confirmed: true, token: null }, { where: { token } });
    // }

    static async tryConfirmUser(token){ //Nos evitamos una doble llamada a la DB
        const user = await User.findOne({ where: { token } });
        if (user) user.update({ confirmed: true, token: null });
        return user;
    }
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
    token: DataTypes.STRING,
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
            user.token = generateToken();
        }
    }
})

export default User