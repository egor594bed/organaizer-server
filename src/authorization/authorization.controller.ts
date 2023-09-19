import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/createUserDto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthorizationController {
  constructor(private authService: AuthorizationService) {}

  @ApiOperation({ summary: "Логин" })
  @Post("login")
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: CreateUserDto,
  ) {
    return this.authService.login(authDto, response);
  }

  @ApiOperation({ summary: "Регистрация" })
  @Post("registration")
  registration(
    @Res({ passthrough: true }) response: Response,
    @Body() registrationData: CreateUserDto,
  ) {
    return this.authService.registration(registrationData, response);
  }
}
