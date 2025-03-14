class ChatBot {
    constructor() {
        this.chatContainer = document.querySelector('#chat-messages');
        this.messageInput = document.querySelector('#message-input');
        this.sendButton = document.querySelector('#send-message');
        
        this.personalInfo = {
            name: 'Burak Yalçın',
            instagram: 'burakyalciinn_',
            role: 'Bilgisayar Mühendisi',
            university: 'Akdeniz Üniversitesi',
            interests: ['Yapay Zeka', 'Web Geliştirme', 'Mobil Uygulama Geliştirme'],
            projects: [
                'Kişisel Web Sitesi',
                'Yapay Zeka Destekli Chatbot',
                'E-ticaret Platformu',
                'Mobil Fitness Uygulaması'
            ]
        };

        this.initialize();
    }

    initialize() {
        this.sendButton.addEventListener('click', () => this.handleUserMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });

        this.appendMessage('bot', 'Merhaba! Ben Ateş, Burak\'ın kişisel AI asistanıyım. Size nasıl yardımcı olabilirim?');
    }

    async handleUserMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.messageInput.value = '';
        this.appendMessage('user', message);
        this.showTypingIndicator();

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('API yanıt vermedi');
            }

            const data = await response.json();
            this.appendMessage('bot', data.response);
        } catch (error) {
            console.error('Error:', error);
            this.appendMessage('bot', 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            this.hideTypingIndicator();
        }
    }

    appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
        
        if (sender === 'bot') {
            const avatar = document.createElement('img');
            avatar.src = 'assets/ates-avatar.png';
            avatar.alt = 'Ateş Avatar';
            avatar.classList.add('bot-avatar');
            messageDiv.appendChild(avatar);
        }

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;
        messageDiv.appendChild(messageContent);

        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        this.chatContainer.appendChild(typingDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Chatbot'u başlat
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
}); 