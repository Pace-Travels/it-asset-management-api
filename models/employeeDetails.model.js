"use strict";

export default (sequelize, DataTypes) => {

    const EmployeeDetails = sequelize.define(

        "EmployeeDetails",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            employeeCode: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                comment: "Auto Generated Employee Code"
            },

            employeeId: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                comment: "Company Employee ID"
            },

            employeeName: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            departmentId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "FK -> Department"
            },

            designation: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },

            mobileNumber: {
                type: DataTypes.STRING(20),
                allowNull: false
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
            tableName: "employee_details",
            timestamps: true,
            underscored: false
        }
    );

    EmployeeDetails.associate = (models) => {

        EmployeeDetails.belongsTo(models.Department, {
            foreignKey: "departmentId",
            as: "department"
        });
        /*
        EmployeeDetails.hasMany(models.EmployeeAssetAllocation, {
            foreignKey: "employeeId",
            as: "assetAllocations"
        });
        */
        EmployeeDetails.hasMany(models.EmailAccountManagement, {

            foreignKey: "employeeId",

            as: "emailAccounts"

        });
    };
    return EmployeeDetails;

};