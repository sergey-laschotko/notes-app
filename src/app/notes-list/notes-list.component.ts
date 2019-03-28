import { Component, OnInit } from '@angular/core';

import { INote } from "../../models/note";
import { NotesService } from "../notes.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: INote[] = [];

  constructor(private ns: NotesService) {
    this.getNotes();
  }

  ngOnInit() {
  }

  getNotes() {
    this.ns.getNotes()
      .then((notes: INote[]) => {
        this.notes = notes;
      });
  }

  removeNote() {
    this.getNotes();
  }

}
