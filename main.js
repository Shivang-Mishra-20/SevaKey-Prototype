class SevaKeyApp {
    constructor() {
        this.currentScreen = 'landingScreen';
        this.selectedRole = null;
        this.isInfoVisible = true;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('landingScreen');
        this.simulateLoading();
    }

    bindEvents() {
        // Event delegation for all buttons
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button, [data-action], .login-link a');
            if (!button) return;

            const action = button.dataset.action;
            if (action && this[action]) {
                e.preventDefault();
                this[action](button.dataset);
            }
        });

        // Password visibility toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.eye-btn')) {
                this.togglePasswordVisibility(e.target.closest('.eye-btn'));
            }
        });

        // Carousel flip
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="toggleInfoVisibility"]')) {
                this.toggleCarousel();
            }
        });

        // Role selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.role-btn')) {
                this.selectRole(e.target.closest('.role-btn'));
            }
        });

        // Input validation
        document.addEventListener('input', (e) => {
            if (e.target.matches('input')) {
                this.validateInput(e.target);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            this.currentScreen = screenId;
            this.updateSettingsUserInfo();
        }
    }

    // Navigation Handlers
    goToSignUp() { this.showScreen('signupScreen'); }
    handleLogin() { this.showScreen('loginScreen'); }
    goBackToAuth() { this.showScreen('authScreen'); }
    goBackToAuthFromLogin() { this.showScreen('authScreen'); }
    openSignUpFromLogin() { this.showScreen('signupScreen'); }
    goBackToSignUp() { this.showScreen('signupScreen'); }
    backToPatientFormFromOnboard() { this.showScreen('patientFormScreen'); }
    backToDoctorFormFromOnboard() { this.showScreen('doctorFormScreen'); }
    goBackToHomeFromSettings() { this.showScreen('homeScreen'); }
    goBackToSettings() { this.showScreen('settingsScreen'); }

    // Authentication Handlers
    handleLoginSubmit() {
        const name = document.getElementById('loginName').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!this.validateLoginForm(name, password)) {
            return;
        }

        this.showLoadingState(document.querySelector('[data-action="handleLoginSubmit"]'));
        setTimeout(() => {
            this.showScreen('homeScreen');
        }, 1500);
    }

    handleSignUpSubmit() {
        if (!this.selectedRole) {
            this.showToast('Please select a role');
            return;
        }

        if (this.selectedRole === 'doctor') {
            this.showScreen('doctorFormScreen');
        } else {
            this.showScreen('patientFormScreen');
        }
    }

    handleDoctorSignUp() {
        const formData = this.getDoctorFormData();
        if (!this.validateDoctorForm(formData)) {
            return;
        }

        this.showLoadingState(document.querySelector('[data-action="handleDoctorSignUp"]'));
        setTimeout(() => {
            this.showScreen('doctorOnboarding1');
        }, 1500);
    }

    // Onboarding Handlers
    showOnboardingPage(data) {
        const page = parseInt(data.page);
        this.showScreen(`onboarding${page}`);
    }

    showDoctorOnboardingPage(data) {
        const page = parseInt(data.page);
        this.showScreen(`doctorOnboarding${page}`);
    }

    finishOnboarding() {
        this.showScreen('homeScreen');
        this.showToast('Welcome to SevaKey!');
    }

    finishDoctorOnboarding() {
        this.showScreen('homeScreen');
        this.showToast('Welcome to SevaKey, Doctor!');
    }

    // Home Screen Handlers
    handleProfileClick() {
        this.showScreen('settingsScreen');
    }

    toggleCarousel() {
        const carousel = document.querySelector('.carousel');
        carousel.classList.toggle('flipped');
        this.isInfoVisible = !this.isInfoVisible;
    }

    generateTempKey() {
        document.getElementById('keyModal').classList.remove('hidden');
    }

    closeKeyModal() {
        document.getElementById('keyModal').classList.add('hidden');
    }

    generateKeyConfirmed() {
        this.closeKeyModal();
        this.showToast('Temporary SevaKey generated successfully!');
    }

    addNewRecord() {
        this.showToast('New record feature coming soon!');
    }

    // Settings Handlers
    openAccountSettings() { this.showScreen('accountSettingsScreen'); }
    openNotificationSettings() { this.showScreen('notificationSettingsScreen'); }
    openAccessibilitySettings() { this.showScreen('accessibilitySettingsScreen'); }
    openLanguageSettings() { this.showScreen('languageSettingsScreen'); }

    openEditProfile() { this.showToast('Edit Profile feature coming soon!'); }
    openChangePassword() { this.showToast('Change Password feature coming soon!'); }
    openPrivacySettings() { this.showToast('Privacy Settings feature coming soon!'); }
    openProfessionalDetails() { this.showToast('Professional Details feature coming soon!'); }
    openQualifications() { this.showToast('Qualifications feature coming soon!'); }
    openLicenseInfo() { this.showToast('License Information feature coming soon!'); }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.showScreen('authScreen');
            this.showToast('Logged out successfully');
        }
    }

    showDeleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            this.showScreen('authScreen');
            this.showToast('Account deleted successfully');
        }
    }

    // Utility Methods
    selectRole(button) {
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        this.selectedRole = button.dataset.role;
    }

    togglePasswordVisibility(button) {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);
        const isPassword = input.type === 'password';
        
        input.type = isPassword ? 'text' : 'password';
        button.innerHTML = isPassword ? 
            '<i class="fas fa-eye-slash"></i>' : 
            '<i class="fas fa-eye"></i>';
    }

    validateInput(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        if (errorElement) {
            if (!input.value.trim()) {
                errorElement.classList.remove('hidden');
                input.classList.add('input-error');
            } else {
                errorElement.classList.add('hidden');
                input.classList.remove('input-error');
            }
        }
    }

    validateLoginForm(name, password) {
        let isValid = true;

        if (!name) {
            this.showError('loginName', 'Please enter your full name');
            isValid = false;
        }

        if (!password) {
            this.showError('loginPassword', 'Please enter your password');
            isValid = false;
        }

        return isValid;
    }

    validateDoctorForm(data) {
        const required = ['name', 'regId', 'email', 'password', 'confirmPassword'];
        let isValid = true;

        required.forEach(field => {
            if (!data[field]) {
                this.showToast(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                isValid = false;
            }
        });

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match');
            isValid = false;
        }

        if (data.password && data.password.length < 6) {
            this.showToast('Password must be at least 6 characters long');
            isValid = false;
        }

        return isValid;
    }

    getDoctorFormData() {
        return {
            name: document.getElementById('doctorName').value.trim(),
            regId: document.getElementById('doctorRegId').value.trim(),
            email: document.getElementById('doctorEmail').value.trim(),
            password: document.getElementById('doctorPassword').value,
            confirmPassword: document.getElementById('doctorConfirmPassword').value
        };
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('input-error');
        }
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.classList.add('loading');
        button.disabled = true;

        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
            button.innerHTML = originalText;
        }, 1500);
    }

    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--primary-blue);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 10000;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    updateSettingsUserInfo() {
        const avatar = document.getElementById('settingsAvatar');
        const userName = document.getElementById('settingsUserName');
        const userEmail = document.getElementById('settingsUserEmail');

        if (avatar && userName) {
            avatar.textContent = 'DS';
            userName.textContent = 'Dr. Rajesh Sharma';
            userEmail.textContent = 'dr.sharma@example.com';
        }
    }

    handleEscapeKey() {
        if (this.currentScreen === 'homeScreen') return;
        
        const screenMap = {
            'loginScreen': 'authScreen',
            'signupScreen': 'authScreen',
            'patientFormScreen': 'signupScreen',
            'doctorFormScreen': 'signupScreen',
            'settingsScreen': 'homeScreen',
            'accountSettingsScreen': 'settingsScreen'
        };

        if (screenMap[this.currentScreen]) {
            this.showScreen(screenMap[this.currentScreen]);
        }
    }

    simulateLoading() {
        setTimeout(() => {
            this.showScreen('authScreen');
        }, 3000);
    }

    goToOnboarding() {
        const formData = this.getPatientFormData();
        if (!this.validatePatientForm(formData)) {
            return;
        }

        this.showLoadingState(document.querySelector('[data-action="goToOnboarding"]'));
        setTimeout(() => {
            this.showScreen('onboarding1');
        }, 1500);
    }

    getPatientFormData() {
        return {
            name: document.getElementById('patientName').value.trim(),
            email: document.getElementById('patientEmail').value.trim(),
            password: document.getElementById('patientPassword').value,
            confirmPassword: document.getElementById('patientConfirm').value
        };
    }

    validatePatientForm(data) {
        const required = ['name', 'email', 'password', 'confirmPassword'];
        let isValid = true;

        required.forEach(field => {
            if (!data[field]) {
                this.showToast(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                isValid = false;
            }
        });

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match');
            isValid = false;
        }

        if (data.password && data.password.length < 6) {
            this.showToast('Password must be at least 6 characters long');
            isValid = false;
        }

        return isValid;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SevaKeyApp();
});

// Add CSS for toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--primary-blue);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10000;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(toastStyles);