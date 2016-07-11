import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class Events {
  constructor() {
    this.clickYear = new EventEmitter();
    this.clickTeam = new EventEmitter();
  }
}
