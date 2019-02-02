import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import {Effect, Listener} from './interfaces';
import {listenForClass} from './listeners';

const REGISTRY: {[name: string]: Listener} = {
  'class': listenForClass
}

// listen="..."
@Component({
  tag: 'mfx-2player'
})
export class MfxPlayer {
  @Event() mfxPlayerInit: EventEmitter;
  @Element() el: HTMLElement;

  @Prop() listen: string;
  @Prop() handler: string;

  componentWillLoad() { 
    this.mfxPlayerInit.emit(this);

    // load all the listeners
    // and watch them for effects
    loadListeners(this.el, this.listen, REGISTRY, (effect) => {
      const fn = (window as any)[this.handler];
      if (fn) {

      }
      console.log(effect);
    });
  }
}

function loadListeners(element: HTMLElement, listener: string, registry: {[name: string]: Listener}, cb: (effect: Effect) => any) {
  let listenerTokens: string[];

  // listen="class, attr"
  // listen="['class', 'attr']"
  listener = listener.trim();
  if (listener.charAt(0) === '[') { // JSON mode
    listenerTokens = JSON.parse(listener);
  } else {
    listenerTokens = listener.split(/\s+/);
  }

  listenerTokens.forEach(token => {
    const listener = registry[token];
    if (listener) {
      listener(element, cb);
    } else {
      throw new Error(`${token} is not registered inside of the provided registry`);
    }
  });
}