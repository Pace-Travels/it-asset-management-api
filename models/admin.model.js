"use strict";

export default (sequelize, DataTypes) => {

    const Admin = sequelize.define(
        "Admin",
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            employeeCode: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },

            firstName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            lastName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },

            mobileNumber: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            profileImage: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            userRoleId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            userTypeId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            departmentId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            adminStatusId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            refreshToken: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            lastLogin: {
                type: DataTypes.DATE,
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

            tableName: "admins",

            timestamps: true,

        }

    );

    Admin.associate = (models) => {

        Admin.belongsTo(models.UserRole, {
            foreignKey: "userRoleId",
            as: "userRole"
        });

        Admin.belongsTo(models.UserType, {
            foreignKey: "userTypeId",
            as: "userType"
        });

        Admin.belongsTo(models.Department, {
            foreignKey: "departmentId",
            as: "department"
        });
        Admin.belongsTo(models.AdminStatus, {
            foreignKey: "adminStatusId",
            as: "status"
        });

    };

    return Admin;

};