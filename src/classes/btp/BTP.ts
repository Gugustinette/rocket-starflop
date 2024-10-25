import type { FScene } from '@fibbojs/3d'
import {FGLBToon} from "../util/FGLBToon.ts";

export interface BTPOptions {
    position: { x: number, y: number, z: number };
    scale: { x: number, y: number, z: number };
    name: string;
}

export abstract class BTP extends FGLBToon {
    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name,
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
