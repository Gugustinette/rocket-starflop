import type {FScene} from '@fibbojs/3d'
import {Land, LandOptions} from "./Land.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createRocket} from "../classes/btp/Rocket.ts";
import {createAlien} from "../classes/btp/Alien.ts";

export default class KonamiLand extends Land {
    constructor(scene: FScene, options: LandOptions) {
        super(scene, options);

        this.addGround();
        this.addRockets();
        this.addAliens();
        this.addExternalMoutains();
    }

    addRockets() {
        for (let i = 0; i < randomInt(1, 2); i++) {
            let rocket = createRocket(this.scene, {
                position: {
                    x: randomInt(-100, 75),
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-20, 100),
                },
                scale: {
                    x: randomInt(12, 24),
                    y: randomInt(12, 24),
                    z: randomInt(12, 24),
                }
            })
            this.parcels.push(...rocket);
        }
    }

    addAliens() {
        for (let i = 0; i < randomInt(2, 10); i++) {
            let alien = createAlien(this.scene, {
                position: {
                    x: randomInt(-100, 75),
                    y: 0,
                    z: this.__DEPARTURE__ + this.__LENGTH__ + randomInt(-20, 100),
                },
                scale: {
                    x: randomInt(8, 15),
                    y: randomInt(10, 20),
                    z: randomInt(8, 15),
                }
            })

            let rotation = randomInt(0, 360);
            alien.transform.rotationY = rotation;
            alien.onLoaded(() => {
                alien.transform.rotationY = rotation;
            });

            this.parcels.push(alien);
        }
    }


}
