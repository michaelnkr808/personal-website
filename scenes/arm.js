// Scene: a 3D industrial robot arm (flange with bolts, motor housings, tapered links, cables, a two-finger gripper).
import { len2, cylinder, rbox, seg, near } from './common.js';

let arm; // current pose

// A link is a tapered rounded box running from k.a along k.d for k.L; it also carries ribs and a cable.
const link = (x, y, z, k, w0, w1, h0, h1, r) => {
  const px = x - k.a[0], py = y - k.a[1];
  const u = px * k.d[0] + py * k.d[1], v = px * k.n[0] + py * k.n[1];
  const f = Math.min(1, Math.max(0, u / k.L)), hw = w0 + (w1 - w0) * f, hz = h0 + (h1 - h0) * f;
  const body = rbox(u - k.L / 2, v, z, k.L / 2, hw, hz, r);
  if (body > 0.25) return body - 0.05;
  const du = Math.max(0.18 * k.L - u, u - 0.92 * k.L, 0), dv = v - 0.45 * hw, dz = z - hz - 0.02;
  const cable = Math.sqrt(du * du + dv * dv + dz * dz) - 0.032;
  const rib = Math.min(rbox(u - 0.38 * k.L, v, z, 0.03, hw + 0.03, hz + 0.03, 0.015), rbox(u - 0.62 * k.L, v, z, 0.03, hw + 0.03, hz + 0.03, 0.015));
  return Math.min(body, cable, rib);
};

function base(x, y, z) {
  const r = len2(x, z);
  let d = Math.min(
    cylinder(r, y - 0.07, 0.98, 0.07),                      // flange plate
    cylinder(r, y - 0.34, 0.62, 0.2),                       // pedestal
    cylinder(r, y - 0.2, 0.7, 0.05),                        // seam ring
    cylinder(r, y - 0.58, 0.5, 0.06),                       // turntable collar
    rbox(x, y - 0.95, z, 0.36, 0.4, 0.42, 0.1),             // turret
  );
  if (y < 0.3 && r > 0.75) { // 12 bolt heads around the flange
    const step = Math.PI / 6, k = Math.round(Math.atan2(z, x) / step) * step;
    d = Math.min(d, cylinder(len2(x - 0.86 * Math.cos(k), z - 0.86 * Math.sin(k)), y - 0.17, 0.06, 0.045));
  }
  return d;
}
function shoulder(x, y, z) {
  const r = len2(x - arm.S[0], y - arm.S[1]);
  return Math.min(cylinder(r, z, 0.44, 0.34), cylinder(r, z, 0.3, 0.5), cylinder(r, z - 0.5, 0.12, 0.03), cylinder(r, z + 0.5, 0.12, 0.03));
}
function upper(x, y, z) { return link(x, y, z, arm.up, 0.25, 0.17, 0.22, 0.15, 0.06); }
function elbow(x, y, z) {
  const r = len2(x - arm.E[0], y - arm.E[1]);
  return Math.min(cylinder(r, z, 0.32, 0.27), cylinder(r, z, 0.2, 0.39), cylinder(r, z - 0.39, 0.1, 0.03), cylinder(r, z + 0.39, 0.1, 0.03));
}
function fore(x, y, z) { return link(x, y, z, arm.fo, 0.19, 0.12, 0.17, 0.11, 0.05); }
function hand(x, y, z) {
  const { W, H, P, d, n, gap, fing } = arm;
  const wx = x - W[0], wy = y - W[1];
  let m = Math.min(
    cylinder(len2(wx, wy), z, 0.17, 0.2),                    // wrist housing
    seg(x, y, z, W, H, 0.12, 0.1),                           // roll tube
  );
  const hx = x - H[0], hy = y - H[1], al = hx * d[0] + hy * d[1], ac = hx * n[0] + hy * n[1];
  m = Math.min(m, cylinder(len2(ac, z), al, 0.2, 0.03));     // tool flange
  m = Math.min(m, rbox(al - 0.17, ac, z, 0.12, gap + 0.14, 0.15, 0.04)); // palm block
  for (let i = 0; i < 2; i++) {
    const f = fing[i];
    m = Math.min(m,
      Math.sqrt((x - f.K[0]) ** 2 + (y - f.K[1]) ** 2 + z * z) - 0.12,    // knuckle
      seg(x, y, z, f.K, f.J, 0.095, 0.075),                                // proximal finger
      Math.sqrt((x - f.J[0]) ** 2 + (y - f.J[1]) ** 2 + z * z) - 0.085,  // middle joint
      seg(x, y, z, f.J, f.T, 0.075, 0.045));                               // fingertip
  }
  return m;
}

// Joint positions for scroll progress t (0..1).
function pose(t) {
  const a1 = -0.34 + 0.1 * Math.sin(t * 5),         // upper arm leans back
        a2 = 1.0 + 0.18 * Math.sin(t * 7 + 1),        // forearm reaches forward, near horizontal: a clear elbow bend
        a3 = 2.8 + 0.18 * Math.sin(t * 9 + 2),       // hand points down and forward
        gap = 0.34 + 0.07 * (0.5 + 0.5 * Math.sin(t * 11)); // half the finger spacing
  const dir = (a) => [Math.sin(a), Math.cos(a)];
  const mk = (a, d, L) => ({ a, d, n: [d[1], -d[0]], L });
  const go = (p, v, len) => [p[0] + v[0] * len, p[1] + v[1] * len, 0];
  const S = [0, 1.25, 0], d1 = dir(a1), d2 = dir(a2), d3 = dir(a3), n = [d3[1], -d3[0]];
  const E = go(S, d1, 2.0), W = go(E, d2, 1.35), H = go(W, d3, 0.3);
  const P = go(H, d3, 0.17);
  const fing = [-1, 1].map((k) => {
    const K = [P[0] + n[0] * gap * k, P[1] + n[1] * gap * k, 0];
    const J = [K[0] + d3[0] * 0.4 - n[0] * k * 0.03, K[1] + d3[1] * 0.4 - n[1] * k * 0.03, 0];
    const T = [J[0] + d3[0] * 0.34 - n[0] * k * 0.1, J[1] + d3[1] * 0.34 - n[1] * k * 0.1, 0];
    return { K, J, T };
  });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0];
  const mU = mid(S, E), mF = mid(E, W), gC = go(P, d3, 0.3);
  arm = {
    S, E, W, H, P, d: d3, n, gap, fing, up: mk(S, d1, 2.0), fo: mk(E, d2, 1.35),
    g: [[0, 0.6, 0, 1.2], [0, 1.1, 0, 0.9], [mU[0], mU[1], 0, 1.18], [E[0], E[1], 0, 0.55], [mF[0], mF[1], 0, 0.98], [gC[0], gC[1], 0, 0.95]],
  };
}

// Distance at a point in turntable space.
function dist(x, y, z) {
  const g = arm.g;
  return Math.min(near(x, y, z, g[0], base), near(x, y, z, g[1], shoulder), near(x, y, z, g[2], upper),
    near(x, y, z, g[3], elbow), near(x, y, z, g[4], fore), near(x, y, z, g[5], hand));
}

export default { id: 'arm', fit: [2.36, 2.36, 0.025, 0], radius: 2.6, inner: 0.42, update: pose, dist };
