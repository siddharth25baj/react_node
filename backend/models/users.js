
const { Schema } = require('../constants/database-schema')
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(Schema.USER,
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            email: {
                type: DataTypes.STRING,
                field: 'email'
            },
            mobileNo: {
                type: DataTypes.STRING,
                field: 'mobileNo'
            },
            address: {
                type: DataTypes.TEXT,
                field: 'address'
            }
        }, {
        timestamps: true,
        freezeTableName: true
    });
    return users;
};