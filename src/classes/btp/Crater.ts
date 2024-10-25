import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";
import {FScene} from "@fibbojs/3d";

export class Crater extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'crater',
            position: options.position,
            scale: options.scale,
        })
    }
}

export class CraterLarge extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'craterLarge',
            position: options.position,
            scale: options.scale,
        })
    }
}

export function createCrater(scene: FScene, options: BTPOptions) {
    let size = randomInt(4, 24);
    options.scale = {
        x: size,
        y: size-2,
        z: size
    }

    if(randomInt(0, 2) === 0) {
        return new Crater(scene, options);
    }

    return new CraterLarge(scene, options);
}