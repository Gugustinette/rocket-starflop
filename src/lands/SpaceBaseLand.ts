import type {FScene} from '@fibbojs/3d'
import Ground from "../classes/btp/Ground.ts";
import {Land, LandOptions} from "./Land.ts";
import {createCorridor} from "../classes/btp/CorridorComplexe.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createMountain} from "../classes/btp/Rock.ts";

export default class SpaceBaseLand extends Land {
    xBaseCorridor: number = 0;
    yBaseCorridor: number = 0;
    scaleCorridor: number = 0;
    scaleYCorridor: number = 0;

    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        this.addGround();
        this.addCorridor();
        this.addMountain();
        this.addCraters();
    }

    addGround() {
        let ground = new Ground(this.scene, {
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

    addMountain() {
        for (let i = 0; i < randomInt(10, 15); i++) {
            let mountain = createMountain(this.scene, {
                position: {
                    x: randomInt(120, 150) * (randomInt(0, 1) === 0 ? -1 : 1) - 30,
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-200, 200),
                }
            });

            this.parcels.push(mountain);
        }
    }
}
