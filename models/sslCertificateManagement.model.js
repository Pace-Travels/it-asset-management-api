"use strict";

export default (sequelize, DataTypes) => {

    const SSLCertificateManagement = sequelize.define(

        "SSLCertificateManagement",

        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            sslCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            domainId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },

            certificateProvider: {
                type: DataTypes.STRING(150),
                allowNull: false
            },

            certificateType: {
                type: DataTypes.STRING(100),
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
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
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

            tableName: "ssl_certificate_management",

            timestamps: true

        }

    );

    SSLCertificateManagement.associate = (models) => {

       
        // Future Relations

        SSLCertificateManagement.belongsTo(models.DomainWebsiteManagement, {
            foreignKey: "domainId",
            as: "domain"
        });

        SSLCertificateManagement.belongsTo(models.SSLCertificateManagementStatus, {
            foreignKey: "statusId",
            as: "status"
        });

    };

    return SSLCertificateManagement;

};