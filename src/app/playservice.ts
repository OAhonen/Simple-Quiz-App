import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { ItemResponse } from './itemresponse';

@Injectable()
export class PlayService {
  private http: HttpClient;
  questions: Question[] = [];

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchQuestions(callBackFunction: (result: Question[]) => void): void {
    this.http.get<ItemResponse>('https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple')
    .subscribe((jsonObject) => {
      this.questions = jsonObject.results;
      callBackFunction(this.questions);
    });
  }
}
