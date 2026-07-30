"use strict";

export default (sequelize, DataTypes) => {

    const RolePermission = sequelize.define(
        "RolePermission",
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            roleId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            menuId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            permissionId: {
                type: DataTypes.BIGINT,
                allowNull: false,
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

            tableName: "role_permissions",

            timestamps: true,

        }

    );

    RolePermission.associate = (models) => {

        RolePermission.belongsTo(models.UserRole, {

            foreignKey: "roleId",

            as: "role"

        });

        RolePermission.belongsTo(models.Menu, {

            foreignKey: "menuId",

            as: "menu"

        });

        RolePermission.belongsTo(models.Permission, {

            foreignKey: "permissionId",

            as: "permission"

        });

    };

    return RolePermission;

};