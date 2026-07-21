"use strict";

export default (sequelize, DataTypes) => {

    const AssetInformation = sequelize.define(
        "AssetInformation",
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            assetCode: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                comment: "Unique Asset Code"
            },

            assetName: {
                type: DataTypes.STRING(200),
                allowNull: false
            },

            categoryId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "FK -> AssetInformationCategories"
            },

            brand: {
                type: DataTypes.STRING(100),
                allowNull: true
            },

            modelNumber: {
                type: DataTypes.STRING(100),
                allowNull: true
            },

            serialNumber: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },

            purchaseDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            purchaseCost: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
                defaultValue: 0
            },

            vendorId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "FK -> VendorManagement"
            },

            warrantyExpiryDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            assignedEmployeeId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: "FK -> EmployeeDetails"
            },

            departmentId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: "FK -> Department"
            },

            statusId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "FK -> AssetInformationStatus"
            },

            remarks: {
                type: DataTypes.TEXT,
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

            tableName: "asset_information",

            timestamps: true,

            indexes: [

                {
                    unique: true,
                    fields: ["assetCode"]
                },

                {
                    unique: true,
                    fields: ["serialNumber"]
                },

                {
                    fields: ["categoryId"]
                },

                {
                    fields: ["vendorId"]
                },

                {
                    fields: ["assignedEmployeeId"]
                },

                {
                    fields: ["departmentId"]
                },

                {
                    fields: ["statusId"]
                }

            ]

        }

    );

    AssetInformation.associate = (models) => {


        // Uncomment when masters are ready

        // AssetInformation.belongsTo(models.AssetInformationCategory, {
        //     foreignKey: "categoryId",
        //     as: "category"
        // });

        // AssetInformation.belongsTo(models.VendorManagement, {
        //     foreignKey: "vendorId",
        //     as: "vendor"
        // });

        // AssetInformation.hasMany(models.EmployeeAssetAllocation, {
        //     foreignKey: "assetId",
        //     as: "allocations"
        // });

        // // AssetInformation.belongsTo(models.EmployeeDetails,{
        // //     foreignKey:"assignedEmployeeId",
        // //     as:"employee"
        // // });

        // // AssetInformation.belongsTo(models.Department,{
        // //     foreignKey:"departmentId",
        // //     as:"department"
        // // });

        // AssetInformation.belongsTo(models.AssetInformationStatus, {
        //     foreignKey: "statusId",
        //     as: "status"
        // });



    };

    return AssetInformation;

};