"use strict";

export default (sequelize, DataTypes) => {

    const EmailAccountManagement = sequelize.define(

        "EmailAccountManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            emailCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            emailAddress: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },

            employeeId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            provider: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            renewalDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            renewalCost: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
            },

            statusId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            remarks: {
                type: DataTypes.STRING(500),
                allowNull: true
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },

            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }

        },

        {

            tableName: "email_account_management",

            timestamps: true

        }

    );

    EmailAccountManagement.associate = (models) => {

        // Future Relations

        EmailAccountManagement.belongsTo(models.EmployeeDetails, {
            foreignKey: "employeeId",
            as: "employee"
        });

        EmailAccountManagement.belongsTo(models.EmailAccountRenewalManagementStatus, {
            foreignKey: "statusId",
            as: "status"
        });

    };

    return EmailAccountManagement;

};