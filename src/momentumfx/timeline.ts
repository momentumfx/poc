import {TimelineHandler, Effect, PlayState, Player} from './intefaces';

export class RootTimeline implements TimelineHandler {
  init(parent: TimelineHandler): void {
    console.log(parent);
  }

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

  render(players: Player[]): Player[] {
    return players;
  }
}