import { FScene, FSceneOptions } from '@fibbojs/3d';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

export class Scene extends FScene {
  declare effect: OutlineEffect;

  constructor(options: FSceneOptions) {
    super(options);
  }

  init(): void {
    super.init();
    this.effect = new OutlineEffect(this.renderer);
    this.onFrame(() => {
      this.effect.render(this.scene, this.camera.__CAMERA__);
    })
  }
}
