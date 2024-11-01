import type {FScene} from '@fibbojs/3d'
import Ground from "../classes/btp/Ground.ts";
import {Land, LandOptions} from "./Land.ts";
import Barrels from "../classes/btp/Barrels.ts";
import {createHangar} from "../classes/btp/Hangar.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createCrater} from "../classes/btp/Crater.ts";
import {createLargeRock, createMountain} from "../classes/btp/Rock.ts";

export default class FlatLand extends Land {
    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        let negativeXPositionBarrel = randomInt(0, 1)
        this.addGround();
        this.addBarrels(negativeXPositionBarrel == 1);
        this.addHangar(negativeXPositionBarrel == 0);
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
        for (let i = 0; i < randomInt(5, 20); i++) {
            let rock = createLargeRock(this.scene, {
                position: {
                    x: randomInt(60, 80) * (randomInt(0, 1) === 0 ? -1 : 1) - 30,
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-150, 150),
                }
            });

            if(i % 2 === 0) {
                let mountain = createMountain(this.scene, {
                    position: {
                        x: randomInt(120, 150) * (randomInt(0, 1) === 0 ? -1 : 1) - 30,
                        y: 0,
                        z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-200, 200),
                    }
                });

                this.parcels.push(mountain);
            }

            this.parcels.push(rock);
        }
    }
}
