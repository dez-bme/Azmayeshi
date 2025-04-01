document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize mobile menu and service filtering
    initMobileMenu();
    initServiceFiltering();
});

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function resetAllForms() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
            input.value = '';
            input.checked = false;
        }
    });
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const servicesMenu = document.querySelector('.services-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    menuToggle.addEventListener('click', function() {
        servicesMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', function() {
        servicesMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            resetAllForms();
            
            document.querySelectorAll('.services-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            allServices.forEach(service => {
                service.classList.toggle('hidden', 
                    category !== 'all' && service.dataset.category !== category
                );
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.services-menu').classList.remove('active');
                document.querySelector('.mobile-menu-overlay').classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
}
