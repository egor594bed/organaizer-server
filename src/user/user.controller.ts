import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags("Пользовательские настройки")
@Controller("user")
export class UserController {}
