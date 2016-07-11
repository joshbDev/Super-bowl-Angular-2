import {Component, EventEmitter, Output} from 'angular2/core';

import {sbData} from './sb-data';

import {Events} from './events';

@Component({
  selector: 'sb-year',
  styles: [`.sb-titles {
    display: inline-block;
    margin: 10px;
    font-size: 15px;
    -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  -ms-transition: all .3s linear;
  -o-transition: all .3s linear;
  transition: all .3s linear;
  }
  .sb-titles:hover {
    color: #666;
    font-size: 17px;
  }
  .header {
      display: block;
      font-size: 40px;
    }
  small {
    font-size: 20px;
    color: #666;
  }`, '.chosen {font-weight: 600; font-size: 23px;}'],
  template: `<div class="header">Year</div><div *ngFor="#sb of superBowlYears; #index=index" class="sb-titles">
    <div (click)="chooseYear(index)" [class]="sb.class">{{sb.name}}</div></div>
    `,
})
export class sbYear {
  constructor(event: Events) {
    this.event = event;
    this.event.clickTeam.subscribe((team) => {
      this.superBowlYears.map((year) => {
        if (year.teams[0] === team || year.teams[1] === team) {
          year.class = 'clickable chosen';
        } else {
          year.class = 'clickable';
        }
      });
    });
    this.superBowlYears = [];
    for (const sbName in sbData) {
      const dataToPush = sbData[sbName];
      dataToPush.name = sbName;
      dataToPush.class = 'clickable';
      this.superBowlYears.push(dataToPush);
    }
  }

  @Output() chosen = new EventEmitter();

  chooseYear(index) {
    let chosenIndex = index;

    if (this.previouslyChosenIndex === chosenIndex) {
      chosenIndex = undefined;
    }
    this.superBowlYears.map((year, index) => {
      year.class = index === chosenIndex ? 'clickable chosen' : 'clickable';
    });
    const chosenObject = this.superBowlYears[chosenIndex];
    this.chosen.emit(chosenObject && chosenObject.name);
    this.event.clickYear.emit(chosenObject && chosenObject.name);
    this.previouslyChosenIndex = index;
  }

}
