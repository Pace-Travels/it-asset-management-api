"use strict";

export default (sequelize, DataTypes) => {

    const Permission = sequelize.define(
        "Permission",
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
            }

        },
        {

            tableName: "permissions",

            timestamps: true,

        }

    );

    Permission.associate = (models) => {

        Permission.hasMany(models.RolePermission, {

            foreignKey: "permissionId",

            as: "rolePermissions"

        });

    };

    return Permission;

};