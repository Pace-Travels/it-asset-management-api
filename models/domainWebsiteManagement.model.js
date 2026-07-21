"use strict";

export default (sequelize, DataTypes) => {

    const DomainWebsiteManagement = sequelize.define(

        "DomainWebsiteManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            domainCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            domainName: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            websiteUrl: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            hostingProvider: {
                type: DataTypes.STRING(150),
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

            serverId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            statusId: {
                type: DataTypes.BIGINT,
                allowNull: false
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

            tableName: "domain_website_management",

            timestamps: true

        }

    );

    DomainWebsiteManagement.associate = (models) => {

        /*
        Future Relations

        DomainWebsiteManagement.belongsTo(models.ServerManagement,{
            foreignKey:"serverId",
            as:"server"
        });

        DomainWebsiteManagement.belongsTo(models.StatusMaster,{
            foreignKey:"statusId",
            as:"status"
        });

        */
        DomainWebsiteManagement.hasMany(models.SSLCertificateManagement, {
            foreignKey: "domainId",
            as: "sslCertificates"
        });

        DomainWebsiteManagement.belongsTo(models.VendorManagement, {
            foreignKey: "vendorId",
            as: "vendor"
        });
    };

    return DomainWebsiteManagement;

};