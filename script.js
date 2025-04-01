document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything when page loads
    initApplication();
});

function initApplication() {
    // 1. Set current year in footer
    setCurrentYear();
    
    // 2. Initialize mobile menu toggle
    initMobileMenu();
    
    // 3. Initialize service filtering with complete reset functionality
    initServiceFiltering();
    
    // 4. Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
}

function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
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
        closeMobileMenu();
    });
}

function closeMobileMenu() {
    document.querySelector('.services-menu').classList.remove('active');
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function resetAllElements() {
    // Reset all form inputs
    document.querySelectorAll('input, select, textarea').forEach(el => {
        switch(el.type) {
            case 'checkbox':
            case 'radio':
                el.checked = false;
                break;
            case 'file':
                el.value = '';
                break;
            case 'submit':
            case 'button':
            case 'reset':
                // Skip these
                break;
            default:
                el.value = '';
        }
    });
    
    // Reset select dropdowns
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Reset all div display states
    document.querySelectorAll('div').forEach(div => {
        // Remove inline display styles
        if (div.style.display) {
            div.style.removeProperty('display');
        }
        // Remove common visibility classes
        div.classList.remove('hidden', 'active', 'visible');
    });
    
    // Reset other elements that might affect layout
    document.querySelectorAll('[style*="display"], [style*="visibility"]').forEach(el => {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
    });
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Reset all elements to default state
            resetAllElements();
            
            // 2. Update active menu item
            document.querySelectorAll('.services-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // 3. Filter services
            const category = this.dataset.category;
            allServices.forEach(service => {
                if (category === 'all') {
                    service.classList.remove('hidden');
                } else {
                    service.classList.toggle('hidden', service.dataset.category !== category);
                }
            });
            
            // 4. Close mobile menu if open
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}
