import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

export class RockLargeA extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeA',
            position: options.position,
            scale: options.scale,
        })
    }
}

export class RockLargeB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeB',
            position: options.position,
            scale: options.scale,
        })
    }
}

export function createLargeRock(scene: FScene, options: BTPOptions) {
    let size = randomInt(12, 24);
    options.scale = {
        x: size,
        y: randomInt(30, 100),
        z: size
    }

    if(randomInt(0, 1) === 0) {
        return new RockLargeA(scene, options);
    }

    return new RockLargeB(scene, options);
}