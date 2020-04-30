import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { PlayService } from '../playservice';

@Component({
  selector: 'app-play',
  template: `
  <div *ngIf="!quizOver">Question {{curQuestionIndex + 1}} of {{questions.length}}</div>
  <div *ngIf="quizOver">Quiz finished!</div>
  <div *ngIf="quizOver">You got {{correctAnswers}} correct answers out of {{questions.length}} questions.<br/>
  <button (click)="refresh()">Play again</button></div>

  <div *ngFor="let question of questions; let i = index;">
  <div *ngIf="curQuestionIndex === i">
    <h3>{{question.question}}</h3>
    <ul>
      <li
        *ngFor="let answer of question.all_answers"
        (click)="clicked(answer)">{{answer}}</li>
    </ul>
  </div>
  </div>`
})
export class PlayComponent implements OnInit {
  questions: Question[] = [];
  correctAnswers: number;
  curQuestionIndex: number;
  quizOver: boolean;

  constructor(private playService: PlayService) { }

  ngOnInit(): void {
    this.correctAnswers = 0;
    this.curQuestionIndex = 0;
    this.quizOver = false;
    this.playService.fetchQuestions((result) => {
      this.questions = result;
      for (const question of this.questions) {
        question.all_answers = question.incorrect_answers;
        question.all_answers.push(question.correct_answer);
        this.shuffle(question.all_answers);
      }
    });
  }

  shuffle(array): void {
    array.sort(() => Math.random() - 0.5);
  }

  clicked(answer: string) {
    console.log(answer);
    console.log(this.questions[this.curQuestionIndex].correct_answer);

    if (answer === this.questions[this.curQuestionIndex].correct_answer) {
      console.log('yes');
      this.correctAnswers++;
    } else {
      console.log('no');
    }
    this.curQuestionIndex++;

    if (this.curQuestionIndex === this.questions.length) {
      this.quizOver = true;
    }
  }

  refresh(): void {
    window.location.reload();
  }

}
