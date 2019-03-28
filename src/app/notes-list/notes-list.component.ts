import { Component, OnInit } from '@angular/core';

import { INote } from "../../models/note";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: INote[] = [
    {
      id: "12312",
      title: "Some text",
      content: "The first note content"
    },
    {
      id: "12312",
      title: "First Note",
      content: "Some text that is content of current note and can be changed"
    },
    {
      id: "12312",
      title: "First Note",
      content: "The first note content"
    },
    {
      id: "12312",
      title: "First Note",
      content: "The first note content"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
