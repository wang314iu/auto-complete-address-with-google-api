import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  val: any = {};

  ngOnInit() {}

  popVal() {
    console.log('input value one: ', this.val.one);
    console.log('input value two: ', this.val.two);
  }
}
