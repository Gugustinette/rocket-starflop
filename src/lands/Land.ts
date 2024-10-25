import type {FModel} from '@fibbojs/3d'

export abstract class Land {
    parcels: FModel[] = []

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