export default class PolifillVh{
  constructor(){
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    this.vh = window.innerHeight * 0.01;
    this.addVh = document.documentElement.style.setProperty('--vh', `${this.vh}px`);
  }

  resize(){
    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });
  }
}