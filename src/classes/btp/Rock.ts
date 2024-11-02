import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";

abstract class RockBase extends BTP {
    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints
        })

        this.score = 20;

        this.createSensor()
    }

    getOptionSensor(): FRigidBodyOptions {
        return {
            positionOffset: {
                x: this.transform.scaleX,
                y: 0,
                z: this.transform.scaleZ / 2 + this.transform.scaleZ / 4
            },
            scaleOffset: {
                x: - this.transform.scaleX / 2,
                y: - this.transform.scaleY / 3,
                z: - this.transform.scaleZ / 2
            }
        }
    }
}

export class Rock extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export class RockLargeA extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeA',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export class RockLargeB extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_largeB',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export class RockCrystals extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystals',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export class RockCrystalsLargeA extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystalsLargeA',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export class RockCrystalsLargeB extends RockBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rock_crystalsLargeB',
            position: options.position,
            scale: options.scale,
            lifePoints: options.lifePoints ?? 25
        })
    }
}

export function createLargeRock(scene: FScene, options: BTPOptions) {
    let size = randomInt(20, 50);
    options.scale = {
        x: size,
        y: randomInt(30, 70),
        z: size * randomInt(1, 5)
    }

    let random = randomInt(0, 8);
    if(random === 0 || random == 1) {
        return new RockLargeA(scene, options);
    }
    if(random === 3 || random == 4) {
        return new RockLargeB(scene, options);
    }
    if(random === 5) {
        return new RockCrystals(scene, options);
    }
    if(random === 6) {
        return new RockCrystalsLargeA(scene, options);
    }
    if(random === 7) {
        return new RockCrystalsLargeB(scene, options);
    }
    return new Rock(scene, options);
}

export function createMountain(scene: FScene, options: BTPOptions) {
    let size = randomInt(50, 100);

    options.scale = options.scale || {
        x: size - 15,
        y: randomInt(70, 110),
        z: size
    }

    if(randomInt(0,1) === 0) {
        return new RockLargeA(scene, options);
    }

    return new RockLargeB(scene, options);
}