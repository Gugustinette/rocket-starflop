export class SecretPanel {
    __DOM__: HTMLElement;
    __DOM_TEXT__: HTMLElement;
    __DOM_LEVEL__: HTMLElement;

    constructor(name: string) {
        // Create DOM
        this.__DOM__ = document.createElement('div');
        this.__DOM__.className = 'secret-panel';
        // Create DOM Score
        this.__DOM_TEXT__ = document.createElement('div');
        this.__DOM_TEXT__.innerText = 'EASTER EGG ACTIVÉ!';

        this.__DOM_LEVEL__ = document.createElement('div');
        this.__DOM_LEVEL__.innerText = name;
        this.__DOM_LEVEL__.style.fontSize = '50px';
        this.__DOM_LEVEL__.style.color = 'orange';

        this.__DOM__.appendChild(this.__DOM_TEXT__);
        this.__DOM__.appendChild(this.__DOM_LEVEL__);
        // Style center of the screen
        this.__DOM__.style.position = 'absolute';
        this.__DOM__.style.top = '10px';
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

        // Animate the panel (come from the top)
        this.__DOM__.style.top = '-100px';
        let top = -100;
        const interval = setInterval(() => {
            if(this.__DOM__.style.top !== '20px') {
                top += 5;
                this.__DOM__.style.top = top + 'px';
            }
        }, 10);

        // Hide the panel after 3 seconds
        setTimeout(() => {
            this.__DOM__.style.display = 'none';
            clearInterval(interval);
        }, 3000);
    }
}
