import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

export class Rock extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export class RockLargeA extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeA',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export class RockLargeB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeB',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export class RockCrystals extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystals',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export class RockCrystalsLargeA extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystalsLargeA',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export class RockCrystalsLargeB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystalsLargeB',
            position: options.position,
            scale: options.scale,
            lifePoints: 10
        })

        this.createSensor();
    }
}

export function createLargeRock(scene: FScene, options: BTPOptions) {
    let size = randomInt(20, 50);
    options.scale = {
        x: size,
        y: randomInt(30, 70),
        z: size * randomInt(1, 5)
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

export function createMontain(scene: FScene, options: BTPOptions) {
    let size = randomInt(50, 100);
    options.scale = {
        x: size - 15,
        y: randomInt(70, 110),
        z: size
    }

    if(randomInt(0,1) === 0) {
        return new RockLargeA(scene, options);
    }

    return new RockLargeB(scene, options);
}