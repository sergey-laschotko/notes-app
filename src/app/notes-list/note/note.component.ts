import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

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

  @ViewChild('noteContent') noteContent: any;

  constructor(private ns: NotesService) { }

  ngAfterViewInit() {
    this.replaceByHashes(this.noteContent.nativeElement);
  }

  remove() {
    this.ns.removeNote(this.id);
    this.removeNote.emit();
  }

  replaceByHashes(element) {
    let text = this.content;
    let words: any;
    words = text.split(" ");
    words = words.map((word: string) => {
      if (word[0] === "#" && word.length > 1) {
        word = `<span class='hashtag'>${word}</span>`;
      }
      return word;
    });
    words = words.join(" ");
    element.innerHTML = words;
  }
}
