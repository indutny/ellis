import { x2s, dx2ds } from './utils';

const RHO = 1.0;
const STEP = 0.001;

export function cast(posX, vecX) {
  let t = 0;
  const posS = x2s(posX);
  const vecS = dx2ds(posX, vecX);

  console.log(posS);

  let [ l, theta, phi ] = posS;

  let dt = 1;
  let [ dl, dtheta, dphi ] = vecS;

  while (Math.abs(l) < 100) {
    const r = Math.sqrt(l ** 2 + RHO ** 2);

    const ddl = l * (dtheta ** 2) +
        l * (Math.sin(theta) ** 2) * (dphi ** 2);
    const ddtheta = Math.sin(theta) * Math.cos(theta) * (dphi ** 2) -
        2 * l / (r ** 2) * dtheta * dl;
    const ddphi = -2 * Math.cos(theta) / Math.sin(theta) * dphi * dtheta -
        2 * l / (r ** 2) * dphi * dl;

    dl += ddl * STEP;
    dtheta += ddtheta * STEP;
    dphi += ddphi * STEP;

    l += dl * STEP;
    theta += dtheta * STEP;
    phi += dphi * STEP;
  }

  theta = Math.acos(Math.cos(theta));

  while (phi < -Math.PI) {
    phi += 2 * Math.PI;
  }
  phi = phi % (2 * Math.PI);

  while (phi >= Math.PI) {
    phi -= 2 * Math.PI;
  }

  return [ l, theta, phi ];
}
