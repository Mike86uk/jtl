// Initialize Lucide Icons
lucide.createIcons();

// Service Data
const servicesData = {
    extensions: {
        title: 'Home Extensions',
        description: 'Complete masonry management for modern home extensions. We work from blueprint to topping out, ensuring structural integrity and a seamless aesthetic match with your existing building.',
        image: 'images/extension.png'
    },
    facework: {
        title: 'Face Work',
        description: 'Specialized decorative face brickwork using Flemish, English, or modern Stretcher bonds. We source high-quality materials to provide striking visual finishes.',
        image: 'images/face work.png'
    },
    restoration: {
        title: 'Repointing',
        description: 'Restoring historic properties with traditional lime-mortar repointing and careful brick replacement to preserve architectural history.',
        image: 'images/repointing.png'
    },
    garden: {
        title: 'Garden Walls',
        description: 'Architectural garden walls, retaining structures, and luxury outdoor kitchens. Built to withstand the elements while enhancing your landscape.',
        image: 'images/wall.png'
    },
    commercial: {
        title: 'Commercial',
        description: 'High-capacity masonry solutions for commercial developments, industrial units, and public infrastructure across Birmingham.',
        image: 'images/commercial.png'
    },
    foundations: {
        title: 'Slab Work',
        description: 'Heavy-duty concrete slab work and foundation trenches. The essential starting point for every high-quality construction project.',
        image: 'images/slab work.png'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Logic ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const logo = document.getElementById('nav-logo');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-charcoal/90', 'py-4');
            navbar.classList.remove('bg-charcoal/70', 'py-6');
        } else {
            navbar.classList.remove('bg-charcoal/90', 'py-4');
            navbar.classList.add('bg-charcoal/70', 'py-6');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        
        // Toggle icon between menu and x
        if (mobileMenu.classList.contains('flex')) {
            mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
        }
        lucide.createIcons();
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            lucide.createIcons();
        });
    });

    // Logo to Home / Smooth Scroll
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Intersection Observer for Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Handle staggered delays from data attributes if present
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Modal Logic ---
    const modal = document.getElementById('service-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalCta = document.getElementById('modal-cta');
    const modalContentContainer = document.getElementById('modal-content-container');
    const serviceCards = document.querySelectorAll('.service-card');

    const openModal = (serviceId) => {
        const data = servicesData[serviceId];
        if (!data) return;

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-desc').textContent = data.description;
        document.getElementById('modal-image').src = data.image;
        
        modal.classList.remove('hidden');
        // Small timeout to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContentContainer.classList.remove('scale-95');
        }, 10);
        
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContentContainer.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Match transition duration
        document.body.classList.remove('no-scroll');
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalCta.addEventListener('click', closeModal); // Close when clicking CTA to go to contact
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});