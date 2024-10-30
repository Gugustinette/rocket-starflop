export class Heart {
  __DOM__: HTMLElement;
  __DOM_BACKGROUND__: HTMLImageElement;
  __DOM_BORDER__: HTMLImageElement;
  __DOM_HEART__: HTMLImageElement;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'heart';
    // Create DOM images
    // Background
    this.__DOM_BACKGROUND__ = document.createElement('img');
    this.__DOM_BACKGROUND__.src = '/rocket-starflop/assets/ui/heart/background.png';
    this.__DOM__.appendChild(this.__DOM_BACKGROUND__);
    // Border
    this.__DOM_BORDER__ = document.createElement('img');
    this.__DOM_BORDER__.src = '/rocket-starflop/assets/ui/heart/border.png';
    this.__DOM__.appendChild(this.__DOM_BORDER__);
    // Heart
    this.__DOM_HEART__ = document.createElement('img');
    this.__DOM_HEART__.src = '/rocket-starflop/assets/ui/heart/heart.png';
    this.__DOM__.appendChild(this.__DOM_HEART__);
    // Style
    this.__DOM__.style.userSelect = 'none';
    this.__DOM__.style.position = 'relative';
    this.__DOM__.style.width = '48px';
    this.__DOM__.style.height = '48px';
    // Make it so all images are on top of each other
    this.__DOM_BACKGROUND__.style.position = 'absolute';
    this.__DOM_BORDER__.style.position = 'absolute';
    this.__DOM_HEART__.style.position = 'absolute';
    // Make the images bigger
    this.__DOM_BACKGROUND__.style.width = '48px';
    this.__DOM_BACKGROUND__.style.height = '48px';
    this.__DOM_BORDER__.style.width = '48px';
    this.__DOM_BORDER__.style.height = '48px';
    this.__DOM_HEART__.style.width = '48px';
    this.__DOM_HEART__.style.height = '48px';

    // Append to body
    document.body.appendChild(this.__DOM__);
  }
}
