import { Injectable } from "@nestjs/common";
import { NoteGroup } from "./note-group.model";
import { Note } from "./note.model";

@Injectable()
export class NoteService {
  updateNote(updateNoteData: { noteId: string; updateNoteData: Note }) {
    throw new Error("Method not implemented.");
  }
  deleteNoteGroup(noteGroupId: string) {
    throw new Error("Method not implemented.");
  }
  deleteNote(noteId: string) {
    throw new Error("Method not implemented.");
  }
  createNote(newNoteData: Note) {
    throw new Error("Method not implemented.");
  }
  createNoteGroup(newNoteGroupData: NoteGroup) {
    throw new Error("Method not implemented.");
  }
  getNotes() {
    throw new Error("Method not implemented.");
  }
}
