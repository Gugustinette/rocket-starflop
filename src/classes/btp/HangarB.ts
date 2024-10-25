import type { FScene } from '@fibbojs/3d'
import {BTP, BTPOptions} from "./BTP.ts";

export default class HangarB extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'hangar_largeB',
            position: options.position,
            scale: options.scale,
        })
    }
}