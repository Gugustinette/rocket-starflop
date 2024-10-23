import { FGLB } from '@fibbojs/3d'
import type { FScene } from '@fibbojs/3d'

class GroundOptions {
    public position: { x: number, y: number, z: number };
    public scale: { x: number, y: number, z: number };

    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }
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
