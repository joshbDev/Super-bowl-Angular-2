import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {sbYear} from './sb-year';
import {sbInfoDisplay} from './sb-info-display';
import {sbTeams} from './sb-teams';

import {sbData} from './sb-data';
import {Events} from './events';

@Component({
  selector: 'app',
  directives: [sbYear, sbInfoDisplay, sbTeams],
  styles: [`.bold-chosen {
    font-size: 30px;
    font-weight: 600;
  }
  sb-info-display {
    z-index: 1;
  }
  .game-display {
    margin-top: 50px;
  }
  .header {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .all-games {
    font-size: 25px;
    margin-top: 20px;
  }
  .all-games:hover {
    color: #666;
  }`],
  template: `<div class="header">Search the Super Bowls!</div>
  <div class="all-games"> Sort by...</div>
  <sb-teams (chosen)="chosenTeam($event)"></sb-teams>
  <sb-year (chosen)="chosenYear($event)"></sb-year>
  <div (click)="allGames()" class="clickable all-games">Or See All Super Bowls</div>
  <div *ngIf="yearInfo.length" class="game-display">
    <sb-info-display [sbInfo]="year" *ngFor="#year of yearInfo"></sb-info-display>
  </div>`,
})
class App {
  constructor() {
    this.yearInfo = {};
  }

  chosenTeam(team) {
    this.yearInfo = [];

    if (!team || this.previouslyChosenTeam === team) {
      delete this.previouslyChosenTeam;
      return;
    }
    for (const year in sbData) {
      const selectedYear = sbData[year];
      if (selectedYear.teams[0] !== team && selectedYear.teams[1] !== team) { continue;}
      const gameData = this.buildGameData(sbData[year], year);
      this.yearInfo.push(gameData, year);
    }
    this.previouslyChosenTeam = team;
  }
  allGames() {
    this.yearInfo = [];
    for (const year in sbData) {
      const gameData = this.buildGameData(sbData[year], year);
      this.yearInfo.push(gameData);
    }
  }
  chosenYear(year) {
    if (!year) {
      this.yearInfo = [];
      this.isTheChosenYear = '';
      return;
    }
    const sbChosen = sbData[year];
    this.isTheChosenYear = year;
    const gameData = this.buildGameData(sbChosen, year);
    this.yearInfo = [gameData];
  }

  buildGameData(object, year) {
    object.superBowlLogo = `img/Super_Bowl_${year}`;
    object.winningTeam = {
      teamLogo: `img/${object.winner.replace(' ', '_')}.jpg`,
      score: object.score.split('-')[0],
      name: object.winner,
    };
    const loser = object.teams.filter((team) => {
      return object.winner !== team;
    });
    object.losingTeam = {
      teamLogo: `img/${loser[0].replace(' ', '_')}.jpg`,
      score: object.score.split('-')[1],
      name: loser[0],
    };
    object.teamLogos = [];
    object.teamLogos[0] = `img/${object.teams[0].replace(' ', '_')}.jpg`;
    object.teamLogos[1] = `img/${object.teams[1].replace(' ', '_')}.jpg`;
    return object;
  }
}

bootstrap(App, [Events]);
