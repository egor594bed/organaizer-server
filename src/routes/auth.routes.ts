import { Router } from "express";
import { check } from "express-validator";
import userAuthController from "../controllers/user-auth-controller";
const router = Router();

module.exports = router;

router.post(
  "/registration",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длинна пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  userAuthController.registration
);

router.post(
  "/login",
  [
    check("email", "Введите корректный Email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  userAuthController.login
);

router.get("/tokenVerification", userAuthController.tokenVerification);
