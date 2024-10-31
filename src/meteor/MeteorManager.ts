import { FScene } from "@fibbojs/3d";
import Meteor from "../classes/meteor/Meteor";
import { GameState, State } from "../GameState";

export class MeteorManager {
  constructor(scene: FScene) {
    // Every 4 seconds, create a new meteor
    setInterval(() => {
      if (GameState.state === State.PLAYING) {
        new Meteor(scene)
      }
    }, 4000)
  }
}
