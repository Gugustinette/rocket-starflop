import type {FScene} from '@fibbojs/3d'
import Ground from "../classes/btp/Ground.ts";
import {Land} from "./Land.ts";
import Barrels from "../classes/btp/Barrels.ts";
import {createHangar} from "../classes/btp/Hangar.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createCrater} from "../classes/btp/Crater.ts";
import {createLargeRock} from "../classes/btp/Rock.ts";

export default class FlatLand extends Land {
    constructor(scene: FScene, options: FlatLandOptions) {
        super(scene, options);

        let negativeXPositionBarrel = randomInt(0, 1)
        this.addGround();
        this.addBarrels(negativeXPositionBarrel);
        this.addHangar(!negativeXPositionBarrel);
        this.addCraters();
        this.addRocks();

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
                x: 12,
                y: 8,
                z: 12,
            }
        })
        this.parcels.push(barrels);
    }

    addCraters() {
        for (let i = 0; i < randomInt(3, 10); i++) {
            let crater = createCrater(this.scene, {
                position: {
                    x: randomInt(-70, 70),
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-50, 50),
                }
            })

            this.parcels.push(crater);
        }
    }

    addRocks() {
        for (let i = 0; i < randomInt(10, 25); i++) {
            let rock = createLargeRock(this.scene, {
                position: {
                    x: randomInt(50, 90) * (randomInt(0, 1) === 0 ? -1 : 1) - 30,
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-100, 100),
                }
            });

            this.parcels.push(rock);
        }
    }
}
