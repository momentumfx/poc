const enum PlayState {
  Running = 1,
  Paused = 2,
  Finished = 100,
  Destroyed = 999
}

interface Player {
  state: PlayState|string;
  play(): void;
  destroy(): void;
  finish(): void;
}

interface Effect {
  type: string;
  element: Element;
  domFn: Function|null;
  player: Player|null;
  data: any|null;
}

export interface Timeline {
  init(parent: Timeline): void;
  capture(effects: Effect[]): void;
}

export class HomePageTimeline implements Timeline {
  private _parent: Timeline;

  init(parent: Timeline): void {
    this._parent = parent;
  }

  capture(effects: Effect[]): void {
    this._parent.capture(effects);
  }
}

export class RootTimeline implements Timeline {
  constructor() {

  }

  init(parent: Timeline): void {}

  capture(effects: Effect[]): void {
    effects.forEach(effect => {
      if (effect.player) {
        if (effect.player.state !== PlayState.Running) {
          effect.player.play();
        }
      } else {
        effect.domFn();
      }
    });
  }
}