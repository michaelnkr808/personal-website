// Distance helpers shared by every scene. Scenes work in "turntable space": the core has already rotated the
// ray point about the vertical axis, so a scene only describes its object standing at x = z = 0.
export const YC = 1.96; // height of the turntable axis point kept at the center of the view (shared by all scenes)

export const len2 = (a, b) => Math.sqrt(a * a + b * b);

export const cylinder = (r2, along, r, half) => { // r2: distance from the axis, along: distance along it
  const d = r2 - r, e = Math.abs(along) - half;
  return Math.min(Math.max(d, e), 0) + len2(Math.max(d, 0), Math.max(e, 0));
};

export const rbox = (u, v, w, hu, hv, hw, r) => { // rounded box centered at the origin with half sizes hu, hv, hw
  const a = Math.abs(u) - hu + r, b = Math.abs(v) - hv + r, c = Math.abs(w) - hw + r;
  const x = a > 0 ? a : 0, y = b > 0 ? b : 0, z = c > 0 ? c : 0;
  return Math.sqrt(x * x + y * y + z * z) + Math.min(Math.max(a, b, c), 0) - r;
};

export const seg = (x, y, z, a, b, ra, rb) => { // tapered capsule from a to b
  const px = x - a[0], py = y - a[1], pz = z - a[2], bx = b[0] - a[0], by = b[1] - a[1], bz = b[2] - a[2];
  const h = Math.min(1, Math.max(0, (px * bx + py * by + pz * bz) / (bx * bx + by * by + bz * bz)));
  return Math.sqrt((px - bx * h) ** 2 + (py - by * h) ** 2 + (pz - bz * h) ** 2) - (ra + (rb - ra) * h);
};

// Each group is a sphere g = [cx, cy, cz, radius] around some parts. Far from it the sphere distance is a cheap
// lower bound on the true distance; only near it do we evaluate the parts f.
// `cut.v` is how far away counts as "far"; the core raises it during a morph so a skipped value can never fake a hit.
export const cut = { v: 0.12 };
export const near = (x, y, z, g, f) => {
  const d = Math.sqrt((x - g[0]) ** 2 + (y - g[1]) ** 2 + (z - g[2]) ** 2) - g[3];
  return d > cut.v ? d : f(x, y, z, d);
};
