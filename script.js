document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const servicesNav = document.querySelector('.services-nav');
    
    menuToggle.addEventListener('click', function() {
        servicesNav.classList.toggle('active');
    });
    
    // Service filtering
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    const introSection = document.querySelector('.introduction-section');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active link
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Hide intro when any service is selected
            introSection.style.display = 'none';
            
            const category = this.dataset.category;
            
            // Show/hide services
            allServices.forEach(service => {
                service.classList.remove('active');
                if(category === 'all' || service.dataset.category === category) {
                    service.classList.add('active');
                }
            });
            
            // Close mobile menu after selection
            if(window.innerWidth <= 768) {
                servicesNav.classList.remove('active');
            }
        });
    });
    
    // Show introduction by default
    introSection.style.display = 'block';
    document.querySelector('.services-nav a[data-category="all"]').click();
});
