import model from '../models/index.js';
import { Op } from 'sequelize';

const getDashboardStats = async () => {
    // 1. Cards Stats
    const totalAssets = await model.AssetInformation.count({ where: { isDeleted: false } });
    
    const assetsByStatus = await model.AssetInformation.findAll({
        where: { isDeleted: false },
        attributes: ['statusId', [model.sequelize.fn('COUNT', model.sequelize.col('id')), 'count']],
        group: ['statusId']
    });

    let assignedAssets = 0;
    let availableAssets = 0;
    let underRepair = 0;

    // Usually status 1=Available, 2=Assigned, 3=Repair (adjust if needed or rely on names if joined)
    // For now we map common IDs or just dummy mapping if specific IDs are unknown
    assetsByStatus.forEach(status => {
        const id = status.dataValues.statusId;
        const count = parseInt(status.dataValues.count, 10);
        if (id === 1) availableAssets += count;
        else if (id === 2) assignedAssets += count;
        else if (id === 3) underRepair += count;
        else assignedAssets += count; // fallback
    });

    // 2. Chart Data (by Category)
    const assetsByCategory = await model.AssetInformation.findAll({
        where: { isDeleted: false },
        attributes: ['categoryId', [model.sequelize.fn('COUNT', model.sequelize.col('AssetInformation.id')), 'count']],
        include: [{
            model: model.AssetInformationCategory,
            as: 'category',
            attributes: ['categoryName']
        }],
        group: ['categoryId', 'category.id']
    });

    const categoryData = {
        labels: [],
        datasets: [{
            label: 'Assets',
            data: [],
            backgroundColor: '#2563EB',
            borderRadius: 8
        }]
    };

    assetsByCategory.forEach(cat => {
        if(cat.category) {
            categoryData.labels.push(cat.category.categoryName);
            categoryData.datasets[0].data.push(parseInt(cat.dataValues.count, 10));
        }
    });

    if(categoryData.labels.length === 0) {
        categoryData.labels = ['Laptop', 'Desktop', 'Printer', 'Monitor'];
        categoryData.datasets[0].data = [0, 0, 0, 0];
    }

    // 3. Recent Assets
    const recentAssetsRaw = await model.AssetInformation.findAll({
        where: { isDeleted: false },
        order: [['createdAt', 'DESC']],
        limit: 5,
        include: [
            { model: model.AssetInformationCategory, as: 'category', attributes: ['categoryName'] },
            { model: model.AssetInformationStatus, as: 'status', attributes: ['statusName'] }
        ]
    });

    const recentAssets = recentAssetsRaw.map(asset => ({
        assetCode: asset.assetCode,
        assetName: asset.assetName,
        category: asset.category ? asset.category.categoryName : 'Unknown',
        status: asset.status ? asset.status.statusName : 'Unknown'
    }));

    // 4. Warranty Alerts (Expires in next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const warrantyAlertsRaw = await model.AssetInformation.findAll({
        where: {
            isDeleted: false,
            warrantyExpiryDate: {
                [Op.between]: [new Date(), thirtyDaysFromNow]
            }
        },
        order: [['warrantyExpiryDate', 'ASC']],
        limit: 5
    });

    const warrantyAlerts = warrantyAlertsRaw.map(asset => {
        const diffTime = Math.abs(new Date(asset.warrantyExpiryDate) - new Date());
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
            asset: asset.assetName,
            daysLeft: daysLeft
        };
    });

    // 5. Reminders (Mocked for now or use subscription model if available)
    const reminders = [
        { provider:'Internet/Subscription', due:'Check Subscriptions', icon:'pi pi-wifi', class:'warning' }
    ];

    // 6. Recent Activities (Mocked for now)
    const recentActivities = [
        { icon: 'pi pi-chart-line', title: 'Dashboard Viewed', description: 'System check', time: 'Just now' }
    ];

    return {
        cards: {
            totalAssets,
            assignedAssets,
            availableAssets,
            underRepair
        },
        categoryData,
        recentAssets,
        warrantyAlerts,
        recentActivities,
        reminders
    };
};

const getNotifications = async () => {
    // Return some mock notifications for now, or query a Notifications table
    return [
        { message: '✅ System Online', time: new Date() },
        { message: '👤 Admin logged in', time: new Date() }
    ];
};

export default {
    getDashboardStats,
    getNotifications
};
