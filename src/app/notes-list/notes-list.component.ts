import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { INote } from "../../models/note";
import { NotesService } from "../notes.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: INote[] = [];
  tagedNotes: INote[] = [];
  tags: string[] = [];
  selectedTag: string = "";

  constructor(private ns: NotesService) {
    this.getNotes();
  }

  ngOnInit() {
  }

  getNotes() {
    this.ns.getNotes()
      .then((notes: INote[]) => {
        this.notes = notes;
        this.getTags();
        this.checkForTags(this.notes);
      });
  }

  getTags() {
    this.ns.getTages()
      .then((result: string[]) => {
        this.tags = result;
      });
  }

  removeNote() {
    this.getNotes();
  }

  checkForTags(notes: INote[]) {
    this.tagedNotes = [];
    notes.forEach((note: INote) => {
      let words = note.content.split(" ");
      words = words.map((word: string) => {
        if (word[0] === "#") {
          return word = `<span class="hashtag">${word}</span>`
        }
        return word;
      });
      let content = words.join(" ");
      let tagedNote = { 
        title: note.title,
        content,
        id: note.id
      };
      this.tagedNotes.push(tagedNote);
    });
  }

  findByTag(tag: string) {
    this.notes = this.ns.findByTag(tag);
      this.checkForTags(this.notes);
  }

  removeTag(tag: string) {
    this.notes = this.ns.removeTag(tag);
    this.checkForTags(this.notes);
    this.getTags();
  }
}
