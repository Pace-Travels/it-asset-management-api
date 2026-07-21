"use strict";

export default (sequelize, DataTypes) => {

    const Department = sequelize.define(

        "Department",
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },

            description: {
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
            tableName: "department",
            timestamps: true
        }

    );

    Department.associate = (models) => {
        Department.hasMany(models.EmployeeDetails, {
            foreignKey: "departmentId",
            as: "employees"
        });
    };

    return Department;

};