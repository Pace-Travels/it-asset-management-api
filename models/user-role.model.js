"use strict";

export default (sequelize, DataTypes) => {

    const UserRole = sequelize.define(
        "UserRole",
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

            code: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            description: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            userRoleStatusId: {
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
            },
        },
        {
            tableName: "user_roles",
            timestamps: true,
        }
    );

    UserRole.associate = (models) => {
        UserRole.belongsTo(models.UserRoleStatus, {
            foreignKey: "userRoleStatusId",
            as: "status"
        });
    };

    return UserRole;
};