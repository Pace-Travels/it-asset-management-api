"use strict";

export default (sequelize, DataTypes) => {

    const UserRoleStatus = sequelize.define(
        "UserRoleStatus",
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

    UserRoleStatus.associate = (models) => {

        // Future Relation

        // UserRoleStatus.hasMany(models.ServerManagement,{
        //     foreignKey:"categoryId",
        //     as:"servers"
        // });

    };

    return UserRoleStatus;

};