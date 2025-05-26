
let users = [];
let posts = [];
let comments = [];
let currentUser = null;


const API_BASE = 'https://jsonplaceholder.typicode.com';
const USERS_API = `${API_BASE}/users`;
const POSTS_API = `${API_BASE}/posts`;
const COMMENTS_API = `${API_BASE}/comments`;


const userSelect = document.getElementById('userSelect');
const profileName = document.getElementById('profileName');
const profileUsername = document.getElementById('profileUsername');
const profileWebsite = document.getElementById('profileWebsite');
const profileBio = document.getElementById('profileBio');
const profileLocation = document.getElementById('profileLocation');
const postsContainer = document.getElementById('postsContainer');
const commentsContainer = document.getElementById('commentsContainer');


document.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();
    setupEventListeners();
    
    if (users.length > 0) {
        await loadUserData(users[0]);
    }
});


function setupEventListeners() {
    userSelect.addEventListener('change', async (e) => {
        const userId = parseInt(e.target.value);
        if (userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                await loadUserData(user);
            }
        }
    });
}


async function loadUsers() {
    try {
        showLoading(postsContainer);
        showLoading(commentsContainer);
        
        const response = await fetch(USERS_API);
        users = await response.json();
        
        populateUserSelect();
    } catch (error) {
        console.error('Error loading users:', error);
        showError(postsContainer, 'Failed to load users');
        showError(commentsContainer, 'Failed to load users');
    }
}


function populateUserSelect() {
    userSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}


async function loadUserData(user) {
    currentUser = user;
    userSelect.value = user.id;
    
    updateProfile(user);
    await loadUserPosts(user.id);
    await loadUserComments(user.id);
}


function updateProfile(user) {
    profileName.textContent = user.name;
    profileUsername.textContent = `@${user.username}`;
    profileWebsite.textContent = user.website;
    profileBio.textContent = user.company.catchPhrase;
    profileLocation.textContent = user.address.city;
}


async function loadUserPosts(userId) {
    try {
        showLoading(postsContainer);
        
        const response = await fetch(`${POSTS_API}?userId=${userId}`);
        const userPosts = await response.json();
        
        renderPosts(userPosts);
    } catch (error) {
        console.error('Error loading posts:', error);
        showError(postsContainer, 'Failed to load posts');
    }
}


async function loadUserComments(userId) {
    try {
        showLoading(commentsContainer);
        
        
        const response = await fetch(COMMENTS_API);
        const allComments = await response.json();
        
        
        const userComments = allComments.filter(comment => 
            comment.email.toLowerCase() === currentUser.email.toLowerCase()
        );
        
        
        const commentsToShow = userComments.length > 0 ? userComments : allComments.slice(0, 5);
        
        renderComments(commentsToShow);
    } catch (error) {
        console.error('Error loading comments:', error);
        showError(commentsContainer, 'Failed to load comments');
    }
}


function renderPosts(posts) {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-content">No posts available</div>';
        return;
    }
    
    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <img src="images/profile.jpg" alt="Profile" class="post-avatar">
            <div class="post-content">
                <div class="post-header">
                    <span class="post-name">${currentUser.name}</span>
                    <span class="post-username">@${currentUser.username}</span>
                    <i class="fas fa-check-circle verified-badge"></i>
                    <i class="fab fa-twitter verified-badge"></i>
                </div>
                <div class="post-text">${post.body}</div>
                <div class="post-actions">
                    <div class="action-item">
                        <i class="far fa-comment"></i>
                        <span>200</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-retweet"></i>
                        <span>200</span>
                    </div>
                    <div class="action-item">
                        <i class="far fa-heart"></i>
                        <span>200</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


function renderComments(comments) {
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<div class="no-content">No comments available</div>';
        return;
    }
    
    commentsContainer.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <img src="images/profile.jpg" alt="Profile" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-name">${comment.name}</span>
                    <i class="fas fa-check-circle verified-badge"></i>
                    <i class="fab fa-twitter verified-badge"></i>
                    <span class="comment-email">${comment.email}</span>
                </div>
                <div class="comment-text">${comment.body}</div>
                <div class="comment-actions">
                    <div class="comment-action">
                        <i class="far fa-comment"></i>
                        <span>0</span>
                    </div>
                    <div class="comment-action">
                        <i class="fas fa-retweet"></i>
                        <span>0</span>
                    </div>
                    <div class="comment-action">
                        <i class="far fa-heart"></i>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}


function showError(container, message) {
    container.innerHTML = `<div class="error">${message}</div>`;
}


function addInteractivity() {
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-item') || e.target.closest('.comment-action')) {
            const actionElement = e.target.closest('.action-item') || e.target.closest('.comment-action');
            const countElement = actionElement.querySelector('span');
            let count = parseInt(countElement.textContent);
            
            
            if (actionElement.classList.contains('active')) {
                count = Math.max(0, count - 1);
                actionElement.classList.remove('active');
            } else {
                count += 1;
                actionElement.classList.add('active');
            }
            
            countElement.textContent = count;
        }
    });
}


document.addEventListener('DOMContentLoaded', addInteractivity);