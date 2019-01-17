import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'mfx-player'
})
export class MfxPlayer {
  @Event() mfxPlayerInit: EventEmitter;

  componentWillLoad() { 
    this.mfxPlayerInit.emit(this);
  }
}
