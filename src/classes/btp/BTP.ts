import {FScene} from '@fibbojs/3d'
import {FGLBToon} from "../util/FGLBToon.ts";
import {Explosion} from "../../fx/Explosion.ts";
import {Bullet} from "../weapon/Bullet.ts";

export interface BTPOptions {
    position: { x: number, y: number, z: number };
    scale?: { x: number, y: number, z: number };
    name?: string;
}

export abstract class BTP extends FGLBToon {
    deleted: boolean = false;
    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale ?? {x: 1, y: 1, z: 1}
        })
    }

    createSensor() {
        this.initSensor({
            positionOffset: {
                x: this.transform.scaleX,
                y: 2,
                z: this.transform.scaleZ - 4
            },
            scaleOffset: {
                x: 0,
                y: -this.transform.scaleY / 2,
                z: this.transform.scaleZ - this.transform.scaleZ / 2
            }
        });

        this.onCollisionWith(Bullet, ({component}) => {
            new Explosion(this.scene, {
                position: {
                    x: this.transform.x + this.transform.scaleX / 2,
                    y: this.transform.y,
                    z: this.transform.z + this.transform.scaleZ / 2
                },
                radius: this.transform.scaleX + this.transform.scaleZ,
            })
            this.deleted = true;
            this.scene.removeComponent(this);
            component.scene.removeComponent(component);
        });
    }
}
