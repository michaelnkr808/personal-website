// Scene: an open laptop. Keyboard deck with a recessed key well, a grid of keys, a space bar and a trackpad; a hinge
// barrel; a tall lid with a bezel around a recessed screen and a disc on the back. The lid angle sways with scroll.
import { YC, cylinder, rbox, near } from './common.js';

const DECK_Y = YC - 0.64, TOP = DECK_Y + 0.06;  // deck center height and its top surface
const HZ = -0.62;                                // hinge depth (the deck runs from the hinge forward to z = 0.68, centered on the spin axis)
const PITCH_X = 0.14, PITCH_Z = 0.14, KZ = -0.17; // key spacing and the key block's center depth
let lid; // { dy, dz, ny, nz, g }: lid up direction, its front normal, bounding sphere

function update(t) {
  const tilt = 0.1 + 0.04 * Math.sin(t * 8); // lean back from vertical
  const dy = Math.cos(tilt), dz = -Math.sin(tilt);
  lid = { dy, dz, ny: -dz, nz: dy, g: [0, TOP + 0.8 * dy, HZ + 0.8 * dz, 1.38] };
}

function keys(x, y, z) { // the key block, repeated on a grid (own cell plus the neighbour on the nearer side, in x and z)
  const fi = x / PITCH_X + 6, fj = (z - KZ) / PITCH_Z;
  const i0 = Math.floor(fi), j0 = Math.round(fj);
  const ci = (i) => Math.min(11, Math.max(0, i)), cj = (j) => Math.min(2, Math.max(-2, j));
  const iA = ci(i0), iB = ci(i0 + (fi - i0 < 0.5 ? -1 : 1));
  const jA = cj(j0), jB = cj(j0 + (fj > j0 ? 1 : -1));
  let d = 1e9;
  for (let a = 0; a < 2; a++) {
    const j = a ? jB : jA, kz = z - KZ - j * PITCH_Z;
    if (j === 2) d = Math.min(d, rbox(x, y - TOP - 0.004, kz, 0.38, 0.03, 0.055, 0.02)); // space bar
    for (let b = 0; b < 2; b++) {
      const i = b ? iB : iA;
      if (j === 2 && Math.abs((i - 5.5) * PITCH_X) < 0.37) continue;                     // keys the space bar replaces
      d = Math.min(d, rbox(x - (i - 5.5) * PITCH_X, y - TOP - 0.004, kz, 0.057, 0.03, 0.055, 0.02));
    }
  }
  return d;
}

function deck(x, y, z) {
  let d = rbox(x, y - DECK_Y, z - 0.03, 0.92, 0.06, 0.65, 0.04);
  d = Math.max(d, -rbox(x, y - TOP, z - KZ, 0.86, 0.022, 0.37, 0.02));    // key well
  d = Math.max(d, -rbox(x, y - TOP, z - 0.43, 0.3, 0.014, 0.12, 0.03));   // trackpad
  d = Math.max(d, -rbox(x, y - TOP, z - 0.7, 0.12, 0.03, 0.05, 0.03));   // finger notch on the front lip
  if (y > TOP - 0.1 && Math.abs(x) < 0.88 && z < 0.2 && z > -0.58) d = Math.min(d, keys(x, y, z));
  return d;
}

function lidPart(x, y, z) {
  const ry = y - TOP, rz = z - HZ;
  const v = ry * lid.dy + rz * lid.dz, w = ry * lid.ny + rz * lid.nz;
  let d = rbox(x, v - 0.8, w, 0.92, 0.77, 0.04, 0.025);
  d = Math.max(d, -rbox(x, v - 0.79, w - 0.04, 0.82, 0.65, 0.03, 0.02));  // screen sits inside the bezel
  d = Math.min(d, cylinder(Math.hypot(x, v - 0.82), w + 0.04, 0.11, 0.016)); // logo disc on the back
  return d;
}

function hinge(x, y, z) {
  return cylinder(Math.hypot(y - TOP, z - HZ), x, 0.07, 0.55);
}

const GD = [0, DECK_Y, 0.03, 1.2], GH = [0, TOP, HZ, 0.65];

function dist(x, y, z) {
  return Math.min(near(x, y, z, GD, deck), near(x, y, z, lid.g, lidPart), near(x, y, z, GH, hinge));
}

// fit: [half width, half height, vertical offset, horizontal offset] of the square box (view units, from the view center)
// the object stays in over a whole spin, measured with tools/extent.mjs plus ~7% so no glyph reaches the grid edge.
export default { id: 'laptop', fit: [1.41, 1.41, 0.16, 0], radius: 2.0, inner: 0.06, update, dist };
