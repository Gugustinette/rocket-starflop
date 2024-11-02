import type {FScene} from '@fibbojs/3d'
import {BTP} from "../classes/btp/BTP.ts";
import {GameState} from "../GameState.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createCrater} from "../classes/btp/Crater.ts";
import {createLargeRock, createMountain} from "../classes/btp/Rock.ts";
import Ground from "../classes/btp/Ground.ts";

export interface LandOptions {
    position: number;
    offset?: number;
}

export abstract class Land {
    __LENGTH__ = 750;
    __WIDTH__ = 600;
    __DEPARTURE_MULTIPLIER__ = -300;
    __DEPARTURE__ = 0;

    __ROCKS_MIN_NUMBER__ = 4;
    __ROCKS_MAX_NUMBER__ = 20;


    scene: FScene;
    parcels: BTP[] = []

    protected constructor(scene: FScene, options: LandOptions) {
        this.scene = scene;
        this.__DEPARTURE__ = options.position * this.__DEPARTURE_MULTIPLIER__ + (options.offset || 0);
    }

    move(delta: number) {
        this.parcels = this.parcels.filter(parcel => !parcel.deleted);

        this.parcels.forEach(parcel => {
            if(!parcel.deleted) {
                parcel.transform.z += (GameState.speed / 100) * delta * 50;
            }
        });


    }

    delete() {
        this.parcels.forEach(parcel => {
            if(this.scene.components.includes(parcel)) {
                this.scene.removeComponent(parcel);
            }
        });
    }

    getZ() {
        return this.parcels[0].transform.z;
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

    addCraters() {
        for (let i = 0; i < randomInt(3, 10); i++) {
            let crater = createCrater(this.scene, {
                position: {
                    x: randomInt(-70, 70),
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-250, 250),
                }
            })

            this.parcels.push(crater);
        }
    }

    addExternalMoutains() {
        let posX = randomInt(-375, -325);
        let scaleZ = randomInt(400, 600);
        this.parcels.push(createMountain(this.scene, {
            position: {
                x: posX,
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ - scaleZ,
            },
            scale: {
                x: 200,
                y: randomInt(150, 250),
                z: scaleZ,
            },
            lifePoints: 1000
        }));

        this.parcels.push(createMountain(this.scene, {
            position: {
                x: posX,
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ - scaleZ + scaleZ / 3,
            },
            scale: {
                x: 200,
                y: randomInt(150, 250),
                z: scaleZ,
            },
            lifePoints: 1000
        }))

        posX = randomInt(-50, -10);
        this.parcels.push(createMountain(this.scene, {
            position: {
                x: posX,
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ - 500,
            },
            scale: {
                x: 200,
                y: randomInt(150, 250),
                z: scaleZ,
            },
            lifePoints: 1000
        }))

        this.parcels.push(createMountain(this.scene, {
            position: {
                x: posX,
                y: 0,
                z: this.__DEPARTURE__ + this.__LENGTH__ - scaleZ + scaleZ / 3,
            },
            scale: {
                x: 200,
                y: randomInt(150, 250),
                z: scaleZ,
            },
            lifePoints: 1000
        }))
    }

    addRocks() {
        for (let i = 0; i < randomInt(this.__ROCKS_MIN_NUMBER__, this.__ROCKS_MAX_NUMBER__); i++) {
            let rock = createLargeRock(this.scene, {
                position: {
                    x: randomInt(60, 80) * (randomInt(0, 1) === 0 ? -1 : 1) - 30,
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-150, 150),
                }
            });

            this.parcels.push(rock);
        }
    }
}