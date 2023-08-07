import User from "../models/User";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
import Token from "../models/Token";

class UserAuthService {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      const user = new User({ email, password: hashedPassword });
      user.save();

      return res.status(201).json({
        message: "Пользователь создан",
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await userService.findUserByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      const isPasswordEquals = await bcrypt.compare(password, user.password);

      if (!isPasswordEquals) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      const tokens = tokenService.generateTokens({
        email,
        userId: String(user._id),
      });

      //Перетащить в сервис
      const newRefreshToken = await Token.create({
        userId: user._id,
        refreshToken: tokens.refreshToken,
      });
      newRefreshToken.save();

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({
        accessToken: tokens.accessToken,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }
  async tokenVerification(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken)
      return res.status(401).json({ message: "Токен не найден" });

    const isValidData = await tokenService.verifyTokens({
      accessToken: accessToken,
      refreshToken: req.cookies["refreshToken"],
    });

    if (!isValidData) {
      return res.status(401).json({ message: "Неверный токен" });
    }

    return res.status(200).json({
      accessToken: isValidData.accessToken,
    });
  }
}

export default new UserAuthService();
