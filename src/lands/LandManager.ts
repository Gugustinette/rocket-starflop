import {Land} from "./Land.ts";
import FlatLand from "./FlatLand.ts";
import {FScene} from '@fibbojs/3d'

export class LandManager {
    scene: FScene;
    lands: Land[]
    counter: number;

    constructor(scene: FScene) {
        this.scene = scene;
        this.lands = [];
        this.counter = 0;
    }

    add(land: Land) {
        this.lands.push(land);
    }

    generate() {
        this.add(new FlatLand(this.scene))
    }

    onFrame(delta: number) {
        if(delta > 0) {
            this.counter += delta * 10000 * 10;

            if(this.counter < 1000) {
                return;
            }
            this.counter = 0;

            if(this.lands.length === 0) {
                this.generate();
            }

            this.lands.forEach(land => {
                land.move();
            });

            if (this.lands[0].parcels[0].transform.z > -100) {
                let land = this.lands.shift();
                if (land) {
                    land.delete();
                }
            }
        }
    }
}