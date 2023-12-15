import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import { signupSchema, loginSchema } from "../validators/auth-validator.js";
import authMiddleware from "../middlewares/auth-middleware.js";

router.route('/').get(AuthController.home);

router.route('/register').post(validate(signupSchema), AuthController.register);

router.route('/login').post(validate(loginSchema), AuthController.login);

router.route('/user').get(authMiddleware, AuthController.user);

export default router;