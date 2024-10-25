import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";

export default class Ground extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'terrain',
            position: options.position,
            scale: options.scale,
        })
    }
}
