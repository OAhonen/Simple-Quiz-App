import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { PlayService } from '../playservice';

@Component({
  selector: 'app-play',
  template: `
  <div *ngIf="!quizOver">Question {{curQuestionIndex + 1}} of {{questions.length}}</div>
  <div *ngIf="quizOver">Quiz finished! <br/>
  <button (click)="refresh()">Play again</button></div>

  <div *ngFor="let question of questions; let i = index;">
    <div *ngIf="curQuestionIndex === i">
      <h3>{{decodeHtml(question.question)}}</h3>
      <ul>
        <li
          *ngFor="let answer of question.all_answers;"
          (click)="clicked(answer)">{{decodeHtml(answer)}}</li>
      </ul>
    </div>
  </div>

  <div *ngIf="!quizOver">Lifelines remaining: {{lifelines}}</div>
  <div *ngIf="lifelines > 0 && !quizOver">
    <button (click)="showhint()">Show hint</button>
    <button (click)="removeAnswer()">Remove answer</button>
  </div>

  <div *ngIf="hinttextClicked">{{decodeHtml(hintText)}}</div>

  <div *ngIf="quizOver">
    <div *ngIf="!showResults">
      <button (click)="showResultsClicked()">Show results</button>
    </div>
    <div *ngIf="showResults">
      <button (click)="showResultsClicked()">Hide results</button>
    </div>
  </div>

  <div *ngIf="showResults">
    <h2>Results</h2>
    You got {{correctAnswers}} correct answers out of {{questions.length}} questions.<br/><br/>
    <div *ngFor="let answer of userAnswers; let i = index;">
      <b>Question:</b> {{decodeHtml(questions[i].question)}} <br/>
      <b>Correct answer:</b> {{decodeHtml(questions[i].correct_answer)}} <br/>
      <b>You answered:</b> {{decodeHtml(answer)}} <br/><br/>
    </div>
  </div>`
})
export class PlayComponent implements OnInit {
  questions: Question[] = [];
  correctAnswers: number;
  curQuestionIndex: number;
  quizOver: boolean;
  lifelines: number;
  hintText: string;
  hinttextClicked: boolean;
  userAnswers: string[] = [];
  showResults = false;

  constructor(private playService: PlayService) { }

  ngOnInit(): void {
    this.correctAnswers = 0;
    this.curQuestionIndex = 0;
    this.lifelines = 2;
    this.quizOver = false;
    this.hinttextClicked = false;
    this.playService.fetchQuestions((result) => {
      this.questions = result;
      for (const question of this.questions) {
        question.all_answers = question.incorrect_answers;
        question.all_answers.push(question.correct_answer);
        this.shuffle(question.all_answers);
      }
    });
  }

  decodeHtml(html) {
    if (html === undefined) {
      return null;
    }
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  showResultsClicked() {
    this.showResults = !this.showResults;
  }

  shuffle(array): void {
    array.sort(() => Math.random() - 0.5);
  }

  clicked(answer: string) {
    console.log(answer);
    console.log(this.questions[this.curQuestionIndex].correct_answer);

    this.hinttextClicked = false;

    if (answer === this.questions[this.curQuestionIndex].correct_answer) {
      console.log('yes');
      this.correctAnswers++;
    } else {
      console.log('no');
    }
    this.userAnswers.push(answer);
    this.curQuestionIndex++;

    if (this.curQuestionIndex === this.questions.length) {
      this.quizOver = true;
    }
  }

  refresh(): void {
    window.location.reload();
  }

  showhint() {
    const randomNumber = (Math.floor(Math.random() * 10) + 1);
    console.log(randomNumber);
    if (randomNumber <= 7) {
      this.hintText = 'Correct answer might be ' + this.questions[this.curQuestionIndex].correct_answer + '.';
    } else {
      if (this.questions[this.curQuestionIndex].all_answers[0] !== this.questions[this.curQuestionIndex].correct_answer &&
        this.questions[this.curQuestionIndex].all_answers[0] !== undefined) {
        this.hintText = 'Correct answer might be ' + this.questions[this.curQuestionIndex].all_answers[0] + '.';
      } else {
        if (this.questions[this.curQuestionIndex].all_answers[1] !== undefined) {
          this.hintText = 'Correct answer might be ' + this.questions[this.curQuestionIndex].all_answers[1] + '.';
        } else {
          this.hintText = 'Correct answer might be ' + this.questions[this.curQuestionIndex].all_answers[2] + '.';
        }
      }
    }

    this.lifelines--;
    this.hinttextClicked = true;
  }

  removeAnswer() {
    let randomNumber = (Math.floor(Math.random() * 4));
    let removed = false;

    while (!removed) {
      if ((this.questions[this.curQuestionIndex].all_answers[randomNumber] !==
        this.questions[this.curQuestionIndex].correct_answer) &&
        (this.questions[this.curQuestionIndex].all_answers[randomNumber] !== undefined)) {
          delete this.questions[this.curQuestionIndex].all_answers[randomNumber];
          this.lifelines--;
          removed = true;
      } else {
        randomNumber = (Math.floor(Math.random() * 4));
      }
    }
  }

}
