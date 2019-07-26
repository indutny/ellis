import { x2s, dx2ds } from './utils';

const RHO = 1.0;
const STEP = 0.5;
const MAX_STEPS = 100;

export function cast(posX, vecX) {
  let t = 0;
  const posS = x2s(posX);
  const vecS = dx2ds(posX, vecX);

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

    const step = Math.min(STEP,
      1 / Math.sqrt(ddl ** 2 + ddtheta ** 2 + ddphi ** 2));

    dl += ddl * step;
    dtheta += ddtheta * step;
    dphi += ddphi * step;

    l += dl * step;
    theta += dtheta * step;
    phi += dphi * step;
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
