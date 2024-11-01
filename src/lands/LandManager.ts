import {Land} from "./Land.ts";
import FlatLand from "./FlatLand.ts";
import {FScene} from '@fibbojs/3d'
import {Queue} from "../classes/util/Queue.ts";
import {randomInt} from "../classes/util/Random.ts";
import SpaceBaseLand from "./SpaceBaseLand.ts";

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
        this.lands.add(new SpaceBaseLand(this.scene, {
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

    generate(z: number) {
        if(randomInt(0, 10) >= 7) {
            this.add(new SpaceBaseLand(this.scene, {
                position: this.__SIZE__,
                offset: z
            }));
        }
        else {
            this.add(new FlatLand(this.scene, {
                position: this.__SIZE__,
                offset: z
            }))

        }
    }

    frame(delta: number) {
        if(delta >= 0) {
            this.lands.forEach(land => {
                land.move(delta);
            });

            let lastLand = this.lands.peek();
            if (lastLand && lastLand.getZ() >= -1) {
                let land = this.lands.remove();
                if (land) {
                    land.delete();
                    this.generate(lastLand.getZ());
                }
            }

            this.counter = 0;
        }
    }
}