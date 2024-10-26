import { FScene, FVector3 } from '@fibbojs/3d';
import * as THREE from 'three';

export interface ExplosionOptions {
  position: FVector3;
  radius: number;
}

export class Explosion {
  private scene: THREE.Scene;
  private position: THREE.Vector3;
  private radius: number;
  declare private particles: THREE.Points;
  declare private particleGeometry: THREE.BufferGeometry;
  declare private particleMaterial: THREE.PointsMaterial;
  declare private smokeParticles: THREE.Points;
  declare private smokeParticleGeometry: THREE.BufferGeometry;
  declare private smokeParticleMaterial: THREE.PointsMaterial;
  private particleCount: number = 200;
  private smokeParticleCount: number = 500;
  private particleSpeed: number = 5;
  private particleLifespan: number = 2; // seconds
  private smokeLifespan: number = 3; // seconds
  private explosionSound: HTMLAudioElement

  constructor(scene: FScene, options: ExplosionOptions) {
    this.scene = scene.scene;
    this.position = new THREE.Vector3(options.position.x, options.position.y, options.position.z);
    this.radius = options.radius;

    if (import.meta.env.DEV)
      this.explosionSound = new Audio('rocket-starflop/assets/explosion.mp3')
    else
      this.explosionSound = new Audio('assets/explosion.mp3')

    // Play the shoot sound
    const explosionSound = this.explosionSound.cloneNode() as HTMLAudioElement
    explosionSound.volume = 1
    explosionSound.play()

    this.initParticles();
    this.initSmokeParticles();


    scene.onFrame((delta) => this.frame(delta));
  }

  private initParticles() {
    this.particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * this.radius;
      positions[i * 3] = this.position.x + r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = this.position.y + r * Math.cos(phi);
      positions[i * 3 + 2] = this.position.z + r * Math.sin(phi) * Math.sin(theta);
    }
    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });

    // Set initial colors for particles (white to red gradient)
    const colors = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount; i++) {
      const hue = i / this.particleCount; // 0 to 1
      colors[i * 3] = hue; // Red component
      colors[i * 3 + 1] = hue * 0.8; // Green component
      colors[i * 3 + 2] = hue * 0.5; // Blue component
    }
    this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);
    this.scene.add(this.particles);
  }

  private initSmokeParticles() {
    this.smokeParticleGeometry = new THREE.BufferGeometry();
    const smokePositions = new Float32Array(this.smokeParticleCount * 3);
    for (let i = 0; i < this.smokeParticleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * this.radius * 1.5; // Smoke spreads wider
      smokePositions[i * 3] = this.position.x + r * Math.sin(phi) * Math.cos(theta);
      smokePositions[i * 3 + 1] = this.position.y + r * Math.cos(phi);
      smokePositions[i * 3 + 2] = this.position.z + r * Math.sin(phi) * Math.sin(theta);
    }
    this.smokeParticleGeometry.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));

    this.smokeParticleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xcccccc, // Grayish smoke color
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending, // For brighter smoke effect
    });

    this.smokeParticles = new THREE.Points(this.smokeParticleGeometry, this.smokeParticleMaterial);
    this.scene.add(this.smokeParticles);
  }

  frame(delta: number) {
    this.updateParticles(delta, this.particles, this.particleGeometry, this.particleMaterial, this.particleLifespan);
    this.updateParticles(delta, this.smokeParticles, this.smokeParticleGeometry, this.smokeParticleMaterial, this.smokeLifespan);
    // Move everything on the z-axis to simulate an explosion in 3D
    this.particles.position.z += this.particleSpeed * delta * 10;
    this.smokeParticles.position.z += this.particleSpeed * delta * 10;
  }

  private updateParticles(delta: number, particles: THREE.Points, geometry: THREE.BufferGeometry, material: THREE.PointsMaterial, lifespan: number) {
    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particles.geometry.attributes.position.count; i++) {
      const index = i * 3;
      const particleSpeed = this.particleSpeed * delta;
      positions[index + 1] += particleSpeed; // Move particles upwards

      const opacity = 1 - (lifespan * delta) / lifespan;
      material.opacity = opacity;

      if (opacity <= 0) {
        this.scene.remove(particles);
        return; // Explosion finished
      }
    }
    geometry.attributes.position.needsUpdate = true;
  }
}
