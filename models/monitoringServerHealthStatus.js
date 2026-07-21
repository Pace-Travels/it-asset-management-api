"use strict";

export default (sequelize, DataTypes) => {

    const MonitoringServerHealthStatus = sequelize.define(
        "MonitoringServerHealthStatus",
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
            tableName: "monitoring_server_health_status",
            timestamps: true,
        }
    );

    MonitoringServerHealthStatus.associate = (models) => {

        // Future Relation

        MonitoringServerHealthStatus.hasMany(models.MonitoringMaintenance, {
            foreignKey: "serverHealthStatusId",
            as: "monitoring"
        });

    };

    return MonitoringServerHealthStatus;

};