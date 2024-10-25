import type {FScene} from '@fibbojs/3d'
import Ground from "../classes/btp/Ground.ts";
import {Land, LandOptions} from "./Land.ts";

export default class FlatLand extends Land {
    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        let ground = new Ground(scene, {
            position: {
                x: -this.__LENGTH__,
                y: 0,
                z: this.__DEPARTURE__,
            },
            scale: {
                x: this.__LENGTH__,
                y: 1,
                z: this.__WIDTH__,
            }
        });

        this.parcels.push(ground);
    }
}
