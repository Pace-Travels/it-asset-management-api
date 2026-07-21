"use strict";

export default (sequelize, DataTypes) => {

    const MonitoringMaintenance = sequelize.define(

        "MonitoringMaintenance",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            maintenanceCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            serverId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            maintenanceSchedule: {
                type: DataTypes.DATE,
                allowNull: false
            },

            maintenanceHistory: {
                type: DataTypes.TEXT,
                allowNull: true
            },

            backupSchedule: {
                type: DataTypes.DATE,
                allowNull: false
            },

            backupStatusId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            uptimePercentage: {
                type: DataTypes.DECIMAL(5,2),
                allowNull: true
            },

            serverHealthStatusId: {
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

            tableName: "monitoring_maintenance",

            timestamps: true

        }

    );

    MonitoringMaintenance.associate = (models) => {

    
        // Future Relations

        // MonitoringMaintenance.belongsTo(models.ServerManagement, {
        //     foreignKey: "serverId",
        //     as: "server"
        // });

        MonitoringMaintenance.belongsTo(models.MonitoringBackupStatus, {
            foreignKey: "backupStatusId",
            as: "backupStatus"
        });

        MonitoringMaintenance.belongsTo(models.MonitoringServerHealthStatus, {
            foreignKey: "serverHealthStatusId",
            as: "serverHealthStatus"
        });

    };

    return MonitoringMaintenance;

};