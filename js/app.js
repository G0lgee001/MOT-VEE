// Ripplab Music Marketplace JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const heroBtnBuyer = document.querySelector('.hero-btn-buyer');
const heroBtnSeller = document.querySelector('.hero-btn-seller');
const categoryBtns = document.querySelectorAll('.category-btn');
const playBtns = document.querySelectorAll('.play-btn');

// Sample Marketplace Data
const marketplaceData = {
    categories: [
        {
            name: "Beats",
            count: "2.5K+",
            price: "₺50",
            description: "Hip-hop, Trap, EDM ve daha fazlası"
        },
        {
            name: "Ses Efektleri",
            count: "1.8K+",
            price: "₺25",
            description: "Foley, Ambient, FX ve daha fazlası"
        },
        {
            name: "Albüm Kapakları",
            count: "1.2K+",
            price: "₺75",
            description: "Vektör, Fotoğraf, 3D ve daha fazlası"
        },
        {
            name: "Sample Packs",
            count: "800+",
            price: "₺100",
            description: "Drum Kits, Melody Loops ve daha fazlası"
        }
    ],
    trending: [
        {
            title: "Dark Trap Beat",
            artist: "ProducerX",
            price: "₺150",
            rating: 4.8,
            reviews: 120,
            badge: "Trend"
        },
        {
            title: "Lo-Fi Vibes",
            artist: "ChillBeats",
            price: "₺80",
            rating: 4.9,
            reviews: 89,
            badge: "Yeni"
        },
        {
            title: "EDM Drop",
            artist: "EDMKing",
            price: "₺200",
            rating: 4.7,
            reviews: 156,
            badge: "Popüler"
        }
    ]
};

// Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero Button Interactions
if (heroBtnBuyer) {
    heroBtnBuyer.addEventListener('click', () => {
        // Add click animation
        heroBtnBuyer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heroBtnBuyer.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate buyer action
        console.log('Buyer button clicked - Redirecting to marketplace...');
        
        // Smooth scroll to categories
        const categoriesSection = document.querySelector('#categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

if (heroBtnSeller) {
    heroBtnSeller.addEventListener('click', () => {
        // Add click animation
        heroBtnSeller.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heroBtnSeller.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate seller action
        console.log('Seller button clicked - Redirecting to seller dashboard...');
        
        // Show seller registration modal or redirect
        showSellerModal();
    });
}

// Category Button Interactions
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Add click effect
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Get category name
        const categoryCard = btn.closest('.category-card');
        const categoryTitle = categoryCard.querySelector('.category-title').textContent;
        
        console.log(`Exploring category: ${categoryTitle}`);
        
        // Simulate category exploration
        showCategoryModal(categoryTitle);
    });
});

// Play Button Interactions
playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Add click effect
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Get track info
        const trendingCard = btn.closest('.trending-card');
        const trackTitle = trendingCard.querySelector('.trending-title').textContent;
        const trackArtist = trendingCard.querySelector('.trending-artist').textContent;
        
        console.log(`Playing: ${trackTitle} by ${trackArtist}`);
        
        // Simulate music preview
        showMusicPreview(trackTitle, trackArtist);
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .trending-card, .step-card, .about-content').forEach(el => {
    observer.observe(el);
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .category-card, .trending-card, .step-card, .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: var(--shadow);
        border-top: 1px solid var(--border);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .floating-card {
        transition: all 0.3s ease;
    }
    
    .floating-card:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: var(--shadow-xl);
    }
`;
document.head.appendChild(style);

// Floating Cards Enhancement
function enhanceFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + 'K+';
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + 'K+';
            }
        };
        
        updateStat();
    });
}

// Modal Functions
function showSellerModal() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Satıcı Hesabı Oluştur</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Müziklerinizi satmaya başlamak için hesap oluşturun!</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Hesap Oluştur</button>
                        <button class="btn btn-secondary">Giriş Yap</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
}

function showCategoryModal(categoryName) {
    // Create category modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${categoryName} Kategorisi</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${categoryName} kategorisindeki ürünleri keşfedin!</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Ürünleri Gör</button>
                        <button class="btn btn-secondary">Filtrele</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
}

function showMusicPreview(trackTitle, trackArtist) {
    // Create music preview modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Müzik Önizleme</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="preview-player">
                        <div class="preview-info">
                            <h4>${trackTitle}</h4>
                            <p>${trackArtist}</p>
                        </div>
                        <div class="preview-controls">
                            <button class="preview-play-btn">
                                <i class="fas fa-play"></i>
                            </button>
                            <div class="preview-progress">
                                <div class="preview-progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Satın Al</button>
                        <button class="btn btn-secondary">Sepete Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
}

// Add modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: var(--white);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
        z-index: 1;
        box-shadow: var(--shadow-xl);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header h3 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 700;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: var(--light-bg);
        color: var(--text-primary);
    }
    
    .modal-body {
        margin-bottom: 2rem;
    }
    
    .modal-body p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .preview-player {
        background: var(--light-bg);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .preview-info {
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .preview-info h4 {
        color: var(--text-primary);
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    
    .preview-info p {
        color: var(--text-secondary);
        margin: 0;
    }
    
    .preview-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .preview-play-btn {
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .preview-play-btn:hover {
        background: var(--accent);
        transform: scale(1.1);
    }
    
    .preview-progress {
        flex: 1;
        height: 6px;
        background: var(--border);
        border-radius: 3px;
        overflow: hidden;
    }
    
    .preview-progress-bar {
        height: 100%;
        background: var(--primary);
        width: 30%;
        border-radius: 3px;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(modalStyle);

// Initialize Enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceFloatingCards();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Animate stats after a delay
    setTimeout(animateStats, 1000);
});

// Add loading animation CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Escape':
            // Close any open modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.remove());
            break;
    }
});

// Console Welcome Message
console.log(`
🌊 Ripplab Music Marketplace 🌊
🎵 Welcome to the music marketplace! 🎵
🚀 Built with modern web technologies
✨ Enjoy the smooth animations and beautiful design
💼 Buy and sell music assets
`);