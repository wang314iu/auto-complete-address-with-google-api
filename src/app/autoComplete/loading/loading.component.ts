import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Output } from '@angular/core';
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
    `entry:hover {
        background-color: yellow;
      }`
  ]
})
export class LoadingComponent implements OnInit, AfterViewInit {
  private contents: Array<string>;
  list_items: Array<HTMLElement>;
  selected: Subject<string> = new Subject();

  constructor(private _changeRef: ChangeDetectorRef) { }

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
}
