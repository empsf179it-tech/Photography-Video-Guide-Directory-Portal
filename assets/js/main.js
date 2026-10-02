// LENSORA - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Mobile Menu ---
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    if (hamburger && mobileMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // --- 2. Active Navigation (Simple implementation based on path) ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 3. Search Overlay ---
    const searchIcons = document.querySelectorAll('.nav-icon-search');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.querySelector('.search-close');
    
    if (searchOverlay) {
        const toggleSearch = () => {
            searchOverlay.classList.toggle('active');
            document.body.style.overflow = searchOverlay.classList.contains('active') ? 'hidden' : '';
            if (searchOverlay.classList.contains('active')) {
                setTimeout(() => document.getElementById('global-search').focus(), 100);
            }
        };

        searchIcons.forEach(icon => icon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSearch();
        }));
        
        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', toggleSearch);
        }
    }

    // --- 4. Modals (Enquiry, Submit Listing, Profile) ---
    const modals = document.querySelectorAll('.modal-overlay');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModalsBtn = document.querySelectorAll('.modal-close');

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeAllModals = () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-modal');
            openModal(target);
        });
    });

    closeModalsBtn.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Forms Demo Validation
    const demoForms = document.querySelectorAll('form');
    demoForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic frontend validation mock
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            
            setTimeout(() => {
                alert('SUCCESS: Your enquiry/submission has been prepared successfully. (This is a frontend demonstration)');
                form.reset();
                submitBtn.textContent = originalText;
                closeAllModals();
            }, 800);
        });
    });

    // --- 5. Directory Frontend Demo Data ---
    const sampleListings = [
        { id: 1, name: "Aarav Studio", profession: "Wedding Photographer", loc: "Chennai", cat: "Photography", rating: "4.9", rev: 128, verified: true, img: "assets/images/wedding-image.png", sub: "Wedding" },
        { id: 2, name: "Mira Visuals", profession: "Commercial Videographer", loc: "Bengaluru", cat: "Videography", rating: "4.8", rev: 94, verified: true, img: "assets/images/image-2.png", sub: "Commercial" },
        { id: 3, name: "Frame & Light", profession: "Portrait Studio", loc: "Mumbai", cat: "Photography", rating: "4.7", rev: 210, verified: false, img: "assets/images/image-3.png", sub: "Portrait" },
        { id: 4, name: "Northstar Films", profession: "Cinematic Films", loc: "Delhi", cat: "Videography", rating: "5.0", rev: 67, verified: true, img: "assets/images/events.png", sub: "Event" },
        { id: 5, name: "Studio Vanta", profession: "Fashion Photographer", loc: "Hyderabad", cat: "Photography", rating: "4.6", rev: 45, verified: true, img: "assets/images/image-5.png", sub: "Fashion" },
        { id: 6, name: "Golden Hour Collective", profession: "Travel Visuals", loc: "Kochi", cat: "Photography", rating: "4.9", rev: 112, verified: true, img: "assets/images/image-6.png", sub: "Travel" }
    ];

    const dirGrid = document.getElementById('directory-results');
    const resultCount = document.getElementById('result-count');
    
    const renderListings = (data) => {
        if (!dirGrid) return;
        dirGrid.innerHTML = '';
        
        if (data.length === 0) {
            dirGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 3rem; color: #666;">NO MATCHING CREATIVE PROFESSIONALS FOUND.</p>`;
            if (resultCount) resultCount.textContent = `0 sample listings found`;
            return;
        }

        if (resultCount) resultCount.textContent = `${data.length} sample listings found`;

        data.forEach(item => {
            const html = `
                <div class="card">
                    <div class="card-image-wrap">
                        <img src="${item.img}" alt="${item.name}" class="card-img" loading="lazy">
                        ${item.verified ? '<div style="position:absolute; top:1rem; right:1rem; background:var(--accent-color); color:var(--primary-color); padding:0.25rem 0.5rem; font-size:0.7rem; border-radius:4px; font-weight:bold;">VERIFIED</div>' : ''}
                    </div>
                    <div class="card-content">
                        <span class="badge">${item.sub}</span>
                        <h3 style="font-size: 1.25rem; margin-bottom: 0.25rem;">${item.name}</h3>
                        <p style="font-size:0.9rem; color:#666; margin-bottom: 1rem;">${item.profession} • ${item.loc}</p>
                        <div style="display:flex; align-items:center; gap: 0.5rem; margin-bottom:1.5rem; font-size: 0.85rem;">
                            <span style="color:var(--accent-color);">★ ${item.rating}</span>
                            <span style="opacity:0.6;">(${item.rev} demo reviews)</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top:auto;">
                            <a href="#" class="btn btn-dark-outline" style="padding: 0.5rem; width: 100%;" data-modal="modal-profile">VIEW PROFILE</a>
                            <a href="#" class="btn btn-primary" style="padding: 0.5rem; width: 100%;" data-modal="modal-enquiry">ENQUIRE</a>
                        </div>
                    </div>
                </div>
            `;
            dirGrid.insertAdjacentHTML('beforeend', html);
        });

        // Re-attach modal triggers for dynamically created buttons
        const newTriggers = dirGrid.querySelectorAll('[data-modal]');
        newTriggers.forEach(t => {
            t.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(t.getAttribute('data-modal'));
            });
        });
    };

    // Initial render
    if (dirGrid) {
        renderListings(sampleListings);
    }

    // Filters logic
    const filterForm = document.getElementById('dir-filter-form');
    if (filterForm) {
        filterForm.addEventListener('change', () => {
            const catFilter = filterForm.querySelector('input[name="cat"]:checked')?.value || 'all';
            
            let filtered = sampleListings;
            
            if (catFilter !== 'all') {
                filtered = filtered.filter(item => item.cat.toLowerCase() === catFilter);
            }
            
            renderListings(filtered);
        });
    }

    // Location visual interactions (Home section)
    const locTags = document.querySelectorAll('.location-tag');
    const locPreview = document.getElementById('location-preview-text');
    if (locTags.length > 0 && locPreview) {
        locTags.forEach(tag => {
            tag.addEventListener('click', () => {
                locTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                const loc = tag.textContent;
                const count = Math.floor(Math.random() * 200) + 50; // Demo random count
                locPreview.innerHTML = `
                    <img src="assets/images/${loc}.png" alt="${loc}" style="width:100%; max-width:600px; height:auto; max-height: 300px; object-fit:cover; border-radius:var(--border-radius); margin: 0 auto 1.5rem auto; display:block; box-shadow: var(--shadow-md);">
                    <h3 style="margin-bottom:0.5rem">${loc.toUpperCase()}</h3>
                    <p>${count} Sample Photography & Video Listings available.</p>
                    <a href="directory.html" class="btn btn-primary" style="margin-top:1rem;">EXPLORE ${loc.toUpperCase()} &rarr;</a>
                `;
            });
        });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
