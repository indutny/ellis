import { cast } from '../lib/ellis';

const INITIAL_DEPTH = 10;
const VELOCITY = [ 0, 0, 1 ];
const ITERATIONS = 100;

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

    this.iteration = 0;
  }

  draw() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const scale = this.scale;
    const ctx = this.ctx;

    const bigRadius = Math.sqrt(this.width ** 2 + this.height ** 2);

    for (let i = 0; i < ITERATIONS; i++) {
      const off = this.iteration++;
      const x = (off % this.width);
      const y = Math.floor(off / this.height);

      if (y > this.height) {
        return;
      }

      const mx = (x - cx) / bigRadius * scale;
      const my = (y - cy) / bigRadius * scale;

      const [ l, theta, phi ] = cast([ mx, my, -INITIAL_DEPTH ], VELOCITY,
        1.1 * INITIAL_DEPTH);

      const checkerX = Math.sin(theta) * Math.cos(phi);
      const checkerY = Math.sin(theta) * Math.sin(phi);
      let one = (checkerX + checkerY) % 2;
      const comp = 1 - one;

      let r = 0;
      let g = 0;
      let b = 0;
      if (Math.abs(l) < INITIAL_DEPTH) {
        g = 255;
      } else if (l > 0) {
        r = 0xf3 * one + 0x0c * comp;
        g = 0xc6 * one + 0x0a * comp;
        b = 0x77 * one + 0x3e * comp;
      } else {
        r = 0x40 * one + 0xeb * comp;
        g = 0x70 * one + 0xba * comp;
        b = 0x76 * one + 0xb9 * comp;
      }

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

const app = new App({ width: 1024, height: 1024, scale: 1 });
document.body.appendChild(app.elem);

const draw = () => {
  app.draw();
  window.requestAnimationFrame(draw);
};

draw();
