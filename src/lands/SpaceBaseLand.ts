import type {FScene} from '@fibbojs/3d'
import Ground from "../classes/btp/Ground.ts";
import {Land} from "./Land.ts";
import Barrels from "../classes/btp/Barrels.ts";
import Hangar from "../classes/btp/Hangar.ts";
import {randomInt} from "../classes/util/Random.ts";

class FlatLandOptions {
    public position: number = 1;
}

export default class FlatLand extends Land {
    constructor(scene: FScene, options?: FlatLandOptions) {
        super();
        if(!options) {
            options = new FlatLandOptions();
        }
        const LENGTH = 400;
        const WIDTH = 600;
        const DEPARTURE = options.position * -300;

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

        let negativeXPositionBarrel = randomInt(0, 1)

        const barrels = new Barrels(scene, {
            position: {
                x: negativeXPositionBarrel ? randomInt(-30, -5) : randomInt(5, 30),
                y: 0,
                z: DEPARTURE + LENGTH + randomInt(-20, 100),
            },
            scale: {
                x: 12,
                y: 8,
                z: 12,
            }
        })

        const hangarLargeB = new Hangar(scene, {
            position: {
                x: !negativeXPositionBarrel ? randomInt(-30, -5) : randomInt(5, 30),
                y: 0,
                z: DEPARTURE + LENGTH + randomInt(-20, 100),
            },
            scale: {
                x: 8,
                y: 4,
                z: 8,
            }
        })

        for(let i = 0; i < randomInt(0, 10); i++) {

        }

        this.parcels.push(ground);
        this.parcels.push(barrels);
        this.parcels.push(hangarLargeB);
    }
}
