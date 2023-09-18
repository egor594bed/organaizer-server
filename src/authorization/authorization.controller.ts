import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { IUserCreationAttributes } from "src/user/user.model";

@Controller("auth")
export class AuthorizationController {
  constructor(private authService: AuthorizationService) {}

  @Post("login")
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: IUserCreationAttributes,
  ) {
    return this.authService.login(authDto, response);
  }

  @Post("registration")
  registration(
    @Res({ passthrough: true }) response: Response,
    @Body() registrationData: IUserCreationAttributes,
  ) {
    return this.authService.registration(registrationData, response);
  }
}
