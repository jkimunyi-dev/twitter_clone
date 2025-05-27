var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var users = [];
var posts = [];
var comments = [];
var currentUser = null;
var API_BASE = 'https://jsonplaceholder.typicode.com';
var USERS_API = "".concat(API_BASE, "/users");
var POSTS_API = "".concat(API_BASE, "/posts");
var COMMENTS_API = "".concat(API_BASE, "/comments");
var userSelect = document.getElementById('userSelect');
var profileName = document.getElementById('profileName');
var profileUsername = document.getElementById('profileUsername');
var profileWebsite = document.getElementById('profileWebsite');
var profileBio = document.getElementById('profileBio');
var profileLocation = document.getElementById('profileLocation');
var postsContainer = document.getElementById('postsContainer');
var commentsContainer = document.getElementById('commentsContainer');
document.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadUsers()];
            case 1:
                _a.sent();
                setupEventListeners();
                if (!(users.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, loadUserData(users[0])];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function setupEventListeners() {
    var _this = this;
    userSelect.addEventListener('change', function (e) { return __awaiter(_this, void 0, void 0, function () {
        var target, userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = e.target;
                    userId = parseInt(target.value);
                    if (!userId) return [3 /*break*/, 2];
                    user = users.find(function (u) { return u.id === userId; });
                    if (!user) return [3 /*break*/, 2];
                    return [4 /*yield*/, loadUserData(user)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
}
function loadUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    showLoading(postsContainer);
                    showLoading(commentsContainer);
                    return [4 /*yield*/, fetch(USERS_API)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    users = (_a.sent());
                    populateUserSelect();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error loading users:', error_1);
                    showError(postsContainer, 'Failed to load users');
                    showError(commentsContainer, 'Failed to load users');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function populateUserSelect() {
    userSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach(function (user) {
        var option = document.createElement('option');
        option.value = user.id.toString();
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}
function loadUserData(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = user;
                    userSelect.value = user.id.toString();
                    updateProfile(user);
                    return [4 /*yield*/, loadUserPosts(user.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, loadUserComments(user.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateProfile(user) {
    profileName.textContent = user.name;
    profileUsername.textContent = "@".concat(user.username);
    profileWebsite.textContent = user.website;
    profileBio.textContent = user.company.catchPhrase;
    profileLocation.textContent = user.address.city;
}
function loadUserPosts(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, userPosts, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    showLoading(postsContainer);
                    return [4 /*yield*/, fetch("".concat(POSTS_API, "?userId=").concat(userId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    userPosts = _a.sent();
                    renderPosts(userPosts);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error loading posts:', error_2);
                    showError(postsContainer, 'Failed to load posts');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadUserComments(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, allComments, userComments, commentsToShow, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    showLoading(commentsContainer);
                    return [4 /*yield*/, fetch(COMMENTS_API)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    allComments = _a.sent();
                    userComments = allComments.filter(function (comment) {
                        return comment.email.toLowerCase() === currentUser.email.toLowerCase();
                    });
                    commentsToShow = userComments.length > 0 ? userComments : allComments.slice(0, 5);
                    renderComments(commentsToShow);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error loading comments:', error_3);
                    showError(commentsContainer, 'Failed to load comments');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderPosts(posts) {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-content">No posts available</div>';
        return;
    }
    postsContainer.innerHTML = posts.map(function (post) { return "\n        <div class=\"post-card\">\n            <img src=\"images/profile.jpg\" alt=\"Profile\" class=\"post-avatar\">\n            <div class=\"post-content\">\n                <div class=\"post-header\">\n                    <span class=\"post-name\">".concat(currentUser.name, "</span>\n                    <span class=\"post-username\">@").concat(currentUser.username, "</span>\n                    <i class=\"fas fa-check-circle verified-badge\"></i>\n                    <i class=\"fab fa-twitter verified-badge\"></i>\n                </div>\n                <div class=\"post-text\">").concat(post.body, "</div>\n                <div class=\"post-actions\">\n                    <div class=\"action-item\">\n                        <i class=\"far fa-comment\"></i>\n                        <span>200</span>\n                    </div>\n                    <div class=\"action-item\">\n                        <i class=\"fas fa-retweet\"></i>\n                        <span>200</span>\n                    </div>\n                    <div class=\"action-item\">\n                        <i class=\"far fa-heart\"></i>\n                        <span>200</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "); }).join('');
}
function renderComments(comments) {
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<div class="no-content">No comments available</div>';
        return;
    }
    commentsContainer.innerHTML = comments.map(function (comment) { return "\n        <div class=\"comment-card\">\n            <img src=\"images/profile.jpg\" alt=\"Profile\" class=\"comment-avatar\">\n            <div class=\"comment-content\">\n                <div class=\"comment-header\">\n                    <span class=\"comment-name\">".concat(comment.name, "</span>\n                    <i class=\"fas fa-check-circle verified-badge\"></i>\n                    <i class=\"fab fa-twitter verified-badge\"></i>\n                    <span class=\"comment-email\">").concat(comment.email, "</span>\n                </div>\n                <div class=\"comment-text\">").concat(comment.body, "</div>\n                <div class=\"comment-actions\">\n                    <div class=\"comment-action\">\n                        <i class=\"far fa-comment\"></i>\n                        <span>0</span>\n                    </div>\n                    <div class=\"comment-action\">\n                        <i class=\"fas fa-retweet\"></i>\n                        <span>0</span>\n                    </div>\n                    <div class=\"comment-action\">\n                        <i class=\"far fa-heart\"></i>\n                        <span>0</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "); }).join('');
}
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}
function showError(container, message) {
    container.innerHTML = "<div class=\"error\">".concat(message, "</div>");
}
function addInteractivity() {
    document.addEventListener('click', function (e) {
        var target = e.target;
        var actionElement = target.closest('.action-item') || target.closest('.comment-action');
        if (actionElement) {
            var countElement = actionElement.querySelector('span');
            var count = parseInt(countElement.textContent || '0');
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
