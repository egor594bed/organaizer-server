import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Token";

interface IPayloadGen {
  email: string;
  userId: string;
}

type token = string;
type tokens = {
  accessToken: token;
  refreshToken: token;
};

class TokenService {
  generateTokens(payload: IPayloadGen) {
    const accessToken = jwt.sign(payload, config.get<string>("jwtAccess"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get<string>("jwtRefresh"), {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ userId: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ userId: userId, refreshToken });
    token.save();
    return token;
  }

  async verifyAccessToken(token: token) {
    try {
      jwt.verify(token, config.get<string>("jwtAccess"));
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyRefreshToken(token: token) {
    try {
      jwt.verify(token, config.get<string>("jwtAccess"));
      return true;
    } catch (error) {
      return false;
    }
  }

  async findRefreshToken(token: token) {
    return await Token.findOne({ refreshToken: String(token) });
  }

  async verifyTokens(tokens: tokens) {
    if (!tokens.refreshToken || !tokens.accessToken) return null;

    const decode = jwt.decode(tokens.accessToken) as IPayloadGen | null;

    const accessTokenValid = await this.verifyAccessToken(tokens.accessToken);
    if (accessTokenValid && decode) {
      return {
        accessToken: tokens.accessToken,
      };
    } else {
      const inDb = await this.findRefreshToken(tokens.refreshToken);

      if (!inDb) {
        return null;
      }

      const refreshTokenValid = await this.verifyRefreshToken(
        tokens.refreshToken
      );

      if (refreshTokenValid && decode) {
        const accessToken = jwt.sign(
          { userId: decode.userId, email: decode.email },
          config.get<string>("jwtAccess"),
          { expiresIn: "1h" }
        );
        return {
          accessToken: accessToken as token,
        };
      } else {
        return null;
      }
    }
  }

  getDataFromToken(token: token) {
    return jwt.decode(token) as IPayloadGen;
  }
}

export default new TokenService();
