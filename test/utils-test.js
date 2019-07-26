import * as assert from 'assert';
import { x2s, dx2ds } from '../lib/utils';

describe('utils', () => {
  describe('x2s', () => {
    it('should translate x-axis coordinate', () => {
      assert.deepStrictEqual(x2s([ 2, 0, 0 ]), [ 2, Math.PI / 2, 0 ]);
    });

    it('should translate y-axis coordinate', () => {
      assert.deepStrictEqual(x2s([ 0, 2, 0 ]),
        [ 2, Math.PI / 2, Math.PI / 2 ]);
    });

    it('should translate z-axis coordinate', () => {
      assert.deepStrictEqual(x2s([ 0, 0, 2 ]),
        [ 2, 0, 0 ]);
    });
  });

  describe('dx2ds', () => {
    it('should translate into r-vector at x=1', () => {
      assert.deepStrictEqual(dx2ds([ 1, 0, 0 ], [ -1, 0, 0 ]),
        [ -1, 0, 0 ]);
    });

    it('should translate into theta-vector at x=1', () => {
      assert.deepStrictEqual(dx2ds([ 1, 0, 0 ], [ 0, 0, 1 ]),
        [ 0, -1, 0 ]);
    });

    it('should translate into phi-vector at x=1', () => {
      assert.deepStrictEqual(dx2ds([ 1, 0, 0 ], [ 0, 1, 0 ]),
        [ 0, 0, 1 ]);
    });
  });
});
