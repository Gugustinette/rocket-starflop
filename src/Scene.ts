import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import {FAmbientLight, FDirectionalLight, FScene, FSceneOptions} from '@fibbojs/3d';
import { WindEffect } from './fx/WindEffect';

export class Scene extends FScene {
  declare effect: OutlineEffect;

  constructor(options: FSceneOptions) {
    super(options);
  }

  init(): void {
    super.init();

    // Set the background color of the scene
    this.scene.background = new THREE.Color(0x251733);
    // Set the fog to the same color as the background
    this.scene.fog = new THREE.Fog(0x251733, 0, 700);

    // Create outline effect
    this.effect = new OutlineEffect(this.renderer);
    this.onFrame(() => {
      this.effect.render(this.scene, this.camera.__CAMERA__);
    })

    // Add directional lights to represent the sun
    const sun = new FDirectionalLight(this, {
      position: { x: 100, y: 50, z: 0 },
      color: 0xF9F6FF,
      intensity: 3,
      shadowQuality: 12,
    })
    // Expand the light to cover the whole scene
    // @ts-ignore
    sun.__LIGHT__.shadow.camera.right = 1000
    // Add ambient light
    new FAmbientLight(this, {
      color: 0x403B50,
      intensity: 40,
    })
    new FAmbientLight(this, {
      color: 0x404040,
      intensity: 10,
    })

    // Sky box from : https://www.freepik.com/free-photo/outer-space-background_4100956.htm#fromView=search&page=1&position=4&uuid=b34e88e9-22bd-489a-aa87-7bf0088ff78f
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      '/rocket-starflop/assets/sky.jpg',
      () => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        this.scene.background = texture;
      });
    
    // Wind effect
    new WindEffect(this);
  }
}
