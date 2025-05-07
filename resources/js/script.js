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

  // Handle video errors
  video.addEventListener('error', function(e) {
    console.error('Video loading error:', e);
    // Fallback to poster image if video fails to load
    video.style.display = 'none';
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
      video.play().catch(function(error) {
        console.error('Error playing video:', error);
      });
    }
  });

  // Start video playback
  video.play().catch(function(error) {
    console.error('Error playing video:', error);
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
        console.error('Video failed to load:', video.src);
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
            video.play().catch(error => {
              console.log('Video autoplay failed:', error);
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