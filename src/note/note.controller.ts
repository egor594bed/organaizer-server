import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteGroup } from "./note-group.model";
import { Note } from "./note.model";
import { CreateNoteDto, CreateNoteGroupDto } from "./dto/createNotesDto";

@ApiTags("Заметки")
@Controller("notes")
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get("getNotes")
  getNotes() {
    return this.noteService.getNotes();
  }

  @ApiOperation({ summary: "Создание группы заметок" })
  @ApiResponse({ type: NoteGroup })
  @Post("createNoteGroup")
  createNoteGroup(@Body() newNoteGroupData: CreateNoteGroupDto) {
    return this.noteService.createNoteGroup(newNoteGroupData);
  }

  @ApiOperation({ summary: "Удаление группы заметок" })
  @Delete("deleteNoteGroup")
  deleteNoteGroup(@Query("noteGroupId") noteGroupId: string) {
    return this.noteService.deleteNoteGroup(noteGroupId);
  }

  @ApiOperation({ summary: "Создание заметки" })
  @ApiResponse({ type: Note })
  @Post("createNote")
  createNote(@Body() newNoteData: CreateNoteDto) {
    return this.noteService.createNote(newNoteData);
  }

  @ApiOperation({ summary: "Обновление заметки" })
  @ApiResponse({ type: Note })
  @Patch("updateNote")
  updateNote(
    @Body() updateNoteData: { noteId: string; updateNoteFields: Note },
  ) {
    return this.noteService.updateNote(updateNoteData);
  }

  @ApiOperation({ summary: "Удаление заметки" })
  @Delete("deleteNote")
  deleteNote(@Query("noteId") noteId: string) {
    return this.noteService.deleteNote(noteId);
  }
}
