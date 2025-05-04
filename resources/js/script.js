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
      // Reduce video quality on mobile
      video.setAttribute('poster', video.getAttribute('data-poster') || '');
      
      // Add loading attribute
      video.setAttribute('loading', 'lazy');
      
      // Add error handling
      video.addEventListener('error', function() {
        console.error('Video failed to load:', video.src);
        // Fallback to poster image if video fails to load
        if (video.poster) {
          video.parentElement.style.backgroundImage = `url(${video.poster})`;
          video.style.display = 'none';
        }
      });
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