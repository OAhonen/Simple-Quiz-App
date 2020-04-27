import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { PlayService } from '../playservice';

@Component({
  selector: 'app-play',
  template: `<div *ngIf="questions.length">

  <h2>Questions</h2>
  <div *ngFor='let question of questions'> {{question.question}} {{question.incorrect_answers}} </div>

</div>`
})
export class PlayComponent implements OnInit {
  hero = 'Windstrom';
  questions: Question[] = [];

  constructor(private playService: PlayService) { }

  ngOnInit(): void {
    if (this.questions.length === 0) {
      this.playService.fetchQuestions((result) => this.questions = result);
    }
  }

}
