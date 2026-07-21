"use strict";

export default (sequelize, DataTypes) => {

    const CloudSubscriptionManagement = sequelize.define(

        "CloudSubscriptionManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            subscriptionCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },

            serviceName: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            subscriptionType: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            renewalDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            monthlyYearlyCost: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },

            accountOwner: {
                type: DataTypes.STRING(150),
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
            },

        },

        {

            tableName: "cloud_subscription_management",

            timestamps: true,

        }

    );

    CloudSubscriptionManagement.associate = (models) => {

        /*
        Future Relations

        CloudSubscriptionManagement.belongsTo(
            models.EmployeeDetails,
            {
                foreignKey: "accountOwner",
                targetKey: "employeeName",
                as: "owner"
            }
        );

        */

    };

    return CloudSubscriptionManagement;

};