import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { Response } from "express";
import * as bcrypt from "bcryptjs";
import { IUserCreationAttributes, User } from "src/user/user.model";

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async login(authDto: IUserCreationAttributes, response: Response) {
    const user = await this.userRepository.findOne({
      where: { email: authDto.email },
    });

    if (!user) {
      throw new HttpException(
        "Неверные данные для входа",
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!isPasswordEquals) {
      throw new HttpException(
        "Неверные данные для входа",
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.generateToken(user.userId, user.email);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
    });

    return;
  }

  async registration(
    registrationData: IUserCreationAttributes,
    response: Response,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: registrationData.email },
    });

    if (user) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(registrationData.password, 5);

    const newUser = await this.userRepository.create({
      email: registrationData.email,
      password: hashedPassword,
    });

    const token = await this.generateToken(newUser.userId, newUser.email);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
    });

    return;
  }

  async generateToken(userId: number, email: string) {
    const payload = {
      userId,
      email,
    };

    return this.jwtService.sign(payload);
  }
}
