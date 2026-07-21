"use strict";

export default (sequelize, DataTypes) => {

    const AssetInformationCategory = sequelize.define(
        "AssetInformationCategory",
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
            tableName: "asset_information_category",
            timestamps: true,
        }
    );

    AssetInformationCategory.associate = (models) => {

        AssetInformationCategory.hasMany(models.AssetInformation, {
            foreignKey: "categoryId",
            as: "assets"
        });

    };

    return AssetInformationCategory;

};