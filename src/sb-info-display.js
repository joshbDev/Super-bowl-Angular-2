import {Component, Input} from 'angular2/core';

import {teamDisplay} from './team-display';

@Component({
  selector: 'sb-info-display',
  styles: [`.sb-info {
    margin-bottom: 25px;
  }
  .super-bowl-logo {
    position: relative;
    max-width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  .super-bowl-logo img {
    max-height: 150px;
  }
  .sb-date {
    font-size: 25px;
    font-weight: 600;
  }
  team-display {
    position: absolute;
    text-align: center;
    margin: 0 20px;
  }
  .football-field {
    max-width: 100%;
    position: relative;
    text-align: center;
    z-index: -0;
  }
  .football-field img {
    max-width: 80%;
  }
  .losing-team {
    right: 0;
  }
  .sb-location {
    text-align: center;
    margin-bottom: 50px;
    font-size: 1.3rem;
  }
  team-display {
    z-index: 1;
  }`],
  directives: [teamDisplay],
  template: `<div *ngIf="sbInfo.date" class="sb-info">
    <div class="super-bowl-logo">
      <img [src]="sbInfo.superBowlLogo" >
      <div class="sb-date">{{sbInfo.date}}</div>
    </div>
    <team-display [team]="sbInfo.winningTeam"></team-display>
    <team-display [team]="sbInfo.losingTeam" class="losing-team"></team-display>
    <div class="football-field">
      <img src="img/football_field.png">
    </div>
    <div class="sb-location">Played in {{sbInfo.location}} and {{sbInfo.attendance}} people attended</div>
    </div>`,
})
export class sbInfoDisplay {
  constructor() {
  }
  @Input() sbInfo;
}
