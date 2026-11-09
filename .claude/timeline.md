# Personal website timeline

## 2026-11-06 — Plain-HTML rebuild, Game of Life, robot arm started

- Rejected the Apple-style scroll redesign (local `redesign` branch, never deployed); local checkout put back on `main`, which is what Vercel serves.
- Rebuilt the site as one hand-written index.html + style.css styled after dakshshah.com, React stack removed, Vite kept for dev/build. Newer resume content, newest-first ordering, new headshot. Merged with a Game of Life ASCII background on branch `plain`; both pieces reviewed and fixed.
- User then asked for a scroll-rotated ASCII robot arm instead (left column on desktop, faint background on phones). The worker crashed mid-task; partial work is a WIP commit on branch `arm`, unreviewed.
- Decisions: resume.pdf stays linked even though it has the phone number; nothing merged to main or pushed yet.
- See: index.html, style.css, ascii.js on `plain`; branch `arm` for the robot arm WIP.

## 2026-11-07 — Big ASCII robot arm, amber palette, per-section objects started

- Finished the robot arm on `arm-finish`: one big, detailed ray-marched arm filling the left column under the links, full 360° spin on scroll, faint background on phones. Reviewed three times; the user called it "beautiful". Game of Life fully removed.
- New amber palette (warm charcoal matched to the headshot's grey, gold/burnt-orange accents, AA contrast), favicon recolored to an amber M; a favicon redesign (robot-arm silhouette was the pick) is tabled.
- Started per-section objects that morph in the arm's spot as you scroll. Branch `sections` (step 1): pluggable scenes, section rule, morph, laptop, AGNI-Network removed from Projects. Final mapping: About + Experience arm, Projects laptop (bigger), Leadership + Education diploma, Skills gear.
- Step 2 is unfinished on `sections-2` (worker died on an auth error; this commit saves its edits, untested). Four step 1 review fixes are still owed: ghost ball mid-morph from bounding-sphere shortcuts, layout not re-run when the phone toolbar collapses, a non-scrolling page showing the last object, and needless redraws under reduced motion.
- See: ascii.js, scenes/*.js, style.css on `sections-2`; nothing merged to main or pushed (main = live on Vercel).

## 2026-11-07 — Diploma rebuilt, graduation cap chosen instead

- The old diploma read as a fat lumpy log. A worker rebuilt it as a long skinny roll with a bow and also built a graduation cap (mortarboard) as a backup, on branch `diploma-cap` (commit b92a1fe). Reviewed: no breakage, both faster than the old diploma; small issues noted (diploma ends sealed shut, cap fit clips the tassel slightly, cap tassel hides behind the board during a full spin).
- User compared the old diploma, new diploma and cap in live previews and picked the cap for Leadership + Education.
- User also asked: gear should appear only when you hit the very bottom of the page, all objects the same size, objects centered in the left column. A 4-point plan for this (cap swing + fixes, gear at bottom, same-size square, centering) was proposed; not approved yet. Open question: OK for the arm to get a bit smaller on tall screens?
- See: scenes/cap.js, scenes/diploma.js, ascii.js on `diploma-cap`; nothing merged to main or pushed.
