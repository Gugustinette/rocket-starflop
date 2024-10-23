import {LandManager} from "./lands/LandManager.ts";

export function loadGame(scene: FScene) {
    const landManager = new LandManager(scene);

    scene.onFrame((delta: number) => {
        landManager.onFrame(delta);
    })
}
