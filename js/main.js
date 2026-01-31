/**
 * Thinking with Comics - Website JavaScript
 * Interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="" alt="Full size image">
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .image-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .image-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-modal.visible {
            opacity: 1;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
        }
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            z-index: 1;
        }
        .modal-content img {
            max-width: 100%;
            max-height: 85vh;
            border: 4px solid white;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: #FF6B6B;
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
        }
        .modal-close:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(modalStyles);
    
    const modalImg = modal.querySelector('.modal-content img');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
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
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
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
    // Typing effect for hero subtitle (optional)
    // ========================================
    const highlightText = document.querySelector('.highlight-text');
    if (highlightText) {
        highlightText.style.opacity = '0';
        setTimeout(() => {
            highlightText.style.transition = 'opacity 0.5s ease';
            highlightText.style.opacity = '1';
        }, 500);
    }
    
    console.log('🎨 Thinking with Comics website loaded!');
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
