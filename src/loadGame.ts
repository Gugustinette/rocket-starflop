import {LandManager} from "./lands/LandManager.ts";
import {FScene} from '@fibbojs/3d'

export function loadGame(scene: FScene) {
    const landManager = new LandManager(scene);

    scene.onFrame((delta: number) => {
        landManager.onFrame(delta);
    })
}
