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
    const authForm = document.getElementById('authForm');
    
    // Add exit animation
    authForm.classList.add('exit');
    
    // Wait for animation to complete before changing content
    setTimeout(() => {
        authForm.classList.remove('exit');
        
        if (AppState.currentMode === 'login') {
            formContent.innerHTML = getLoginFormHTML();
        } else {
            formContent.innerHTML = getSignUpFormHTML();
        }
        
        attachEventListeners();
    }, 300);
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
            <div class="password-input-wrapper">
                <input 
                    type="password" 
                    id="loginPassword" 
                    class="form-input password-input" 
                    placeholder="••••••••"
                    required
                >
                <button 
                    type="button" 
                    class="password-toggle" 
                    id="loginPasswordToggle"
                    aria-label="Toggle password visibility"
                >
                    <svg class="eye-icon open" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 5C6.5 5 2.7 9.6 2 15c.7 5.4 4.5 10 10 10s9.3-4.6 10-10c-.7-5.4-4.5-10-10-10zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="currentColor"/>
                    </svg>
                    <svg class="eye-icon closed" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M11.83 9L15.64 12.81c.04-.25.08-.5.08-.81 0-1.66-1.34-3-3-3-.29 0-.54.04-.81.08M7.4 8.86c-.89.6-1.64 1.52-2.02 2.64.7 1.76 2.35 3.1 4.12 3.1.54 0 1.05-.1 1.56-.25l-.92-.91zM2.31 4.27l2.15 2.17c-.08.16-.16.32-.23.48C2.18 8.3.93 10.6 1.01 12.88c.7 5.4 4.5 10 10 10 1.52 0 2.98-.25 4.35-.73l2.5 2.5c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44L4.75 1.83c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44zm15.52-.75l-2.37-2.37c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44l2.37 2.37c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
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
            <div class="password-input-wrapper">
                <input 
                    type="password" 
                    id="signupPassword" 
                    class="form-input password-input" 
                    placeholder="••••••••"
                    minlength="8"
                    required
                >
                <button 
                    type="button" 
                    class="password-toggle" 
                    id="signupPasswordToggle"
                    aria-label="Toggle password visibility"
                >
                    <svg class="eye-icon open" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 5C6.5 5 2.7 9.6 2 15c.7 5.4 4.5 10 10 10s9.3-4.6 10-10c-.7-5.4-4.5-10-10-10zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="currentColor"/>
                    </svg>
                    <svg class="eye-icon closed" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M11.83 9L15.64 12.81c.04-.25.08-.5.08-.81 0-1.66-1.34-3-3-3-.29 0-.54.04-.81.08M7.4 8.86c-.89.6-1.64 1.52-2.02 2.64.7 1.76 2.35 3.1 4.12 3.1.54 0 1.05-.1 1.56-.25l-.92-.91zM2.31 4.27l2.15 2.17c-.08.16-.16.32-.23.48C2.18 8.3.93 10.6 1.01 12.88c.7 5.4 4.5 10 10 10 1.52 0 2.98-.25 4.35-.73l2.5 2.5c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44L4.75 1.83c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44zm15.52-.75l-2.37-2.37c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44l2.37 2.37c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div class="password-requirements">
                <p class="requirement" id="lengthRequirement">
                    <span class="requirement-icon">✓</span>
                    At least 8 characters
                </p>
            </div>
            <span class="error-message" id="signupPasswordError"></span>
        </div>
        
        <div class="form-group">
            <label for="signupConfirmPassword" class="form-label">Confirm Password</label>
            <div class="password-input-wrapper">
                <input 
                    type="password" 
                    id="signupConfirmPassword" 
                    class="form-input password-input" 
                    placeholder="••••••••"
                    required
                >
                <button 
                    type="button" 
                    class="password-toggle" 
                    id="signupConfirmPasswordToggle"
                    aria-label="Toggle password visibility"
                >
                    <svg class="eye-icon open" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 5C6.5 5 2.7 9.6 2 15c.7 5.4 4.5 10 10 10s9.3-4.6 10-10c-.7-5.4-4.5-10-10-10zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="currentColor"/>
                    </svg>
                    <svg class="eye-icon closed" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M11.83 9L15.64 12.81c.04-.25.08-.5.08-.81 0-1.66-1.34-3-3-3-.29 0-.54.04-.81.08M7.4 8.86c-.89.6-1.64 1.52-2.02 2.64.7 1.76 2.35 3.1 4.12 3.1.54 0 1.05-.1 1.56-.25l-.92-.91zM2.31 4.27l2.15 2.17c-.08.16-.16.32-.23.48C2.18 8.3.93 10.6 1.01 12.88c.7 5.4 4.5 10 10 10 1.52 0 2.98-.25 4.35-.73l2.5 2.5c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44L4.75 1.83c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44zm15.52-.75l-2.37-2.37c-.67-.67-1.77-.67-2.44 0-.67.67-.67 1.77 0 2.44l2.37 2.37c.67.67 1.77.67 2.44 0 .67-.67.67-1.77 0-2.44z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
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
    
    // Password toggle listeners
    attachPasswordToggleListeners();
}

/**
 * Attach password toggle listeners for all password fields
 */
function attachPasswordToggleListeners() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            togglePasswordVisibility(button);
        });
    });
    
    // Password requirement checker for signup
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', updatePasswordRequirements);
    }
    
    // Real-time validation on blur
    attachRealtimeValidation();
}

/**
 * Attach real-time validation listeners
 */
function attachRealtimeValidation() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const signupConfirmPassword = document.getElementById('signupConfirmPassword');
    
    // Login form validation
    if (loginEmail) {
        loginEmail.addEventListener('blur', () => {
            const email = loginEmail.value.trim();
            if (email && !isValidEmail(email)) {
                displayFieldError('loginEmail', 'Please enter a valid email address');
            } else {
                clearFieldError('loginEmail');
            }
        });
    }
    
    if (loginPassword) {
        loginPassword.addEventListener('blur', () => {
            const password = loginPassword.value;
            if (password === '') {
                displayFieldError('loginPassword', 'Password is required');
            } else {
                clearFieldError('loginPassword');
            }
        });
    }
    
    // Sign up form validation
    if (signupEmail) {
        signupEmail.addEventListener('blur', () => {
            const email = signupEmail.value.trim();
            if (email && !isValidEmail(email)) {
                displayFieldError('signupEmail', 'Please enter a valid email address');
            } else {
                clearFieldError('signupEmail');
            }
        });
    }
    
    if (signupPassword) {
        signupPassword.addEventListener('blur', () => {
            const password = signupPassword.value;
            if (password && password.length < 8) {
                displayFieldError('signupPassword', 'Password must be at least 8 characters');
            } else {
                clearFieldError('signupPassword');
            }
        });
    }
    
    if (signupConfirmPassword) {
        signupConfirmPassword.addEventListener('blur', () => {
            const password = signupPassword?.value || '';
            const confirmPassword = signupConfirmPassword.value;
            if (confirmPassword && password !== confirmPassword) {
                displayFieldError('signupConfirmPassword', 'Passwords do not match');
            } else {
                clearFieldError('signupConfirmPassword');
            }
        });
    }
}

/**
 * Display error for a single field
 */
function displayFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    
    if (input) input.classList.add('error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

/**
 * Clear error for a single field
 */
function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    
    if (input) input.classList.remove('error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(button) {
    const passwordInput = button.previousElementSibling;
    const isPassword = passwordInput.type === 'password';
    
    // Toggle input type
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Toggle icon visibility
    const openIcon = button.querySelector('.eye-icon.open');
    const closedIcon = button.querySelector('.eye-icon.closed');
    
    if (isPassword) {
        openIcon.style.display = 'none';
        closedIcon.style.display = 'block';
    } else {
        openIcon.style.display = 'block';
        closedIcon.style.display = 'none';
    }
}

/**
 * Update password requirements display
 */
function updatePasswordRequirements() {
    const password = document.getElementById('signupPassword').value;
    const lengthRequirement = document.getElementById('lengthRequirement');
    
    if (lengthRequirement) {
        if (password.length >= 8) {
            lengthRequirement.classList.add('met');
        } else {
            lengthRequirement.classList.remove('met');
        }
    }
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
 * Handle login form submission
 */
function handleLoginSubmit() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validate login form
    const errors = validateLoginForm(email, password);
    
    if (Object.keys(errors).length === 0) {
        // Validation passed
        console.log('Login validation passed', { email, password });
        showSuccessMessage('Login successful!');
    } else {
        // Display validation errors
        displayValidationErrors('login', errors);
    }
}

/**
 * Handle sign up form submission
 */
function handleSignUpSubmit() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate signup form
    const errors = validateSignUpForm(email, password, confirmPassword);
    
    if (Object.keys(errors).length === 0) {
        // Validation passed
        console.log('Sign up validation passed', { email, password });
        showSuccessMessage('Account created successfully!');
    } else {
        // Display validation errors
        displayValidationErrors('signup', errors);
    }
}

/**
 * Validate login form
 */
function validateLoginForm(email, password) {
    const errors = {};
    
    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
        errors.password = 'Password is required';
    }
    
    return errors;
}

/**
 * Validate sign up form
 */
function validateSignUpForm(email, password, confirmPassword) {
    const errors = {};
    
    // Email validation
    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
}

/**
 * Validate email format using regex
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display validation errors inline
 */
function displayValidationErrors(mode, errors) {
    // Clear previous errors
    clearValidationErrors(mode);
    
    // Display new errors
    if (errors.email) {
        const emailErrorEl = document.getElementById(`${mode}EmailError`);
        if (emailErrorEl) {
            emailErrorEl.textContent = errors.email;
            emailErrorEl.classList.add('show');
            document.getElementById(`${mode}Email`).classList.add('error');
        }
    }
    
    if (errors.password) {
        const passwordErrorEl = document.getElementById(`${mode}PasswordError`);
        if (passwordErrorEl) {
            passwordErrorEl.textContent = errors.password;
            passwordErrorEl.classList.add('show');
            document.getElementById(`${mode}Password`).classList.add('error');
        }
    }
    
    if (errors.confirmPassword) {
        const confirmPasswordErrorEl = document.getElementById(`${mode}ConfirmPasswordError`);
        if (confirmPasswordErrorEl) {
            confirmPasswordErrorEl.textContent = errors.confirmPassword;
            confirmPasswordErrorEl.classList.add('show');
            document.getElementById(`${mode}ConfirmPassword`).classList.add('error');
        }
    }
}

/**
 * Clear validation errors
 */
function clearValidationErrors(mode) {
    // Remove error classes and messages for all fields
    const fields = ['Email', 'Password', 'ConfirmPassword'];
    
    fields.forEach(field => {
        const inputId = `${mode}${field}`;
        const errorId = `${inputId}Error`;
        
        const input = document.getElementById(inputId);
        const errorEl = document.getElementById(errorId);
        
        if (input) {
            input.classList.remove('error');
        }
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
    });
}
