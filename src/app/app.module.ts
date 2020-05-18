import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayService } from './playservice';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'play', component: PlayComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '', redirectTo: '/play', pathMatch: 'full'}
    ])
  ],
  providers: [PlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
