import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
    `.entry {
       list-style: none;
       margin: 1px;
       border:1px grey;
       padding:2px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       background-color: transparent;
       cursor: pointer
       }
       `,
  ]
})
export class LoadingComponent implements OnInit, AfterViewInit {
  private contents: Array<string>;
  list_items: Array<HTMLElement>;
  selected: Subject<string> = new Subject();
  addressEl: any;

  constructor(
    private _changeRef: ChangeDetectorRef,
    private _ref: ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  setContents(val: Array<string>): void {
    this.contents = val;
    this._changeRef.detectChanges();
  }
  selectAddress(ev) {
    const target = <HTMLElement>ev.target;
    this.selected.next(target.title);
  }
  focus() {
    this._ref.nativeElement.focus();
  }
  highlight(ev) {
    const target = <HTMLElement>ev.target;
    target.style.backgroundColor = '#e6eeff';
  }
  removeHighlight(ev) {
    const target = <HTMLElement>ev.target;
    target.style.backgroundColor = 'transparent';
  }
}
