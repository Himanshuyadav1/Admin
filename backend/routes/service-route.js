import { Router } from "express";
import ServiceController from "../controllers/service-controller.js";
const router = Router();

router.route('/service').get(ServiceController.services);

export default router;