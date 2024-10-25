import {Land} from "./Land.ts";
import FlatLand from "./FlatLand.ts";
import {FScene} from '@fibbojs/3d'
import {Queue} from "../classes/util/Queue.ts";

export class LandManager {
    scene: FScene;
    lands: Queue<Land>;
    counter: number = 0;
    __SIZE__ = 5;

    constructor(scene: FScene) {
        this.scene = scene;
        this.lands = new Queue<Land>();
        this.lands.add(new FlatLand(this.scene, {
            position: 1
        }));
        this.lands.add(new FlatLand(this.scene, {
            position: 2
        }));
        this.lands.add(new FlatLand(this.scene, {
            position: 3
        }));
        this.lands.add(new FlatLand(this.scene, {
            position: 4
        }));
        this.lands.add(new FlatLand(this.scene, {
            position: 5
        }));

    }

    add(land: Land) {
        this.lands.add(land);
    }

    generate() {
        this.add(new FlatLand(this.scene, {
            position: this.__SIZE__
        }));
    }

    frame(delta: number) {
        if(delta >= 0) {
            this.counter += delta * 10000 * 10;

            if(this.counter < 1500) {
                return;
            }

            this.lands.forEach(land => {
                land.move();
            });

            let lastLand = this.lands.peek();
            if (lastLand && lastLand.getZ() >= -1) {
                let land = this.lands.remove();
                if (land) {
                    land.delete();
                    this.generate();
                }
            }

            this.counter = 0;
        }
    }
}