import type {FModel} from '@fibbojs/3d'

export interface LandOptions {
    position: number;
}

export abstract class Land {
    __LENGTH__ = 1000;
    __WIDTH__ = 600;
    __DEPARTURE_MULTIPLIER__ = -300;
    __DEPARTURE__ = 0;

    scene: FScene;
    parcels: FModel[] = []

    protected constructor(scene: FScene, options: LandOptions) {
        this.scene = scene;
        this.__DEPARTURE__ = options.position * this.__DEPARTURE_MULTIPLIER__;
    }

    move() {
        this.parcels.forEach(parcel => {
            parcel.transform.z += 1;
        });
    }

    delete() {
        this.parcels.forEach(parcel => {
            parcel.scene.removeComponent(parcel);
        });
    }

    getZ() {
        return this.parcels[0].transform.z;
    }
}