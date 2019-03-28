import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @Input() title: string = "";
  @Input() content: string = "";
  @Input() action: string = "";
  @Output() transfer = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendData() {
    this.transfer.emit({ 
      title: this.title,
      content: this.content
    });

    this.title = "";
    this.content = "";
  }
}
