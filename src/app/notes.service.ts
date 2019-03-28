import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqid from "uniqid";
import * as _ from "lodash";

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

  getTages() {
    return this.isReady
      .then(() => {
        let tags: string[] = [];
        this.notes.forEach((note: INote) => {
          let words = note.content.split(" ");
          words.map((word: string) => {
            if (word[0] === "#") {
              tags.push(word);
            }
          });
        });
        tags = _.uniq(tags);
        return tags;
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

  findByTag(tag: string) {
    if (!tag.length) {
      return this.notes;
    }
    if (tag[0] !== "#") {
      return [];
    }
    let results = [];
    this.notes.map((note: INote) => {
      let words = note.content.split(" ");
      let resultsNumber = 0;
      words.forEach((word: string) => {
        if (word === tag) {
          resultsNumber += 1;
        }
      });
      if (resultsNumber > 0) {
        results.push(note);
      }
    });
    return results;
  }

  removeTag(tag: string) {
    this.notes = this.notes.map((note: INote) => {
      let words = note.content.split(" ");
      words = words.map((word: string) => {
        if (word === tag) {
          word = word.slice(1);
          return word;
        }
        return word;
      });
      let content = words.join(" ");
      return {
        id: note.id,
        title: note.title,
        content
      };
    });

    return this.notes;
  }
}
