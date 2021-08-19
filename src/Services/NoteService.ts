import { INote } from '../types/note-types';

const localStorageName = 'notes';

export default class NoteService {
  static getNotes() {
    try {
      const notes = localStorage.getItem(localStorageName);
      if (notes === null) return undefined;
      return JSON.parse(notes);
    } catch (e) {
      console.warn(e);
      return undefined;
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
