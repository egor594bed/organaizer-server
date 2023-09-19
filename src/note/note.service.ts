import { Injectable } from "@nestjs/common";
import { NoteGroup } from "./note-group.model";
import { Note } from "./note.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateNoteDto, CreateNoteGroupDto } from "./dto/createNotesDto";

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note) private noteRepository: typeof Note,
    @InjectModel(NoteGroup) private noteGroupRepository: typeof NoteGroup,
  ) {}

  updateNote(updateNoteData: { noteId: string; updateNoteFields: Note }) {
    return this.noteRepository.update(updateNoteData.updateNoteFields, {
      where: { noteId: updateNoteData.noteId },
    });
  }

  deleteNoteGroup(noteGroupId: string) {
    return this.noteGroupRepository.destroy({
      where: { noteGroupId },
    });
  }

  deleteNote(noteId: string) {
    return this.noteRepository.destroy({
      where: { noteId },
    });
  }

  createNote(newNoteData: CreateNoteDto) {
    return this.noteRepository.create(newNoteData);
  }

  createNoteGroup(newNoteGroupData: CreateNoteGroupDto) {
    return this.noteGroupRepository.create(newNoteGroupData);
  }

  getNotes() {
    throw new Error("Method not implemented.");
  }
}
