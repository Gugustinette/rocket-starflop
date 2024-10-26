import {FScene} from '@fibbojs/3d'
import {FGLBToon} from "../util/FGLBToon.ts";
import {Explosion} from "../../fx/Explosion.ts";
import {Bullet} from "../weapon/Bullet.ts";
import {GameState} from "../../GameState.ts";

export interface BTPOptions {
    position: { x: number, y: number, z: number };
    scale?: { x: number, y: number, z: number };
    name?: string;
    lifePoints?: number;
}

export abstract class BTP extends FGLBToon {
    deleted: boolean = false;
    lifePoints: number;
    score: number = 10;

    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale ?? {x: 1, y: 1, z: 1}
        })

        this.lifePoints = options.lifePoints ?? 1;
    }

    createSensor() {
        this.initSensor({
            positionOffset: {
                x: this.transform.scaleX,
                y: 3,
                z: this.transform.scaleZ - 4
            },
            scaleOffset: {
                x: 0,
                y: -this.transform.scaleY / 2 + 3,
                z: this.transform.scaleZ - this.transform.scaleZ / 2
            }
        });

        this.onCollisionWith(Bullet, ({component}) => {
            this.lifePoints--;

            if(this.lifePoints <= 0) {
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

                GameState.score += this.score;
            }
        });
    }
}
