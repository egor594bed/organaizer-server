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

@Controller("notes")
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get("getNotes")
  getNotes() {
    return this.noteService.getNotes();
  }

  @Post("createNoteGroup")
  createNoteGroup(@Body() newNoteGroupData: NoteGroup) {
    return this.noteService.createNoteGroup(newNoteGroupData);
  }

  @Delete("deleteNoteGroup")
  deleteNoteGroup(@Query("noteGroupId") noteGroupId: string) {
    return this.noteService.deleteNoteGroup(noteGroupId);
  }

  @Post("createNote")
  createNote(@Body() newNoteData: Note) {
    return this.noteService.createNote(newNoteData);
  }

  @Patch("updateNote")
  updateNote(
    @Body() updateNoteData: { noteId: string; updateNoteFields: Note },
  ) {
    return this.noteService.updateNote(updateNoteData);
  }

  @Delete("deleteNote")
  deleteNote(@Query("noteId") noteId: string) {
    return this.noteService.deleteNote(noteId);
  }
}
