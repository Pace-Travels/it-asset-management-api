"use strict";

export default (sequelize, DataTypes) => {

    const SubscriptionPaymentMethod = sequelize.define(
        "SubscriptionPaymentMethod",
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
            tableName: "subscription_payment_method",
            timestamps: true,
        }
    );

    SubscriptionPaymentMethod.associate = (models) => {

        // Future Relation

        // SubscriptionPaymentMethod.hasMany(models.ServerManagement,{
        //     foreignKey:"categoryId",
        //     as:"servers"
        // });

    };

    return SubscriptionPaymentMethod;

};