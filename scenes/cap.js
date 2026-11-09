// Scene: a graduation cap (mortarboard): a thin flat square board on a short, slightly flared skull cap, a button at
// the board's centre, and a tassel: a cord from the button out to a corner, then a hanging tassel off the edge.
// The camera looks down, so the board shows its top. The turntable's full spin is undone and replaced by a side to
// side rocking of the cap about its tassel corner facing the camera, so the tassel never goes behind the board.
import { YC, len2, cylinder, rbox, seg, near } from './common.js';

const BH = 0.88, BT = 0.045, BY = 0.3;             // board half size, half thickness, height of its centre
const CAP_TOP = BY - BT, CAP_BOT = -0.55;          // skull cap spans these heights
const CH = (CAP_TOP - CAP_BOT) / 2, CM = (CAP_TOP + CAP_BOT) / 2;
const TX = 0.88, TZ = 0.88;                        // where the cord leaves the board (a corner)
const TOP = BY + BT;                               // top surface of the board
const BODY = [0, 0.1, 0, 1.38], DANGLE = [TX + 0.04, -0.2, TZ + 0.04, 0.7];

const FACE = Math.PI / 4;                          // turn that brings the tassel corner to face the camera
const SWING = 0.55;                                // rocking amplitude (radians) either side of FACE
const RATE = 1.6;                                  // rocking cycles per turntable turn
let cd = 1, sd = 0;                                // net turn undoing the spin, then rocking

function update(t, yaw) {
  const d = FACE + SWING * Math.sin(RATE * yaw) - yaw;
  cd = Math.cos(d); sd = Math.sin(d);
}

function dist(wx, y, wz) {
  const x = cd * wx + sd * wz, z = -sd * wx + cd * wz;
  const py = y - YC;
  let d = near(x, py, z, BODY, (x, y, z) => {
    // board
    let d = rbox(x, y - BY, z, BH, BT, BH, 0.03);
    // skull cap: a short cylinder, flaring a little toward the bottom
    const rr = 0.44 + 0.1 * Math.min(1, Math.max(0, (CAP_TOP - y) / (2 * CH)));
    d = Math.min(d, 0.97 * cylinder(len2(x, z), y - CM, rr, CH));
    // button
    d = Math.min(d, Math.sqrt(x * x + (y - TOP - 0.02) ** 2 + z * z) - 0.075);
    // cord across the board from the button to the corner
    d = Math.min(d, seg(x, y, z, [0, TOP + 0.01, 0], [TX - 0.02, TOP + 0.01, TZ - 0.02], 0.035, 0.035));
    return d;
  });
  d = Math.min(d, near(x, py, z, DANGLE, (x, y, z) => {
    // cord over the edge, hanging down, and the tassel: a knob and a tapered skirt of strands
    const hx = TX + 0.03, hz = TZ + 0.03;
    let d = seg(x, y, z, [TX - 0.02, TOP + 0.01, TZ - 0.02], [hx, BY - 0.04, hz], 0.035, 0.035);
    d = Math.min(d, seg(x, y, z, [hx, BY - 0.04, hz], [hx, -0.3, hz], 0.035, 0.04));
    d = Math.min(d, Math.sqrt((x - hx) ** 2 + (y + 0.3) ** 2 + (z - hz) ** 2) - 0.085);
    d = Math.min(d, seg(x, y, z, [hx, -0.34, hz], [hx, -0.72, hz], 0.1, 0.075));
    return d;
  }));
  return d;
}

// fit: [half width, half height, vertical offset, horizontal offset] of the square box the silhouette stays in over the
// whole rocking (measured with tools/extent.mjs, plus ~7% so no glyph reaches the grid edge); radius: bounding sphere;
// inner: how deep inside the solid a point can sit.
export default { id: 'cap', fit: [1.30, 1.30, -0.215, 0], radius: 1.65, inner: 0.42, update, dist };
