document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const servicesMenu = document.querySelector('.services-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    menuToggle.addEventListener('click', function() {
        servicesMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
        servicesMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Service filtering
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active menu item
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Filter services
            const category = this.dataset.category;
            
            allServices.forEach(service => {
                if (category === 'all' || service.dataset.category === category) {
                    service.classList.remove('hidden');
                } else {
                    service.classList.add('hidden');
                }
            });
            
            // Close mobile menu on mobile
            if (window.innerWidth <= 768) {
                servicesMenu.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
    
    // Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
});
