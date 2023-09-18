import { Module } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
import { JwtModule } from "@nestjs/jwt";
import { User } from "src/user/user.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: "30d",
      },
    }),
  ],
})
export class AuthorizationModule {}
