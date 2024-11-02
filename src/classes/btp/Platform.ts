import {BTP, BTPOptions} from "./BTP.ts";
import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'

export class PlatformLarge extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'platform_large',
            position: options.position,
            scale: options.scale,
            lifePoints: 1
        })

        this.score = 30;

        this.createSensor()
    }

    getOptionSensor(): FRigidBodyOptions {
        return {
            positionOffset: {
                x: this.transform.scaleX,
                y: 0.5,
                z: this.transform.scaleZ / 2 + this.transform.scaleZ / 4
            },
            scaleOffset: {
                x: 0,
                y: - this.transform.scaleY / 2,
                z: 0
            }
        }
    }
}