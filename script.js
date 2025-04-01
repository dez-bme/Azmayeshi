document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize service filtering
    initServiceFiltering();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Hide all service items by default (show only introduction)
    document.querySelectorAll('.service-item').forEach(item => {
        item.classList.add('hidden');
    });
});

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    const introduction = document.querySelector('.introduction-section');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            filterServices(this, allServices, introduction);
        });
    });
}

function filterServices(clickedLink, allServices, introduction) {
    // Update active menu item
    document.querySelectorAll('.services-nav a').forEach(item => {
        item.classList.remove('active');
    });
    clickedLink.classList.add('active');
    
    const category = clickedLink.dataset.category;
    
    // Hide introduction when any service is selected
    introduction.classList.add('hidden');
    
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

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.services-nav');
    
    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && e.target !== toggle) {
            menu.classList.remove('active');
        }
    });
}
