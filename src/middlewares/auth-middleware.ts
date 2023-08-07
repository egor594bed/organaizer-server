import { Request, Response, NextFunction } from "express";
import tokenService from "../services/token-service";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Подумать как и что возвращать (ошибку, cтатус, токен)
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Заголовок с токеном не найден" });
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Токен не найден" });
    }

    const isValidToken = await tokenService.verifyAccessToken(accessToken);

    if (!isValidToken) {
      return res.status(401).json({ message: "Токен не действителен" });
    }

    const tokenData = tokenService.getDataFromToken(accessToken);

    req.body.tokenData = tokenData;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Что-то пошло не так!" });
  }
}
