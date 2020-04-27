import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>
  Welcome to play {{title}}!
  </h1>
  <nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/play" routerLinkActive="active">Play</a>
  </nav>
  <div>
  <router-outlet></router-outlet>
  </div>`,
  styles: ['.active { background-color: lightgray }']
})
export class AppComponent {
  title = 'Simple Quiz App';
}
