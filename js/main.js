/* ============================================
   GREEN TECH HUB - Main JavaScript
   Form Validation, Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============ NAVBAR SCROLL EFFECT ============
    const navbar = document.getElementById('mainNavbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    });

    // Back to top click
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ============ ACTIVE NAV LINK ON SCROLL ============
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }


    // ============ SCROLL ANIMATIONS (Intersection Observer) ============
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(function (section) {
        observer.observe(section);
    });


    // ============ CONTACT FORM VALIDATION ============
    const contactForm = document.getElementById('contactForm');
    const inputName = document.getElementById('inputName');
    const inputEmail = document.getElementById('inputEmail');
    const inputPhone = document.getElementById('inputPhone');
    const inputSubject = document.getElementById('inputSubject');
    const inputMessage = document.getElementById('inputMessage');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    /**
     * Validate Vietnamese name (supports diacritical marks / ký tự tiếng Việt)
     * @param {string} name - Name to validate
     * @returns {boolean} - Whether name contains valid characters
     */
    function isValidVietnameseName(name) {
        // Supports Vietnamese characters: àáảãạ, ăắằẳẵặ, âấầẩẫậ, etc.
        var vietnameseRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;
        return vietnameseRegex.test(name);
    }

    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - Whether email is valid
     */
    function isValidEmail(email) {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    /**
     * Validate Vietnamese phone number
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - Whether phone is valid
     */
    function isValidPhone(phone) {
        if (!phone || phone.trim() === '') return true; // Optional field
        var phoneRegex = /^(\+84|0)(3|5|7|8|9)[0-9]{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Validate a single field and update its visual state
     * @param {HTMLElement} field - The input field to validate
     * @param {boolean} isValid - Whether the field value is valid
     * @param {string} errorMessage - Custom error message (optional)
     * @returns {boolean} - Validation result
     */
    function validateField(field, isValid, errorMessage) {
        var errorDiv = field.nextElementSibling;

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            if (errorMessage && errorDiv && errorDiv.classList.contains('invalid-feedback')) {
                errorDiv.textContent = errorMessage;
            }
        }

        return isValid;
    }

    /**
     * Clear validation state for a field
     * @param {HTMLElement} field - The input field
     */
    function clearValidation(field) {
        field.classList.remove('is-valid', 'is-invalid');
    }

    // ---- Real-time validation on input ----
    inputName.addEventListener('input', function () {
        var value = this.value.trim();
        if (value.length === 0) {
            clearValidation(this);
        } else if (value.length < 2) {
            validateField(this, false, 'Họ và tên phải có ít nhất 2 ký tự');
        } else if (!isValidVietnameseName(value)) {
            validateField(this, false, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng');
        } else {
            validateField(this, true);
        }
    });

    inputEmail.addEventListener('input', function () {
        var value = this.value.trim();
        if (value.length === 0) {
            clearValidation(this);
        } else if (!isValidEmail(value)) {
            validateField(this, false, 'Vui lòng nhập đúng định dạng email (ví dụ: name@domain.com)');
        } else {
            validateField(this, true);
        }
    });

    inputPhone.addEventListener('input', function () {
        var value = this.value.trim();
        if (value.length === 0) {
            clearValidation(this);
        } else if (!isValidPhone(value)) {
            validateField(this, false, 'Số điện thoại không hợp lệ');
        } else {
            validateField(this, true);
        }
    });

    inputMessage.addEventListener('input', function () {
        var value = this.value.trim();
        var charCount = value.length;
        var counterEl = document.getElementById('messageCharCount');
        
        // Update character counter
        if (counterEl) {
            counterEl.textContent = charCount + ' / 1000 ký tự';
            counterEl.style.color = charCount > 900 ? '#ef4444' : charCount > 0 ? 'var(--primary-green)' : 'var(--text-muted)';
        }
        
        if (charCount === 0) {
            clearValidation(this);
        } else if (charCount < 10) {
            validateField(this, false, 'Lời nhắn phải có ít nhất 10 ký tự');
        } else {
            validateField(this, true);
        }
    });

    inputSubject.addEventListener('change', function () {
        if (this.value) {
            validateField(this, true);
        } else {
            validateField(this, false, 'Vui lòng chọn chủ đề quan tâm');
        }
    });

    // ---- Form submission ----
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hide previous alerts
        formSuccess.classList.remove('alert-success');
        formSuccess.style.display = 'none';
        formError.classList.remove('alert-error');
        formError.style.display = 'none';

        // Validate all fields
        var isFormValid = true;

        // Name validation (with Vietnamese character support)
        var nameValue = inputName.value.trim();
        if (nameValue.length < 2) {
            validateField(inputName, false, nameValue.length === 0 ? 'Vui lòng nhập họ và tên' : 'Họ và tên phải có ít nhất 2 ký tự');
            isFormValid = false;
        } else if (!isValidVietnameseName(nameValue)) {
            validateField(inputName, false, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng');
            isFormValid = false;
        } else {
            validateField(inputName, true);
        }

        // Email validation
        var emailValue = inputEmail.value.trim();
        if (!emailValue) {
            validateField(inputEmail, false, 'Vui lòng nhập email');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            validateField(inputEmail, false, 'Vui lòng nhập đúng định dạng email (ví dụ: name@domain.com)');
            isFormValid = false;
        } else {
            validateField(inputEmail, true);
        }

        // Phone validation (optional but must be valid if provided)
        var phoneValue = inputPhone.value.trim();
        if (phoneValue && !isValidPhone(phoneValue)) {
            validateField(inputPhone, false, 'Số điện thoại không hợp lệ');
            isFormValid = false;
        }

        // Subject validation
        if (!inputSubject.value) {
            validateField(inputSubject, false, 'Vui lòng chọn chủ đề quan tâm');
            isFormValid = false;
        } else {
            validateField(inputSubject, true);
        }

        // Message validation
        var messageValue = inputMessage.value.trim();
        if (messageValue.length < 10) {
            validateField(inputMessage, false, messageValue.length === 0 ? 'Vui lòng nhập lời nhắn' : 'Lời nhắn phải có ít nhất 10 ký tự');
            isFormValid = false;
        } else {
            validateField(inputMessage, true);
        }

        // Handle result
        if (isFormValid) {
            // Show loading state on button
            var submitBtn = document.getElementById('btnSubmit');
            var originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi...';
            submitBtn.disabled = true;

            // Simulate sending (in real app, this would be an API call)
            setTimeout(function () {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Show success message
                formSuccess.classList.add('alert-success');
                formSuccess.style.display = 'flex';

                // Log form data
                console.log('=== Form Data Submitted ===');
                console.log('Name:', nameValue);
                console.log('Email:', emailValue);
                console.log('Phone:', phoneValue || 'N/A');
                console.log('Company:', document.getElementById('inputCompany').value.trim() || 'N/A');
                console.log('Subject:', inputSubject.value);
                console.log('Message:', messageValue);
                console.log('===========================');

            // Reset form after 3 seconds
            setTimeout(function () {
                contactForm.reset();
                var allFields = contactForm.querySelectorAll('.form-control, .form-select');
                allFields.forEach(function (field) {
                    clearValidation(field);
                });

                // Hide success message after 5 seconds
                setTimeout(function () {
                    formSuccess.classList.remove('alert-success');
                    formSuccess.style.display = 'none';
                }, 2000);
            }, 3000);

            }, 1500); // End of setTimeout for loading simulation

        } else {
            // Show error message
            formError.classList.add('alert-error');
            formError.style.display = 'flex';

            // Scroll to first invalid field
            var firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Hide error message after 5 seconds
            setTimeout(function () {
                formError.classList.remove('alert-error');
                formError.style.display = 'none';
            }, 5000);
        }
    });


    // ============ SMOOTH SCROLL FOR NAV LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });

                // Close mobile nav
                var navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });


    // ============ COUNTER ANIMATION FOR STATS ============
    function animateCounter(element, target, suffix) {
        var current = 0;
        var increment = Math.ceil(target / 60);
        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + suffix;
        }, 30);
    }

    // Observe stats section
    var statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(function (stat) {
                        var text = stat.textContent;
                        var number = parseInt(text);
                        var suffix = text.replace(/[0-9]/g, '');
                        animateCounter(stat, number, suffix);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Log initialization
    console.log('🌿 Green Tech Hub - Website loaded successfully!');
    console.log('📧 Contact form validation: Active');
    console.log('🎨 Scroll animations: Active');
});
