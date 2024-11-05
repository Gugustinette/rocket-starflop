import * as THREE from 'three';
import { FAmbientLight, FDirectionalLight, FFixedCamera, FScene, FSceneOptions } from '@fibbojs/3d';
import { WindEffect } from './fx/WindEffect';

// Post processing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

export class Scene extends FScene {
  declare composer: EffectComposer;
  debug: boolean = false;

  constructor(options: FSceneOptions) {
    super(options);
  }

  init(): void {
    super.init();

    // Create the camera
    this.camera = new FFixedCamera(this, {
      position: { x: 0, y: 12, z: 20 },
      rotationDegree: { x: -10, y: 0, z: 0 },
    });

    // Set the background color of the scene
    this.scene.background = new THREE.Color(0x251733);
    // Set the fog to the same color as the background
    this.scene.fog = new THREE.Fog(0x251733, 0, 700);

    // Add directional lights to represent the sun
    const sun = new FDirectionalLight(this, {
      position: { x: 100, y: 50, z: 0 },
      color: 0xF9F6FF,
      intensity: 3,
      shadowQuality: 10,
    })
    // Expand the light to cover the whole scene
    // @ts-ignore
    sun.__LIGHT__.shadow.camera.right = 450
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

    /**
     * Post Processing
     */
    // Create the composer
    this.composer = new EffectComposer( this.renderer );

    // Add output pass
    this.composer.addPass(new OutputPass());
    // Add pixelated pass
    this.composer.addPass(new RenderPixelatedPass( 1.5, this.scene, this.camera.__CAMERA__ ));
    // Add FXAA pass
    const effectFXAA = new ShaderPass( FXAAShader );
    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    this.composer.addPass( effectFXAA );

    // Render the composer on each frame
    this.onFrame(() => {
      if (this.debug) return;
      this.composer.render();
    })
  }
}
