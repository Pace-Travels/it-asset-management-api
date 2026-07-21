import { DataTypes } from "sequelize";

export default (sequelize) => {

    const Subscription = sequelize.define(

        "Subscription",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            subscriptionCode: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },

            vendorId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },

            paymentMethodId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            reminderTypeId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            reminderSentTo: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            expectedPaymentDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            paymentInitiatedById: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            expiryDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            paymentDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
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
            tableName: "subscription",
            timestamps: false
        }

    );

    Subscription.associate = (models) => {
        Subscription.belongsTo(models.VendorManagement, {
            foreignKey: "vendorId",
            as: "vendor"
        });

        Subscription.belongsTo(models.SubscriptionPaymentMethod, {
            foreignKey: "paymentMethodId",
            as: "paymentMethod"
        });

        Subscription.belongsTo(models.SubscriptionReminderType, {
            foreignKey: "reminderTypeId",
            as: "reminderType"
        });

        Subscription.belongsTo(models.EmployeeDetails, {
            foreignKey: "paymentInitiatedById",
            as: "paymentInitiatedBy"
        });

    };

    return Subscription;

};