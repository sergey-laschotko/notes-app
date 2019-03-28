import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotesService } from "../notes.service";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  constructor(private ns: NotesService, private router: Router) { }

  ngOnInit() {
  }

  createNote(data) {
    this.ns.createNote(data.title, data.content);
    this.router.navigate(['/']);
  }
}
