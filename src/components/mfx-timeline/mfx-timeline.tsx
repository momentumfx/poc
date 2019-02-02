import { Component, Prop, State, Element, Listen, Event, EventEmitter } from '@stencil/core';
import momentum from '../../core';
import { Player } from '../..';

@Component({
  tag: 'mfx-1timeline'
})
export class MfxTimeline {
  @Prop() handler: string;
  @State() render: Function;
  @State() players = [];

  @Element() el: HTMLElement;

  @Event() mfxTimelineInit: EventEmitter;
  @Event() mfxTimelineRender: EventEmitter;

  @Listen('mfxTimelineInit')
  onInit(event) {       
    if(event.detail !== this) {
      this.players.push(event.detail);
      event.stopPropagation();      
    }
  }

  @Listen('mfxTimelineRender')
  onRender({detail: players, srcElement}: {detail: Player[], srcElement: HTMLElement}) {    
    if(srcElement !== this.el) {
      console.log(`${this.handler} called for render`, players);
    }
  }

  // @Listen('mfxPlayerInit')
  // onPlayerInit(event) {
  //   this.players.push(event.detail);
  //   event.stopPropagation();
  //   console.log(this.name, this);    
    
  // }

  componentWillLoad() {
    this.render = momentum.timeline(this.handler);
    
    if (!this.render) {
      throw new Error(`Couldn't find '${this.handler}' timeline handler`);
    }

    this.mfxTimelineInit.emit(this);
  }

  componentDidLoad() {    
    this.mfxTimelineRender.emit(this.render(this.players));
  }
}