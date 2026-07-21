"use strict";

export default (sequelize, DataTypes) => {

    const SoftwareLicenseRenewalManagementCategory = sequelize.define(
        "SoftwareLicenseRenewalManagementCategory",
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
            tableName: "software_license_renewal_management_category",
            timestamps: true,
        }
    );

    SoftwareLicenseRenewalManagementCategory.associate = (models) => {
        SoftwareLicenseRenewalManagementCategory.hasMany(models.SoftwareLicenseManagement, {
            foreignKey: "softwareCategoryId",
            as: "softwareLicenses"
        });
    };

    return SoftwareLicenseRenewalManagementCategory;

};