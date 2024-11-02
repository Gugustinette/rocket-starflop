import {BTP, BTPOptions} from "./BTP.ts";
import {PlatformLarge} from "./Platform.ts";
import {randomInt} from "../util/Random.ts";
import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'


export abstract class RocketBase extends BTP {
    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name,
            position: options.position,
            scale: options.scale,
            lifePoints: 3,
        })

        this.score = 50;

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
                y: 0,
                z: - this.transform.scaleZ / 2
            }
        }
    }
}

export class RocketBaseA extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_baseA',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketBaseB extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_baseB',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketFinsA extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_finsA',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketFinsB extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_finsB',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketTopA extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_topA',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketTopB extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_topB',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketFuelA extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_fuelA',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketFuelB extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_fuelB',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketSidesA extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_sidesA',
            position: options.position,
            scale: options.scale
        })
    }
}

export class RocketSidesB extends RocketBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'rocket_sidesB',
            position: options.position,
            scale: options.scale
        })
    }
}

export function createRocket(scene: FScene, options: BTPOptions) {
    if(options.scale == undefined) {
        return [];
    }

    // Need 1 base, 1 top and x fins
    let base = getBaseRocket(scene, options)

    let yLayer = options.scale.y / 2

    let fins = getFinsRocket(scene, {
        position: {
            x: options.position.x,
            y: options.position.y + yLayer,
            z: options.position.z
        },
        scale: options.scale
    })

    let fuel = getFuelRocket(scene, {
        position: {
            x: options.position.x,
            y: options.position.y + yLayer + yLayer / 2 + 1,
            z: options.position.z
        },
        scale: options.scale
    })

    let sides = getSidesRocket(scene, {
        position: {
            x: options.position.x,
            y: options.position.y + yLayer * 2 + 1,
            z: options.position.z
        },
        scale: options.scale
    })

    let top = getTopRocket(scene, {
        position: {
            x: options.position.x,
            y: options.position.y + yLayer * 3 + 1,
            z: options.position.z
        },
        scale: options.scale
    })

    let platform = new PlatformLarge(scene, {
        position: {
            x: options.position.x - options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z + 2
        },
        scale: {
            x: options.scale.x * 2,
            y: 1,
            z: options.scale.z * 2
        }
    })

    return [base, fins, fuel, sides, top, platform]
}

function getBaseRocket(scene: FScene, options: BTPOptions) {
    let random = randomInt(0, 1);
    if(random == 0) {
        return new RocketBaseA(scene, options);
    }
    return new RocketBaseB(scene, options)
}

function getTopRocket(scene: FScene, options: BTPOptions) {
    let random = randomInt(0, 1);
    if(random == 0) {
        return new RocketTopA(scene, options);
    }
    return new RocketTopB(scene, options)
}

function getFinsRocket(scene: FScene, options: BTPOptions) {
    let random = randomInt(0, 1);
    if(random == 0) {
        return new RocketFinsA(scene, options);
    }
    return new RocketFinsB(scene, options)
}

function getFuelRocket(scene: FScene, options: BTPOptions) {
    let random = randomInt(0, 1);
    if(random == 0) {
        return new RocketFuelA(scene, options);
    }
    return new RocketFuelB(scene, options)
}

function getSidesRocket(scene: FScene, options: BTPOptions) {
    let random = randomInt(0, 1);
    if(random == 0) {
        return new RocketSidesA(scene, options);
    }
    return new RocketSidesB(scene, options)
}