import * as THREE from 'three'
import {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import {FGLBToon} from "../util/FGLBToon.ts";
import {Explosion} from "../../fx/Explosion.ts";
import {Bullet} from "../weapon/Bullet.ts";
import {GameState, State} from "../../GameState.ts";

export interface BTPOptions {
    position: { x: number, y: number, z: number };
    scale?: { x: number, y: number, z: number };
    name?: string;
    lifePoints?: number;
}

export abstract class BTP extends FGLBToon {
    deleted: boolean = false;
    maxLifePoints: number;
    lifePoints: number;
    score: number = 10;
    originalMeshRedValues: { [key: string]: number } = {};

    protected constructor(scene: FScene, options: BTPOptions) {
        super(scene, {
            name: options.name ?? '',
            position: options.position,
            scale: options.scale ?? {x: 1, y: 1, z: 1}
        })

        this.lifePoints = options.lifePoints ?? 1;
        this.maxLifePoints = this.lifePoints;
    }

    createSensor() {
        this.initSensor(this.getOptionSensor());

        this.onCollisionWith(Bullet, ({component}) => {
            this.lifePoints--;

            // Apply color filter to the mesh
            this.__MESH__?.traverse((child) => {
                if (child instanceof THREE.Mesh && this.originalMeshRedValues[child.uuid] !== undefined) {
                    // Take the actual material color
                    const color = child.material.color
                    // Make more red
                    color.r = this.originalMeshRedValues[child.uuid] + Math.max(1 - this.originalMeshRedValues[child.uuid], 0.2) * (1 - this.lifePoints / this.maxLifePoints)
                    // Apply the new color
                    child.material.color = color
                }
            })

            if(this.lifePoints <= 0) {
                // Explode the BTP
                this.explode();
                // Remove the bullet from the scene
                component.scene.removeComponent(component);
                if (GameState.state === State.PLAYING) {
                    // Add the score
                    GameState.score += this.score;
                }
            }
        });
    }

    getOptionSensor(): FRigidBodyOptions {
        return {
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
        }
    }

    explode() {
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
    }

    emitOnLoaded(): void {
        this.__MESH__?.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                this.originalMeshRedValues[child.uuid] = child.material.color.r;
                return;
            }
        })
        super.emitOnLoaded();
    }
}
