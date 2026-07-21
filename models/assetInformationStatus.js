"use strict";

export default (sequelize, DataTypes) => {

    const AssetInformationStatus = sequelize.define(
        "AssetInformationStatus",
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
            tableName: "asset_information_status",
            timestamps: true,
        }
    );

    AssetInformationStatus.associate = (models) => {

        AssetInformationStatus.hasMany(models.AssetInformation, {
            foreignKey: "statusId",
            as: "assets"
        });

    };

    return AssetInformationStatus;

};