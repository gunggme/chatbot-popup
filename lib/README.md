# 🤖 ChatBot Popup Library

React ChatPopup을 바닐라 JavaScript로 변환한 라이브러리입니다. 채널톡처럼 스크립트 한 줄로 쉽게 추가할 수 있습니다.

## ✨ 주요 기능

- 채널톡 스타일의 팝업 채팅 인터페이스
- 타이핑 애니메이션 효과
- 마크다운 지원 (볼드, 이탤릭, 링크, 코드)
- 반응형 디자인 (모바일 대응)
- ESC 키로 닫기
- 커스터마이징 가능한 테마
- 자동 스크롤 및 포커스

## 📦 설치 및 사용법

### 1. 기본 사용법 (자동 초기화)

스크립트 태그만 추가하면 자동으로 챗봇이 활성화됩니다:

```html
<script src="https://your-domain.com/chatbot-library.js" 
        data-api-url="/api/chat" 
        data-profile-id="your-profile-id"></script>
```

### 2. 수동 초기화

더 세밀한 제어가 필요한 경우:

```html
<script src="https://your-domain.com/chatbot-library.js" data-auto-init="false"></script>
<script>
const chatbot = new ChatBot({
    apiBaseUrl: '/api/chat',
    profileId: 'your-profile-id',
    theme: {
        primaryColor: '#F1D302',
        secondaryColor: '#4E3629',
        backgroundColor: '#FFFFFF'
    }
});
</script>
```

## 🔧 설정 옵션

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `apiBaseUrl` | '/api/chat' | API 엔드포인트 |
| `profileId` | null | 봇 프로필 ID |
| `theme.primaryColor` | '#F1D302' | 주요 색상 |
| `theme.secondaryColor` | '#4E3629' | 보조 색상 |
| `theme.backgroundColor` | '#FFFFFF' | 배경 색상 |

## 🎮 JavaScript API

```javascript
// 챗봇 열기
chatbot.open();

// 챗봇 닫기  
chatbot.close();

// 챗봇 토글
chatbot.toggle();

// 챗봇 제거
chatbot.destroy();
```

## 🔗 필요한 API 엔드포인트

이 라이브러리를 사용하려면 다음 API 엔드포인트가 구현되어 있어야 합니다:

### POST /api/chat/rooms
새 채팅방 생성

**Request:**
```json
{
  "profileId": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "profileId": "string", 
  "profileName": "string",
  "costLimitInKrw": 0
}
```

### GET /api/chat/rooms/{roomId}/messages
채팅방의 메시지 목록 조회

**Response:**
```json
[
  {
    "id": 1,
    "content": "string",
    "role": "user" | "assistant",
    "timestamp": "string",
    "tokens": 0,
    "costInKrw": 0,
    "serverId": "string" | null
  }
]
```

### POST /api/chat/rooms/{roomId}/messages
메시지 전송

**Request:**
```json
{
  "message": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "content": "string", 
  "role": "assistant",
  "timestamp": "string",
  "tokens": 0,
  "costInKrw": 0,
  "serverId": "string" | null
}
```

## 📱 반응형 지원

모바일 기기에서 자동으로 화면 크기에 맞게 조정됩니다. 768px 이하에서는 팝업 크기가 화면에 맞게 축소됩니다.

## 🎨 커스터마이징

CSS를 통해 스타일을 커스터마이징할 수 있습니다:

```css
.chatbot-toggle-btn {
    background: #your-color !important;
}

.chatbot-header {
    background: #your-header-color !important;
}
```

## 🚀 배포 가이드

### CDN을 통한 배포

1. `chatbot-library.js` 파일을 CDN에 업로드
2. 사용자에게 다음 스크립트 태그 제공:

```html
<script src="https://your-cdn.com/chatbot-library.js" 
        data-api-url="https://your-api.com/api/chat" 
        data-profile-id="your-profile-id"></script>
```

### 자체 서버 배포

1. `lib/` 폴더의 파일들을 웹 서버에 업로드
2. CORS 설정 확인
3. HTTPS 사용 권장

### Webpack/번들러 사용

라이브러리를 더 작게 만들려면 webpack이나 다른 번들러를 사용하여 최소화할 수 있습니다:

```bash
# 예시: UglifyJS 사용
npm install -g uglify-js
uglifyjs chatbot-library.js -c -m -o chatbot-library.min.js
```

## 🔒 보안 고려사항

- API 엔드포인트에 적절한 인증 구현
- CORS 설정 확인
- CSP(Content Security Policy) 설정
- 사용자 입력 검증

## 🐛 문제 해결

### 챗봇이 표시되지 않는 경우
1. 콘솔에서 JavaScript 오류 확인
2. API 엔드포인트 연결 확인
3. CSS 충돌 확인

### API 호출 실패
1. CORS 설정 확인
2. API 엔드포인트 URL 확인
3. 네트워크 탭에서 요청/응답 확인

### 스타일 충돌
라이브러리는 높은 z-index(999999)를 사용하며, 클래스 이름에 `chatbot-` 접두사를 사용하여 충돌을 최소화합니다.

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 지원

문제가 있거나 기능 요청이 있으시면 GitHub Issues를 통해 연락해주세요. 