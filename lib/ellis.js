import { x2s, dx2ds } from './utils';

const RHO = 0.05;
const STEP = 0.01;
const MAX_STEPS = 10000;

export function cast(posX, vecX, limit=Infinity) {
  let t = 0;
  const posS = x2s(posX);
  const vecS = dx2ds(posX, vecX);

  return posS;

  let [ l, theta, phi ] = posS;

  let dt = 1;
  let [ dl, dtheta, dphi ] = vecS;

  const initial = Math.abs(l);
  for (let i = 0; i < MAX_STEPS; i++) {
    const r = Math.sqrt(l ** 2 + RHO ** 2);

    const ddl = l * (dtheta ** 2) +
        l * (Math.sin(theta) ** 2) * (dphi ** 2);
    const ddtheta = Math.sin(theta) * Math.cos(theta) * (dphi ** 2) -
        2 * l / (r ** 2) * dtheta * dl;
    const ddphi = -2 * Math.cos(theta) / Math.sin(theta) * dphi * dtheta -
        2 * l / (r ** 2) * dphi * dl;

    const step = STEP;

    dl += ddl * step;
    dtheta += ddtheta * step;
    dphi += ddphi * step;

    l += dl * step;
    theta += dtheta * step;
    phi += dphi * step;

    if (Math.abs(l) > limit) {
      break;
    }
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
