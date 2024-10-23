import { FGLB } from '@fibbojs/3d'
import type { FScene } from '@fibbojs/3d'

interface GroundOptions {
    position: { x: number, y: number, z: number };
    scale: { x: number, y: number, z: number };
}

export default class Ground extends FGLB {
    constructor(scene: FScene, options: GroundOptions) {
        super(scene, {
            name: 'terrain',
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
