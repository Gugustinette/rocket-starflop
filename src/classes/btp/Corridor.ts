import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";

abstract class CorridorBase extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })

        this.score = 5

        this.createSensor()
    }

    getOptionSensor(): FRigidBodyOptions {
        return {
            positionOffset: {
                x: 0,
                y: 1,
                z: 0
            },
            scaleOffset: {
                x: - this.transform.scaleX / 2,
                y: 0,
                z: - this.transform.scaleZ / 2
            }
        }
    }

    emitOnLoaded(): void {
        if (!this.__MESH__) return
        this.__MESH__ = this.__MESH__.children[0] as any
        this.__UPDATE_POSITION__(true)
        this.__UPDATE_SCALE__(true)
        super.emitOnLoaded()
    }
}

export class Corridor extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorWindowClosed extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_windowClosed',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorCorner extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_corner',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorCornerRound extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_cornerRound',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorCross extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_cross',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorSplit extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_split',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}

export class CorridorEnd extends CorridorBase {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'corridor_end',
            position: options.position,
            scale: options.scale,
            lifePoints: 3
        })
    }
}