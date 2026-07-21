"use strict";

export default (sequelize, DataTypes) => {

    const SoftwareLicenseManagement = sequelize.define(

        "SoftwareLicenseManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            licenseCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            softwareName: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            softwareCategoryId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            vendorId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            licenseType: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            numberOfUsers: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            purchaseDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            expiryDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            renewalDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            renewalCost: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },

            assignedUsers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            remarks: {
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

            tableName: "software_license_management",

            timestamps: true

        }

    );

    SoftwareLicenseManagement.associate = (models) => {


        // Future Relations

        SoftwareLicenseManagement.belongsTo(models.SoftwareLicenseRenewalManagementCategory, {
            foreignKey: "softwareCategoryId",
            as: "softwareCategory"
        });

        SoftwareLicenseManagement.belongsTo(models.VendorManagement, {
            foreignKey: "vendorId",
            as: "vendor"
        });

    };

    return SoftwareLicenseManagement;

};