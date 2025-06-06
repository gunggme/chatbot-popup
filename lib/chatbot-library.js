/**
 * ChatBot Popup Library
 * 채널톡 스타일의 채팅봇 팝업 라이브러리
 */

(function() {
  'use strict';

  // 전역 설정
  let config = {
    apiBaseUrl: 'https://llm-ai.pah.kr/api/chat',
    profileId: "f096c12a-f877-49b3-a01c-dbc734853eea",
    position: 'bottom-right',
    theme: {
      primaryColor: '#F1D302',
      secondaryColor: '#4E3629',
      backgroundColor: '#FFFFFF'
    }
  };

  // 현재 상태
  let state = {
    isOpen: false,
    currentRoom: null,
    messages: [],
    isLoading: false,
    typingMessageId: null,
    nextId: 1
  };

  // API 서비스
  const apiService = {
    async createRoom() {
      const response = await fetch(`${config.apiBaseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId: config.profileId }),
      });

      if (!response.ok) {
        throw new Error('방 생성 실패');
      }

      return await response.json();
    },

    async getRoomChats(roomId) {
      const response = await fetch(`${config.apiBaseUrl}/rooms/${roomId}/messages`);
      return await response.json();
    },

    async sendMessage(chatroomId, message) {
      const response = await fetch(`${config.apiBaseUrl}/rooms/${chatroomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      return await response.json();
    }
  };

  // 유틸리티 함수
  const utils = {
    createElement(tag, className, innerHTML) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
    },

    formatTime() {
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },

    escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },

    // 간단한 마크다운 파서
    parseMarkdown(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
        .replace(/\n/g, '<br>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }
  };

  // 타이핑 효과 클래스
  class TypewriterEffect {
    constructor(container, content, onComplete) {
      this.container = container;
      this.content = content;
      this.onComplete = onComplete;
      this.currentIndex = 0;
      this.isTyping = true;
      this.start();
    }

    start() {
      this.container.innerHTML = '';
      this.typeNextChunk();
    }

    typeNextChunk() {
      if (this.currentIndex >= this.content.length) {
        this.isTyping = false;
        this.container.innerHTML = utils.parseMarkdown(this.content);
        if (this.onComplete) this.onComplete();
        return;
      }

      const chunkSize = Math.floor(Math.random() * 3) + 4;
      const nextIndex = Math.min(this.currentIndex + chunkSize, this.content.length);
      const nextChunk = this.content.substring(this.currentIndex, nextIndex);
      
      this.container.textContent += nextChunk;
      this.currentIndex = nextIndex;

      const cursor = utils.createElement('span', 'typing-cursor', '|');
      this.container.appendChild(cursor);

      const nextDelay = Math.floor(Math.random() * 70) + 30;
      setTimeout(() => {
        cursor.remove();
        this.typeNextChunk();
      }, nextDelay);
    }
  }

  // 채팅 UI 클래스
  class ChatPopupUI {
    constructor() {
      this.container = null;
      this.messagesContainer = null;
      this.inputElement = null;
      this.init();
    }

    init() {
      this.createContainer();
      this.createButton();
      this.createPopup();
      this.attachEventListeners();
      this.injectStyles();
    }

    createContainer() {
      this.container = utils.createElement('div', 'chatbot-container');
      this.container.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      `;
      document.body.appendChild(this.container);
    }

    createButton() {
      this.button = utils.createElement('button', 'chatbot-toggle-btn');
      this.button.innerHTML = `
        <svg class="chatbot-icon chatbot-icon-chat" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
        </svg>
        <svg class="chatbot-icon chatbot-icon-close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      `;
      this.container.appendChild(this.button);
    }

    createPopup() {
      this.popup = utils.createElement('div', 'chatbot-popup');
      
      // 헤더
      const header = utils.createElement('div', 'chatbot-header');
      header.innerHTML = `
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="m9 16 .5-1 .5 1h1l-1-1 1-1h-1l-.5-1L9 14h-1l1 1-1 1z"/>
            </svg>
          </div>
          <div>
            <h3>AI 챗봇</h3>
          </div>
        </div>
        <button class="chatbot-new-chat-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          새 채팅
        </button>
      `;

      // 메시지 컨테이너
      this.messagesContainer = utils.createElement('div', 'chatbot-messages');

      // 입력 폼
      const inputForm = utils.createElement('form', 'chatbot-input-form');
      inputForm.innerHTML = `
        <div class="chatbot-input-wrapper">
          <input type="text" class="chatbot-input" placeholder="메시지를 입력하세요..." />
          <button type="submit" class="chatbot-send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </button>
        </div>
      `;

      this.popup.appendChild(header);
      this.popup.appendChild(this.messagesContainer);
      this.popup.appendChild(inputForm);
      this.container.appendChild(this.popup);

      this.inputElement = inputForm.querySelector('.chatbot-input');
      this.sendButton = inputForm.querySelector('.chatbot-send-btn');
      this.newChatButton = header.querySelector('.chatbot-new-chat-btn');
    }

    attachEventListeners() {
      // 토글 버튼
      this.button.addEventListener('click', () => this.toggle());

      // 새 채팅 버튼
      this.newChatButton.addEventListener('click', () => this.startNewChat());

      // 메시지 전송
      this.popup.querySelector('.chatbot-input-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendMessage();
      });

      // ESC 키로 닫기
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      if (state.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      state.isOpen = true;
      this.popup.classList.add('chatbot-popup-open');
      this.button.querySelector('.chatbot-icon-chat').style.display = 'none';
      this.button.querySelector('.chatbot-icon-close').style.display = 'block';
      
      setTimeout(() => {
        this.inputElement.focus();
      }, 300);
    }

    close() {
      state.isOpen = false;
      this.popup.classList.remove('chatbot-popup-open');
      this.button.querySelector('.chatbot-icon-chat').style.display = 'block';
      this.button.querySelector('.chatbot-icon-close').style.display = 'none';
    }

    async startNewChat() {
      try {
        const room = await apiService.createRoom();
        state.currentRoom = room;
        state.messages = [];
        this.renderMessages();
        
        const messages = await apiService.getRoomChats(room.id);
        state.messages = messages;
        this.renderMessages();
      } catch (error) {
        console.error('새 채팅 시작 오류:', error);
      }
    }

    async sendMessage() {
      const message = this.inputElement.value.trim();
      if (!message || state.isLoading) return;

      // 사용자 메시지 추가
      const userMessage = {
        id: state.nextId++,
        content: message,
        role: 'user',
        timestamp: utils.formatTime(),
        tokens: 0,
        costInKrw: 0,
        serverId: null
      };

      state.messages.push(userMessage);
      this.inputElement.value = '';
      this.renderMessages();

      // 로딩 상태 시작
      state.isLoading = true;
      this.showTypingIndicator();
      this.updateSendButton();

      try {
        if (state.currentRoom?.id) {
          const responseMessage = await apiService.sendMessage(state.currentRoom.id, message);
          state.messages.push(responseMessage);
          state.typingMessageId = responseMessage.id;
          this.hideTypingIndicator();
          this.renderMessages();
        }
      } catch (error) {
        console.error('메시지 전송 오류:', error);
        this.hideTypingIndicator();
      } finally {
        state.isLoading = false;
        this.updateSendButton();
      }
    }

    renderMessages() {
      this.messagesContainer.innerHTML = '';
      
      state.messages.forEach((msg) => {
        const messageElement = this.createMessageElement(msg);
        this.messagesContainer.appendChild(messageElement);
      });

      this.scrollToBottom();
    }

    createMessageElement(msg) {
      const messageDiv = utils.createElement('div', `chatbot-message chatbot-message-${msg.role}`);
      
      const timestampDiv = utils.createElement('div', 'chatbot-message-timestamp');
      if (msg.role === 'assistant') {
        timestampDiv.innerHTML = `
          <div class="chatbot-bot-avatar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="m9 16 .5-1 .5 1h1l-1-1 1-1h-1l-.5-1L9 14h-1l1 1-1 1z"/>
            </svg>
          </div>
          <span>${msg.timestamp}</span>
        `;
      } else {
        timestampDiv.innerHTML = `<span>${msg.timestamp}</span>`;
      }

      const contentDiv = utils.createElement('div', 'chatbot-message-content');
      
      if (msg.role === 'user') {
        contentDiv.textContent = msg.content;
      } else if (state.typingMessageId === msg.id) {
        new TypewriterEffect(contentDiv, msg.content, () => {
          if (state.typingMessageId === msg.id) {
            state.typingMessageId = null;
          }
        });
      } else {
        contentDiv.innerHTML = utils.parseMarkdown(msg.content);
      }

      messageDiv.appendChild(timestampDiv);
      messageDiv.appendChild(contentDiv);
      
      return messageDiv;
    }

    showTypingIndicator() {
      const typingDiv = utils.createElement('div', 'chatbot-typing-indicator');
      typingDiv.innerHTML = `
        <div class="chatbot-message chatbot-message-assistant">
          <div class="chatbot-message-timestamp">
            <div class="chatbot-bot-avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="m9 16 .5-1 .5 1h1l-1-1 1-1h-1l-.5-1L9 14h-1l1 1-1 1z"/>
              </svg>
            </div>
          </div>
          <div class="chatbot-message-content">
            <div class="chatbot-typing-dots">
              <div class="chatbot-typing-dot"></div>
              <div class="chatbot-typing-dot"></div>
              <div class="chatbot-typing-dot"></div>
            </div>
          </div>
        </div>
      `;
      this.messagesContainer.appendChild(typingDiv);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const typingIndicator = this.messagesContainer.querySelector('.chatbot-typing-indicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }

    updateSendButton() {
      this.sendButton.disabled = state.isLoading;
      this.sendButton.style.opacity = state.isLoading ? '0.7' : '1';
    }

    scrollToBottom() {
      setTimeout(() => {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }, 100);
    }

    injectStyles() {
      if (document.getElementById('chatbot-styles')) return;

      const style = utils.createElement('style');
      style.id = 'chatbot-styles';
      style.textContent = `
        .chatbot-container * {
          box-sizing: border-box;
        }

        .chatbot-toggle-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: ${config.theme.primaryColor};
          color: ${config.theme.secondaryColor};
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-toggle-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -6px rgba(0, 0, 0, 0.15);
        }

        .chatbot-popup {
          margin-top: 16px;
          width: 400px;
          height: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .chatbot-popup-open {
          height: 600px !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: auto !important;
        }

        .chatbot-header {
          background: ${config.theme.primaryColor};
          color: ${config.theme.secondaryColor};
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 16px 16px 0 0;
        }

        .chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chatbot-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(78, 54, 41, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-header h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          line-height: 1;
        }

        .chatbot-new-chat-btn {
          background: ${config.theme.secondaryColor};
          color: ${config.theme.primaryColor};
          border: none;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .chatbot-new-chat-btn:hover {
          background: #3a291f;
        }

        .chatbot-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: linear-gradient(to bottom, #f9f9f9, white);
          max-height: 450px;
        }

        .chatbot-message {
          margin-bottom: 16px;
          max-width: 85%;
          transition: all 0.2s ease;
        }

        .chatbot-message-user {
          margin-left: auto;
        }

        .chatbot-message-assistant {
          margin-right: auto;
        }

        .chatbot-message-timestamp {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          padding: 0 4px;
        }

        .chatbot-message-timestamp span {
          font-size: 12px;
          color: rgba(78, 54, 41, 0.6);
        }

        .chatbot-bot-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #63666A;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .chatbot-message-content {
          padding: 14px;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          line-height: 1.5;
          word-wrap: break-word;
        }

        .chatbot-message-user .chatbot-message-content {
          background: rgba(241, 211, 2, 0.9);
          color: ${config.theme.secondaryColor};
          border-top-right-radius: 4px;
        }

        .chatbot-message-assistant .chatbot-message-content {
          background: rgba(184, 185, 185, 0.3);
          color: ${config.theme.secondaryColor};
          border-top-left-radius: 4px;
        }

        .chatbot-typing-dots {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .chatbot-typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(78, 54, 41, 0.6);
          animation: chatbot-typing-bounce 1.4s infinite ease-in-out;
        }

        .chatbot-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .chatbot-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes chatbot-typing-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          background: rgba(78, 54, 41, 0.7);
          margin-left: 2px;
          animation: chatbot-blink 1s infinite;
        }

        @keyframes chatbot-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .chatbot-input-form {
          padding: 16px;
          border-top: 1px solid #e5e5e5;
          background: white;
        }

        .chatbot-input-wrapper {
          display: flex;
          align-items: center;
          background: #f9f9f9;
          border-radius: 24px;
          border: 1px solid rgba(184, 185, 185, 0.3);
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .chatbot-input-wrapper:focus-within {
          border-color: ${config.theme.primaryColor};
        }

        .chatbot-input {
          flex: 1;
          padding: 14px 20px;
          border: none;
          background: transparent;
          outline: none;
          color: ${config.theme.secondaryColor};
          font-size: 14px;
        }

        .chatbot-input::placeholder {
          color: rgba(78, 54, 41, 0.5);
        }

        .chatbot-send-btn {
          background: ${config.theme.primaryColor};
          color: ${config.theme.secondaryColor};
          border: none;
          padding: 14px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-send-btn:hover:not(:disabled) {
          background: #e6c800;
        }

        .chatbot-send-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .inline-code {
          background: #e5e5e5;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 13px;
          font-family: 'Courier New', monospace;
        }

        @media (max-width: 768px) {
          .chatbot-container {
            bottom: 16px !important;
            right: 16px !important;
          }
          
          .chatbot-popup {
            width: calc(100vw - 32px);
            max-width: 400px;
          }
        }
      `;
      
      document.head.appendChild(style);
    }
  }

  // 메인 ChatBot 클래스
  class ChatBot {
    constructor(options = {}) {
      // 설정 병합
      Object.assign(config, options);
      
      // UI 초기화
      this.ui = new ChatPopupUI();
      
      // 자동으로 첫 채팅방 생성
      this.autoStart();
    }

    async autoStart() {
      if (config.profileId) {
        try {
          await this.ui.startNewChat();
        } catch (error) {
          console.error('자동 시작 오류:', error);
        }
      }
    }

    // 공개 API
    open() {
      this.ui.open();
    }

    close() {
      this.ui.close();
    }

    toggle() {
      this.ui.toggle();
    }

    destroy() {
      if (this.ui.container) {
        this.ui.container.remove();
      }
      const styles = document.getElementById('chatbot-styles');
      if (styles) {
        styles.remove();
      }
    }
  }

  // 전역 스코프에 ChatBot 노출
  window.ChatBot = ChatBot;

  // 자동 초기화 (스크립트 태그에 data 속성이 있는 경우)
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[src*="chatbot-library"]');
    if (script) {
      const autoInit = script.getAttribute('data-auto-init');
      if (autoInit !== 'false') {
        window.chatbotInstance = new ChatBot();
      }
    }
  });

})(); 