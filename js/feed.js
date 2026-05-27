$(document).ready(function() {
    
    function isUserRegistered() {
        return localStorage.getItem('richfieldUser') !== null;
    }
    
    if (!isUserRegistered()) {
        window.location.href = 'signup.html';
        return;
    }
    
    let posts = [];
    
    function loadPostsFromStorage() {
        let storedPosts = localStorage.getItem('richfieldPosts');
        if(storedPosts) {
            posts = JSON.parse(storedPosts);
        } else {
            posts = [];
        }
        renderFeed();
    }
    
    function savePostsToStorage() {
        localStorage.setItem('richfieldPosts', JSON.stringify(posts));
    }
    
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('richfieldUser'));
    }
    
    function renderFeed() {
        let $feedContainer = $('#feedContainer');
        
        if(posts.length === 0) {
            $feedContainer.html('<div class="feed-loading">No posts yet. Be the first to create a post!</div>');
            return;
        }
        
        $feedContainer.empty();
        let sortedPosts = [...posts].reverse();
        
        sortedPosts.forEach(post => {
            let $postCard = $(`
                <div class="post-card" data-post-id="${post.id}">
                    <div class="post-header">
                        <span class="post-username">${escapeHtml(post.username)}</span>
                        <span class="post-date">${escapeHtml(post.timestamp)}</span>
                    </div>
                    <div class="post-content">${escapeHtml(post.content)}</div>
                    <div class="post-actions">
                        <button class="like-btn ${post.liked ? 'liked' : ''}">❤️ Like</button>
                        <span class="like-count">${post.likes} ${post.likes === 1 ? 'like' : 'likes'}</span>
                        <button class="delete-btn">🗑️ Delete</button>
                    </div>
                </div>
            `);
            $feedContainer.append($postCard);
            $postCard.hide().fadeIn(400);
        });
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
    
    function createNewPost(content) {
        let user = getCurrentUser();
        if(!user) {
            alert('Please sign up to continue.');
            window.location.href = 'signup.html';
            return false;
        }
        if(content.trim() === '') {
            alert('Post content cannot be empty.');
            return false;
        }
        let newPost = {
            id: Date.now(),
            username: user.fullName,
            studentNumber: user.studentNumber,
            content: content.trim(),
            timestamp: new Date().toLocaleString(),
            likes: 0,
            liked: false
        };
        posts.unshift(newPost);
        savePostsToStorage();
        renderFeed();
        return true;
    }
    
    function toggleLike(postId) {
        let post = posts.find(p => p.id === postId);
        if(post) {
            if(post.liked) {
                post.likes--;
                post.liked = false;
            } else {
                post.likes++;
                post.liked = true;
            }
            savePostsToStorage();
            let $postCard = $(`.post-card[data-post-id="${postId}"]`);
            $postCard.find('.like-count').text(`${post.likes} ${post.likes === 1 ? 'like' : 'likes'}`);
            let $likeBtn = $postCard.find('.like-btn');
            $likeBtn.toggleClass('liked');
            $likeBtn.css('transform', 'scale(1.1)');
            setTimeout(() => $likeBtn.css('transform', 'scale(1)'), 150);
        }
    }
    
    function deletePost(postId) {
        if(confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            posts = posts.filter(p => p.id !== postId);
            savePostsToStorage();
            let $postCard = $(`.post-card[data-post-id="${postId}"]`);
            $postCard.fadeOut(300, function() {
                $(this).remove();
                if(posts.length === 0) renderFeed();
            });
        }
    }
    
    $('#feedContainer').on('click', '.like-btn', function() {
        let postId = parseInt($(this).closest('.post-card').data('post-id'));
        toggleLike(postId);
    });
    
    $('#feedContainer').on('click', '.delete-btn', function() {
        let postId = parseInt($(this).closest('.post-card').data('post-id'));
        deletePost(postId);
    });
    
    $('#postBtn').on('click', function() {
        let content = $('#postContent').val();
        if(createNewPost(content)) {
            $('#postContent').val('');
            $('#postBtn').css('background-color', '#28a745');
            setTimeout(() => $('#postBtn').css('background-color', '#003366'), 500);
        }
    });
    
    $('#postContent').on('keydown', function(e) {
        if((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
            $('#postBtn').click();
        }
    });
    
    loadPostsFromStorage();
    
    setTimeout(() => {
        let user = getCurrentUser();
        if(posts.length === 0 && user) {
            let samplePost = {
                id: Date.now(),
                username: user.fullName,
                studentNumber: user.studentNumber,
                content: "Hello everyone! I'm excited to be part of Richfield Connect. Looking forward to collaborating with all of you! 🎓",
                timestamp: new Date().toLocaleString(),
                likes: 0,
                liked: false
            };
            posts.push(samplePost);
            savePostsToStorage();
            renderFeed();
        }
    }, 100);
});