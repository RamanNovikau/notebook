import { INote } from '../types/note-types';

const localStorageName = 'rn-app-notes-ls';

export default class NoteService {
  static getNotes() {
    try {
      const notes = localStorage.getItem(localStorageName);
      if (notes === null) return [] as INote[];
      return JSON.parse(notes);
    } catch (e) {
      console.warn(e);
      return [] as INote[];
    }
  }

  static saveNotes(notes: INote[]) {
    try {
      const serialisedNotes = JSON.stringify(notes);
      localStorage.setItem(localStorageName, serialisedNotes);
    } catch (e) {
      console.warn(e);
    }
  }
}
