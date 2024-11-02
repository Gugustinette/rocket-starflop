import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";


export default class Barrels extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'barrels',
            position: options.position,
            scale: options.scale,
            lifePoints: 2,
        })

        this.score = 50;

        this.createSensor();
    }

    getOptionSensor(): FRigidBodyOptions {
        return {
            positionOffset: {
                x: this.transform.scaleX,
                y: this.transform.scaleY / 4 - this.transform.scaleY / 8,
                z: this.transform.scaleZ / 2 + this.transform.scaleZ / 4,
            },
            scaleOffset: {
                x: - this.transform.scaleX / 2 - this.transform.scaleX / 4 + 1,
                y: - this.transform.scaleY / 2 - this.transform.scaleY / 3 + 1,
                z: - this.transform.scaleZ / 2 - this.transform.scaleZ / 4 + 1,
            },
        }
    }
}
