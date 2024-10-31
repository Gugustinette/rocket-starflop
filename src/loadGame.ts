import { LandManager } from "./lands/LandManager.ts";
import { FGameCamera } from '@fibbojs/3d'
import { MeteorManager } from "./meteor/MeteorManager.ts";
import Craft from "./classes/craft/Craft.ts";
import { CraftController } from "./classes/craft/CraftControllerDebug.ts";
import { Scene } from "./Scene.ts";
import { fDebug } from "@fibbojs/devtools";
import { AudioManager } from "./audio/AudioManager.ts";
import { GameState, State } from "./GameState.ts";

export function loadGame(scene: Scene) {
    // Create the craft
    const craft = new Craft(scene)
    // Create the land manager
    const landManager = new LandManager(scene);
    // Create the meteor manager
    new MeteorManager(scene);
    // Launch the music
    let hasInteracted = false;
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!hasInteracted && target.id !== 'play-button' && GameState.state === State.MENU) {
            AudioManager.playMenu();
            hasInteracted = true;
        }
    });

    scene.onFrame((delta: number) => {
        landManager.frame(delta);
    })

    if (false) {
        if (false)
            fDebug(scene)
        craft.controller = new CraftController(scene, { 
            component: craft 
        })
        scene.debug = true
        scene.camera = new FGameCamera(scene, {
         target: craft,
        })
    }
}
