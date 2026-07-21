"use strict";

export default (sequelize, DataTypes) => {

    const EmployeeAssetAllocation = sequelize.define(

        "EmployeeAssetAllocation",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            allocationCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },

            employeeId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            assetId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },

            allocatedDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            returnDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            allocationStatus: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            remarks: {
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

            tableName: "employee_asset_allocation",

            timestamps: true,

        }

    );

    EmployeeAssetAllocation.associate = (models) => {

        // Future Relations

        EmployeeAssetAllocation.belongsTo(models.EmployeeDetails, {
            foreignKey: "employeeId",
            as: "employee"
        });

        EmployeeAssetAllocation.belongsTo(models.AssetInformation, {
            foreignKey: "assetId",
            as: "asset"
        });

    };

    return EmployeeAssetAllocation;

};