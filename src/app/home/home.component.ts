import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<p>This is a simple quiz project. Click play to start.</p>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
