import { Router } from "express";
const router = Router();
import ContactController from "../controllers/contact-controller.js";

router.route('/contact').post(ContactController.contactForm);

export default router;