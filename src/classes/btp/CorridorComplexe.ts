import {
    Corridor,
    CorridorCorner,
    CorridorCornerRound,
    CorridorCross,
    CorridorEnd,
    CorridorSplit,
    CorridorWindowClosed,
} from "./Corridor.ts";
import {FScene} from '@fibbojs/3d'
import {BTPOptions} from "./BTP.ts";
import {randomInt} from "../util/Random.ts";
import {createRocket} from "./Rocket.ts";

export function createCorridor(scene: FScene, options: BTPOptions) {
    let baseChoice = randomInt(0, 2);
    if (baseChoice === 0) return donutBase(scene, options);
    else if (baseChoice === 1) return bigBaseStyle1(scene, options);
    else return bigBaseStyle2(scene, options);
}

function donutBase(scene: FScene, options: BTPOptions) {
    if (options.scale === undefined) {
        return [];
    }

    // Make 4 corners for the corridor
    let components = [];

    let isCornerRounded = randomInt(0, 1) === 0;

    // CORNERS
    let corridor1 = cornerRoundedDepending(scene, options, isCornerRounded);

    let corridor2 = cornerRoundedDepending(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2) * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    }, isCornerRounded);

    let corridor3 = cornerRoundedDepending(scene, {
        position: {
            x: options.position.x - (options.scale.x / 2) * 2,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2) * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    }, isCornerRounded);

    let corridor4 = cornerRoundedDepending(scene, {
        position: {
            x: options.position.x - (options.scale.x / 2) * 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    }, isCornerRounded);

    // LIAISONS
    let corridor5 = corridorRandom(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2)
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridor6 = corridorRandom(scene, {
        position: {
            x: options.position.x - (options.scale.x / 2),
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2) * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridor7 = corridorRandom(scene, {
        position: {
            x: options.position.x - (options.scale.x / 2) * 2,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2)
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridor8 = corridorRandom(scene, {
        position: {
            x: options.position.x - (options.scale.x / 2),
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    // Rotation
    setRotation(corridor2, 90);
    setRotation(corridor3, 180);
    setRotation(corridor4, 270);
    setRotation(corridor6, 90);
    setRotation(corridor8, 90);

    components.push(corridor1);
    components.push(corridor2);
    components.push(corridor3);
    components.push(corridor4);
    components.push(corridor5);
    components.push(corridor6);
    components.push(corridor7);
    components.push(corridor8);

    return components;
}


function bigBaseStyle1(scene: FScene, options: BTPOptions) {
    if (options.scale === undefined) {
        return [];
    }

    let components = [];

    let cross1 = new CorridorCross(scene, options);
    let cross2 = new CorridorCross(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2) * 3
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorJoin1 = corridorRandom(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2)
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorJoin2 = corridorRandom(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - options.scale.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorSplit1 = new CorridorSplit(scene, {
        position: {
            x: options.position.x ,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorSplit2 = new CorridorSplit(scene, {
        position: {
            x: options.position.x ,
            y: options.position.y,
            z: options.position.z + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner1 = new CorridorCorner(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner2 = new CorridorCorner(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner3 = new CorridorCorner(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner4 = new CorridorCorner(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner5 = new CorridorCorner(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner6 = new CorridorCorner(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner7 = new CorridorCorner(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorCorner8 = new CorridorCorner(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    setRotation(corridorSplit1, 270);
    setRotation(corridorSplit2, 90);

    setRotation(corridorCorner1, 90);
    setRotation(corridorCorner5, 90);
    setRotation(corridorCorner3, 180);
    setRotation(corridorCorner7, 180);
    setRotation(corridorCorner4, 270);
    setRotation(corridorCorner8, 270);

    components.push(corridorCorner1);
    components.push(corridorCorner2);
    components.push(corridorCorner3);
    components.push(corridorCorner4);
    components.push(corridorCorner5);
    components.push(corridorCorner6);
    components.push(corridorCorner7);
    components.push(corridorCorner8);
    components.push(cross1);
    components.push(cross2);
    components.push(corridorJoin1);
    components.push(corridorJoin2);
    components.push(corridorSplit1);
    components.push(corridorSplit2);


    return components;
}


function bigBaseStyle2(scene: FScene, options: BTPOptions) {
    if (options.scale === undefined) {
        return [];
    }

    let components = [];

    let cross1 = new CorridorCross(scene, options);
    let cross2 = new CorridorCross(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2) * 3
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorJoin1 = corridorRandom(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - (options.scale.z / 2)
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorJoin2 = corridorRandom(scene, {
        position: {
            x: options.position.x,
            y: options.position.y,
            z: options.position.z - options.scale.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd1 = new CorridorEnd(scene, {
        position: {
            x: options.position.x ,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd2 = new CorridorEnd(scene, {
        position: {
            x: options.position.x ,
            y: options.position.y,
            z: options.position.z + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorBottomLeft = corridorRandom(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorBottomRight = corridorRandom(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorTopLeft = corridorRandom(scene, {
        position: {
            x: options.position.x - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorTopRight = corridorRandom(scene, {
        position: {
            x: options.position.x + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorSplit1 = new CorridorSplit(scene, {
        position: {
            x: options.position.x + options.scale.x,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });
    let corridorSplit2 = new CorridorSplit(scene, {
        position: {
            x: options.position.x + options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorSplit3 = new CorridorSplit(scene, {
        position: {
            x: options.position.x - options.scale.x,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });
    let corridorSplit4 = new CorridorSplit(scene, {
        position: {
            x: options.position.x - options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorLine1 = corridorRandom(scene, {
        position: {
            x: options.position.x - options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });
    let corridorLine2 = corridorRandom(scene, {
        position: {
            x: options.position.x - options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorLine3 = corridorRandom(scene, {
        position: {
            x: options.position.x + options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });
    let corridorLine4 = corridorRandom(scene, {
        position: {
            x: options.position.x + options.scale.x,
            y: options.position.y,
            z: options.position.z - options.scale.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd3 = new CorridorEnd(scene, {
        position: {
            x: options.position.x - options.scale.x * 2 + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd4 = new CorridorEnd(scene, {
        position: {
            x: options.position.x - options.scale.x * 2 + options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd5 = new CorridorEnd(scene, {
        position: {
            x: options.position.x + options.scale.x * 2 - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z - options.scale.z * 2 + options.scale.z / 2
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    let corridorEnd6 = new CorridorEnd(scene, {
        position: {
            x: options.position.x + options.scale.x * 2 - options.scale.x / 2,
            y: options.position.y,
            z: options.position.z
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y,
            z: options.scale.z
        }
    });

    setRotation(corridorSplit1, 90);
    setRotation(corridorSplit2, 270);
    setRotation(corridorSplit3, 90);
    setRotation(corridorSplit4, 270);
    setRotation(corridorEnd2, 180);
    setRotation(corridorEnd3, 90);
    setRotation(corridorEnd4, 90);
    setRotation(corridorEnd5, 270);
    setRotation(corridorEnd6, 270);
    setRotation(corridorBottomRight, 90);
    setRotation(corridorBottomLeft, 90);
    setRotation(corridorTopRight, 90);
    setRotation(corridorTopLeft, 90);

    components.push(corridorBottomLeft);
    components.push(corridorBottomRight);
    components.push(corridorTopLeft);
    components.push(corridorTopRight);
    components.push(cross1);
    components.push(cross2);
    components.push(corridorJoin1);
    components.push(corridorJoin2);
    components.push(corridorEnd1);
    components.push(corridorEnd2);
    components.push(corridorEnd3);
    components.push(corridorEnd4);
    components.push(corridorEnd5);
    components.push(corridorEnd6);
    components.push(corridorSplit1);
    components.push(corridorSplit2);
    components.push(corridorSplit3);
    components.push(corridorSplit4);
    components.push(corridorLine1);
    components.push(corridorLine2);
    components.push(corridorLine3);
    components.push(corridorLine4);

    components.push(...addRocket(scene, options));

    return components;
}

function addRocket(scene: FScene, options: BTPOptions) {
    if(options.scale === undefined) {
        return [];
    }

    return createRocket(scene, {
        position: {
            x: options.position.x + (options.scale.x * 2),
            y: 0,
            z: options.position.z - (options.scale.z * 2)
        },
        scale: {
            x: options.scale.x,
            y: options.scale.y + randomInt(3, 5),
            z: options.scale.z,
        }
    });
}


function setRotation(corridor: Corridor, degree: number) {
    corridor.transform.rotationDegreeY = degree;
    corridor.onLoaded(() => {
        corridor.transform.rotationDegreeY = degree;
    });
}

function cornerRoundedDepending(scene: FScene, options: BTPOptions, cornerRounded: boolean) {
    if (cornerRounded) {
        return new CorridorCornerRound(scene, options);
    }

    return new CorridorCorner(scene, options);
}

function corridorRandom(scene: FScene, options: BTPOptions) {
    let window = randomInt(0, 1);
    if(window) {
        return new CorridorWindowClosed(scene, options);
    }

    return new Corridor(scene, options);
}