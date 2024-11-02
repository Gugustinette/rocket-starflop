import type {FScene} from '@fibbojs/3d'
import {Land, LandOptions} from "./Land.ts";
import Barrels from "../classes/btp/Barrels.ts";
import {createHangar} from "../classes/btp/Hangar.ts";
import {randomInt} from "../classes/util/Random.ts";

export default class FlatLand extends Land {
    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        let negativeXPositionBarrel = randomInt(0, 1)
        this.addGround();
        this.addBarrels(negativeXPositionBarrel == 1);
        this.addHangar(negativeXPositionBarrel == 0);
        this.addCraters();
        this.addRocks();
        this.addExternalMoutains();
    }

    addHangar(negativeX: boolean) {
        let hangar = createHangar(this.scene, {
            position: {
                x: negativeX ? randomInt(-30, -5) : randomInt(5, 30),
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-20, 100),
            }
        });
        this.parcels.push(hangar);
    }

    addBarrels(negativeX: boolean) {
        const barrels = new Barrels(this.scene, {
            position: {
                x: negativeX ? randomInt(-30, -5) : randomInt(5, 30),
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-20, 100),
            },
            scale: {
                x: randomInt(12, 24),
                y: randomInt(12, 24),
                z: randomInt(12, 24),
            }
        })
        this.parcels.push(barrels);
    }
}
