import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  // templateUrl: './not-found.component.html',
  template: `<div><img src="https://cdn.dribbble.com/users/1129101/screenshots/3513987/404.gif" alt=""></div>`,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
