"use strict";
let users = [];
let posts = [];
let comments = [];
let currentUser = null;
let selectedPostId = null;
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
    await loadAllComments(); // Load all comments once
    setupEventListeners();
    if (users.length > 0) {
        await loadUserData(users[0]);
    }
});
function setupEventListeners() {
    userSelect.addEventListener('change', async (e) => {
        const target = e.target;
        const userId = parseInt(target.value);
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
    }
    catch (error) {
        console.error('Error loading users:', error);
        showError(postsContainer, 'Failed to load users');
        showError(commentsContainer, 'Failed to load users');
    }
}
async function loadAllComments() {
    try {
        const response = await fetch(COMMENTS_API);
        comments = await response.json();
    }
    catch (error) {
        console.error('Error loading comments:', error);
    }
}
function populateUserSelect() {
    userSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id.toString();
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}
async function loadUserData(user) {
    currentUser = user;
    userSelect.value = user.id.toString();
    selectedPostId = null; // Reset selected post
    updateProfile(user);
    await loadUserPosts(user.id);
    showInitialCommentsMessage();
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
        posts = userPosts; // Store posts for reference
        renderPosts(userPosts);
    }
    catch (error) {
        console.error('Error loading posts:', error);
        showError(postsContainer, 'Failed to load posts');
    }
}
function showInitialCommentsMessage() {
    commentsContainer.innerHTML = '<div class="no-content">Click on a post to view its comments</div>';
}
function loadPostComments(postId) {
    selectedPostId = postId;
    try {
        showLoading(commentsContainer);
        // Filter comments for the selected post
        const postComments = comments.filter(comment => comment.postId === postId);
        if (postComments.length > 0) {
            renderComments(postComments);
        }
        else {
            commentsContainer.innerHTML = '<div class="no-content">No comments available for this post</div>';
        }
    }
    catch (error) {
        console.error('Error loading post comments:', error);
        showError(commentsContainer, 'Failed to load comments');
    }
}
function renderPosts(posts) {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-content">No posts available</div>';
        return;
    }
    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card" data-post-id="${post.id}" style="cursor: pointer;">
            <img src="images/profile.png" alt="Profile" class="post-avatar">
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
                        <span>${comments.filter(c => c.postId === post.id).length}</span>
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
            <img src="images/profile.png" alt="Profile" class="comment-avatar">
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
        const target = e.target;
        // Handle post clicks
        const postCard = target.closest('.post-card');
        if (postCard) {
            const postId = parseInt(postCard.getAttribute('data-post-id') || '0');
            if (postId) {
                // Add visual feedback for selected post
                document.querySelectorAll('.post-card').forEach(card => {
                    card.classList.remove('selected');
                });
                postCard.classList.add('selected');
                loadPostComments(postId);
                return; // Don't process action items if we clicked on the post
            }
        }
        // Handle action item clicks (like, retweet, etc.)
        const actionElement = target.closest('.action-item') || target.closest('.comment-action');
        if (actionElement) {
            e.stopPropagation(); // Prevent post click when clicking action items
            const countElement = actionElement.querySelector('span');
            let count = parseInt(countElement.textContent || '0');
            if (actionElement.classList.contains('active')) {
                count = Math.max(0, count - 1);
                actionElement.classList.remove('active');
            }
            else {
                count += 1;
                actionElement.classList.add('active');
            }
            countElement.textContent = count.toString();
        }
    });
}
document.addEventListener('DOMContentLoaded', addInteractivity);
