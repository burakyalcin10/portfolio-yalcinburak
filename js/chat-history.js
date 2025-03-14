document.addEventListener('DOMContentLoaded', function() {
    const chatHistoryContainer = document.querySelector('.chat-history-container');

    // LocalStorage'dan sohbet geçmişini al
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
        
        if (history.length === 0) {
            chatHistoryContainer.innerHTML = '<p class="text-center">Henüz sohbet geçmişi bulunmuyor.</p>';
            return;
        }

        // Her sohbet oturumu için bir kart oluştur
        const historyHTML = history.map((session, index) => `
            <div class="chat-session card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Sohbet #${index + 1}</h5>
                    <span class="text-muted">${new Date(session.timestamp).toLocaleString()}</span>
                </div>
                <div class="card-body">
                    ${session.messages.map(msg => `
                        <div class="chat-message ${msg.role === 'user' ? 'user-message' : 'bot-message'}">
                            <div class="message-content">
                                ${msg.role === 'assistant' ? `
                                    <div class="bot-avatar">
                                        <i class="fas fa-robot"></i>
                                    </div>
                                ` : ''}
                                <div class="message-text">
                                    ${msg.role === 'assistant' ? '<div class="bot-name">Ateş</div>' : ''}
                                    ${msg.content}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        chatHistoryContainer.innerHTML = historyHTML;
    }

    // Sayfa yüklendiğinde sohbet geçmişini göster
    loadChatHistory();
}); 