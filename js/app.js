// Ripplab Music Marketplace JavaScript with Authentication

// Global Variables
let currentUser = null;
let isAuthenticated = false;

// DOM Elements
const authModal = document.getElementById('authModal');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const userType = document.getElementById('userType');
const userMenu = document.getElementById('userMenu');

// Debug logging
console.log('DOM Elements found:', {
    authModal: !!authModal,
    mainApp: !!mainApp,
    loginForm: !!loginForm,
    registerForm: !!registerForm,
    showRegisterBtn: !!showRegisterBtn,
    showLoginBtn: !!showLoginBtn,
    logoutBtn: !!logoutBtn,
    userName: !!userName,
    userType: !!userType,
    userMenu: !!userMenu
});

// Authentication Functions
function showAuthModal() {
    console.log('Showing auth modal');
    const authModal = document.getElementById('authModal');
    const mainApp = document.getElementById('mainApp');
    
    if (authModal && mainApp) {
        authModal.classList.remove('hidden');
        mainApp.style.display = 'none';
        console.log('Auth modal displayed, main app hidden');
    } else {
        console.error('Auth modal or main app elements not found:', {
            authModal: !!authModal,
            mainApp: !!mainApp
        });
    }
}

function hideAuthModal() {
    console.log('Hiding auth modal');
    const authModal = document.getElementById('authModal');
    const mainApp = document.getElementById('mainApp');
    
    if (authModal && mainApp) {
        authModal.classList.add('hidden');
        mainApp.style.display = 'block';
        console.log('Auth modal hidden, main app displayed');
    } else {
        console.error('Auth modal or main app elements not found:', {
            authModal: !!authModal,
            mainApp: !!mainApp
        });
    }
}

function showLoginForm() {
    console.log('Showing login form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && registerForm) {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        console.log('Login form displayed, register form hidden');
    } else {
        console.error('Login or register form elements not found:', {
            loginForm: !!loginForm,
            registerForm: !!registerForm
        });
    }
}

function showRegisterForm() {
    console.log('Showing register form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && registerForm) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        console.log('Register form displayed, login form hidden');
    } else {
        console.error('Login or register form elements not found:', {
            loginForm: !!loginForm,
            registerForm: !!registerForm
        });
    }
}

function authenticateUser(userData) {
    console.log('Authenticating user:', userData);
    currentUser = userData;
    isAuthenticated = true;
    
    // Update UI
    const userName = document.getElementById('userName');
    const userType = document.getElementById('userType');
    
    if (userName && userType) {
        userName.textContent = userData.name;
        userType.textContent = userData.type === 'buyer' ? 'Alıcı' : 'Satıcı';
        console.log('UI updated with user info');
    } else {
        console.error('User name or type elements not found:', {
            userName: !!userName,
            userType: !!userType
        });
    }
    
    // Hide auth modal and show main app
    hideAuthModal();
    
    // Save to localStorage
    localStorage.setItem('ripplab_user', JSON.stringify(userData));
    console.log('User data saved to localStorage');
    
    // Show welcome message
    showNotification(`Hoş geldiniz, ${userData.name}!`, 'success');
}

function logoutUser() {
    currentUser = null;
    isAuthenticated = false;
    
    // Clear localStorage
    localStorage.removeItem('ripplab_user');
    
    // Show auth modal
    showAuthModal();
    
    // Show logout message
    showNotification('Başarıyla çıkış yapıldı', 'info');
}

// Form Handling
function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt with email:', email);
    
    if (!email || !password) {
        console.log('Login failed: missing fields');
        showNotification('Lütfen tüm alanları doldurun', 'error');
        return;
    }
    
    // Simulate login process
    showNotification('Giriş yapılıyor...', 'info');
    
    setTimeout(() => {
        // Mock user data (in real app, this would come from API)
        const userData = {
            name: email.split('@')[0],
            email: email,
            type: 'buyer', // Default type
            id: Date.now()
        };
        
        console.log('Login successful, user data:', userData);
        authenticateUser(userData);
    }, 1500);
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    const termsAccepted = document.querySelector('input[type="checkbox"]').checked;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Lütfen tüm alanları doldurun', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Şifreler eşleşmiyor', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Kullanım şartlarını kabul etmelisiniz', 'error');
        return;
    }
    
    // Simulate registration process
    showNotification('Hesap oluşturuluyor...', 'info');
    
    setTimeout(() => {
        const userData = {
            name: name,
            email: email,
            type: accountType,
            id: Date.now()
        };
        
        authenticateUser(userData);
    }, 2000);
}

// Social Login Functions
function handleFacebookLogin() {
    showNotification('Facebook ile giriş yapılıyor...', 'info');
    
    // Simulate Facebook OAuth
    setTimeout(() => {
        const userData = {
            name: 'Facebook Kullanıcısı',
            email: 'facebook@example.com',
            type: 'buyer',
            id: Date.now(),
            provider: 'facebook'
        };
        
        authenticateUser(userData);
    }, 2000);
}

function handleGoogleLogin() {
    showNotification('Google ile giriş yapılıyor...', 'info');
    
    // Simulate Google OAuth
    setTimeout(() => {
        const userData = {
            name: 'Google Kullanıcısı',
            email: 'google@example.com',
            type: 'buyer',
            id: Date.now(),
            provider: 'google'
        };
        
        // Send verification email (simulated)
        showNotification('Doğrulama e-postası gönderildi!', 'success');
        
        setTimeout(() => {
            authenticateUser(userData);
        }, 1000);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--white);
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid;
                min-width: 300px;
            }
            
            .notification-info {
                border-left-color: var(--primary);
            }
            
            .notification-success {
                border-left-color: #10b981;
            }
            
            .notification-error {
                border-left-color: #ef4444;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .notification i {
                font-size: 1.25rem;
            }
            
            .notification-info i {
                color: var(--primary);
            }
            
            .notification-success i {
                color: #10b981;
            }
            
            .notification-error i {
                color: #ef4444;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-light);
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: var(--light-bg);
                color: var(--text-primary);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

// Music Player Modal
function showMusicPlayerModal(trackTitle, trackArtist) {
    const modal = document.getElementById('musicPlayerModal');
    const trackTitleElement = document.getElementById('modalTrackTitle');
    const trackArtistElement = document.getElementById('modalTrackArtist');
    
    // Update modal content
    trackTitleElement.textContent = trackTitle;
    trackArtistElement.textContent = trackArtist;
    
    // Show modal
    modal.classList.add('show');
}

function hideMusicPlayerModal() {
    const modal = document.getElementById('musicPlayerModal');
    modal.classList.remove('show');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Setting up authentication system');
    
    // Initialize DOM elements after DOM is loaded
    const authModal = document.getElementById('authModal');
    const mainApp = document.getElementById('mainApp');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');
    const userType = document.getElementById('userType');
    const userMenu = document.getElementById('userMenu');
    
    console.log('DOM Elements found after DOM loaded:', {
        authModal: !!authModal,
        mainApp: !!mainApp,
        loginForm: !!loginForm,
        registerForm: !!registerForm,
        showRegisterBtn: !!showRegisterBtn,
        showLoginBtn: !!showLoginBtn,
        logoutBtn: !!logoutBtn,
        userName: !!userName,
        userType: !!userType,
        userMenu: !!userMenu
    });
    
    // Check if user is already authenticated
    const savedUser = localStorage.getItem('ripplab_user');
    if (savedUser) {
        console.log('Found saved user:', savedUser);
        currentUser = JSON.parse(savedUser);
        isAuthenticated = true;
        hideAuthModal();
        
        // Update UI
        if (userName && userType) {
            userName.textContent = currentUser.name;
            userType.textContent = currentUser.type === 'buyer' ? 'Alıcı' : 'Satıcı';
        }
    } else {
        console.log('No saved user found, showing auth modal');
        showAuthModal();
    }
    
    // Form submissions
    const loginFormElement = document.querySelector('.login-form');
    const registerFormElement = document.querySelector('.register-form');
    
    if (loginFormElement) {
        console.log('Adding submit listener to login form');
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    if (registerFormElement) {
        console.log('Adding submit listener to register form');
        registerFormElement.addEventListener('submit', handleRegister);
    }
    
    // Navigation between forms
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterForm();
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Social login buttons
    const facebookBtns = document.querySelectorAll('.facebook-btn');
    const googleBtns = document.querySelectorAll('.google-btn');
    
    console.log('Social login buttons found:', {
        facebook: facebookBtns.length,
        google: googleBtns.length
    });
    
    facebookBtns.forEach(btn => {
        btn.addEventListener('click', handleFacebookLogin);
    });
    
    googleBtns.forEach(btn => {
        btn.addEventListener('click', handleGoogleLogin);
    });
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });
    }
    
    // Music player modal
    const playBtns = document.querySelectorAll('.play-btn');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    
    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const trackTitle = btn.closest('.product-card').querySelector('.product-title').textContent;
            const trackArtist = btn.closest('.product-card').querySelector('.product-artist').textContent;
            
            showMusicPlayerModal(trackTitle, trackArtist);
        });
    });
    
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    modal.classList.remove('show');
                }
            });
        }
    });
    
    // Product interactions
    const likeBtns = document.querySelectorAll('.like-btn');
    const cartBtns = document.querySelectorAll('.cart-btn');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
                showNotification('Beğenilere eklendi', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showNotification('Beğenilerden çıkarıldı', 'info');
            }
        });
    });
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Sepete eklendi', 'success');
        });
    });
    
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productTitle = btn.closest('.product-card').querySelector('.product-title').textContent;
            showNotification(`${productTitle} satın alınıyor...`, 'info');
        });
    });
    
    // Filter interactions
    const filterItems = document.querySelectorAll('.filter-item');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    
    filterItems.forEach(item => {
        item.addEventListener('change', () => {
            // Simulate filter application
            showNotification('Filtreler uygulandı', 'info');
        });
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all filters
            const checkboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');
            const radios = document.querySelectorAll('.filter-item input[type="radio"]');
            
            checkboxes.forEach(cb => cb.checked = false);
            radios.forEach(rb => rb.checked = false);
            
            // Check first radio button
            if (radios.length > 0) {
                radios[0].checked = true;
            }
            
            showNotification('Filtreler temizlendi', 'info');
        });
    }
    
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const viewType = btn.getAttribute('data-view');
            
            if (viewType === 'list') {
                productsGrid.style.gridTemplateColumns = '1fr';
                showNotification('Liste görünümü aktif', 'info');
            } else {
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
                showNotification('Grid görünümü aktif', 'info');
            }
        });
    });
    
    // Pagination
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            
            // Remove active class from all buttons
            pageBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            showNotification(`Sayfa ${btn.textContent} yükleniyor...`, 'info');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                // Simulate search
                showNotification(`"${query}" için arama yapılıyor...`, 'info');
            }
        });
    }
    
    // Welcome message
    if (isAuthenticated) {
        setTimeout(() => {
            showNotification(`Hoş geldiniz, ${currentUser.name}!`, 'success');
        }, 1000);
    }
});

// Console Welcome Message
console.log(`
🌊 Ripplab Music Marketplace 🌊
🎵 Welcome to the music marketplace! 🎵
🔐 Authentication system enabled
✨ Social login with Facebook & Google
💼 Buyer/Seller account types
🚀 Built with modern web technologies
`);