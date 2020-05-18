import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-settings',
  template: `
  <form [formGroup]="form" (ngSubmit)="submit()">

  <label for="difficulties">Difficulty:&nbsp;</label>
  <select formControlName="difficulties" id="difficulties">
    <option *ngFor="let difficulty of difficulties; let i = index" [value]="difficulties[i].id">
      {{difficulties[i].name}}
    </option>
  </select>
  <br/>

  <label for="amount">Amount of questions:&nbsp;</label>
  <select formControlName="amount" id="amount">
    <option *ngFor="let a of amount; let i = index" [value]="amount[i].id">
      {{amount[i].name}}
    </option>
  </select>
  <br/>

  <label for="categories">Category:&nbsp;</label>
  <select formControlName="categories" id="categories">
    <option *ngFor="let category of categories; let i = index" [value]="categories[i].id">
      {{categories[i].name}}
    </option>
  </select>

  <br><br>
  <button>Save</button>
  </form>
  <div *ngIf="saved">Settings saved.</div>`,
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  difficulties = [];
  amount = [];
  categories = [];
  saved = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      difficulties: [''],
      amount: [''],
      categories: ['']
    });

    of(this.getDifficulties()).subscribe(difficulties => {
      this.difficulties = difficulties;
      if (localStorage.getItem('difficulty') !== null) {
        this.form.controls.difficulties.patchValue(localStorage.getItem('difficulty'));
      } else {
        this.form.controls.difficulties.patchValue(this.difficulties[0].id);
      }
    });

    of(this.getAmount()).subscribe(amount => {
      this.amount = amount;
      if (localStorage.getItem('amount') !== null) {
        this.form.controls.amount.patchValue(localStorage.getItem('amount'));
      } else {
        this.form.controls.amount.patchValue(this.amount[0].id);
      }
    });

    of(this.getCategories()).subscribe(categories => {
      this.categories = categories;
      if (localStorage.getItem('category') !== null) {
        this.form.controls.categories.patchValue(localStorage.getItem('category'));
      } else {
        this.form.controls.categories.patchValue(this.categories[0].id);
      }
    });
  }

  getDifficulties() {
    return [
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' }
    ];
  }

  getAmount() {
    return [
      { id: '5', name: '5' },
      { id: '7', name: '7' },
      { id: '10', name: '10' }
    ];
  }

  getCategories() {
    return [
      { id: '9', name: 'General knowledge' },
      { id: '22', name: 'Geography' },
      { id: '23', name: 'History' },
      { id: '21', name: 'Sports' },
      { id: '15', name: 'Video games' }
    ];
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value);
    localStorage.setItem('amount', this.form.value.amount);
    localStorage.setItem('difficulty', this.form.value.difficulties);
    localStorage.setItem('category', this.form.value.categories);
    console.log(localStorage.getItem('amount'));
    console.log(localStorage.getItem('difficulty'));
    console.log(localStorage.getItem('category'));
    this.saved = true;
  }

}
