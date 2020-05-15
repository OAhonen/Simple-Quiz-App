import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { ItemResponse } from './itemresponse';

@Injectable()
export class PlayService {
  private http: HttpClient;
  questions: Question[] = [];
  amount = '5';
  difficulty = 'easy';
  category = '9';

  constructor(http: HttpClient) {
    this.http = http;
  }

  checkStorage() {
    if (localStorage.getItem('amount') !== null) {
      this.amount = localStorage.getItem('amount');
    }
    if (localStorage.getItem('difficulty') !== null) {
      this.difficulty = localStorage.getItem('difficulty');
    }
    if (localStorage.getItem('category') !== null) {
      this.category = localStorage.getItem('category');
    }
  }

  fetchQuestions(callBackFunction: (result: Question[]) => void): void {
    this.checkStorage();
    this.http.get<ItemResponse>(`
    https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`)
    .subscribe((jsonObject) => {
      this.questions = jsonObject.results;
      callBackFunction(this.questions);
    });
  }
}
