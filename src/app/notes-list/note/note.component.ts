import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotesService } from "../../notes.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() content: string = "";
  @Output() removeNote = new EventEmitter();

  constructor(private ns: NotesService) { }

  remove() {
    this.ns.removeNote(this.id);
    this.removeNote.emit();
  }
}
