// Lightbox: click any photo (or looping feature clip) to enlarge it, click
// anywhere on the overlay or press Esc to shrink it back down. Touch + mouse.
document.addEventListener('DOMContentLoaded', function () {
  // Images that are navigation chrome, logos, links, or their own click
  // targets (e.g. the video poster that loads an embed) are left alone.
  const IMG_EXCLUDE = 'a, [onclick], header, footer, nav, .navbar, #navbar-container, .video-overlay, .slideshow-controls';

  const images = Array.prototype.filter.call(
    document.querySelectorAll('img'),
    function (img) {
      return !img.closest(IMG_EXCLUDE) &&
        !img.classList.contains('overlay-logo') &&
        !img.classList.contains('thumbnail');
    }
  );

  // The "gifs" on the final design page are muted looping <video>s inside a
  // .video-container. The hero background video and the YouTube poster embed
  // are not in a .video-container that holds a <video>, so they stay excluded.
  const videos = Array.prototype.filter.call(
    document.querySelectorAll('.video-container video'),
    function (v) {
      return !v.closest('a, [onclick]');
    }
  );

  if (!images.length && !videos.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<img class="lightbox-media lightbox-image" alt="">' +
    '<video class="lightbox-media lightbox-video" autoplay loop muted playsinline></video>';
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('.lightbox-image');
  const overlayVideo = overlay.querySelector('.lightbox-video');

  function reset() {
    overlayImg.style.display = 'none';
    overlayVideo.style.display = 'none';
    overlayVideo.pause();
    overlayVideo.removeAttribute('src');
    while (overlayVideo.firstChild) overlayVideo.removeChild(overlayVideo.firstChild);
  }

  reset();

  function openImage(img) {
    reset();
    overlayImg.src = img.currentSrc || img.src;
    overlayImg.alt = img.alt || '';
    overlayImg.style.display = 'block';
    overlay.classList.add('open');
    document.body.classList.add('lightbox-active');
  }

  function openVideo(video) {
    reset();
    const src = video.currentSrc;
    if (src) {
      overlayVideo.src = src;
    } else {
      video.querySelectorAll('source').forEach(function (s) {
        overlayVideo.appendChild(s.cloneNode());
      });
    }
    overlayVideo.style.display = 'block';
    overlayVideo.load();
    overlayVideo.play().catch(function () {});
    overlay.classList.add('open');
    document.body.classList.add('lightbox-active');
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-active');
    setTimeout(reset, 250); // let the fade-out finish before clearing the media
  }

  images.forEach(function (img) {
    img.classList.add('lightbox-trigger');
    img.addEventListener('click', function () { openImage(img); });
  });

  videos.forEach(function (video) {
    video.classList.add('lightbox-trigger');
    video.addEventListener('click', function () { openVideo(video); });
  });

  overlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
