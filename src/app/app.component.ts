import { Component } from '@angular/core';
import { PlayComponent } from './play/play.component';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
  <nav>
  <a routerLink="/play" routerLinkActive="active">Play</a>
  <a routerLink="/settings" routerLinkActive="active">Settings</a>
  </nav>
  <div>
  <router-outlet></router-outlet>
  </div>`,
  styles: []
})
export class AppComponent {
  title = 'Simple Quiz App';
}
