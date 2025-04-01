document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize service filtering
    initServiceFiltering();
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const servicesNav = document.querySelector('.services-nav');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    menuToggle.addEventListener('click', function() {
        servicesNav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function() {
        servicesNav.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.services-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                servicesNav.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
});

// Keep the rest of your existing JavaScript functions
