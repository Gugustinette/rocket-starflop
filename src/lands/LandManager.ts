import {Land} from "./Land.ts";
import FlatLand from "./FlatLand.ts";

export class LandManager {
    scene: FScene;
    lands: Land[] = []
    compteur = 0;

    constructor(scene: FScene) {
        this.scene = scene;
    }

    add(land: Land) {
        this.lands.push(land);
    }

    generate() {
        this.add(new FlatLand(this.scene))
    }

    onFrame(delta: number) {
        if(delta > 0) {
            this.compteur += delta * 10000 * 10;

            if(this.compteur < 1000) {
                return;
            }
            this.compteur = 0;

            if(this.lands.length === 0) {
                this.generate();
            }

            this.lands.forEach(land => {
                land.move();
            });

            console.log(this.lands[0].parcels[0].transform.z);
            if (this.lands[0].parcels[0].transform.z > -100) {

                let land = this.lands.shift();

                if (land) {
                    land.delete();
                }
            }
        }
    }
}