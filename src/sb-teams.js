import {Component, EventEmitter, Output} from 'angular2/core';

import {sbData} from './sb-data';

import {Events} from './events';

import {uniq, flattenDeep} from 'lodash';

@Component({
  selector: 'sb-teams',
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
  template: `<div class="header">Teams <small>listed by first appearance in a super bowl</small></div>
    <div *ngFor="#sb of superBowlTeams; #index=index" class="sb-titles">
    <div (click)="chooseTeam(sb.name)" [class]="sb.class">{{sb.name}}</div></div>
    `,
})
export class sbTeams {
  constructor(event: Events) {
    this.event = event;
    let superBowlTeamNames = [];
    for (const sbName in sbData) {
      superBowlTeamNames.push(sbData[sbName].teams);
    }
    superBowlTeamNames = uniq(flattenDeep(superBowlTeamNames));

    this.superBowlTeams = superBowlTeamNames.map((team) => {
      return {
        name: team,
        class: 'clickable',
      };
    });

    this.event.clickYear.subscribe((year) => {
      const yearObject = sbData[year];
      this.superBowlTeams.map((team) => {
        if(yearObject && (yearObject.teams[0] === team.name || yearObject.teams[1] === team.name)) {
          team.class = 'clickable chosen';
        } else {
          team.class = 'clickable';
        }
      });
    });
  }

  @Output() chosen = new EventEmitter();

  chooseTeam(team) {
    let chosenTeam = team;
    if (this.previouslyChosenTeam === chosenTeam) {
      chosenTeam = undefined;
    }
    this.event.clickTeam.emit(chosenTeam);
    this.chosen.emit(chosenTeam);
    this.superBowlTeams.map((mapTeam) => {
      if(mapTeam.name === chosenTeam) {
        mapTeam.class = 'clickable chosen';
      } else {
        mapTeam.class = 'clickable';
      }
    });
    this.previouslyChosenTeam = chosenTeam;
  }

}
