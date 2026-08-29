# nova-tent

Marketing/portfolio site for the Nova Tent project.

## Changelog

### v69.420 — 2026-08-29

Site-wide photo lightbox.

- Added `resources/js/gallery-lightbox.js`: click any photo to enlarge it in a
  full-screen overlay, click the overlay or press `Esc` to shrink it back down.
  Works on touch and mouse.
- Applies to every content image across the site — the home-page photo gallery,
  the creators and mentor portraits, and the iteration/final/materials-testing
  page galleries. Navigation chrome, logos, linked images, and slideshow
  thumbnails are excluded.
- The looping feature clips (`.webm` videos) on the Final Design page are
  clickable too, opening enlarged and playing on loop. The hero background
  video and the YouTube product-video embed are left alone.
- Added the matching `.lightbox-*` styles to `resources/css/global.css` (fade +
  scale transition, scroll lock while open).
- Wired the script into all content pages: `index.html` and `pages/{creators,
  mentor, iterations, iteration1-4, final, materials-testing, program}.html`.

Mobile hero spacing fixes.

- Reworked the mobile hero overlay (`resources/css/video-overlay.css`, `≤768px`):
  the logo, "Brighter and Better." and "Revolutionizing the camping experience."
  now flow as one tight right-aligned group pinned to the top-right of the hero
  just below the navbar (`justify-content: flex-start` + top padding, small
  `gap`, and a negative `margin-top` on `.overlay-content` to eat the logo PNG's
  transparent base padding), instead of each being absolutely positioned at
  ad-hoc offsets. The subtext wraps normally again (was `white-space: nowrap`,
  which had forced it down to `0.6rem`), and both lines use fluid `clamp()`
  sizes. Collapsed the redundant 480px/414px overlay blocks.
- `.hero` sizing changed from `100svh` to `calc(100svh - <navbar>)` in
  `resources/css/global.css` (including the `≤390px` block, which still had the
  old value) so the hero no longer overhangs the viewport bottom and pushes the
  heading up on load.
- Tuned the hero-heading scroll start so "Explore the Evolution of the Nova Tent"
  rests ~27px from the bottom on load instead of ~58px: dropped the
  heading-height term from the start calc and lowered `START_BOTTOM_RATIO` to
  `0.04` (`resources/js/script.js`).

Home-page hero heading.

- The "Explore the Evolution of the Nova Tent" heading now loads fully in view
  and slides down to rest at the bottom of the hero as you scroll, so it stops
  covering the imagery behind it. New scroll handler in `resources/js/script.js`
  computes the start position from the viewport and the hero's overhang (so the
  last line clears the mobile address bar); `.hero-text` in
  `resources/css/video-overlay.css` holds the readable no-JS default.
- Sized the hero as `calc(100svh - <navbar>)` in `resources/css/global.css` so
  it fills exactly the space below the fixed navbar instead of overhanging the
  viewport bottom and pushing the heading up on load.
- Its scroll end point is flush with the bottom of the hero (`END_BOTTOM_PX = 0`
  in `resources/js/script.js`) — no bottom gap once fully scrolled.

Shorter navbar.

- Trimmed the fixed navbar vertically in `resources/css/navbar.css`: desktop
  padding `1rem` → `0.4rem 1rem` and logo `50px` → `42px`; mobile goes further
  (`0.3rem` padding, `36px` logo, ~46px tall).
- Updated `.hero` `margin-top` / height in `resources/css/global.css` to track
  the new navbar height (56px desktop, 46px mobile) with no gap.

Mobile photo gallery.

- The home-page photo gallery is now a 2-column grid on phones instead of one
  full-width photo per row, roughly halving the scroll length. Updated the
  `≤768px` / `≤480px` breakpoints in `index.html`'s inline styles and
  `resources/css/global.css`.

Materials Testing mobile layout.

- The four testing cards (`pages/materials-testing.html`) were a 2x2 grid on all
  viewports; on phones that crushed the paragraphs into ~160px columns and made
  the page enormously tall. Added a `≤768px` override that drops the grid to a
  single column (and trims card padding / image height / justified text). The
  override is placed *after* the base `.testing-*` rules in the inline
  `<style>` — the existing mobile media block sits before them, so a rule added
  there would have lost the cascade. Desktop stays 2x2.
- Same fix for the Iteration 2 cards (`pages/iteration2.html`): a mid-body inline
  `<style>` set `.iteration-grid` to two columns with no breakpoint, which
  overrode `iterationStyles.css`'s own `≤768px` collapse. Appended a `≤768px`
  block to that inline style that forces one column and resets
  `.wide-card { grid-column: auto }` (was `span 2`). Iterations 1/3/4 have no
  inline override and were already fine.

Product video double play button.

- The Product Video poster on the Final Design page (`pages/final.html`) showed
  two ▶ triangles: the `.play-button` div had a literal `▶` in its markup *and* a
  `.play-button::after { content: "▶" }` rule. Removed the literal character and
  kept the pseudo-element (it has the optical-centering `margin-left`).

Slideshow auto-scroll fix.

- Fixed a bug in `resources/js/gallery.js` where interacting with a slideshow
  gallery twice within the resume window leaked `setInterval`/`setTimeout`
  timers that multiplied, making the gallery flip through photos uncontrollably.
  Added `stopAutoScroll()` (clears both timers), tracked the resume timeout so
  repeat calls cancel it, guarded `startAutoScroll()` against double-starts, and
  stopped `nextSlide()`/`prevSlide()` from re-pausing on every auto tick.
  Affects the iteration1-4, final, and materials-testing galleries.
