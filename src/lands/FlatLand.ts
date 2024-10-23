import type {FModel, FScene} from '@fibbojs/3d'
import Ground from "../classes/Ground.ts";
import {Land} from "./Land.ts";
import Barrels from "../classes/Barrels.ts";
import HangarB from "../classes/HangarB.ts";

class FlatLandOptions {
    public length: number = 200;
    public width: number = 200;
    public departure: number = -200;
}

export default class FlatLand extends Land {
    constructor(scene: FScene, options: FlatLandOptions) {
        super();
        if(!options) {
            options = new FlatLandOptions();
        }
        const LENGTH = options.length ?? 200;
        const WIDTH = options.width ?? 50;
        const DEPARTURE = options.departure ?? -200;

        let ground = new Ground(scene, {
            position: {
                x: -LENGTH,
                y: 0,
                z: DEPARTURE,
            },
            scale: {
                x: LENGTH,
                y: 1,
                z: WIDTH,
            }
        });

        const barrels = new Barrels(scene, {
            position: {
                x: 0,
                y: 0,
                z: DEPARTURE + 100,
            },
            scale: {
                x: 12,
                y: 8,
                z: 12,
            }
        })

        const hangarLargeB = new HangarB(scene, {
            position: {
                x: -20,
                y: 0,
                z: DEPARTURE / 2 + 40,
            },
            scale: {
                x: 8,
                y: 4,
                z: 8,
            }
        })

        this.parcels.push(ground);
        this.parcels.push(barrels);
        this.parcels.push(hangarLargeB);
    }
}
