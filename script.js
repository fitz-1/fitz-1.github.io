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
}); 