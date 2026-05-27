$(document).ready(function() {
    
    function isUserRegistered() {
        return localStorage.getItem('richfieldUser') !== null;
    }
    
    function updateNavForSession() {
        let $signUpLink = $('nav ul li a[href="signup.html"]');
        if ($signUpLink.length === 0) return;
        
        if (isUserRegistered()) {
            $signUpLink.text('Logout');
            $signUpLink.attr('href', '#');
            $signUpLink.off('click').on('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to logout? Your data will be cleared from this browser.')) {
                    localStorage.removeItem('richfieldUser');
                    localStorage.removeItem('richfieldPosts');
                    location.reload();
                }
            });
        } else {
            $signUpLink.text('Sign Up');
            $signUpLink.attr('href', 'signup.html');
            $signUpLink.off('click');
        }
    }
    
    updateNavForSession();
    
    if (window.location.pathname.includes('signup.html')) {
        if (isUserRegistered()) {
            $('#registrationForm').html(`
                <div class="alert alert-info" style="background:#d4edda; padding:1rem; border-radius:8px; text-align:center;">
                    <h3>✅ You are already signed up!</h3>
                    <p>Go to your <a href="profile.html" style="color:#003366;">Profile</a> or 
                    <a href="feed.html" style="color:#003366;">Feed</a>.</p>
                    <button id="logoutBtnInline" class="btn-secondary" style="margin-top:1rem;">Logout (Clear Data)</button>
                </div>
            `);
            $('#logoutBtnInline').on('click', function() {
                localStorage.removeItem('richfieldUser');
                localStorage.removeItem('richfieldPosts');
                location.reload();
            });
            $('.live-preview-wrapper').hide();
        } else {
            initSignupForm();
        }
    }
    
    function initSignupForm() {
        $('#fullName').on('input', function() {
            let name = $(this).val();
            if(name === '') name = 'Your Name';
            $('#previewName').text(name);
        });
        
        $('#bio').on('input', function() {
            let bio = $(this).val();
            if(bio === '') bio = 'Your bio will appear here...';
            $('#previewBio').text(bio);
        });
        
        $('#interests').on('input', function() {
            let interestsStr = $(this).val();
            let interestsArray = interestsStr.split(',').map(i => i.trim()).filter(i => i !== '');
            let $tagsContainer = $('#previewInterests');
            $tagsContainer.empty();
            if(interestsArray.length === 0) {
                $tagsContainer.html('<span style="background:#ccc;">No interests added</span>');
            } else {
                interestsArray.forEach(interest => {
                    $tagsContainer.append($('<span></span>').text(interest));
                });
            }
        });
        
        function validateForm() {
            let isValid = true;
            $('.error-message').text('');
            $('input, select').removeClass('error');
            
            let fullName = $('#fullName').val().trim();
            if(fullName === '') {
                $('#fullNameError').text('Full name is required');
                $('#fullName').addClass('error');
                isValid = false;
            }
            
            let studentNumber = $('#studentNumber').val().trim();
            if(studentNumber === '') {
                $('#studentNumberError').text('Student number is required');
                $('#studentNumber').addClass('error');
                isValid = false;
            } else if(isNaN(studentNumber)) {
                $('#studentNumberError').text('Student number must be numeric');
                $('#studentNumber').addClass('error');
                isValid = false;
            }
            
            let email = $('#email').val().trim();
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(email === '') {
                $('#emailError').text('Email address is required');
                $('#email').addClass('error');
                isValid = false;
            } else if(!emailPattern.test(email)) {
                $('#emailError').text('Please enter a valid email address');
                $('#email').addClass('error');
                isValid = false;
            }
            
            let campus = $('#campus').val();
            if(campus === '') {
                $('#campusError').text('Please select a campus');
                $('#campus').addClass('error');
                isValid = false;
            }
            
            let password = $('#password').val();
            if(password === '') {
                $('#passwordError').text('Password is required');
                $('#password').addClass('error');
                isValid = false;
            } else if(password.length < 8) {
                $('#passwordError').text('Password must be at least 8 characters');
                $('#password').addClass('error');
                isValid = false;
            }
            
            let confirmPassword = $('#confirmPassword').val();
            if(confirmPassword === '') {
                $('#confirmPasswordError').text('Please confirm your password');
                $('#confirmPassword').addClass('error');
                isValid = false;
            } else if(password !== confirmPassword) {
                $('#confirmPasswordError').text('Passwords do not match');
                $('#confirmPassword').addClass('error');
                isValid = false;
            }
            
            return isValid;
        }
        
        $('#fullName').on('input', function() {
            if($(this).val().trim() !== '') {
                $('#fullNameError').text('');
                $(this).removeClass('error');
            }
        });
        
        $('#studentNumber').on('input', function() {
            let val = $(this).val().trim();
            if(val !== '' && !isNaN(val)) {
                $('#studentNumberError').text('');
                $(this).removeClass('error');
            } else if(val !== '' && isNaN(val)) {
                $('#studentNumberError').text('Student number must be numeric');
                $(this).addClass('error');
            }
        });
        
        $('#email').on('input', function() {
            let email = $(this).val().trim();
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(email !== '' && emailPattern.test(email)) {
                $('#emailError').text('');
                $(this).removeClass('error');
            } else if(email !== '') {
                $('#emailError').text('Invalid email format');
                $(this).addClass('error');
            }
        });
        
        $('#password').on('input', function() {
            let pwd = $(this).val();
            if(pwd.length >= 8) {
                $('#passwordError').text('');
                $(this).removeClass('error');
            } else if(pwd.length > 0) {
                $('#passwordError').text('Minimum 8 characters required');
                $(this).addClass('error');
            }
        });
        
        $('#confirmPassword').on('input', function() {
            let pwd = $('#password').val();
            let confirmPwd = $(this).val();
            if(confirmPwd === pwd && pwd !== '') {
                $('#confirmPasswordError').text('');
                $(this).removeClass('error');
            } else if(confirmPwd !== '') {
                $('#confirmPasswordError').text('Passwords do not match');
                $(this).addClass('error');
            }
        });
        
        $('#registrationForm').on('submit', function(e) {
            e.preventDefault();
            if(validateForm()) {
                let interestsRaw = $('#interests').val();
                let interestsArray = interestsRaw ? interestsRaw.split(',').map(i => i.trim()).filter(i => i !== '') : [];
                let userData = {
                    fullName: $('#fullName').val().trim(),
                    studentNumber: $('#studentNumber').val().trim(),
                    email: $('#email').val().trim(),
                    campus: $('#campus').val(),
                    bio: $('#bio').val().trim() || 'No bio provided yet.',
                    interests: interestsArray,
                    password: $('#password').val(),
                    registeredOn: new Date().toLocaleString()
                };
                localStorage.setItem('richfieldUser', JSON.stringify(userData));
                window.location.href = 'profile.html';
            }
        });
    }
    
    function requireUser() {
        if (!isUserRegistered() && (window.location.pathname.includes('profile.html') || window.location.pathname.includes('feed.html'))) {
            window.location.href = 'signup.html';
            return false;
        }
        return true;
    }
    requireUser();
    
    $('#toggleDetailsBtn').on('click', function() {
        $('.profile-details-extra').slideToggle(400);
    });
    
    $('#toggleHeroBtn').on('click', function() {
        $('.hero-details').slideToggle(300);
    });
    
    $('nav a').hover(
        function() {
            $(this).animate({ paddingLeft: '5px' }, 150);
        },
        function() {
            $(this).animate({ paddingLeft: '0px' }, 150);
        }
    );
    
    $('.feature-card').hover(
        function() {
            $(this).css('transform', 'scale(1.02)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
    
    function loadProfile() {
        let userDataStr = localStorage.getItem('richfieldUser');
        if(userDataStr) {
            let user = JSON.parse(userDataStr);
            let profileHtml = `
                <div class="profile-field">
                    <span class="profile-label">Full Name:</span> ${escapeHtml(user.fullName)}
                </div>
                <div class="profile-field">
                    <span class="profile-label">Student Number:</span> ${escapeHtml(user.studentNumber)}
                </div>
                <div class="profile-field">
                    <span class="profile-label">Email:</span> ${escapeHtml(user.email)}
                </div>
                <div class="profile-field">
                    <span class="profile-label">Campus:</span> ${escapeHtml(user.campus)}
                </div>
                <div class="profile-field">
                    <span class="profile-label">Bio:</span> ${escapeHtml(user.bio)}
                </div>
                <div class="profile-field">
                    <span class="profile-label">Interests:</span>
                    <div class="profile-interests-tags">
                        ${user.interests.length > 0 ? user.interests.map(i => `<span class="tag">${escapeHtml(i)}</span>`).join('') : '<span class="tag">No interests added</span>'}
                    </div>
                </div>
                <div class="profile-field">
                    <span class="profile-label">Member Since:</span> ${escapeHtml(user.registeredOn)}
                </div>
            `;
            $('#profileCard').html(profileHtml);
        } else {
            $('#profileCard').html(`<div class="profile-loading"><p>⚠️ No user profile found. Please <a href="signup.html">sign up</a> first.</p></div>`);
        }
    }
    
    function escapeHtml(str) {
        if(!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if(m === '&') return '&amp;';
            if(m === '<') return '&lt;';
            if(m === '>') return '&gt;';
            return m;
        });
    }
    
    if(window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});