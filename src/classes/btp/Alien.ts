import { FScene, FRigidBodyOptions } from "@fibbojs/3d";
import { BTP, BTPOptions } from "./BTP";
import {randomInt} from "../util/Random.ts";

export class Alien extends BTP {
    constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: 'alien',
            position: options.position,
            scale: options.scale,
            lifePoints: 1,
        })

        this.score = 100;

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

    emitOnLoaded(): void {
        if (!this.__MESH__) return
        this.__MESH__ = this.__MESH__.children[0] as any
        this.__UPDATE_POSITION__(true)
        this.__UPDATE_SCALE__(true)
        super.emitOnLoaded()
    }

    frame(delta: number) {
        this.transform.rotationY += 0.2 * (delta * 5);
        this.transform.z += Math.cos(this.transform.rotationY) * (delta * 10) * randomInt(5, 10);
        this.transform.x += Math.sin(this.transform.rotationY) * (delta * 10) * randomInt(5, 10)

        this.__UPDATE_ROTATION__(true)
    }
}

export function createAlien(scene: FScene, options: BTPOptions): Alien {
    return new Alien(scene, options);
}