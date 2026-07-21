"use strict";

export default (sequelize, DataTypes) => {

    const SSLCertificateManagementStatus = sequelize.define(
        "SSLCertificateManagementStatus",
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
            tableName: "user_role_status",
            timestamps: true,
        }
    );

    SSLCertificateManagementStatus.associate = (models) => {

        // Future Relation

        SSLCertificateManagementStatus.hasMany(models.SSLCertificateManagement,{
            foreignKey:"statusId",
            as:"status"
        });

    };

    return SSLCertificateManagementStatus;

};