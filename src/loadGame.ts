import { LandManager } from "./lands/LandManager.ts";
import { FGameCamera } from '@fibbojs/3d'
import { MeteorManager } from "./meteor/MeteorManager.ts";
import Craft from "./classes/craft/Craft.ts";
import { CraftController } from "./classes/craft/CraftControllerDebug.ts";
import { Scene } from "./Scene.ts";
import { fDebug } from "@fibbojs/devtools";
import { AudioManager } from "./audio/AudioManager.ts";
import { GameState, State } from "./GameState.ts";
import {SecretPanel} from "./ui/SecretPanel.ts";

export function loadGame(scene: Scene) {
    // Create the craft
    const craft = new Craft(scene)
    // Create the land manager
    const landManager = new LandManager(scene);

    // Create the meteor manager
    new MeteorManager(scene);

    let hasInteracted = false;
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!hasInteracted && target.id !== 'play-button' && GameState.state === State.MENU) {
            AudioManager.playMenu();
            hasInteracted = true;
        }
    });
    // Color mode
    let hasInteractedColorMode = false;
    let isPressingF = false;
    let rainbowInterval: number;
    // When pressing the f key for 5 seconds
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'f' || event.key === 'F') && !hasInteractedColorMode && !isPressingF) {
            rainbowInterval = setInterval(() => {
                /**
                 * Turn on the rainbow mode
                 */
                AudioManager.stopGame();
                AudioManager.stopMenu();
                AudioManager.playRainbowMode();
                GameState.rainbowMode = true;
                GameState.score += 10000;
                GameState.onStateChange((state) => {
                    if (state === State.PLAYING) {
                        GameState.score += 10000;
                    }
                });
                new SecretPanel('RAINBOW MODE');
                hasInteractedColorMode = true;
            }, 5000);
            isPressingF = true;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'f' || event.key === 'F') {
            clearInterval(rainbowInterval);
            isPressingF = false;
        }
    });

    // If konami code is entered
    let konamiCode = '';
    const konami = '38384040373937396665';
    document.addEventListener('keydown', (event) => {
        konamiCode += event.keyCode;
        if (konamiCode === konami) {
            GameState.konamiMode = true;
            new SecretPanel('KONAMI MODE');
            konamiCode = '';
        }

        // Reset if the last key is not part of the konami code
        if (!konami.startsWith(konamiCode)) {
            konamiCode = '';
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
