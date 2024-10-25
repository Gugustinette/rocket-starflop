import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

export class Rock extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock',
            position: options.position,
            scale: options.scale,
        })
    }
}

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

export class RockCrystals extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystals',
            position: options.position,
            scale: options.scale,
        })
    }
}

export class RockCrystalsLargeA extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystals_largeA',
            position: options.position,
            scale: options.scale,
        })
    }
}

export class RockCrystalsLargeB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystals_largeB',
            position: options.position,
            scale: options.scale,
        })
    }
}


export function createLargeRock(scene: FScene, options: BTPOptions) {
    let size = randomInt(20, 50);
    options.scale = {
        x: size,
        y: randomInt(30, 100),
        z: size
    }

    let random = randomInt(0, 5);
    if(random === 0) {
        return new RockLargeA(scene, options);
    }
    if(random === 1) {
        return new RockLargeB(scene, options);
    }
    if(random === 2) {
        return new RockCrystals(scene, options);
    }
    if(random === 3) {
        return new RockCrystalsLargeA(scene, options);
    }
    if(random === 4) {
        return new RockCrystalsLargeB(scene, options);
    }
    return new Rock(scene, options);
}