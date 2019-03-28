import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() content: string = "";

  constructor() { }

  ngOnInit() {
  }

}
