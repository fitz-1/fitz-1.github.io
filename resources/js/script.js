// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add any common JavaScript functionality here
    console.log('Script loaded successfully');
});

// Video Background Handling
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('bg-video');
  if (!video) return;

  // Set initial state
  video.style.opacity = '0';
  video.style.transition = 'opacity 0.5s ease-in-out';

  // Handle video loading
  video.addEventListener('loadeddata', function() {
    video.style.opacity = '1';
  });

  // Handle video errors silently
  video.addEventListener('error', function() {
    // Fallback to poster image if video fails to load
    const poster = video.getAttribute('poster');
    if (poster && poster !== 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.backgroundImage = `url(${poster})`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
      }
    }
  });

  // Handle video playback
  video.addEventListener('play', function() {
    video.style.opacity = '1';
  });

  // Handle video pause
  video.addEventListener('pause', function() {
    if (!video.ended) {
      video.play().catch(function() {
        // Silently handle autoplay failure
      });
    }
  });

  // Start video playback
  video.play().catch(function() {
    // Silently handle autoplay failure
  });

  // Mobile video optimization
  if (window.innerWidth <= 768) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      // Add loading attribute
      video.setAttribute('loading', 'lazy');
      
      // Add preload="none" to prevent immediate loading
      video.setAttribute('preload', 'none');
      
      // Add poster image if available
      if (video.getAttribute('data-poster')) {
        video.setAttribute('poster', video.getAttribute('data-poster'));
      }
      
      // Add error handling
      video.addEventListener('error', function() {
        // Fallback to poster image if video fails to load
        if (video.poster) {
          video.parentElement.style.backgroundImage = `url(${video.poster})`;
          video.style.display = 'none';
        }
      });

      // Only play video when it's in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silently handle autoplay failure
            });
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(video);
    });
  }
});

// Hero heading: readable on load, slides to the bottom of the hero as the
// user scrolls so it stops covering the imagery behind it.
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  const heroText = document.querySelector('.hero-text');
  if (!hero || !heroText) return;

  const START_BOTTOM_RATIO = 0.01; // fraction of viewport height on load
  const END_BOTTOM_PX = 0;         // slide flush to the bottom of the hero

  function update() {
    // How far the hero extends past the bottom of the visible viewport. On
    // mobile the address bar makes this non-zero, so the start position has to
    // clear it or the last line of the heading sits below the fold.
    const overhang = Math.max(
      hero.offsetTop + hero.offsetHeight - window.innerHeight,
      0
    );
    const startPx = Math.max(
      window.innerHeight * START_BOTTOM_RATIO,
      overhang + 9
    );

    // Travel the full distance over the first ~10% of a viewport of scrolling.
    const range = Math.max(window.innerHeight * 0.1, 1);
    const progress = Math.min(Math.max(window.scrollY / range, 0), 1);

    const bottom = startPx + (END_BOTTOM_PX - startPx) * progress;
    heroText.style.bottom = bottom + 'px';
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
});
