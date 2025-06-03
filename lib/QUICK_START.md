# ⚡ ChatBot Library 빠른 시작 가이드

## 🚀 1분 만에 시작하기

### 1. HTML에 스크립트 추가

```html
<script src="https://your-cdn.com/chatbot-library.min.js" 
        data-api-url="/api/chat" 
        data-profile-id="your-profile-id"></script>
```

끝! 이제 우측 하단에 노란색 채팅 버튼이 나타납니다.

## 🔧 필요한 API 엔드포인트

### POST /api/chat/rooms
```json
// Request
{ "profileId": "string" }

// Response  
{ "id": "string", "profileId": "string", "profileName": "string", "costLimitInKrw": 0 }
```

### GET /api/chat/rooms/{roomId}/messages
```json
// Response
[{ "id": 1, "content": "string", "role": "user|assistant", "timestamp": "string", "tokens": 0, "costInKrw": 0, "serverId": null }]
```

### POST /api/chat/rooms/{roomId}/messages  
```json
// Request
{ "message": "string" }

// Response
{ "id": 1, "content": "string", "role": "assistant", "timestamp": "string", "tokens": 0, "costInKrw": 0, "serverId": null }
```

## 🎨 커스터마이징

```html
<script src="chatbot-library.min.js" data-auto-init="false"></script>
<script>
const chatbot = new ChatBot({
    apiBaseUrl: '/api/chat',
    profileId: 'your-profile-id',
    theme: {
        primaryColor: '#FF6B6B',    // 버튼 색상
        secondaryColor: '#4ECDC4',  // 텍스트 색상
        backgroundColor: '#FFFFFF'  // 배경 색상
    }
});
</script>
```

## 🎮 JavaScript API

```javascript
chatbot.open();     // 챗봇 열기
chatbot.close();    // 챗봇 닫기  
chatbot.toggle();   // 챗봇 토글
chatbot.destroy();  // 챗봇 제거
```

## 🧪 로컬 테스트

1. `chatbot-library.js` 파일 다운로드
2. `test-simple.html`을 같은 폴더에 생성:

```html
<!DOCTYPE html>
<html>
<head><title>테스트</title></head>
<body>
    <h1>챗봇 테스트</h1>
    <script>
        // 목업 API
        window.fetch = (url, options) => {
            if (url.includes('rooms') && options?.method === 'POST') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: 'test-room', profileId: 'test', profileName: '테스트봇', costLimitInKrw: 0
                    })
                });
            }
            if (url.includes('messages') && !options?.method) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
            }
            if (url.includes('messages') && options?.method === 'POST') {
                const body = JSON.parse(options.body);
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: Date.now(), content: `"${body.message}"에 대한 응답입니다.`,
                        role: 'assistant', timestamp: new Date().toLocaleTimeString(),
                        tokens: 0, costInKrw: 0, serverId: null
                    })
                });
            }
            return Promise.reject(new Error('Mock API'));
        };
    </script>
    <script src="./chatbot-library.js" data-profile-id="test"></script>
</body>
</html>
```

3. 브라우저에서 열기

## ❓ 문제 해결

### 챗봇이 안 보여요
- 브라우저 콘솔(F12)에서 에러 확인
- 파일 경로가 올바른지 확인
- API 엔드포인트가 작동하는지 확인

### API 에러가 나요
- CORS 설정 확인
- API 응답 형식이 올바른지 확인
- 네트워크 탭에서 요청/응답 확인

## 📱 모바일 지원

자동으로 모바일에 최적화됩니다. 추가 설정 불필요!

## 🔒 보안

- API에 인증 추가하세요
- HTTPS 사용하세요  
- CORS 설정을 제한하세요

---

💡 **더 자세한 내용은 [README.md](README.md)와 [BUILD.md](BUILD.md)를 참고하세요!** 