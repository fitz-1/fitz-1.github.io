// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add any common JavaScript functionality here
    console.log('Script loaded successfully');
});

// Mobile video optimization
function optimizeVideosForMobile() {
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
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
  optimizeVideosForMobile();
  
  // Re-optimize on resize
  window.addEventListener('resize', function() {
    optimizeVideosForMobile();
  });
}); 