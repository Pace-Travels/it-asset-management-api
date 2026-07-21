"use strict";

export default (sequelize, DataTypes) => {

    const InternetManagement = sequelize.define(

        "InternetManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            internetCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },

            ispName: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            connectionType: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            planName: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            bandwidth: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            contractStartDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            contractEndDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            renewalDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            monthlyCharges: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
            },

            remarks: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }

        },

        {

            tableName: "internet_management",

            timestamps: true,

        }

    );

    InternetManagement.associate = (models) => {

        /*
        Future Relations

        // Add belongsTo() relations here if required later.

        */

    };

    return InternetManagement;

};