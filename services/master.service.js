import { Op } from "sequelize";

class MasterService {

    /**
     * Get All
     */
    async getAll(model, query = {}) {

        const page = Number(query.pageNumber) || 1;
        const limit = Number(query.pageSize) || 10;
        const search = query.search || "";
        const sort = query.sort || "id";
        const order = query.order || "DESC";

        const offset = (page - 1) * limit;

        const where = {
            isDeleted: false
        };

        if (search && model.rawAttributes.name) {
            where.name = {
                [Op.like]: `%${search}%`
            };
        }

        const { rows, count } = await model.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sort, order]]
        });

        return {
            rows,
            pagination: {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                pageSize: limit
            }
        };

    }

    /**
     * Get By Id
     */
    async getById(model, id) {
        return await model.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
    }

    /**
     * Create
     */
    async create(model, data) {
        return await model.create(data);
    }

    /**
     * Update
     */
    async update(model, id, data) {
        const record = await this.getById(model, id);
        if (!record) {
            return null;
        }
        await record.update(data);
        return record;

    }

    /**
     * Soft Delete
     */
    async delete(model, id) {
        const record = await this.getById(model, id);
        if (!record) {
            return null;
        }
        await record.update({
            isDeleted: true
        });
        return true;
    }

    /**
     * Active / Inactive
     */
    async changeStatus(model, id, status) {
        const record = await this.getById(model, id);
        if (!record) {
            return null;
        }
        await record.update({
            isActive: status
        });
        return record;
    }

}

export default new MasterService();