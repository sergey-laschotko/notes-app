import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqid from "uniqid";

import { INote } from "../models/note";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  isReady: Promise<boolean>;
  notes: INote[] = [];

  constructor(private http: HttpClient) {
    this.isReady = new Promise((resolve, reject) => {
      this.http.get("assets/notes.json")
        .subscribe((result: INote[]) => {
          this.notes = result;
          resolve(true);
        });
    });
  }

  getNotes() { 
    return this.isReady
      .then(() => {
        return this.notes;
      });
  }

  getNote(id: string) {
    return this.isReady
      .then(() => {
        return this.notes.filter((note: INote) => note.id === id)[0];
      });
  }

  createNote(title: string, content: string) {
    this.notes.push({
      id: uniqid(),
      title,
      content
    });
  }

  updateNote(note: INote) {
    this.notes.map((currentNote: INote) => {
      if (note.id === currentNote.id) {
        currentNote = {...note};
      }
    });
  }

  removeNote(id: string) {
    this.notes = this.notes.filter((note: INote) => note.id !== id);
  }
}
