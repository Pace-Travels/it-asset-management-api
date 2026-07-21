"use strict";

export default (sequelize, DataTypes) => {

    const MobileRechargeManagement = sequelize.define(

        "MobileRechargeManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            mobileRechargeCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },

            mobileNumber: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },

            assignedEmployee: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            serviceProvider: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            rechargeAmount: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
            },

            rechargeDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            validityPeriod: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            nextRechargeDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            statusId: {
                type: DataTypes.BIGINT,
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

            tableName: "mobile_recharge_management",

            timestamps: true,

        }

    );

    MobileRechargeManagement.associate = (models) => {

        /*
        Future Relations

        MobileRechargeManagement.belongsTo(models.StatusMaster, {
            foreignKey: "statusId",
            as: "status"
        });

        */

    };

    return MobileRechargeManagement;

};