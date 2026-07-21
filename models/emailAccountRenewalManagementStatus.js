"use strict";

export default (sequelize, DataTypes) => {

    const EmailAccountRenewalManagementStatus = sequelize.define(
        "EmailAccountRenewalManagementStatus",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            description: {
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
            tableName: "email_account_renewal_management_status",
            timestamps: true,
        }
    );

    EmailAccountRenewalManagementStatus.associate = (models) => {

        // Future Relation

        // EmailAccountRenewalManagementStatus.hasMany(models.ServerManagement,{
        //     foreignKey:"categoryId",
        //     as:"servers"
        // });

    };

    return EmailAccountRenewalManagementStatus;

};