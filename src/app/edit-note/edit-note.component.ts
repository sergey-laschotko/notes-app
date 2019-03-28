import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotesService } from "../notes.service";
import { INote } from "../../models/note";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note: INote = {
    id: "",
    title: "",
    content: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotesService
  ) { 
    this.ns.getNote(this.route.snapshot.params.id)
      .then((note: INote) => {
        this.note = note;
      });
  }

  ngOnInit() {
  }

  editNote(data: {title: string, content: string}) {
    this.note.title = data.title;
    this.note.content = data.content;
    this.ns.updateNote(this.note);
    this.router.navigate(['/']);
  }
}
