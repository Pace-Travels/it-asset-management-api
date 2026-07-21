"use strict";

export default (sequelize, DataTypes) => {

    const ServerManagement = sequelize.define(
        
        "ServerManagement",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            serverCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            serverName: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            serverCategoryId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            serverStatusId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            serverLocation: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            hostName: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            ipAddress: {
                type: DataTypes.STRING(50),
                allowNull: false
            },

            operatingSystem: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            ram: {
                type: DataTypes.STRING(50),
                allowNull: true
            },

            storage: {
                type: DataTypes.STRING(100),
                allowNull: true
            },

            processor: {
                type: DataTypes.STRING(150),
                allowNull: true
            },

            vendorId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            purchaseDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            expiryDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
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
            tableName: "server_management",
            timestamps: true
        }
    );

    ServerManagement.associate = (models) => {
        // Future Relations

        ServerManagement.belongsTo(models.ServerManagementCategory, {
            foreignKey: "serverCategoryId",
            as: "serverCategory"
        });

        ServerManagement.belongsTo(models.ServerManagementStatus, {
            foreignKey: "serverStatusId",
            as: "serverStatus"
        });

        ServerManagement.belongsTo(models.VendorManagement, {
            foreignKey: "vendorId",
            as: "vendor"
        });
    };

    return ServerManagement;

};