import type {FScene} from '@fibbojs/3d'
import {Land, LandOptions} from "./Land.ts";
import {createCorridor} from "../classes/btp/CorridorComplexe.ts";
import {randomInt} from "../classes/util/Random.ts";

export default class SpaceBaseLand extends Land {
    xBaseCorridor: number = 0;
    yBaseCorridor: number = 0;
    scaleCorridor: number = 0;
    scaleYCorridor: number = 0;

    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        this.__ROCKS_MIN_NUMBER__ = 4;
        this.__ROCKS_MAX_NUMBER__ = 10;

        this.addGround();
        this.addCorridor();
        this.addRocks();
        this.addCraters();
        this.addExternalMoutains();
    }

    addCorridor() {
        this.xBaseCorridor = randomInt(-30, 30);
        this.yBaseCorridor = this.__DEPARTURE__ + this.__LENGTH__ - randomInt(-50, 50);
        this.scaleCorridor = randomInt(5, 20);
        this.scaleYCorridor = randomInt(8, 16);

        let components = createCorridor(this.scene, {
            position: {
                x: this.xBaseCorridor,
                y: 0,
                z: this.yBaseCorridor,
            },
            scale: {
                x: this.scaleCorridor,
                y: this.scaleYCorridor,
                z: this.scaleCorridor
            }
        })

        this.parcels.push(...components);
    }
}
