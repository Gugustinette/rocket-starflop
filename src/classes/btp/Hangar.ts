import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

export class HangarA extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'hangar_largeA',
            position: options.position,
            scale: options.scale,
        })
        /*
        this.initSensor();
        this.onCollisionWith(LaserBullet, () => {
            new Explosion(scene, {
                position: this.transform.position,
                radius: 10
            })
        })
        */
    }
}

export class HangarB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'hangar_largeB',
            position: options.position,
            scale: options.scale,
        })
    }
}

export function createHangar(scene: FScene, options: BTPOptions) {
    let size = randomInt(12, 24);
    options.scale = {
        x: size,
        y: randomInt(8, 16),
        z: size
    }

    if(Math.random() < 0.5) {
        return new HangarA(scene, options);
    }

    return new HangarB(scene, options);
}