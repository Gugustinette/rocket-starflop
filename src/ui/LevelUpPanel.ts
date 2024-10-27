export class LevelUpPanel {
    __DOM__: HTMLElement;
    __DOM_TEXT__: HTMLElement;
    __DOM_LEVEL__: HTMLElement;

    constructor(level: number) {
        // Create DOM
        this.__DOM__ = document.createElement('div');
        this.__DOM__.className = 'level-panel';
        // Create DOM Score
        this.__DOM_TEXT__ = document.createElement('div');
        this.__DOM_TEXT__.innerText = 'LEVEL UP!';

        this.__DOM_LEVEL__ = document.createElement('div');
        this.__DOM_LEVEL__.innerText = 'Level ' + level;
        this.__DOM_LEVEL__.style.fontSize = '50px';
        this.__DOM_LEVEL__.style.color = 'orange';

        this.__DOM__.appendChild(this.__DOM_TEXT__);
        this.__DOM__.appendChild(this.__DOM_LEVEL__);
        // Style center of the screen
        this.__DOM__.style.position = 'absolute';
        this.__DOM__.style.top = '45%';
        this.__DOM__.style.left = '50%';
        this.__DOM__.style.transform = 'translateX(-50%)';
        this.__DOM__.style.color = 'white';
        this.__DOM__.style.fontFamily = "'Jersey 20', sans-serif";
        this.__DOM__.style.fontSize = '90px';
        this.__DOM__.style.userSelect = 'none';
        this.__DOM__.style.textAlign = 'center';
        this.__DOM__.style.lineHeight = '0.8';

        // Append to body
        document.body.appendChild(this.__DOM__);

        // Animate the panel
        this.__DOM__.style.opacity = '0';
        let opacity = false;
        const interval = setInterval(() => {
            opacity = !opacity;
            this.__DOM__.style.opacity = opacity ? '1' : '0';
        }, 300);

        // Hide the panel after 3 seconds
        setTimeout(() => {
            this.__DOM__.style.display = 'none';
            clearInterval(interval);
        }, 3000);
    }
}
