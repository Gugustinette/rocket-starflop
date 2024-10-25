import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";


export default class Barrels extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'barrels',
            position: options.position,
            scale: options.scale,
        })
    }
}
