/**
 * AppGate - Professional Authentication System
 * Main Application Logic
 */

// ============================================
// APPLICATION STATE
// ============================================

const AppState = {
    currentMode: 'login', // 'login' or 'signup'
    validationErrors: {},
    isSubmitting: false
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('AppGate Authentication System initialized');
    renderAuthForm();
});

// ============================================
// FORM RENDERING
// ============================================

/**
 * Render the appropriate form based on current mode (login/signup)
 */
function renderAuthForm() {
    const formContent = document.getElementById('formContent');
    
    if (AppState.currentMode === 'login') {
        formContent.innerHTML = getLoginFormHTML();
    } else {
        formContent.innerHTML = getSignUpFormHTML();
    }
    
    attachEventListeners();
}

/**
 * Get HTML for Login form
 */
function getLoginFormHTML() {
    return `
        <div class="form-header">
            <h2 class="form-title">Welcome Back</h2>
            <p class="form-subtitle">Sign in to your account</p>
        </div>
        
        <div class="form-group">
            <label for="loginEmail" class="form-label">Email Address</label>
            <input 
                type="email" 
                id="loginEmail" 
                class="form-input" 
                placeholder="name@company.com"
                required
            >
            <span class="error-message" id="loginEmailError"></span>
        </div>
        
        <div class="form-group">
            <label for="loginPassword" class="form-label">Password</label>
            <input 
                type="password" 
                id="loginPassword" 
                class="form-input" 
                placeholder="••••••••"
                required
            >
            <span class="error-message" id="loginPasswordError"></span>
        </div>
        
        <div class="form-actions">
            <a href="#" class="forgot-password-link">Forgot password?</a>
        </div>
        
        <button type="submit" class="btn btn-primary">Sign In</button>
        
        <div class="form-footer">
            <p>Don't have an account? <a href="#" class="toggle-mode-link" onclick="toggleMode('signup')">Sign up</a></p>
        </div>
    `;
}

/**
 * Get HTML for Sign Up form
 */
function getSignUpFormHTML() {
    return `
        <div class="form-header">
            <h2 class="form-title">Create Account</h2>
            <p class="form-subtitle">Join us today</p>
        </div>
        
        <div class="form-group">
            <label for="signupEmail" class="form-label">Email Address</label>
            <input 
                type="email" 
                id="signupEmail" 
                class="form-input" 
                placeholder="name@company.com"
                required
            >
            <span class="error-message" id="signupEmailError"></span>
        </div>
        
        <div class="form-group">
            <label for="signupPassword" class="form-label">Password</label>
            <input 
                type="password" 
                id="signupPassword" 
                class="form-input" 
                placeholder="••••••••"
                required
            >
            <span class="error-message" id="signupPasswordError"></span>
        </div>
        
        <div class="form-group">
            <label for="signupConfirmPassword" class="form-label">Confirm Password</label>
            <input 
                type="password" 
                id="signupConfirmPassword" 
                class="form-input" 
                placeholder="••••••••"
                required
            >
            <span class="error-message" id="signupConfirmPasswordError"></span>
        </div>
        
        <button type="submit" class="btn btn-primary">Create Account</button>
        
        <div class="form-footer">
            <p>Already have an account? <a href="#" class="toggle-mode-link" onclick="toggleMode('login')">Sign in</a></p>
        </div>
    `;
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Attach event listeners to form elements
 */
function attachEventListeners() {
    const form = document.getElementById('authForm');
    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Toggle between login and signup modes
 */
function toggleMode(mode) {
    AppState.currentMode = mode;
    AppState.validationErrors = {};
    renderAuthForm();
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (AppState.currentMode === 'login') {
        handleLoginSubmit();
    } else {
        handleSignUpSubmit();
    }
}

/**
 * Handle login form submission (placeholder)
 */
function handleLoginSubmit() {
    console.log('Login submit - Feature 2 will implement this');
}

/**
 * Handle sign up form submission (placeholder)
 */
function handleSignUpSubmit() {
    console.log('Sign up submit - Feature 3 will implement this');
}
