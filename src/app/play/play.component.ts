import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { PlayService } from '../playservice';

/**
 * Component, where the playing happens.
 */
@Component({
  selector: 'app-play',
  template: `
  <!-- Show question's index, if quiz isn't over. -->
  <div *ngIf="!quizOver" class="questionNumber">Question {{curQuestionIndex + 1}} of {{questions.length}}</div>

  <!-- If quiz is over, show the "Play again" -button. -->
  <div *ngIf="quizOver" class="quizFinished">Quiz finished! <br/>
  <button (click)="refresh()">Play again</button></div><br/>

  <!-- Show question and answers. -->
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

  <!-- Show lifelines, if quiz isn't over. -->
  <div *ngIf="!quizOver" class="lifelineText">Lifelines remaining: {{lifelines}}</div>
  <div *ngIf="lifelines > 0 && !quizOver">
    <button (click)="showhint()">Show hint</button>&nbsp;
    <button (click)="removeAnswer()">Remove answer</button>
  </div>

  <!-- Show hint text, if user clicked "Show hint" -button. -->
  <div *ngIf="hinttextClicked" class="hintText">{{decodeHtml(hintText)}}</div>

  <!-- If quiz is over, show/hide results. -->
  <div *ngIf="quizOver">
    <div *ngIf="!showResults">
      <button (click)="showResultsClicked()">Show results</button>
    </div>
    <div *ngIf="showResults">
      <button (click)="showResultsClicked()">Hide results</button>
    </div>
  </div>

  <!-- Show results. -->
  <div *ngIf="showResults">
    <h2>Results</h2>
    You got {{correctAnswers}} correct answers out of {{questions.length}} questions.<br/><br/>
    <div *ngFor="let answer of userAnswers; let i = index;">
      <b>Question:</b> {{decodeHtml(questions[i].question)}} <br/>
      <b>Correct answer:</b> {{decodeHtml(questions[i].correct_answer)}} <br/>
      <b>You answered:</b> {{decodeHtml(answer)}} <br/><br/>
    </div>
  </div>`,
  styleUrls: ['./play.component.css']
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

  /**
   * Constructor.
   * @param playService Service, which is used to fetch questions.
   */
  constructor(private playService: PlayService) { }

  /**
   * Define variables and fetch questions.
   */
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

  /**
   * Used to "decode" questions, answers and hinttexts. When fetching data from opentdb.com, sometimes
   * there are "&quot" marks in the data, so this function removes them.
   * @param html Text to be decoded.
   */
  decodeHtml(html) {
    if (html === undefined) {
      return null;
    }
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  /**
   * Show/hide results.
   */
  showResultsClicked() {
    this.showResults = !this.showResults;
  }

  /**
   * Shuffle the array, where are correct and incorrect answers.
   * @param array Array, which includes correct and incorrect answers.
   */
  shuffle(array): void {
    array.sort(() => Math.random() - 0.5);
  }

  /**
   * Called, when user clicks one of the answers.
   * @param answer Answer, which was clicked.
   */
  clicked(answer: string) {
    this.hinttextClicked = false;

    if (answer === this.questions[this.curQuestionIndex].correct_answer) {
      this.correctAnswers++;
    }

    this.userAnswers.push(answer);
    this.curQuestionIndex++;

    if (this.curQuestionIndex === this.questions.length) {
      this.quizOver = true;
    }
  }

  /**
   * Called, when user clicks "Play again" -button.
   */
  refresh(): void {
    window.location.reload();
  }

  /**
   * Called, when user clicks "Show hint" -button. There is around 70% chance, that the hint
   * is correct.
   */
  showhint() {
    const randomNumber = (Math.floor(Math.random() * 10) + 1);

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

  /**
   * Called, when user clicks "Remove answer" -button. Removes one wrong answer.
   */
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
