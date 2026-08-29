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
