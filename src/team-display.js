import {Component, Input} from 'angular2/core';

@Component({
  selector: 'team-display',
  styles: [`
  div {
    padding: 10px 0;
  }
  .team-logo {
    max-width: 150px;
    display: block;
    max-height: 110px;
  }
  .team-score {
    font-size: 25px;
    font-weight: 600;
  }
  .name {
    font-size: 18px;
    font-weight: 600;
  }`],
  template: `<div class="team-score">{{team.score}}</div>
    <img [src]="team.teamLogo" class="team-logo">
    <div class="name">{{team.name}}</div>`,
})
export class teamDisplay {
  constructor() {
  }
  @Input() team;

}
