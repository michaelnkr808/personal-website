// A 3D ASCII object drawn into <pre id="arm">. Each character cell fires one ray into a scene of signed-distance
// shapes, is shaded with a key light, a fill light and a cheap ambient-occlusion term, and mapped to a glyph ramp.
// Every resume section has its own object (scenes/*.js). Scrolling spins the object and, around each section
// boundary, morphs the current object into the next by blending the two distance fields. Frames are drawn only
// while scrolling or easing, on resize, and once at load. Color and placement come from CSS.
import { YC, cut } from './scenes/common.js';
import arm from './scenes/arm.js';
import laptop from './scenes/laptop.js';
import cap from './scenes/cap.js';
import gear from './scenes/gear.js';

const el = document.getElementById('arm');

if (el) {
  // Which object belongs to which section (by section id). Unlisted sections reuse the previous section's object.
  // Neighbouring sections with the same object share it (no morph between them).
  const SCENES = { about: arm, experience: arm, projects: laptop, leadership: cap, education: cap, skills: gear };

  const RAMP = ' .:-=+*#%@';
  const TURNS = 1.1;             // full turntable rotations over the whole page
  const PITCH = 0.55;            // camera looks down at the object by this many radians
  const EASE = 0.16;             // fraction of the remaining distance covered per 16.7 ms
  // Each scene declares `fit` [half width, half height, vertical offset, horizontal offset] (view units around
  // (0, YC, 0)): the box its silhouette stays in over its whole motion (the arm's full spin, the cap's rocking). The
  // boxes are square, so every object ends up the same size on screen, and the box is centered in the column.
  // It also declares `radius`, a bounding sphere around that point. During a morph the boxes are interpolated.
  const INFL = 0.2;              // how much the blend swells in the middle of a morph so thin parts do not vanish
  const MORPH = 0.2;             // scroll length of a morph, in viewport heights
  const HOLD = 0.3;              // least scroll length an object stays fully shown, in viewport heights
  const AT = 0.55;               // a section takes over when its top is this far down the viewport (0 = top, 1 = bottom)
  const MAX_CELLS = 5400;        // cap on glyph cells per frame (desktop); the font grows to stay under it
  const MAX_CELLS_BG = 3600;     // same for the faint phone/tablet background
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const unit = (v) => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const KEY = unit([-0.5, 0.8, 0.6]), FILL = unit([0.8, 0.15, 0.45]);
  const FWD = [0, -Math.sin(PITCH), -Math.cos(PITCH)]; // camera direction
  const UP = [0, Math.cos(PITCH), -Math.sin(PITCH)];   // camera up (right is +x)

  let cw = 0, ch = 0, cols = 0, rows = 0; // measured glyph size, grid size
  let cur = 0, raf = 0, last = 0;         // eased scroll position (px), pending animation frame, last frame time
  let bg = false;                         // true when the object is the faint fixed phone background
  let cy = 1, sy = 0;                     // turntable cos/sin
  let dA = null, dB = null, mm = 0, infl = 0; // scene distance functions of the current frame, blend amount, swelling
  let lh = 0, lm = 0, shown = null;      // innerHeight and max scroll the layout was computed for, last scene drawn in reduced motion
  let secs = [], marks = [], span = 0;    // each object group, morph centers (scroll px), morph length (px)

  // Scene distance at a world point: rotate into the turntable's frame, then evaluate (or blend) the scenes.
  // A scene may skip detail far from a part and return a lower bound instead. That is safe alone, but in a blend
  // two lower bounds minus the swelling could average below zero and fake a hit. So during a morph each scene gets
  // a cutoff (cut.v) large enough that a skipped value can never bring the blend down to the hit threshold, given
  // how deep inside the other scene a point can sit (`inner`).
  let tA = 0.12, tB = 0.12;
  function sd(wx, y, wz) {
    const x = cy * wx + sy * wz, z = -sy * wx + cy * wz;
    if (!dB) { cut.v = 0.12; return dA(x, y, z); }
    cut.v = tA;
    const da = dA(x, y, z);
    cut.v = tB;
    return (1 - mm) * da + mm * dB(x, y, z) - infl;
  }

  // Cast one ray per character cell and write the frame as a single string.
  // a, b: the scenes drawn (b may be null) and m: how far a has morphed into b (0..1).
  function draw(a, b, m, t, yaw) {
    a.update(t, yaw);
    if (b) b.update(t, yaw);
    dA = a.dist; dB = b ? b.dist : null;
    mm = m; infl = b ? INFL * 4 * m * (1 - m) : 0;
    if (b) {
      tA = Math.min(1e3, Math.max(0.12, (infl + 0.02 + m * b.inner) / Math.max(1 - m, 1e-3)));
      tB = Math.min(1e3, Math.max(0.12, (infl + 0.02 + (1 - m) * a.inner) / Math.max(m, 1e-3)));
    }
    cy = Math.cos(yaw); sy = Math.sin(yaw);
    const GW = cols * cw, GH = rows * ch; // the grid that is actually drawn (a little smaller than the element)
    const fa = a.fit, fb = b ? b.fit : fa;
    const fy = fa[2] + (fb[2] - fa[2]) * m;
    const fx = (fa[3] || 0) + ((fb[3] || 0) - (fa[3] || 0)) * m;
    // Scale: each scene alone fits its own box. Mid-morph, either scene's parts are still present, so the scale
    // dips to the smaller of the two scales for the middle of the morph and eases back up at the far end.
    const fit = (f) => Math.min(GW / (2 * (f[0] + 1.2 * infl)), GH / (2 * (f[1] + 1.2 * infl)));
    const sA = fit(fa), sB = fit(fb), lo = Math.min(sA, sB), ramp = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
    const scale = (lo + (sA - lo) * (1 - ramp(m * 4)) + (sB - lo) * ramp(m * 4 - 3)) * (1 - 0.04 * 4 * m * (1 - m));
    const yc = GH / 2; // the box is centered in the grid (and the grid in the column, see style.css)
    const rad = a.radius + ((b ? b.radius : a.radius) - a.radius) * m + infl, R2 = rad * rad, ox0 = 0, oy0 = YC, oz0 = 0;
    const lines = [];
    for (let j = 0; j < rows; j++) {
      let line = '';
      const bb = (yc - (j + 0.5) * ch) / scale + fy;
      for (let i = 0; i < cols; i++) {
        const aa = ((i + 0.5) * cw - GW / 2) / scale + fx;
        const off = aa * aa + bb * bb;
        let glyph = ' ';
        if (off < R2) {
          const ox = ox0 + aa - FWD[0] * 10, oy = oy0 + bb * UP[1] - FWD[1] * 10, oz = oz0 + bb * UP[2] - FWD[2] * 10;
          const reach = Math.sqrt(R2 - off);
          let s = 10 - reach, dist = 1; // march only through the bounding sphere
          for (let k = 0; k < 48 && dist > 0.005 && s < 10 + reach; k++) {
            dist = sd(ox + FWD[0] * s, oy + FWD[1] * s, oz + FWD[2] * s);
            s += dist * 0.9;
          }
          if (dist <= 0.005) {
            const x = ox + FWD[0] * s, y = oy + FWD[1] * s, z = oz + FWD[2] * s, e = 0.045;
            // normal from four taps (tetrahedron)
            const d1 = sd(x + e, y - e, z - e), d2 = sd(x - e, y - e, z + e), d3 = sd(x - e, y + e, z - e), d4 = sd(x + e, y + e, z + e);
            let nx = d1 - d2 - d3 + d4, ny = -d1 - d2 + d3 + d4, nz = -d1 + d2 - d3 + d4;
            const nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
            nx /= nl; ny /= nl; nz /= nl;
            // ambient occlusion: how much nearby geometry crowds the surface along the normal
            const o1 = 0.07 - sd(x + nx * 0.07, y + ny * 0.07, z + nz * 0.07), o2 = 0.18 - sd(x + nx * 0.18, y + ny * 0.18, z + nz * 0.18);
            const ao = 1 - Math.min(0.5, Math.max(0, o1) * 3 + Math.max(0, o2) * 1.2);
            const key = Math.max(0, nx * KEY[0] + ny * KEY[1] + nz * KEY[2]), fill = Math.max(0, nx * FILL[0] + ny * FILL[1] + nz * FILL[2]);
            const lum = Math.min(1, Math.max(0, (0.1 + 0.9 * key + 0.18 * fill) * ao)) ** 1.8;
            glyph = RAMP[1 + Math.min(RAMP.length - 2, Math.floor(lum * (RAMP.length - 1)))] || '.';
          }
        }
        line += glyph;
      }
      lines.push(line);
    }
    el.textContent = lines.join('\n');
  }

  // Measure the real glyph box of the element's font and how many cells fit. If that is more cells than the
  // budget allows (large screens), grow the font until it fits.
  function measureGlyph() {
    const probe = document.createElement('span');
    probe.textContent = '#'.repeat(100);
    probe.style.alignSelf = 'flex-start'; // the column is a flex container: do not let the probe stretch to its width
    el.appendChild(probe);
    cw = probe.getBoundingClientRect().width / 100;
    el.removeChild(probe);
    ch = parseFloat(getComputedStyle(el).lineHeight) || cw * 2;
  }
  // The classic scrollbar width, so the CSS can size the box from the space the page really has.
  const setSbw = () => document.documentElement.style.setProperty('--sbw', Math.max(0, innerWidth - document.documentElement.clientWidth) + 'px');
  function measure() {
    el.style.fontSize = el.style.lineHeight = '';
    setSbw();
    bg = getComputedStyle(el).position === 'fixed';
    measureGlyph();
    const cap = bg ? MAX_CELLS_BG : MAX_CELLS;
    if (cw && el.clientWidth * el.clientHeight / (cw * ch) > cap) {
      const k = Math.sqrt(el.clientWidth * el.clientHeight / (cw * ch) / cap), size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = size * k + 'px';
      el.style.lineHeight = ch * k + 'px';
      measureGlyph();
    }
    cols = cw ? Math.floor(el.clientWidth / cw) : 0;
    rows = Math.floor(el.clientHeight / ch);
    shown = null;
    layout();
  }

  // Where each morph happens on the page. Consecutive sections with the same object form one group. Group g takes
  // over from group g-1 when its first section's top reaches AT of the way down the viewport; the morph is centered
  // there and lasts `span` px of scrolling. But the last sections are short and the page cannot scroll past its end,
  // so those natural spots may never be reached. So: first push each morph late enough that every object before it
  // stays fully shown for at least `hold` px, then push each early enough that every object after it can still be
  // fully shown for `hold` px before the page ends. If the page is too short for all that, shrink span and hold
  // together. The last object needs no hold: its morph is placed to end exactly at max scroll (whatever its natural
  // spot is), so it is fully formed only at the very bottom. Net effect: objects high on the page switch where you read them; the last ones share
  // whatever scroll is left, evenly, and each still gets a turn.
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  function layout() {
    const list = [...document.querySelectorAll('main section')];
    secs = []; marks = [];
    list.forEach((s, i) => {
      const sc = SCENES[s.id] || secs[secs.length - 1] || arm;
      if (secs[secs.length - 1] !== sc) { secs.push(sc); if (i) marks.push(s.getBoundingClientRect().top + scrollY - AT * innerHeight); }
    });
    const n = secs.length, max = maxScroll();
    lh = innerHeight; lm = max;
    let sp = MORPH * innerHeight, hold = HOLD * innerHeight;
    const need = (n - 1) * (hold + sp);
    if (need > max) { const f = max / need; sp *= f; hold *= f; }
    span = sp;
    const step = sp + hold;
    for (let i = 0; i < marks.length; i++) marks[i] = Math.max(marks[i], i ? marks[i - 1] + step : sp / 2 + hold);
    if (marks.length) marks[marks.length - 1] = max - sp / 2; // always fits: the pass above gave it at least (n-1)(hold+sp) - sp/2, which is <= max - sp/2 (need <= max)
    for (let i = marks.length - 2; i >= 0; i--) marks[i] = Math.min(marks[i], marks[i + 1] - step);
  }

  // Which scenes to draw at scroll position y (px) and how far the first has morphed into the second.
  // `still`: no morphing, the object switches at the morph's center (the last one only at the very bottom).
  function pick(y, still) {
    if (lm <= 0) return [secs[0], null, 0]; // a page that does not scroll shows the first object
    let i = 0;
    while (i < marks.length && y >= marks[i] + (still && i < marks.length - 1 ? 0 : span / 2) - (still ? Math.min(1, span / 2) : 0)) i++;
    if (!still && i < marks.length && y > marks[i] - span / 2) {
      const u = (y - (marks[i] - span / 2)) / span, m = u * u * (3 - 2 * u);
      return [secs[i], secs[i + 1], m];
    }
    return [secs[i], null, 0];
  }

  // One animation frame: ease toward the scroll target (by elapsed time, so the speed is the same at 60 or 120 Hz),
  // draw, and keep going only until it is reached.
  function frame(now) {
    raf = 0;
    if (!cols || !rows || !secs.length) return;
    if (innerHeight !== lh || maxScroll() !== lm) layout(); // e.g. a mobile toolbar collapsed
    if (reduced.matches) { // still pose, the section's object, switching instantly
      const sc = pick(scrollY, true)[0];
      if (sc !== shown) { shown = sc; draw(sc, null, 0, 0.15, 0.35); }
      return;
    }
    shown = null;
    const dt = last ? Math.min(64, Math.max(1, now - last)) : 16.7;
    last = now;
    const target = scrollY;
    cur += (target - cur) * (1 - (1 - EASE) ** (dt / 16.7));
    const done = Math.abs(target - cur) < 0.4;
    if (done) { cur = target; last = 0; }
    const max = maxScroll(), t = max > 0 ? Math.min(1, Math.max(0, cur / max)) : 0;
    const [a, b, m] = pick(cur);
    draw(a, b, m, t, t * TURNS * 2 * Math.PI);
    if (!done) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }

  setSbw(); // once before observing: setting it inside the observer callback would resize the element mid-delivery
  cur = scrollY;
  addEventListener('scroll', schedule, { passive: true });
  const onReduced = () => { cur = scrollY; last = 0; schedule(); };
  if (reduced.addEventListener) reduced.addEventListener('change', onReduced); else reduced.addListener(onReduced);
  // Observing the element catches size changes of the column; observing the page root catches window resizes,
  // content height changes (fonts, wrapping) and the scrollbar appearing or disappearing. Fires once at load.
  const ro = new ResizeObserver(() => { measure(); schedule(); });
  ro.observe(el);
  ro.observe(document.documentElement);
}
