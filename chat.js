class AIChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendMessage');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessageToChat('user', message);
        this.userInput.value = '';
        
        // Add permanent typing indicator
        this.addTypingIndicator();
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addMessageToChat(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        let messageHTML = '';
        if (type === 'ai') {
            messageHTML = `
                <div class="avatar">
                    <i class="fas fa-robot"></i>
                </div>
            `;
        }
        
        messageHTML += `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messageDiv.innerHTML = messageHTML;
        this.chatMessages.appendChild(messageDiv);
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
    }
}

// Initialize the chat when the page loads
window.addEventListener('load', () => {
    new AIChat();
});

function scrollToChat() {
    const chatSection = document.getElementById('chat-interface');
    chatSection.scrollIntoView({ behavior: 'smooth' });
}

// Update the nav links click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Handle all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 