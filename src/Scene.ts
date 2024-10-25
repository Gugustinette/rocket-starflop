import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import {FAmbientLight, FDirectionalLight, FScene, FSceneOptions} from '@fibbojs/3d';

export class Scene extends FScene {
  declare effect: OutlineEffect;

  constructor(options: FSceneOptions) {
    super(options);
  }

  init(): void {
    super.init();

    // Set the background color of the scene
    this.scene.background = new THREE.Color(0x000000);
    // Set the fog to the same color as the background
    this.scene.fog = new THREE.Fog(0x000000, 0, 700);


    // Create outline effect
    this.effect = new OutlineEffect(this.renderer);
    this.onFrame(() => {
      this.effect.render(this.scene, this.camera.__CAMERA__);
    })

    // Add directional light to represent the sun
    new FDirectionalLight(this, {
      position: { x: 20, y: 20, z: 0 },
      color: 0xFFFFFF,
      intensity: 3,
      shadowQuality: 12,
    })

    new FDirectionalLight(this, {
      position: { x: 0, y: 20, z: 50 },
      color: 0xFFFFFF,
      intensity: 2,
      shadowQuality: 12,
    })
    // Add ambient light
    new FAmbientLight(this, {
      color: 0x404040,
      intensity: 20,
    })
  }
}
