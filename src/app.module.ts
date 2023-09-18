import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthorizationModule } from "./authorization/authorization.module";
import { TasksModule } from "./task/task.module";
import { NotesModule } from "./note/note.module";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.model";
import { Task } from "./task/task.model";
import { NoteGroup } from "./note/note-group.model";
import { Note } from "./note/note.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Task, NoteGroup, Note],
      autoLoadModels: true,
    }),
    AuthorizationModule,
    UserModule,
    TasksModule,
    NotesModule,
  ],
})
export class AppModule {}
