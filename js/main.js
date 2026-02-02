/**
 * Thinking with Comics - Website JavaScript
 * Interactive elements and animations (Full Version)
 */

// Global function to open image in modal
function openImageModal(src) {
    const modal = document.querySelector('.image-modal');
    const modalImg = modal ? modal.querySelector('.modal-content img') : null;
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.add('active');
        setTimeout(() => modal.classList.add('visible'), 10);
        document.body.style.overflow = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Navigation
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (navToggle && navMenu && navOverlay) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            navMenu.classList.toggle('open');
            navOverlay.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', !isOpen);
        });
        
        navOverlay.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navOverlay.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navOverlay.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ========================================
    // Scroll Animations
    // ========================================
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ========================================
    // TL;DR Tab Switching
    // ========================================
    const tldrTabButtons = document.querySelectorAll('.tldr-tab-btn');
    const tldrGrids = document.querySelectorAll('.tldr-examples-grid');
    
    tldrTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tldrTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all TL;DR grids
            tldrGrids.forEach(grid => grid.classList.add('hidden'));
            
            // Show the selected grid
            const tabName = button.getAttribute('data-tab');
            const targetGrid = document.getElementById(tabName);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
                
                // Animate items
                const items = targetGrid.querySelectorAll('.tldr-example-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    // ========================================
    // Gallery Tab Switching
    // ========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryGrids = document.querySelectorAll('.gallery-grid');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all gallery grids
            galleryGrids.forEach(grid => grid.classList.add('hidden'));
            
            // Show the selected gallery
            const tabName = button.getAttribute('data-tab');
            const targetGallery = document.getElementById(`gallery-${tabName}`);
            if (targetGallery) {
                targetGallery.classList.remove('hidden');
                
                // Animate items
                const items = targetGallery.querySelectorAll('.gallery-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    // ========================================
    // Smooth Scroll for Navigation
    // ========================================
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Navbar Background on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
    
    // ========================================
    // Image Modal (Lightbox)
    // ========================================
    const galleryImages = document.querySelectorAll('.comic-frame-wrapper img');
    const modal = document.querySelector('.image-modal');
    const modalImg = modal ? modal.querySelector('.modal-content img') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
    
    if (modal && modalImg) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modal.classList.add('active');
                setTimeout(() => modal.classList.add('visible'), 10);
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeModal() {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // ========================================
    // Comic-style hover effects
    // ========================================
    const comicCards = document.querySelectorAll('.finding-card, .path-card, .style-card');
    
    comicCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotate(-1deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // ========================================
    // Random floating comic elements
    // ========================================
    const comicWords = ['POW!', 'BAM!', 'ZOOM!', 'WOW!', 'ZAP!', 'BANG!'];
    const decoration = document.querySelector('.comic-decoration');
    
    function createFloatingElement() {
        if (!decoration) return;
        
        const element = document.createElement('div');
        element.className = 'pow-bubble floating';
        element.textContent = comicWords[Math.floor(Math.random() * comicWords.length)];
        element.style.cssText = `
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 90 + 5}%;
            font-family: 'Bangers', cursive;
            font-size: ${Math.random() * 1 + 1}rem;
            opacity: 0.1;
            animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        decoration.appendChild(element);
        
        // Remove after some time
        setTimeout(() => {
            element.remove();
        }, 15000);
    }
    
    // Create initial floating elements
    for (let i = 0; i < 3; i++) {
        setTimeout(createFloatingElement, i * 2000);
    }
    
    // Periodically add new elements
    setInterval(createFloatingElement, 8000);
    
    // ========================================
    // Analysis panel images zoom on click
    // ========================================
    const analysisImages = document.querySelectorAll('.analysis-panel img');
    if (modal && modalImg) {
        analysisImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modal.classList.add('active');
                setTimeout(() => modal.classList.add('visible'), 10);
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // ========================================
    // Hero benchmark image zoom on click
    // ========================================
    const benchmarkImg = document.querySelector('.hero-benchmark img');
    if (benchmarkImg && modal && modalImg) {
        benchmarkImg.style.cursor = 'pointer';
        benchmarkImg.addEventListener('click', () => {
            modalImg.src = benchmarkImg.src;
            modal.classList.add('active');
            setTimeout(() => modal.classList.add('visible'), 10);
            document.body.style.overflow = 'hidden';
        });
    }
    
    console.log('🎨 Thinking with Comics website (Full Version) loaded!');
});

/**
 * Copy citation to clipboard
 */
function copyCitation() {
    const citationCode = document.querySelector('.citation-box code');
    const text = citationCode.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#4ECDC4';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy citation. Please select and copy manually.');
    });
}
