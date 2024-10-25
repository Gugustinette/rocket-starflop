import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { FModel } from '@fibbojs/3d'
import type { FModelOptions, FScene } from '@fibbojs/3d'

export class FGLBToon extends FModel {
  static __CACHED_MESHES__: { [key: string]: THREE.Mesh } = {}

  constructor(scene: FScene, options: FModelOptions) {
    super(scene, {
      fileExtension: 'glb',
      ...options,
    })

    if (FGLBToon.__CACHED_MESHES__[this.path]) {
      this.__MESH__ = FGLBToon.__CACHED_MESHES__[this.path].clone()
      this.defineMeshTransforms()
      this.emitOnLoaded()
    }
    else {
      // Create GLTF Loader
      const loader = new GLTFLoader()
  
      // Load the glTF resource
      loader.load(
        this.path,
        // Called when the resource is loaded
        (gltf) => {
          // Get the mesh from the glTF scene
          this.__MESH__ = gltf.scene
  
          // Replace the material of every mesh with a new one
          this.__MESH__.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshToonMaterial({
                color: child.material.color,
                emissive: child.material.color,
                emissiveIntensity: -0.7,
              })
            }
          })
  
          // Define mesh transforms
          this.defineMeshTransforms()
  
          // Call the onLoaded Callbacks
          this.emitOnLoaded()

          // Cache the mesh
          FGLBToon.__CACHED_MESHES__[this.path] = this.__MESH__.clone() as unknown as THREE.Mesh
        },
        // Called while loading is progressing
        (_xhr) => {
        },
        // Called when loading has errors
        (error) => {
          console.log(`An error happened while loading the model : ${this.path}`)
          console.log(error)
        },
      )
    }
  }
}