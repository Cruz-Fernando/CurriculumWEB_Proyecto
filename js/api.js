// ==========================================
// API INTEGRATIONS - GitHub & LinkedIn
// ==========================================

// Configuration - UPDATE THESE WITH YOUR INFORMATION
const API_CONFIG = {
    github: {
        username: 'Cruz-Fernando', // Tu usuario de GitHub
        token: null // Optional: Add personal access token for higher rate limits
    },
    linkedin: {
        profileUrl: 'https://linkedin.com/in/jhojan-fernando-cruz-bulla' // Tu perfil de LinkedIn
    }
};

// ==========================================
// GITHUB API INTEGRATION
// ==========================================
class GitHubAPI {
    constructor(username) {
        this.username = username;
        this.baseUrl = 'https://api.github.com';
        this.cache = {
            user: null,
            repos: null,
            timestamp: null
        };
    }

    async fetchUserData() {
        try {
            // Check cache (valid for 5 minutes)
            if (this.cache.user && this.cache.timestamp &&
                Date.now() - this.cache.timestamp < 5 * 60 * 1000) {
                return this.cache.user;
            }

            const response = await fetch(`${this.baseUrl}/users/${this.username}`);

            if (!response.ok) {
                throw new Error('Usuario no encontrado');
            }

            const data = await response.json();
            this.cache.user = data;
            this.cache.timestamp = Date.now();

            return data;
        } catch (error) {
            console.error('Error fetching GitHub user:', error);
            return null;
        }
    }

    async fetchRepositories(limit = 6) {
        try {
            const response = await fetch(
                `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=${limit}`
            );

            if (!response.ok) {
                throw new Error('Error al obtener repositorios');
            }

            const data = await response.json();
            this.cache.repos = data;

            return data;
        } catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    }

    async displayStats() {
        const container = document.getElementById('github-content');

        if (!container) return;

        container.innerHTML = '<p style="color: var(--color-accent-gold);">Cargando estadísticas de GitHub...</p>';

        const userData = await this.fetchUserData();
        const repos = await this.fetchRepositories();

        if (!userData) {
            container.innerHTML = `
                <p style="color: #ff4444;">
                    ⚠️ No se pudieron cargar las estadísticas de GitHub.<br>
                    <small>Actualiza tu usuario en js/api.js</small>
                </p>
            `;
            return;
        }

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <p style="color: var(--color-accent-gold); font-size: 0.9rem;">Repositorios Públicos</p>
                    <p style="font-size: 2rem; font-weight: 700; color: var(--color-primary-gold);">
                        ${userData.public_repos}
                    </p>
                </div>
                <div>
                    <p style="color: var(--color-accent-gold); font-size: 0.9rem;">Seguidores</p>
                    <p style="font-size: 2rem; font-weight: 700; color: var(--color-primary-gold);">
                        ${userData.followers}
                    </p>
                </div>
                <div>
                    <p style="color: var(--color-accent-gold); font-size: 0.9rem;">Siguiendo</p>
                    <p style="font-size: 2rem; font-weight: 700; color: var(--color-primary-gold);">
                        ${userData.following}
                    </p>
                </div>
            </div>
            
            <div style="text-align: left; margin-top: 1.5rem;">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 1rem;">
                    📚 Repositorios Recientes
                </h4>
                <div id="github-repos" style="display: grid; gap: 0.75rem;">
                    ${this.renderRepositories(repos)}
                </div>
                <a href="https://github.com/${this.username}" target="_blank" 
                   class="btn btn-secondary mt-md" style="display: inline-block;">
                    Ver Perfil Completo en GitHub →
                </a>
            </div>
        `;
    }

    renderRepositories(repos) {
        if (!repos || repos.length === 0) {
            return '<p>No hay repositorios disponibles</p>';
        }

        return repos.map(repo => `
            <div style="background: rgba(0, 0, 0, 0.3); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-primary-gold); transition: all 0.3s ease;" 
                 onmouseover="this.style.background='rgba(255, 215, 0, 0.1)'; this.style.transform='translateX(5px)';"
                 onmouseout="this.style.background='rgba(0, 0, 0, 0.3)'; this.style.transform='translateX(0)';">
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
                    <div style="flex: 1;">
                        <a href="${repo.html_url}" target="_blank" 
                           style="color: var(--color-primary-gold); text-decoration: none; font-weight: 600; font-size: 1.05rem;">
                            📁 ${repo.name}
                        </a>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-off-white);">
                            ${repo.description || 'Sin descripción'}
                        </p>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.85rem; color: var(--color-accent-gold);">
                            ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🔀 ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================
// LINKEDIN INTEGRATION
// ==========================================
class LinkedInIntegration {
    constructor(profileUrl) {
        this.profileUrl = profileUrl;
    }

    createProfileBadge() {
        // LinkedIn doesn't have a simple public API, so we'll create a custom badge
        const container = document.createElement('div');
        container.className = 'glass-card';
        container.style.cssText = `
            max-width: 400px;
            margin: 2rem auto;
            padding: 2rem;
            text-align: center;
        `;

        container.innerHTML = `
            <h3 style="color: var(--color-primary-gold); margin-bottom: 1rem;">
                💼 Conéctate en LinkedIn
            </h3>
            <p style="margin-bottom: 1.5rem;">
                Visita mi perfil profesional en LinkedIn para ver mi experiencia completa,
                recomendaciones y red profesional.
            </p>
            <a href="${this.profileUrl}" target="_blank" 
               class="btn btn-primary" 
               style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fab fa-linkedin"></i>
                Ver Perfil en LinkedIn
            </a>
        `;

        return container;
    }

    addShareButton(title, description) {
        // Create LinkedIn share button
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

        const button = document.createElement('a');
        button.href = shareUrl;
        button.target = '_blank';
        button.className = 'btn btn-secondary';
        button.innerHTML = '<i class="fab fa-linkedin"></i> Compartir en LinkedIn';

        return button;
    }
}

// ==========================================
// SOCIAL MEDIA INTEGRATIONS
// ==========================================
class SocialMediaManager {
    constructor() {
        this.platforms = {
            github: null,
            linkedin: null
        };
    }

    initialize() {
        // Initialize GitHub
        this.platforms.github = new GitHubAPI(API_CONFIG.github.username);
        this.platforms.github.displayStats();

        // Initialize LinkedIn
        this.platforms.linkedin = new LinkedInIntegration(API_CONFIG.linkedin.profileUrl);
    }

    updateSocialLinks() {
        // Update social links in footer/contact section
        const githubLinks = document.querySelectorAll('a[href*="github.com"]');
        githubLinks.forEach(link => {
            if (link.href.includes('tuusuario')) {
                link.href = `https://github.com/${API_CONFIG.github.username}`;
            }
        });

        const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
        linkedinLinks.forEach(link => {
            if (link.href.includes('tuusuario')) {
                link.href = API_CONFIG.linkedin.profileUrl;
            }
        });
    }
}

// ==========================================
// CONTACT FORM WITH EMAIL.JS (Optional)
// ==========================================
class EmailService {
    constructor() {
        // To use EmailJS, sign up at https://www.emailjs.com/
        this.serviceID = 'your_service_id'; // ← Replace with your EmailJS service ID
        this.templateID = 'your_template_id'; // ← Replace with your EmailJS template ID
        this.userID = 'your_user_id'; // ← Replace with your EmailJS user ID
    }

    async sendEmail(formData) {
        // This is a placeholder for EmailJS integration
        // Uncomment and configure if you want to use EmailJS

        /*
        try {
            const response = await emailjs.send(
                this.serviceID,
                this.templateID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message
                },
                this.userID
            );
            return { success: true, response };
        } catch (error) {
            return { success: false, error };
        }
        */

        // For now, just log to console
        console.log('Email would be sent:', formData);
        return { success: true, message: 'Email simulation successful' };
    }
}

// ==========================================
// ANALYTICS & TRACKING (Optional)
// ==========================================
class Analytics {
    constructor() {
        this.events = [];
    }

    trackPageView(page) {
        this.events.push({
            type: 'pageview',
            page: page,
            timestamp: new Date()
        });
        console.log(`Page view tracked: ${page}`);
    }

    trackEvent(category, action, label) {
        this.events.push({
            type: 'event',
            category: category,
            action: action,
            label: label,
            timestamp: new Date()
        });
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }

    trackGamePlayed(gameName) {
        this.trackEvent('Games', 'Play', gameName);
    }

    trackContactFormSubmit() {
        this.trackEvent('Contact', 'Submit', 'Contact Form');
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Social Media Manager
    const socialManager = new SocialMediaManager();
    socialManager.initialize();
    socialManager.updateSocialLinks();

    // Initialize Analytics (optional)
    const analytics = new Analytics();
    analytics.trackPageView(window.location.pathname);

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = Math.floor(scrollPercent / 25) * 25;
            if (maxScroll > 0) {
                analytics.trackEvent('Engagement', 'Scroll Depth', `${maxScroll}%`);
            }
        }
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Detect if user is on mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 Copiado al portapapeles!', 'success');
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}

// Show notification helper
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--gradient-gold)' : type === 'error' ? '#ff4444' : 'var(--color-glass-overlay)'};
        color: ${type === 'success' || type === 'error' ? 'var(--color-background-dark)' : 'var(--color-white)'};
        border-radius: 10px;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        backdrop-filter: blur(10px);
        border: 2px solid var(--color-glass-border);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.GitHubAPI = GitHubAPI;
    window.showNotification = showNotification;
    window.copyToClipboard = copyToClipboard;
}
