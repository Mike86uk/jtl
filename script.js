// Initialize Lucide Icons
lucide.createIcons();

// --- IMPORTANT: Ensure these filenames match your actual files EXACTLY (Case Sensitive!) ---
const servicesData = {
    extensions: {
        title: 'Home Extensions',
        description: 'Complete masonry management for modern home extensions. We work from blueprint to topping out, ensuring structural integrity and a seamless aesthetic match with your existing building.',
        image: 'images/image 2.webp' 
    },
    facework: {
        title: 'Face Work',
        description: 'Specialized decorative face brickwork using Flemish, English, or modern Stretcher bonds. We source high-quality materials to provide striking visual finishes.',
        image: 'images/image 3.webp'
    },
    restoration: {
        title: 'Repointing',
        description: 'Restoring historic properties with traditional lime-mortar repointing and careful brick replacement to preserve architectural history.',
        image: 'images/image 4.webp'
    },
    garden: {
        title: 'Garden Walls',
        description: 'Architectural garden walls, retaining structures, and luxury outdoor kitchens. Built to withstand the elements while enhancing your landscape.',
        image: 'images/image 5.webp'
    },
    commercial: {
        title: 'Commercial',
        description: 'High-capacity masonry solutions for commercial developments, industrial units, and public infrastructure across Birmingham.',
        image: 'images/image 6.webp'
    },
    foundations: {
        title: 'Slab Work',
        description: 'Heavy-duty concrete slab work and foundation trenches. The essential starting point for every high-quality construction project.',
        image: 'images/image 7.webp'
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

    // Logo to Home
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
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Helper: Show Modal
    const showModal = () => {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContentContainer.classList.remove('scale-95');
        }, 10);
        document.body.classList.add('no-scroll');
    };

    // Helper: Close Modal
    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContentContainer.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
        document.body.classList.remove('no-scroll');
    };

    // 1. Service Cards Click Listener
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = servicesData[id];
            if (!data) return;

            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-desc').textContent = data.description;
            // Ensure this path matches your repo exactly
            document.getElementById('modal-image').src = data.image; 
            
            showModal();
        });
    });

    // 2. Gallery Items Click Listener (UPDATED TO BE ROBUST)
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // UPDATE: using img.src gets the full HTTP URL that is already working in the browser
                const src = img.src; 
                const alt = img.alt;

                document.getElementById('modal-title').textContent = alt || 'Portfolio Project';
                document.getElementById('modal-desc').textContent = "Expert masonry execution. Browse our portfolio to see the quality of our bond work and finishing.";
                document.getElementById('modal-image').src = src;

                showModal();
            }
        });
    });

    // Modal Close Triggers
    closeModalBtn.addEventListener('click', closeModal);
    modalCta.addEventListener('click', closeModal); 
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
});
