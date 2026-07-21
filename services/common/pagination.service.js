import { Op } from "sequelize";

const getPaginatedData = async ({
    model,
    query,
    searchFields = [],
    where = {},
    include = [],
    allowedSortFields = ["id"]

}) => {
    let {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "id",
        sortOrder = "DESC"
    } = query;

    page = Number(page);
    limit = Number(limit);

    if (page < 1) page = 1;

    if (limit < 1) limit = 10;

    if (limit > 100) limit = 100;

    /* ==========================================
    Sort Validation
========================================== */

    if (!allowedSortFields.includes(sortBy)) {
        sortBy = "id";
    }

    sortOrder = String(sortOrder).toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
        sortOrder = "DESC";
    }

    const offset = (page - 1) * limit;
    const whereCondition = {
        ...where,
        isDeleted: false
    };

    if (search && searchFields.length > 0) {
        whereCondition[Op.or] = searchFields.map(field => ({
            [field]: {
                [Op.like]: `%${search}%`
            }
        }));
    }

    const { rows, count } = await model.findAndCountAll({
        where: whereCondition,
        include,
        limit,
        offset,
        order: [
            [sortBy, sortOrder]
        ]
    });

    return {
        data: rows,
        pagination: {
            totalRecords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        }
    };
};

export {
    getPaginatedData
};