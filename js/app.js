// Ripplab Music Marketplace JavaScript with Authentication

// Debug logging
console.log('🌊 Ripplab JavaScript loading...');
console.log('Current time:', new Date().toISOString());

// Global Variables
let currentUser = null;
let isAuthenticated = false;

// DOM Elements
let authModal, mainApp, loginFormContainer, registerFormContainer, showRegisterBtn, showLoginBtn, logoutBtn, userName, userType, userMenu;

// Debug logging
console.log('Ripplab Authentication System Initializing...');
console.log('Global variables initialized:', { currentUser, isAuthenticated });

// Authentication Functions
function showAuthModal() {
    console.log('👁️ Showing auth modal');
    console.log('🔍 Elements check:', {
        authModal: authModal,
        mainApp: mainApp,
        authModalClasses: authModal ? authModal.className : 'null',
        mainAppClasses: mainApp ? mainApp.className : 'null'
    });
    
    if (authModal && mainApp) {
        authModal.classList.remove('hidden');
        mainApp.classList.add('hidden');
        console.log('✅ Auth modal displayed, main app hidden');
        console.log('🔍 After change:', {
            authModalClasses: authModal.className,
            mainAppClasses: mainApp.className
        });
        
        // Focus on first input
        const firstInput = authModal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
            console.log('🎯 Focused on first input');
        }
    } else {
        console.error('❌ Auth modal or main app elements not found:', {
            authModal: !!authModal,
            mainApp: !!mainApp
        });
    }
}

function hideAuthModal() {
    console.log('🙈 Hiding auth modal');
    
    if (authModal && mainApp) {
        authModal.classList.add('hidden');
        mainApp.classList.remove('hidden');
        console.log('✅ Auth modal hidden, main app displayed');
    } else {
        console.error('❌ Auth modal or main app elements not found:', {
            authModal: !!authModal,
            mainApp: !!mainApp
        });
    }
}

function showLoginForm() {
    console.log('Showing login form');
    
    if (loginFormContainer && registerFormContainer) {
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
        console.log('Login form displayed, register form hidden');
        
        // Focus on email input
        const emailInput = loginFormContainer.querySelector('#loginEmail');
        if (emailInput) {
            emailInput.focus();
        }
    } else {
        console.error('Login or register form elements not found:', {
            loginFormContainer: !!loginFormContainer,
            registerFormContainer: !!registerFormContainer
        });
    }
}

function showRegisterForm() {
    console.log('Showing register form');
    
    if (loginFormContainer && registerFormContainer) {
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
        console.log('Register form displayed, login form hidden');
        
        // Focus on name input
        const nameInput = registerFormContainer.querySelector('#registerName');
        if (nameInput) {
            nameInput.focus();
        }
    } else {
        console.error('Login or register form elements not found:', {
            loginFormContainer: !!loginFormContainer,
            registerFormContainer: !!registerFormContainer
        });
    }
}

// Session Management
let sessionTimeout;

function resetSessionTimeout() {
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
    
    // Set session timeout to 30 minutes (1800000 ms)
    sessionTimeout = setTimeout(() => {
        console.log('Session timeout, logging out user');
        showNotification('Oturum süresi doldu, lütfen tekrar giriş yapın', 'warning');
        logoutUser();
    }, 1800000);
}

function clearSessionTimeout() {
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        sessionTimeout = null;
    }
}

// Enhanced Authentication
function authenticateUser(userData) {
    console.log('Authenticating user:', userData);
    currentUser = userData;
    isAuthenticated = true;
    
    // Update UI
    if (userName && userType) {
        userName.textContent = userData.name;
        userType.textContent = userData.type === 'buyer' ? 'Alıcı' : 'Satıcı';
        console.log('UI updated with user info');
    } else {
        console.error('User name or type elements not found:', {
            userName: !!userName,
            userType: !!userName
        });
    }
    
    // Hide auth modal and show main app
    hideAuthModal();
    
    // Save to localStorage
    localStorage.setItem('ripplab_user', JSON.stringify(userData));
    console.log('User data saved to localStorage');
    
    // Start session timeout
    resetSessionTimeout();
    
    // Show welcome message
    showNotification(`Hoş geldiniz, ${userData.name}!`, 'success');
    
    // Update page title
    document.title = `Ripplab - ${userData.name}`;
}

function logoutUser() {
    console.log('Logging out user');
    currentUser = null;
    isAuthenticated = false;
    
    // Clear session timeout
    clearSessionTimeout();
    
    // Clear localStorage
    localStorage.removeItem('ripplab_user');
    
    // Reset page title
    document.title = 'Ripplab - Müzik Pazar Yeri';
    
    // Show auth modal
    showAuthModal();
    
    // Show logout message
    showNotification('Başarıyla çıkış yapıldı', 'info');
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Password Strength Validation
function validatePasswordStrength(password) {
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    
    return {
        score,
        checks,
        strength: score < 3 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
}

function updatePasswordStrengthIndicator(password) {
    const strengthIndicator = document.querySelector('.password-strength');
    if (!strengthIndicator) return;
    
    const strength = validatePasswordStrength(password);
    
    strengthIndicator.className = `password-strength ${strength.strength}`;
    strengthIndicator.textContent = `Şifre gücü: ${strength.strength === 'weak' ? 'Zayıf' : strength.strength === 'medium' ? 'Orta' : 'Güçlü'}`;
}

// Enhanced Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Geçerli bir e-posta adresi girin');
    }
    
    if (!formData.password || !validatePassword(formData.password)) {
        errors.push('Şifre en az 6 karakter olmalıdır');
    }
    
    if (formData.name && formData.name.length < 2) {
        errors.push('Ad en az 2 karakter olmalıdır');
    }
    
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
        errors.push('Şifreler eşleşmiyor');
    }
    
    // Check password strength for registration
    if (formData.password && formData.name) { // Registration form
        const strength = validatePasswordStrength(formData.password);
        if (strength.score < 3) {
            errors.push('Şifre çok zayıf, daha güçlü bir şifre seçin');
        }
    }
    
    return errors;
}

// Remember Me Functionality
function handleRememberMe(email, password) {
    const rememberMe = document.querySelector('input[type="checkbox"]');
    if (rememberMe && rememberMe.checked) {
        localStorage.setItem('ripplab_remember', JSON.stringify({ email, password }));
        console.log('Remember me enabled');
    } else {
        localStorage.removeItem('ripplab_remember');
        console.log('Remember me disabled');
    }
}

function loadRememberedCredentials() {
    const remembered = localStorage.getItem('ripplab_remember');
    if (remembered) {
        try {
            const { email, password } = JSON.parse(remembered);
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            const rememberMe = document.querySelector('input[type="checkbox"]');
            
            if (emailInput && passwordInput && rememberMe) {
                emailInput.value = email;
                passwordInput.value = password;
                rememberMe.checked = true;
                console.log('Remembered credentials loaded');
            }
        } catch (error) {
            console.error('Error loading remembered credentials:', error);
            localStorage.removeItem('ripplab_remember');
        }
    }
}

// Enhanced Login Handler
function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt with email:', email);
    
    // Validate form
    const errors = validateForm({ email, password });
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return;
    }
    
    // Handle remember me
    handleRememberMe(email, password);
    
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
    console.log('Register form submitted');
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const accountType = document.querySelector('input[name="accountType"]:checked');
    const termsAccepted = document.querySelector('input[type="checkbox"]').checked;
    
    // Validate form
    const errors = validateForm({ 
        name, 
        email, 
        password, 
        confirmPassword 
    });
    
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return;
    }
    
    if (!accountType) {
        showNotification('Lütfen hesap türünü seçin', 'error');
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
            type: accountType.value,
            id: Date.now()
        };
        
        console.log('Registration successful, user data:', userData);
        authenticateUser(userData);
    }, 2000);
}

// Password Visibility Toggle
function setupPasswordToggles() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 5px;
            font-size: 14px;
        `;
        
        // Make input container relative
        const container = input.parentElement;
        container.style.position = 'relative';
        
        // Add toggle button
        container.appendChild(toggleBtn);
        
        // Toggle functionality
        toggleBtn.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
}

// Enhanced Social Login
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

// Authentication Status Check
function checkAuthStatus() {
    console.log('🔐 Checking authentication status...');
    
    const savedUser = localStorage.getItem('ripplab_user');
    console.log('🔍 Checking localStorage for saved user:', savedUser);
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            console.log('✅ User is authenticated:', currentUser);
            
            // Update UI
            if (userName && userType) {
                userName.textContent = currentUser.name;
                userType.textContent = currentUser.type === 'buyer' ? 'Alıcı' : 'Satıcı';
            }
            
            // Hide auth modal and show main app
            hideAuthModal();
            
            // Reset session timeout
            resetSessionTimeout();
            
            // Update page title
            document.title = `Ripplab - ${currentUser.name}`;
            console.log('✅ Authentication check completed successfully');
            
            return true;
        } catch (error) {
            console.error('❌ Error parsing saved user data:', error);
            localStorage.removeItem('ripplab_user');
            return false;
        }
    } else {
        console.log('👤 No saved user found in localStorage');
        return false;
    }
}

// Initialize Authentication System
function initAuthSystem() {
    console.log('🚀 Initializing authentication system...');
    
    // Verify all required elements exist
    const requiredElements = {
        authModal: document.getElementById('authModal'),
        mainApp: document.getElementById('mainApp'),
        loginFormContainer: document.getElementById('loginForm'),
        registerFormContainer: document.getElementById('registerForm'),
        userName: document.getElementById('userName'),
        userType: document.getElementById('userType'),
        logoutBtn: document.getElementById('logoutBtn')
    };
    
    console.log('🔍 Required elements check:', requiredElements);
    
    const missingElements = Object.entries(requiredElements)
        .filter(([name, element]) => !element)
        .map(([name]) => name);
    
    if (missingElements.length > 0) {
        console.error('❌ Missing required elements:', missingElements);
        showNotification(`Eksik elementler: ${missingElements.join(', ')}`, 'error');
        return false;
    }
    
    console.log('✅ All required elements found');
    
    // Check if user is already authenticated
    console.log('🔍 Checking if user is already authenticated...');
    if (!checkAuthStatus()) {
        console.log('👤 User not authenticated, showing auth modal');
        showAuthModal();
    } else {
        console.log('👤 User authenticated, showing main app');
        showNotification(`Tekrar hoş geldiniz, ${currentUser.name}!`, 'success');
    }
    
    return true;
}

// User Activity Monitoring
function setupActivityMonitoring() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
        document.addEventListener(event, () => {
            if (isAuthenticated) {
                resetSessionTimeout();
            }
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 DOM Content Loaded - Setting up authentication system');
    console.log('Document ready, starting initialization...');
    console.log('🔍 Document body:', document.body);
    console.log('🔍 Document readyState:', document.readyState);
    
    // Initialize DOM elements after DOM is loaded
    console.log('🔍 Looking for DOM elements...');
    authModal = document.getElementById('authModal');
    mainApp = document.getElementById('mainApp');
    loginFormContainer = document.getElementById('loginForm');
    registerFormContainer = document.getElementById('registerForm');
    showRegisterBtn = document.getElementById('showRegister');
    showLoginBtn = document.getElementById('showLogin');
    logoutBtn = document.getElementById('logoutBtn');
    userName = document.getElementById('userName');
    userType = document.getElementById('userType');
    userMenu = document.getElementById('userMenu');
    
    console.log('🔍 DOM elements found:', {
        authModal: !!authModal,
        mainApp: !!mainApp,
        loginFormContainer: !!loginFormContainer,
        registerFormContainer: !!registerFormContainer,
        showRegisterBtn: !!showRegisterBtn,
        showLoginBtn: !!showLoginBtn,
        logoutBtn: !!logoutBtn,
        userName: !!userName,
        userType: !!userType,
        userMenu: !!userMenu
    });
    
    console.log('🔍 Element details:', {
        authModal: authModal,
        mainApp: mainApp,
        authModalId: authModal ? authModal.id : 'null',
        mainAppId: mainApp ? mainApp.id : 'null'
    });
    
    // Verify critical elements exist
    console.log('🔍 Verifying critical elements...');
    if (!authModal || !mainApp) {
        console.error('❌ Critical elements missing - cannot initialize authentication system');
        console.error('authModal:', authModal);
        console.error('mainApp:', mainApp);
        showNotification('Kritik elementler eksik - kimlik doğrulama sistemi başlatılamıyor', 'error');
        return;
    }
    console.log('✅ Critical elements verified successfully');
    
    // Initialize authentication system
    console.log('🚀 Calling initAuthSystem...');
    initAuthSystem();
    
    // Setup password toggles
    setupPasswordToggles();

    // Setup activity monitoring
    setupActivityMonitoring();
    
    // Setup password strength indicator
    const registerPasswordInput = document.getElementById('registerPassword');
    if (registerPasswordInput) {
        registerPasswordInput.addEventListener('input', (e) => {
            updatePasswordStrengthIndicator(e.target.value);
        });
    }
    
    // Load remembered credentials
    loadRememberedCredentials();
    
    // Setup account type selection
    setupAccountTypeSelection();
    
    // Form submissions
    const loginFormElement = document.querySelector('.login-form');
    const registerFormElement = document.querySelector('.register-form');
    
    if (loginFormElement) {
        console.log('Adding submit listener to login form');
        loginFormElement.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form not found');
    }
    
    if (registerFormElement) {
        console.log('Adding submit listener to register form');
        registerFormElement.addEventListener('submit', handleRegister);
    } else {
        console.error('Register form not found');
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
    
    if (facebookBtns.length === 0) {
        console.error('No Facebook login buttons found');
    } else {
        facebookBtns.forEach(btn => {
            btn.addEventListener('click', handleFacebookLogin);
        });
    }
    
    if (googleBtns.length === 0) {
        console.error('No Google login buttons found');
    } else {
        googleBtns.forEach(btn => {
            btn.addEventListener('click', handleGoogleLogin);
        });
    }
    
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

// Account Type Selection
function setupAccountTypeSelection() {
    const accountTypeOptions = document.querySelectorAll('input[name="accountType"]');
    const typeCards = document.querySelectorAll('.type-card');
    
    accountTypeOptions.forEach((option, index) => {
        option.addEventListener('change', () => {
            // Remove active class from all cards
            typeCards.forEach(card => card.classList.remove('active'));
            
            // Add active class to selected card
            if (option.checked) {
                typeCards[index].classList.add('active');
                console.log('Account type selected:', option.value);
            }
        });
    });
    
    // Set initial active state
    const checkedOption = document.querySelector('input[name="accountType"]:checked');
    if (checkedOption) {
        const index = Array.from(accountTypeOptions).indexOf(checkedOption);
        if (index !== -1) {
            typeCards[index].classList.add('active');
        }
    }
}

// Console Welcome Message
console.log(`
🌊 Ripplab Music Marketplace 🌊
🎵 Welcome to the music marketplace! 🎵
🔐 Authentication system enabled
✨ Social login with Facebook & Google
💼 Buyer/Seller account types
🚀 Built with modern web technologies
🔒 Page protection: Main content hidden until login
📱 Responsive design for all devices
🎨 Modern UI with glassmorphism effects
⚡ Optimized performance and animations
`);