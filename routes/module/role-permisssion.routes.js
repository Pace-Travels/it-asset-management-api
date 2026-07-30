import { Router } from "express";
import { add, changeStatus, fetchAll, fetchSingle, remove, update } from "../../controllers/role-permission.controller.js";

const router = Router();

router.post("/", add);
router.get('/', fetchAll);
router.get('/:id', fetchSingle);
router.put('/:id', update);
router.delete('/:id', remove)
router.get('/:id/status', changeStatus);

export default router;