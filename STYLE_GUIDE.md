# AppGate Style Guide & Development Standards

## JavaScript Conventions

### Naming Conventions
```javascript
// Functions: camelCase, descriptive verb-noun pattern
function validateLoginForm() { }
function attachEventListeners() { }
function togglePasswordVisibility() { }

// Variables: camelCase
const authForm = document.getElementById('authForm');
let isSubmitting = false;

// Constants: UPPER_SNAKE_CASE
const MIN_PASSWORD_LENGTH = 8;
const MAX_ATTEMPTS = 5;

// DOM Elements: suffix with 'El' or 'Btn' for clarity
const submitBtn = document.querySelector('.btn-primary');
const emailInputEl = document.getElementById('loginEmail');
```

### Function Documentation
All functions should have JSDoc comments:
```javascript
/**
 * Brief description of what the function does
 * @param {type} paramName - Description
 * @returns {type} Description of return value
 */
function myFunction(paramName) {
    // implementation
}
```

### Code Organization
1. **Comments** - Add section headers for major logic blocks
2. **Order** - Group related functions together
3. **Length** - Keep functions focused (single responsibility)
4. **Comments** - Explain WHY, not WHAT (code shows what)

```javascript
// ============================================
// FEATURE CATEGORY
// ============================================

/**
 * Function description
 */
function relatedFunction1() { }

function relatedFunction2() { }
```

## CSS Conventions

### Class Naming
Use BEM (Block, Element, Modifier) for clarity:
```css
/* Block */
.form-group { }

/* Element */
.form-group__input { }

/* Modifier */
.form-group--error { }
.form-group--success { }
```

Actually, we use simpler naming:
```css
/* Parent component */
.form-input { }

/* State variants */
.form-input.error { }
.form-input:focus { }

/* Related elements */
.password-input-wrapper { }
.password-toggle { }
```

### CSS Structure
1. **Variables** - Define color, spacing, shadows
2. **Global** - Reset, typography, html/body
3. **Components** - Inputs, buttons, forms
4. **States** - Hover, focus, active, disabled
5. **Animations** - Keyframes and transitions
6. **Responsive** - Media queries at bottom

### Color Usage
Always use CSS variables:
```css
/* ❌ Don't do this */
.button {
    background: #1E3A8A;
}

/* ✅ Do this */
.button {
    background: var(--primary);
}
```

### Spacing
Use the spacing scale consistently:
```css
/* ❌ Don't use arbitrary values */
margin: 13px;
padding: 7px 14px;

/* ✅ Use variables */
margin: var(--spacing-lg);
padding: var(--spacing-md) var(--spacing-lg);
```

## HTML Conventions

### Semantic HTML
```html
<!-- ✅ Good -->
<form id="authForm">
    <label for="email">Email</label>
    <input type="email" id="email" required>
</form>

<!-- ❌ Avoid -->
<div id="form">
    <span>Email</span>
    <input type="text">
</div>
```

### Accessibility
```html
<!-- Always include labels -->
<label for="inputId">Label text</label>
<input type="email" id="inputId">

<!-- Use aria attributes -->
<button aria-label="Toggle password visibility">👁️</button>
<button aria-busy="true">Loading...</button>

<!-- Semantic sections -->
<header>Header content</header>
<main>Main content</main>
<footer>Footer content</footer>
```

### Comments
```html
<!-- Clear, descriptive comments -->
<!-- Success message alert (hidden by default) -->
<div id="successMessage" style="display: none;"></div>

<!-- Form container with dynamic content -->
<form id="authForm"></form>
```

## Git Conventions

### Commit Messages
```bash
# Format: type: description

# Types:
# feat: new feature
# fix: bug fix
# refactor: code reorganization
# style: CSS/formatting changes
# docs: documentation
# test: test-related changes
# chore: build, dependencies

# Examples:
git commit -m "feat: add password show/hide toggle"
git commit -m "fix: correct email validation regex"
git commit -m "refactor: extract validation functions"
git commit -m "style: update button spacing"
git commit -m "docs: add API integration guide"
```

### Branch Naming
```bash
# Feature branches
git checkout -b feature/password-toggle
git checkout -b feature/form-validation

# Bug fix branches
git checkout -b fix/email-validation

# Refactor branches
git checkout -b refactor/validation-logic
```

## Code Quality Checklist

Before committing:
- [ ] No console.log() statements (except for debugging)
- [ ] No commented-out code
- [ ] Proper indentation (4 spaces for JS, 4 spaces for CSS)
- [ ] No trailing whitespace
- [ ] Functions have JSDoc comments
- [ ] Variables have descriptive names
- [ ] CSS uses variables, not hardcoded values
- [ ] Responsive design tested on mobile
- [ ] Form validation works correctly
- [ ] No duplicate code

## Performance Tips

### JavaScript
```javascript
// ❌ Avoid repeated DOM queries
for (let i = 0; i < 1000; i++) {
    document.getElementById('btn').textContent = i;
}

// ✅ Query once, reuse variable
const btn = document.getElementById('btn');
for (let i = 0; i < 1000; i++) {
    btn.textContent = i;
}
```

### CSS
```css
/* ❌ Avoid overly complex selectors */
.auth-container .auth-card .form-group .form-input:not(.error) { }

/* ✅ Use simpler selectors */
.form-input { }
.form-input.error { }
```

### Images
```css
/* Prefer SVG for icons and logos */
/* Use WebP with PNG fallback for photos */
```

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS, Android)
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Test with screen reader
- [ ] Test all form validation rules
- [ ] Test with slow network (DevTools throttling)

### Browser DevTools
```javascript
// Useful for debugging:
console.log('Variable state:', variableName);
console.table(arrayOfObjects); // Pretty print arrays/objects
console.time('taskName'); // Performance measurement
```

## Documentation Standards

### README Sections
1. Overview and features
2. Installation and setup
3. Project structure
4. Design system (colors, typography)
5. Usage examples
6. Testing checklist
7. Future enhancements
8. Security notes

### Code Comments
```javascript
// ✅ Explain the WHY
// Reset form fields to prevent data leakage
document.getElementById('authForm').reset();

// ❌ Obvious, don't add comments
// Set isSubmitting to false
isSubmitting = false;
```

## Accessibility Standards

### WCAG 2.1 Level AA
- Color contrast ratio ≥ 4.5:1 for text
- Minimum touch target size: 44x44px (we use 40px)
- Keyboard navigation must work
- Form labels must be associated with inputs
- Error messages must be announced
- Focus indicators must be visible

### Testing
```bash
# Use Chrome DevTools Lighthouse
# Run: DevTools > Lighthouse > Accessibility

# Use axe DevTools browser extension
# https://www.deque.com/axe/devtools/
```

## Common Pitfalls to Avoid

### JavaScript
```javascript
// ❌ Modifying DOM in loops
items.forEach(item => {
    document.body.appendChild(item); // Bad: causes reflow
});

// ✅ Build in memory first
const fragment = document.createDocumentFragment();
items.forEach(item => fragment.appendChild(item));
document.body.appendChild(fragment);
```

### CSS
```css
/* ❌ Using !important (except for utilities) */
.button {
    background: var(--primary) !important;
}

/* ✅ Use proper specificity */
.button {
    background: var(--primary);
}

.button:hover {
    background: var(--primary-dark);
}
```

### HTML
```html
<!-- ❌ Empty alt attributes -->
<img src="logo.png" alt="">

<!-- ✅ Descriptive alt text -->
<img src="logo.png" alt="AppGate logo">

<!-- ❌ Generic link text -->
<a href="/signup">click here</a>

<!-- ✅ Descriptive link text -->
<a href="/signup">Create a new account</a>
```

## Tools & Resources

### Code Formatting
- **VS Code Extension**: Prettier (Auto-format)
- **Command**: `npx prettier --write .` (if needed)

### Linting
- **JavaScript**: ESLint for production projects
- **CSS**: StyleLint for production projects

### Testing
- Manual testing is primary for this project
- Use browser DevTools Console for debugging
- Test responsive design with Device Emulation

### Documentation
- Keep README.md up-to-date
- Use JSDoc for functions
- Add comments for complex logic

## Review Checklist for Code Reviews

- [ ] Code follows naming conventions
- [ ] Functions have JSDoc comments
- [ ] No hardcoded values (use variables)
- [ ] CSS uses CSS variables
- [ ] HTML is semantic
- [ ] ARIA labels added where needed
- [ ] Responsive design tested
- [ ] Form validation works
- [ ] Error handling is present
- [ ] No performance issues

---

**Last Updated**: January 2026
**Version**: 1.0.0
