document.addEventListener('DOMContentLoaded', function() {
    initApplication();
});

// Track current active service
let currentActiveService = null;

function initApplication() {
    setCurrentYear();
    initMobileMenu();
    initServiceFiltering();
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
        resetCurrentService(); // Reset when closing via overlay
        closeMobileMenu();
    });
}

function closeMobileMenu() {
    document.querySelector('.services-menu').classList.remove('active');
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function resetCurrentService() {
    if (currentActiveService) {
        resetServiceSection(currentActiveService);
    }
}

function resetServiceSection(section) {
    if (!section) return;
    
    // Reset form elements
    section.querySelectorAll('input, select, textarea').forEach(el => {
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
                break;
            default:
                el.value = '';
        }
    });
    
    // Reset select dropdowns
    section.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Reset all div displays and classes
    section.querySelectorAll('div').forEach(div => {
        div.style.removeProperty('display');
        div.classList.remove('active', 'shown', 'hidden', 'visible');
    });
    
    // Reset other display properties
    section.querySelectorAll('[style*="display"], [style*="visibility"]').forEach(el => {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
    });
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    
    // Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset previous service before switching
            resetCurrentService();
            
            // Update active menu item
            document.querySelectorAll('.services-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter services
            allServices.forEach(service => {
                const shouldShow = category === 'all' || service.dataset.category === category;
                service.classList.toggle('hidden', !shouldShow);
                
                // Track current service
                if (shouldShow && category !== 'all') {
                    currentActiveService = service;
                }
            });
            
            // Reset the new service section
            if (category !== 'all') {
                const activeService = document.querySelector(`.service-item[data-category="${category}"]:not(.hidden)`);
                if (activeService) {
                    resetServiceSection(activeService);
                    currentActiveService = activeService;
                }
            } else {
                currentActiveService = null;
            }
            
            // Close mobile menu on mobile
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}
