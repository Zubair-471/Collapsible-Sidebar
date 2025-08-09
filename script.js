// Get DOM elements
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Toggle sidebar function
function toggleSidebar() {
    const isOpen = sidebar.classList.contains('open');
    
    if (isOpen) {
        // Close sidebar
        sidebar.classList.remove('open');
        if (!isMobile()) {
            // On desktop, move toggle button back
            toggleBtn.style.left = '20px';
        }
    } else {
        // Open sidebar
        sidebar.classList.add('open');
        if (!isMobile()) {
            // On desktop, move toggle button with sidebar
            toggleBtn.style.left = '320px';
        }
    }
}

// Handle click outside sidebar (mobile only)
function handleClickOutside(event) {
    if (isMobile() && sidebar.classList.contains('open')) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = toggleBtn.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('open');
        }
    }
}

// Handle window resize
function handleResize() {
    if (!isMobile()) {
        // On desktop, reset toggle button position
        if (sidebar.classList.contains('open')) {
            toggleBtn.style.left = '320px';
        } else {
            toggleBtn.style.left = '20px';
        }
    } else {
        // On mobile, reset toggle button position
        toggleBtn.style.left = '15px';
    }
}

// Handle keyboard shortcuts
function handleKeyboard(event) {
    // Escape key to close sidebar
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
        
        // Ctrl/Cmd + B to toggle sidebar
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
            toggleSidebar();
        }
}

// Handle touch gestures (mobile only)
    let touchStartX = 0;
    let touchEndX = 0;
    
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
}
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
    if (isMobile()) {
        // Swipe right to open sidebar
        if (diff > swipeThreshold && !sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
        }
        // Swipe left to close sidebar
        else if (diff < -swipeThreshold && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
}

// Add event listeners
function init() {
    // Toggle button click
    toggleBtn.addEventListener('click', toggleSidebar);
    
    // Click outside to close (mobile only)
    document.addEventListener('click', handleClickOutside);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch gestures (mobile only)
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Navigation link clicks (close sidebar on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile() && sidebar.classList.contains('open')) {
                setTimeout(() => {
                    sidebar.classList.remove('open');
                }, 300);
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
