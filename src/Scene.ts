import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { FScene, FSceneOptions } from '@fibbojs/3d';

export class Scene extends FScene {
  declare effect: OutlineEffect;

  constructor(options: FSceneOptions) {
    super(options);
  }

  init(): void {
    super.init();

    // Set the background color of the scene
    this.scene.background = new THREE.Color(0x87CEEB);
    // Set the fog to the same color as the background
    this.scene.fog = new THREE.Fog(0x87CEEB, 0, 400);

    // Create outline effect
    this.effect = new OutlineEffect(this.renderer);
    this.onFrame(() => {
      this.effect.render(this.scene, this.camera.__CAMERA__);
    })
  }
}
