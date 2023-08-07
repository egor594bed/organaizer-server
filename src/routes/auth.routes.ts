import { Router, Request, Response } from "express";
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
  async (req: Request, res: Response) =>
    userAuthController.registration(req, res)
);

router.post(
  "/login",
  [
    check("email", "Введите корректный Email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req: Request, res: Response) => userAuthController.login(req, res)
);

router.get("/tokenVerification", async (req: Request, res: Response) =>
  userAuthController.tokenVerification(req, res)
);
