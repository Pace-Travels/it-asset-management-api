"use strict";

export default (sequelize, DataTypes) => {

    const VendorManagement = sequelize.define(
        "VendorManagement",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            vendorCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },

            vendorName: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            contactPerson: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            mobileNumber: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },

            gstNumber: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            panNumber: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            website: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            address: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            city: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            state: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            country: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            postalCode: {
                type: DataTypes.STRING(20),
                allowNull: true,
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
            tableName: "vendor_management",
            timestamps: true,
        }
    );

    VendorManagement.associate = (models) => {

        // Future Relation

        VendorManagement.hasMany(models.AssetInformation, {
            foreignKey: "vendorId",
            as: "assets",
        });

        VendorManagement.hasMany(models.ServerManagement, {
            foreignKey: "vendorId",
            as: "servers"
        });

        VendorManagement.hasMany(models.SoftwareLicenseManagement, {
            foreignKey: "vendorId",
            as: "softwareLicenses"
        });

        VendorManagement.hasMany(models.DomainWebsiteManagement, {

            foreignKey: "vendorId",

            as: "domains"

        });

    };

    return VendorManagement;

};