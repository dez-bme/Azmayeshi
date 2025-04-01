document.addEventListener('DOMContentLoaded', function() {
    initApplication();
});

function initApplication() {
    setCurrentYear();
    initMobileMenu();
    initServiceFiltering();
    // No default click needed - handled in initServiceFiltering
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

    overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    document.querySelector('.services-menu').classList.remove('active');
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function resetServiceSection(section) {
    // Reset all elements within the specific service section
    if (!section) return;
    
    // Form elements
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
    
    // Select dropdowns
    section.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Div elements and display states
    section.querySelectorAll('div').forEach(div => {
        div.style.removeProperty('display');
        div.classList.remove('active', 'shown', 'hidden');
    });
    
    // Other elements
    section.querySelectorAll('[style*="display"], [style*="visibility"]').forEach(el => {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
    });
}

function initServiceFiltering() {
    const menuLinks = document.querySelectorAll('.services-nav a');
    const allServices = document.querySelectorAll('.service-item');
    let currentService = null;
    
    // Show all services by default
    document.querySelector('.services-nav a[data-category="all"]').click();
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target service category
            const category = this.dataset.category;
            
            // Update active menu item
            document.querySelectorAll('.services-nav a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Reset the previous service section before switching
            if (currentService) {
                resetServiceSection(currentService);
            }
            
            // Filter services
            allServices.forEach(service => {
                const shouldShow = category === 'all' || service.dataset.category === category;
                service.classList.toggle('hidden', !shouldShow);
                
                // Track current visible service
                if (shouldShow && category !== 'all') {
                    currentService = service;
                }
            });
            
            // Reset the newly selected service section
            if (category !== 'all') {
                const activeService = document.querySelector(`.service-item[data-category="${category}"]:not(.hidden)`);
                if (activeService) {
                    resetServiceSection(activeService);
                    currentService = activeService;
                }
            } else {
                currentService = null;
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}
