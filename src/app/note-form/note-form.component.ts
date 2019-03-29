import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  @Input() title: string = "";
  @Input() content: string = "";
  @Input() action: string = "";
  @Output() transfer = new EventEmitter();
  tags: string[] = [];

  @ViewChild('noteContent') noteContent: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.getTags();
    this.noteContent.nativeElement.previousSibling.innerHTML = this.checkForTags();
    this.cdr.detectChanges();
  }

  sendData() {
    this.transfer.emit({
      title: this.title,
      content: this.content
    });

    this.title = "";
    this.content = "";
  }

  getTags() {
    let words: string[] = this.content.split(" ");
    let results: string[] = [];
    words.map((word: string) => {
      let w = word.trim();
      if (w[0] === "#" && w.length > 1) {
        results.push(w);
      }
    });
    results = _.uniq(results);
    this.tags = results;
  }

  checkForTags() {
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
    return words;
  }

  replaceTags(event: any) {
    if (event.keyCode === 32) {
      return;
    }
    const target = event.target;
    this.content = target.textContent;
    target.previousSibling.innerHTML = this.checkForTags();
    this.getTags();
  }

  preventEnter(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }
}
