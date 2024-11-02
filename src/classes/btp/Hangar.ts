import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

export class Hangar extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })

        this.score = 30;

        this.createSensor()
    }

    getOptionSensor(options?: {positionOffset?: { x: number; y: number; z: number }; scaleOffset?: { x: number; y: number; z: number } }): FRigidBodyOptions {
        return {
            positionOffset: options?.positionOffset ?? {
                x: this.transform.scaleX,
                y: 3,
                z: this.transform.scaleZ - 4
            },
            scaleOffset: options?.scaleOffset ?? {
                x: 0,
                y: -this.transform.scaleY / 2 + 3,
                z: this.transform.scaleZ - this.transform.scaleZ / 2
            }
        }
    }
}

export class HangarA extends Hangar {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'hangar_largeA',
            position: options.position,
            scale: options.scale,
        })
    }
}

export class HangarB extends Hangar {
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