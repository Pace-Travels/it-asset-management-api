"use strict";

export default (sequelize, DataTypes) => {

    const MonitoringBackupStatus = sequelize.define(
        "MonitoringBackupStatus",
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
            tableName: "monitoring_backup_status",
            timestamps: true,
        }
    );

    MonitoringBackupStatus.associate = (models) => {

        // Future Relation

        MonitoringBackupStatus.hasMany(models.MonitoringMaintenance, {

        foreignKey: "backupStatusId",

        as: "monitoring"

    });

    };

    return MonitoringBackupStatus;

};