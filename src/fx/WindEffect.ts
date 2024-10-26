import { FScene } from '@fibbojs/3d'
import * as THREE from 'three'

export class WindEffect {
  private scene: FScene
  private particles: THREE.Points
  private particleCount: number
  private particleGeometry: THREE.BufferGeometry
  private particleMaterial: THREE.PointsMaterial
  private speed: number
  private particleData: Float32Array
  private cameraZ: number

  constructor(scene: FScene, particleCount = 1000, speed = 100) {
    this.scene = scene
    this.particleCount = particleCount
    this.speed = speed
    this.cameraZ = 20

    this.particleData = new Float32Array(this.particleCount * 4) // x, y, z, life

    const positions = new Float32Array(this.particleCount * 3)
    const sizes = new Float32Array(this.particleCount)

    for (let i = 0; i < this.particleCount; i++) {
      this.resetParticle(i)
      positions[i * 3] = this.particleData[i * 4]
      positions[i * 3 + 1] = this.particleData[i * 4 + 1]
      positions[i * 3 + 2] = this.particleData[i * 4 + 2]
      sizes[i] = Math.random() * 0.05 + 0.01
    }

    this.particleGeometry = new THREE.BufferGeometry()
    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const texture = this.createParticleTexture()
    this.particleMaterial = new THREE.PointsMaterial({
      color: 0xF7E9FF,
      size: 0.1,
      map: texture,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial)
    this.scene.scene.add(this.particles)

    this.scene.onFrame((delta) => {
      this.frame(delta)
    })
  }

  private createParticleTexture(): THREE.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32

    const context = canvas.getContext('2d')
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, 32, 32)
    }

    return new THREE.CanvasTexture(canvas)
  }

  private resetParticle(index: number) {
    const i = index * 4
    this.particleData[i] = Math.random() * 40 - 20     // x
    this.particleData[i + 1] = Math.random() * 40 - 20 // y
    this.particleData[i + 2] = Math.random() * 40 - 40 // z (changed to start further away)
    this.particleData[i + 3] = Math.random() * 0.9 + 0.1 // life
  }

  frame(delta: number) {
    const positions = this.particleGeometry.attributes.position.array as Float32Array
    const sizes = this.particleGeometry.attributes.size.array as Float32Array

    const frameSpeed = this.speed * delta

    for (let i = 0; i < this.particleCount; i++) {
      const ix = i * 4
      const iy = i * 4 + 1
      const iz = i * 4 + 2
      const ilife = i * 4 + 3

      this.particleData[iz] += frameSpeed * this.particleData[ilife]
      this.particleData[ilife] -= delta * 0.1 // Decrease life

      if (this.particleData[iz] > this.cameraZ || this.particleData[ilife] <= 0) {
        this.resetParticle(i)
      }

      positions[i * 3] = this.particleData[ix]
      positions[i * 3 + 1] = this.particleData[iy]
      positions[i * 3 + 2] = this.particleData[iz]

      sizes[i] = (0.05 + 0.01) * this.particleData[ilife]
    }

    this.particleGeometry.attributes.position.needsUpdate = true
    this.particleGeometry.attributes.size.needsUpdate = true
  }
}