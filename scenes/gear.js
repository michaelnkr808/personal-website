// Scene: a toothed gear: a rim with trapezoid teeth, four spokes, a thick hub and a bore. Its axis leans toward the
// viewer so the face shows. The turntable's full spin is undone and replaced by a gentle swing (so the face never
// turns edge-on and the teeth stay readable); the gear itself turns with scroll.
import { YC, len2 } from './common.js';

const N = 12, SECTOR = 2 * Math.PI / N;            // teeth
const RR = 0.98, TIP = 1.3, RIM = 0.72;            // root radius, tip radius, inner radius of the rim
const LEAN = 1.0;                                  // axis tilt from vertical (radians), toward +z: face toward the camera
const cl = Math.cos(LEAN), sl = Math.sin(LEAN);
const SWING = 0.6;                                 // swing amplitude (radians)
let cs = 1, sn = 0, cd = 1, sd = 0;                // gear's own turn, undo-spin turn

function update(t, yaw) {
  const a = t * 9; cs = Math.cos(a); sn = Math.sin(a);
  const d = SWING * Math.sin(yaw) - yaw;
  cd = Math.cos(d); sd = Math.sin(d);
}

function dist(px, y, pz) {
  const x = cd * px + sd * pz, z = -sd * px + cd * pz;
  // into the gear's frame: axis along w
  const py = y - YC;
  const w0 = py * cl + z * sl, v0 = py * sl - z * cl;
  const u = x * cs - v0 * sn, v = x * sn + v0 * cs, w = w0;
  const r = len2(u, v);
  if (r > TIP + 0.5 || Math.abs(w) > 0.6) return Math.max(r - TIP, Math.abs(w) - 0.34);
  // teeth: fold the angle into one sector, then a tapered block
  const a = Math.atan2(v, u), k = Math.round(a / SECTOR) * SECTOR;
  const ck = Math.cos(k), sk = Math.sin(k);
  const tu = u * ck + v * sk, tv = -u * sk + v * ck;
  const taper = Math.max(0, Math.min(1, (tu - RR) / (TIP - RR)));
  const tooth = Math.max(Math.abs(tv) - (0.2 - 0.09 * taper), tu - TIP, RR - 0.1 - tu);
  // body: rim ring, spokes, hub
  const sa = Math.round(a / (Math.PI / 2)) * (Math.PI / 2);
  const spoke = Math.max(Math.abs(-u * Math.sin(sa) + v * Math.cos(sa)) - 0.12, r - RIM - 0.05);
  let d2 = Math.min(Math.max(r - RR, RIM - r), spoke, r - 0.36, tooth);
  d2 = Math.max(d2, 0.15 - r);                       // bore
  // thickness: thick rim and teeth, thinner spokes, a hub that stands proud
  const half = r < 0.38 ? 0.32 : r > RIM ? 0.2 : 0.13;
  const dw = Math.abs(w) - half;
  return Math.min(Math.max(d2, dw), 0) + len2(Math.max(d2, 0), Math.max(dw, 0));
}

export default { id: 'gear', fit: [1.39, 1.39, 0, 0], radius: 1.9, inner: 0.3, update, dist };
