import { FGLB } from '@fibbojs/3d'
import type { FScene } from '@fibbojs/3d'

class HangarBOptions {
    public position: { x: number, y: number, z: number };
    public scale: { x: number, y: number, z: number };
}

export default class HangarB extends FGLB {
    constructor(scene: FScene, options: HangarBOptions) {
        super(scene, {
            name: 'hangar_largeB',
            position: options.position,
            scale: options.scale,
        })
    }

    addPosition(position: {x: number, y: number, z: number}) {
        this.transform.x += position.x;
        this.transform.y += position.y;
        this.transform.z += position.z;

    }
}