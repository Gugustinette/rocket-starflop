import type {FScene} from '@fibbojs/3d'
import {BTP} from "../classes/btp/BTP.ts";
import {GameState} from "../GameState.ts";
import {randomInt} from "../classes/util/Random.ts";
import {createCrater} from "../classes/btp/Crater.ts";

export interface LandOptions {
    position: number;
    offset?: number;
}

export abstract class Land {
    __LENGTH__ = 750;
    __WIDTH__ = 600;
    __DEPARTURE_MULTIPLIER__ = -300;
    __DEPARTURE__ = 0;

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
}