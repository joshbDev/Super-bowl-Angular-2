import {Component, Input} from 'angular2/core';

import {EventAndData} from './event-injectable';

@Component({
  selector: 'show-input',
  template: `{{text}}`,
})
export class ShowInput {
  constructor(eventAndData: EventAndData) {
    this.eventAndData = eventAndData;
    this.eventAndData.event.subscribe((text) => {
      this.text = text;
    });
  }

}
