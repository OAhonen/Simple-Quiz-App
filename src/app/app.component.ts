import { Component } from '@angular/core';
import { PlayComponent } from './play/play.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="toparea"><h1>{{title}}</h1>
  <nav>
  <a routerLink="/play" routerLinkActive="active">Play</a>&nbsp;
  <a routerLink="/settings" routerLinkActive="active">Settings</a>
  </nav>
  </div>
  <div class="mainarea">
  <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Quiz App';
}
