import type {FScene} from '@fibbojs/3d'
import {BTP} from "../classes/btp/BTP.ts";
import {GameState} from "../GameState.ts";

export interface LandOptions {
    position: number;
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
        this.__DEPARTURE__ = options.position * this.__DEPARTURE_MULTIPLIER__;
    }

    move() {
        this.parcels = this.parcels.filter(parcel => !parcel.deleted);

        this.parcels.forEach(parcel => {
            if(!parcel.deleted) {
                parcel.transform.z += GameState.speed / 100;
            }
        });


    }

    delete() {
        this.parcels.forEach(parcel => {
            if(this.scene.components.includes(parcel)) {
                parcel.scene.removeComponent(parcel);
            }
        });
    }

    getZ() {
        return this.parcels[0].transform.z;
    }
}