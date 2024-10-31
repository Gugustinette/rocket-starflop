export class Button {
  __DOM__: HTMLElement;

  constructor(label: string) {
    // Create button
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'menu-button';
    // Add CSS
    this.__DOM__.innerText = label;
    this.__DOM__.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.__DOM__.style.padding = '0px 20px';
    this.__DOM__.style.fontSize = '40px';
    this.__DOM__.style.borderRadius = '8px';
    this.__DOM__.style.cursor = 'pointer';
    this.__DOM__.style.transition = 'all 0.2s ease';
    // CSS Hover
    this.__DOM__.onmouseover = () => {
      this.__DOM__.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      this.__DOM__.style.color = '#FFB21B';
      this.__DOM__.style.transform = 'scale(1.1) rotate(-5deg)';
    };
    this.__DOM__.onmouseout = () => {
      this.__DOM__.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      this.__DOM__.style.color = '#FFFFFF';
      this.__DOM__.style.transform = 'scale(1) rotate(0deg)';
    };
  }

  onClick(callback: () => void) {
    this.__DOM__.addEventListener('click', callback);
  }
}
