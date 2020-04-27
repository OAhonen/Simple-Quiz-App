import { Component } from '@angular/core';
import { PlayComponent } from './play/play.component';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
  <app-play></app-play>`,
  styles: []
})
export class AppComponent {
  title = 'Simple Quiz App';
}
