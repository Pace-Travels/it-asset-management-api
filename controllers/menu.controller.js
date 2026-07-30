import model from "../models/index.js";
import { ReE, ReS } from "../services/util.service.js";
import validation from "../validation/menu.validation.js";
import MESSAGE from "../constants/messages.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

const add = async (req, res) => {

    try {

        const { error } = validation.addMenu.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            parentId,
            name,
            route,
            icon,
            sortOrder

        } = req.body;

        const menuExists = await model.Menu.findOne({

            where: {

                name,

                isDeleted: false

            }

        });

        if (menuExists) {

            return ReE(res, "Menu already exists.", 409);

        }

        if (parentId) {

            const parentMenu = await model.Menu.findOne({

                where: {

                    id: parentId,

                    isDeleted: false

                }

            });

            if (!parentMenu) {

                return ReE(res, "Parent Menu not found.", 404);

            }

        }

        const menu = await model.Menu.create({

            parentId,

            name,

            route,

            icon,

            sortOrder

        });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: menu

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.Menu,

            query: req.query,

            include: [

                {

                    model: model.Menu,

                    as: "parentMenu",

                    attributes: [

                        "id",

                        "name"

                    ]

                }

            ],

            searchFields: [

                "name",

                "route"

            ],

            allowedSortFields: [

                "id",

                "name",

                "sortOrder",

                "createdAt"

            ]

        });

        return ReS(res, {

            message: MESSAGE.FETCHED,

            ...result

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchAll };


const fetchSingle = async (req, res) => {

    try {

        const menu = await model.Menu.findByPk(req.params.id, {

            include: [

                {

                    model: model.Menu,

                    as: "parentMenu",

                    attributes: [

                        "id",

                        "name"

                    ]

                }

            ]

        });

        if (!menu || menu.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            data: menu

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };


const update = async (req, res) => {

    try {

        const menu = await model.Menu.findByPk(req.params.id);

        if (!menu || menu.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } = validation.updateMenu.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message);

        }

        if (req.body.name) {

            const menuExists = await model.Menu.findOne({

                where: {

                    name: req.body.name,

                    isDeleted: false

                }

            });

            if (menuExists && menuExists.id !== menu.id) {

                return ReE(res, "Menu already exists.", 409);

            }

        }

        if (req.body.parentId) {

            if (Number(req.body.parentId) === Number(menu.id)) {

                return ReE(res, "Menu cannot be its own parent.", 422);

            }

            const parentMenu = await model.Menu.findOne({

                where: {

                    id: req.body.parentId,

                    isDeleted: false

                }

            });

            if (!parentMenu) {

                return ReE(res, "Parent Menu not found.", 404);

            }

        }

        await menu.update(req.body);

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: menu

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };

const remove = async (req, res) => {

    try {

        const menu = await model.Menu.findByPk(req.params.id);

        if (!menu || menu.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const childMenu = await model.Menu.findOne({

            where: {

                parentId: menu.id,

                isDeleted: false

            }

        });

        if (childMenu) {

            return ReE(

                res,

                "Child Menu exists. Delete child menu first.",

                409

            );

        }

        await menu.update({

            isDeleted: true,

            isActive: false

        });

        return ReS(res, {

            message: MESSAGE.DELETED

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { remove };

const changeStatus = async (req, res) => {

    try {

        const menu = await model.Menu.findByPk(req.params.id);

        if (!menu || menu.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await menu.update({

            isActive: !menu.isActive

        });

        return ReS(res, {

            message: "Status Updated Successfully",

            data: menu

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };