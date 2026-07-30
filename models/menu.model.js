"use strict";

export default (sequelize, DataTypes) => {

    const Menu = sequelize.define(
        "Menu",
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            parentId: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },

            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            route: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            icon: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },

            sortOrder: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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

            tableName: "menus",

            timestamps: true,

        }

    );

    Menu.associate = (models) => {

        // Parent Menu

        Menu.belongsTo(models.Menu, {

            foreignKey: "parentId",

            as: "parentMenu"

        });

        // Child Menus

        Menu.hasMany(models.Menu, {

            foreignKey: "parentId",

            as: "childMenus"

        });

        // Role Permission Mapping

        Menu.hasMany(models.RolePermission, {

            foreignKey: "menuId",

            as: "rolePermissions"

        });

    };

    return Menu;

};