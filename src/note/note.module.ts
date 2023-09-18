import { Module } from "@nestjs/common";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Note } from "./note.model";
import { NoteGroup } from "./note-group.model";

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [SequelizeModule.forFeature([Note, NoteGroup])],
})
export class NotesModule {}
