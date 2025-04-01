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
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize service filtering
    initServiceFiltering();
});

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            filterServices(this, allServices);
        });
    });
}

function filterServices(clickedLink, allServices) {
    // Update active menu item
    document.querySelectorAll('.services-nav a').forEach(item => {
        item.classList.remove('active');
    });
    clickedLink.classList.add('active');
    
    const category = clickedLink.dataset.category;
    
    // Filter services
    if (category === 'all') {
        allServices.forEach(service => {
            service.classList.remove('hidden');
        });
    } else {
        allServices.forEach(service => {
            if (service.dataset.category === category) {
                service.classList.remove('hidden');
            } else {
                service.classList.add('hidden');
            }
        });
    }
}
