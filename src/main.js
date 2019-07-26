import { cast } from '../lib/ellis';

const INITIAL_DEPTH = 3;
const VELOCITY = [ 0, 1, 0 ];
const ITERATIONS = 1000;

export default class App {
  constructor({ width, height, scale }) {
    this.width = width;
    this.height = height;
    this.scale = scale;

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.elem = canvas;

    this.ctx = canvas.getContext('2d');
  }

  draw() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const scale = this.scale;
    const ctx = this.ctx;

    for (let i = 0; i < ITERATIONS; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const mx = (x - cx) * scale;
      const my = (y - cy) * scale;

      const [ l, theta, phi ] = cast([ mx, -INITIAL_DEPTH, my ], VELOCITY);

      const checkerX = Math.round(64 * (theta / Math.PI));
      const checkerY = Math.round(64 * (phi / (2 * Math.PI)));
      const checker = (checkerX + checkerY) % 2 === 0;

      let color;
      if (l > 0) {
        color = checker ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
      } else {
        color = checker ? 'rgb(0,255,0)' : 'rgb(0,0,0)';
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

const app = new App({ width: 1024, height: 1024, scale: 4 / 1024 });
document.body.appendChild(app.elem);

const draw = () => {
  app.draw();
  window.requestAnimationFrame(draw);
};

draw();
