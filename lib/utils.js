export function x2s([ x, y, z ]) {
  const l = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const theta = Math.acos(z / l);
  const phi = Math.atan2(y, x);

  return [ l, theta, phi ];
}

export function dx2ds([ x, y, z ], vecX) {
  const r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const phiDenom = x ** 2 + y ** 2;
  const thetaDenom = (r ** 2) * Math.sqrt(phiDenom);

  const matrix = [
    [ x / r, y / r , z / r ],
    [ x * z / thetaDenom, y * z / thetaDenom,
      (z ** 2 - r ** 2) / thetaDenom ],
    [ -y / phiDenom, x / phiDenom, 0 ],
  ];

  const vecS = [ 0, 0, 0 ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      vecS[i] += matrix[i][j] * vecX[j];
    }
  }
  return vecS;
}
