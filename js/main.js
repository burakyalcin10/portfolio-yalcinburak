// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set dark theme as default
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        themeToggle.checked = currentTheme === 'dark';
    } else {
        // If no theme is saved, set dark theme as default
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.checked = true;
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // GitHub Projects functionality
    async function loadGitHubProjects() {
        const username = 'burakyalcin10';
        const container = document.getElementById('github-projects');
        
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
            const projects = await response.json();
            
            if (projects.length === 0) {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>No projects found.</p>
                    </div>`;
                return;
            }

            container.innerHTML = projects.map(project => createProjectCard(project)).join('');
            
        } catch (error) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error loading projects. Please try again later.</p>
                    <button class="retry-button" onclick="loadGitHubProjects()">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                </div>`;
        }
    }

    function createProjectCard(project) {
        const technologies = project.topics || [];
        const demoUrl = project.homepage;
        
        return `
            <div class="project-item">
                <div class="project-header">
                    <h4>${project.name}</h4>
                    <span class="duration">${new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <p>${project.description || 'No description available.'}</p>
                
                <div class="project-details">
                    <div class="tech-stack">
                        ${technologies.map(tech => `
                            <span class="tech-badge">
                                <i class="fas fa-code"></i> ${tech}
                            </span>
                        `).join('')}
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank" class="github-link">
                            <i class="fab fa-github"></i> View Source
                        </a>
                        ${demoUrl ? `
                            <a href="${demoUrl}" target="_blank" class="demo-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Load projects when modal opens
    const projectsCard = document.querySelector('.projects-card');
    if (projectsCard) {
        projectsCard.addEventListener('click', loadGitHubProjects);
    }

    // Medium Blog functionality
    async function loadMediumPosts() {
        const postsContainer = document.getElementById('medium-posts');
        if (!postsContainer) return;

        const username = 'burakyalcin.4510';
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;

        try {
            // Try to get from cache first
            const cachedPosts = localStorage.getItem('mediumPosts');
            if (cachedPosts) {
                displayBlogPosts(JSON.parse(cachedPosts));
            }

            // Fetch fresh data
            const response = await fetch(rssUrl);
            const data = await response.json();

            if (data.status === 'ok' && data.items.length > 0) {
                // Cache the results
                localStorage.setItem('mediumPosts', JSON.stringify(data.items));
                displayBlogPosts(data.items);
            }
        } catch (error) {
            console.error('Error:', error);
            postsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Error loading blog posts. Please try again later.
                </div>
            `;
        }
    }

    function displayBlogPosts(posts) {
        const postsContainer = document.getElementById('medium-posts');
        if (!postsContainer) return;

        const postsHtml = posts.map(post => {
            // Extract first image from content or use default
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            const firstImage = tempDiv.querySelector('img');
            const imageUrl = firstImage ? firstImage.src : 'https://via.placeholder.com/300x160';

            // Calculate reading time
            const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

            // Clean and truncate description
            const description = post.description
                .replace(/<[^>]*>/g, '')
                .split(' ')
                .slice(0, 30)
                .join(' ') + '...';

            return `
                <div class="blog-card" data-aos="fade-up">
                    <div class="blog-image">
                        <img src="${imageUrl}" alt="${post.title}">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span>
                                <i class="far fa-calendar"></i>
                                ${new Date(post.pubDate).toLocaleDateString()}
                            </span>
                            <span>
                                <i class="far fa-clock"></i>
                                ${readingTime} min read
                            </span>
                        </div>
                        <h3 class="blog-title">${post.title}</h3>
                        <p class="blog-excerpt">${description}</p>
                        <a href="${post.link}" target="_blank" class="blog-link">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        postsContainer.innerHTML = postsHtml;
    }

    // Load blog posts when modal opens
    const blogCard = document.querySelector('.blog-card');
    if (blogCard) {
        blogCard.addEventListener('click', loadMediumPosts);
    }

    // Modal functionality
    const cards = document.querySelectorAll('.card[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal when card is clicked
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Chatbot functionality
    async function initChatbot() {
        const chatContainer = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-message');

        // Hoş geldiniz mesajını göster
        appendMessage('bot', 'Merhaba! Ben Ateş, Burak\'ın kişisel AI asistanıyım. Burak\'ın projeleri, deneyimleri veya herhangi bir konuda size yardımcı olmaktan mutluluk duyarım. Ne hakkında konuşmak istersiniz?');

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing';
            typingDiv.innerHTML = `
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatContainer.appendChild(typingDiv);
            return typingDiv;
        }

        function removeTypingIndicator(element) {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        async function sendMessage(message) {
            // Kullanıcı mesajını göster
            appendMessage('user', message);

            // Yazıyor göstergesini göster
            const typingIndicator = showTypingIndicator();

            try {
                // Basit yanıt mantığı
                let response = '';
                const lowerMessage = message.toLowerCase();

                if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
                    response = 'Merhaba! Size nasıl yardımcı olabilirim?';
                }
                else if (lowerMessage.includes('proje')) {
                    response = 'Burak\'ın projeleri arasında TÜBİTAK 2209-A akıllı sulama sistemi, Fibonacci Catalan Kafes Yolları analizi ve Yapay Zeka Destekli Şarkı Sözü Senkronizasyon Oynatıcısı bulunuyor. Hangi proje hakkında daha detaylı bilgi almak istersiniz?';
                }
                else if (lowerMessage.includes('deneyim') || lowerMessage.includes('iş')) {
                    response = 'Burak şu anda T3 Vakfı\'nda Eğitmen ve Mentor olarak, HUAWEI Student Developers\'da Başkan Yardımcısı olarak, ve 3Y (Akdeniz Yazılım, Yapay Zeka ve Yaratıcılık Topluluğu)\'de Yönetim Kurulu Başkanı olarak görev yapıyor. Ayrıca BİLMÖK ve UBMK gibi önemli organizasyonlarda da aktif rol alıyor.';
                }
                else if (lowerMessage.includes('eğitim')) {
                    response = 'Burak, Akdeniz Üniversitesi\'nde Bilgisayar Mühendisliği bölümünde lisans eğitimine devam ediyor. Şu anki GPA\'si 3.50.';
                }
                else if (lowerMessage.includes('beceri') || lowerMessage.includes('yetenek')) {
                    response = 'Burak\'ın temel becerileri arasında Python ile bilimsel hesaplama ve yapay zeka geliştirme, Java ile nesne yönelimli programlama, ve web teknolojilerinde HTML, CSS, Angular bulunuyor. Ayrıca yapay zeka prompt mühendisliği ve grafik tasarım konularında da deneyimi var.';
                }
                else if (lowerMessage.includes('iletişim') || lowerMessage.includes('contact')) {
                    response = 'Burak ile iletişime geçmek için burakyalcin.4510@gmail.com adresine email atabilir veya LinkedIn ve GitHub profillerini ziyaret edebilirsiniz.';
                }
                else {
                    response = 'Üzgünüm, bu konuda net bir bilgim yok. Burak\'ın projeleri, deneyimleri, eğitimi veya becerileri hakkında sorular sorabilirsiniz.';
                }

                // Kısa bir gecikme ekle
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Yazıyor göstergesini kaldır ve yanıtı göster
                removeTypingIndicator(typingIndicator);
                appendMessage('bot', response);

            } catch (error) {
                console.error('Error:', error);
                removeTypingIndicator(typingIndicator);
                appendMessage('bot', 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }

        function appendMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot') {
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="bot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-text">
                            <div class="bot-name">Ateş</div>
                            ${message}
                        </div>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">
                            ${message}
                        </div>
                    </div>
                `;
            }
            
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        // Event listeners
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && messageInput.value.trim() !== '') {
                const message = messageInput.value.trim();
                messageInput.value = '';
                sendMessage(message);
            }
        });

        sendButton.addEventListener('click', () => {
            if (messageInput.value.trim() !== '') {
                const message = messageInput.value.trim();
                messageInput.value = '';
                sendMessage(message);
            }
        });
    }

    // ChatBot modal açıldığında chatbot'u başlat
    const chatbotCard = document.querySelector('.chatbot-card');
    if (chatbotCard) {
        chatbotCard.addEventListener('click', initChatbot);
    }
});

// Modal functions
function openModal(modal) {
    modal.style.display = 'flex';
    // Trigger reflow
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.canvas = document.getElementById('mouseTrail');
        this.ctx = this.canvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.radius = 300;
        this.maxOpacity = 0.3;
        this.easing = 0.08;
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    getThemeColor() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        return isDark ? [0, 184, 148] : [0, 150, 120];
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const dx = this.targetX - this.mouseX;
        const dy = this.targetY - this.mouseY;
        
        this.mouseX += dx * this.easing;
        this.mouseY += dy * this.easing;
        
        const gradient = this.ctx.createRadialGradient(
            this.mouseX, this.mouseY, 0,
            this.mouseX, this.mouseY, this.radius
        );
        
        const [r, g, b] = this.getThemeColor();
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity})`);
        gradient.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity * 0.8})`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity * 0.4})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity * 0.2})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity * 0.1})`);
        gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0)`);
        
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize mouse trail when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MouseTrail();
}); 