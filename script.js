document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize service filtering
    initServiceFiltering();
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const servicesNav = document.querySelector('.services-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');

    menuToggle.addEventListener('click', function() {
        servicesNav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function() {
        servicesNav.classList.remove('active');
        overlay.classList.remove('active');
    });
});

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function resetAllForms() {
    // Reset all input fields
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
            input.value = '';
            input.checked = false;
        }
    });
    
    // Reset all select dropdowns to first option
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset all forms before showing new section
            resetAllForms();
            
            // Update active menu item
            document.querySelectorAll('.services-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter services
            allServices.forEach(service => {
                if (category === 'all' || service.dataset.category === category) {
                    service.classList.remove('hidden');
                } else {
                    service.classList.add('hidden');
                }
            });
            
            // Close mobile menu on mobile
            if (window.innerWidth <= 768) {
                document.querySelector('.services-menu').classList.remove('active');
                document.querySelector('.mobile-menu-overlay').classList.remove('active');
            }
        });
    });
    
    // Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
}
