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

  findByTag(tag: string) {
    this.notes = this.ns.findByTag(tag);
  }

  removeTag(tag: string) {
    this.notes = this.ns.removeTag(tag);
    this.getTags();
  }
}
