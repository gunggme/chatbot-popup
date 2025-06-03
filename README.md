# 🤖 ChatBot Popup Library

[![npm version](https://badge.fury.io/js/chatbot-popup-library.svg)](https://badge.fury.io/js/chatbot-popup-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

채널톡 스타일의 현대적인 채팅봇 팝업 라이브러리입니다. 타이핑 효과와 아름다운 UI를 제공하며, 의존성 없이 바닐라 JavaScript로 제작되었습니다.

## ✨ 주요 기능

- 🎨 **현대적인 UI**: 채널톡 스타일의 깔끔하고 현대적인 디자인
- ⚡ **타이핑 효과**: 실제 사람이 타이핑하는 듯한 자연스러운 애니메이션
- 📱 **반응형 지원**: 모바일과 데스크톱 모든 기기에서 완벽 동작
- 🎭 **테마 커스터마이징**: 색상과 스타일을 쉽게 변경 가능
- 🚀 **제로 의존성**: 별도 라이브러리 없이 바로 사용 가능
- 🔧 **간편한 설치**: CDN 또는 npm으로 쉬운 설치
- 🔒 **다양한 보안 수준**: 원본부터 고급 난독화까지 4가지 버전 제공

## 🚀 빠른 시작

### CDN으로 사용하기

HTML 파일에 다음 스크립트 태그를 추가하세요:

```html
<!-- jsDelivr CDN (권장) -->
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@v1.0.0/lib/chatbot-library.min.js"></script>

<!-- 또는 최신 버전 -->
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.min.js"></script>

<!-- 원본 파일 (개발용) -->
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@v1.0.0/lib/chatbot-library.js"></script>
```

### 🔒 보안 수준별 버전 선택

용도에 맞는 보안 수준을 선택하여 사용하세요:

#### 1. 원본 버전 (개발/디버깅용)
```html
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.js"></script>
```
- **용도**: 개발, 디버깅, 학습
- **보안**: 낮음 (코드 완전 노출)
- **크기**: ~22KB
- **특징**: 읽기 쉬운 코드, 주석 포함

#### 2. 압축 버전 (프로덕션 권장)
```html
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.min.js"></script>
```
- **용도**: 일반 프로덕션 환경
- **보안**: 보통 (기본적인 코드 압축)
- **크기**: ~15KB
- **특징**: 최적화된 로딩 속도

#### 3. 기본 난독화 버전 (보안 강화)
```html
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.obf.js"></script>
```
- **용도**: 코드 보호가 필요한 환경
- **보안**: 높음 (변수명 암호화, 코드 흐름 복잡화)
- **크기**: ~37KB
- **특징**: 역공학 방지, 가독성 차단

#### 4. 고급 난독화 버전 (최고 보안)
```html
<script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.secure.js"></script>
```
- **용도**: 최고 수준의 코드 보호가 필요한 환경
- **보안**: 최고 (개발자 도구 차단, 디버깅 방지)
- **크기**: ~168KB
- **특징**: Self-defending, Debug protection, Dead code injection

> ⚠️ **주의**: 고급 난독화 버전은 개발자 도구를 감지하고 차단하므로, 디버깅이 필요한 경우 다른 버전을 사용하세요.

### 대안 CDN

```html
<!-- unpkg (npm 패키지 필요) -->
<script src="https://unpkg.com/chatbot-popup-library@1.0.0/lib/chatbot-library.min.js"></script>

<!-- GitHub Pages -->
<script src="https://gunggme.github.io/chatbot-popup/lib/chatbot-library.min.js"></script>
```

### npm으로 설치

```bash
npm install chatbot-popup-library
```

```javascript
import ChatBot from 'chatbot-popup-library';
// 또는
const ChatBot = require('chatbot-popup-library');
```

## 📖 사용법

### 기본 사용법

스크립트를 로드하면 자동으로 채팅봇이 초기화됩니다:

```html
<!DOCTYPE html>
<html>
<head>
    <title>내 웹사이트</title>
</head>
<body>
    <h1>환영합니다!</h1>
    
    <!-- 채팅봇 스크립트 추가 -->
    <script src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.min.js"></script>
</body>
</html>
```

### 커스텀 설정

```html
<script>
// 자동 초기화 비활성화
</script>
<script 
    src="https://cdn.jsdelivr.net/gh/gunggme/chatbot-popup@latest/lib/chatbot-library.min.js"
    data-auto-init="false">
</script>
<script>
// 수동으로 초기화하여 옵션 설정
const chatbot = new ChatBot({
    apiBaseUrl: 'https://your-api-server.com/api/chat',
    profileId: 'your-profile-id',
    position: 'bottom-right', // 'bottom-left', 'top-right', 'top-left'
    theme: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        backgroundColor: '#ffffff'
    }
});
</script>
```

### API 메서드

```javascript
// 채팅봇 열기
chatbot.open();

// 채팅봇 닫기
chatbot.close();

// 채팅봇 토글
chatbot.toggle();

// 채팅봇 제거
chatbot.destroy();
```

## 🎨 테마 커스터마이징

```javascript
const chatbot = new ChatBot({
    theme: {
        primaryColor: '#F1D302',    // 메인 색상 (헤더, 버튼)
        secondaryColor: '#4E3629',  // 텍스트 색상
        backgroundColor: '#FFFFFF'  // 배경 색상
    }
});
```

### 내장 테마

```javascript
// 다크 테마
const darkTheme = {
    primaryColor: '#2d3748',
    secondaryColor: '#ffffff',
    backgroundColor: '#1a202c'
};

// 블루 테마
const blueTheme = {
    primaryColor: '#3182ce',
    secondaryColor: '#1a365d',
    backgroundColor: '#ffffff'
};

// 그린 테마
const greenTheme = {
    primaryColor: '#38a169',
    secondaryColor: '#1a365d',
    backgroundColor: '#ffffff'
};
```

## 🔧 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `apiBaseUrl` | string | - | 채팅 API 서버 URL |
| `profileId` | string | - | 프로필 ID |
| `position` | string | `'bottom-right'` | 팝업 위치 |
| `theme.primaryColor` | string | `'#F1D302'` | 메인 색상 |
| `theme.secondaryColor` | string | `'#4E3629'` | 텍스트 색상 |
| `theme.backgroundColor` | string | `'#FFFFFF'` | 배경 색상 |

## 📱 반응형 지원

라이브러리는 자동으로 모바일 기기를 감지하고 최적화된 UI를 제공합니다:

- **데스크톱**: 400px 너비의 팝업
- **모바일**: 화면 크기에 맞춘 반응형 레이아웃

## 🔒 보안 및 난독화

### 보안 수준 비교

| 버전 | 보안 수준 | 파일 크기 | 특징 |
|------|-----------|-----------|------|
| 원본 | 낮음 | ~22KB | 개발/디버깅용, 코드 완전 노출 |
| 압축 | 보통 | ~15KB | 프로덕션 권장, 기본 최적화 |
| 기본 난독화 | 높음 | ~37KB | 변수명 암호화, 코드 흐름 복잡화 |
| 고급 난독화 | 최고 | ~168KB | 개발자 도구 차단, 디버깅 방지 |

### 고급 난독화 기능

고급 난독화 버전(`chatbot-library.secure.js`)은 다음 보안 기능을 제공합니다:

- **🛡️ Self-Defending**: 개발자 도구 감지 및 차단
- **🚫 Debug Protection**: 디버깅 시도 차단
- **🌀 Control Flow Flattening**: 코드 흐름 완전 복잡화
- **💀 Dead Code Injection**: 가짜 코드 삽입으로 혼란 유발
- **🔐 String Array Encoding**: Base64 문자열 인코딩
- **📝 Unicode Escape**: 유니코드 이스케이프 시퀀스
- **🔀 Variable Name Mangling**: 변수명 완전 암호화

### 보안 수준 선택 가이드

```javascript
// 🔓 개발 환경
<script src="lib/chatbot-library.js"></script>

// 🔒 일반 프로덕션 환경
<script src="lib/chatbot-library.min.js"></script>

// 🔐 보안이 중요한 환경
<script src="lib/chatbot-library.obf.js"></script>

// 🛡️ 최고 보안이 필요한 환경
<script src="lib/chatbot-library.secure.js"></script>
```

## 🧪 테스트 및 데모

### 온라인 데모

- **[기본 데모](examples/index.html)**: 기본 기능 데모
- **[난독화 테스트](test-obfuscated.html)**: 보안 수준별 버전 비교
- **[CDN 테스트](test-cdn.html)**: CDN 로딩 테스트

### 로컬 테스트

```bash
# 저장소 클론
git clone https://github.com/gunggme/chatbot-popup.git
cd chatbot-popup

# 개발 서버 실행
python -m http.server 8000
# 또는
npx serve .

# http://localhost:8000에서 확인
```

## 🌟 고급 사용법

### 이벤트 리스너

```javascript
// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new ChatBot({
        // 설정 옵션
    });
    
    // 채팅봇 열기 이벤트 처리
    chatbot.open();
});
```

### CSS 커스터마이징

기본 스타일을 덮어쓰려면:

```css
/* 버튼 크기 변경 */
.chatbot-toggle-btn {
    width: 80px !important;
    height: 80px !important;
}

/* 팝업 크기 변경 */
.chatbot-popup {
    width: 500px !important;
    height: 700px !important;
}

/* 폰트 변경 */
.chatbot-container {
    font-family: 'Noto Sans KR', sans-serif !important;
}
```

## 🔌 API 연동

라이브러리는 REST API를 통해 채팅 서버와 통신합니다:

### 필요한 엔드포인트

```javascript
// 1. 채팅방 생성
POST /api/chat/rooms
Body: { profileId: "your-profile-id" }
Response: { id: "room-id", ... }

// 2. 메시지 목록 조회
GET /api/chat/rooms/{roomId}/messages
Response: [{ id, content, role, timestamp, ... }]

// 3. 메시지 전송
POST /api/chat/rooms/{roomId}/messages
Body: { message: "사용자 메시지" }
Response: { id, content, role, timestamp, ... }
```

## 🛠️ 개발

```bash
# 저장소 클론
git clone https://github.com/gunggme/chatbot-popup.git
cd chatbot-popup

# 의존성 설치
npm install

# 개발 서버 실행
npm run serve

# 빌드 (압축 및 난독화)
npm run build

# http://localhost:8000에서 확인
```

### 파일 구조

```
chatbot-popup-library/
├── lib/
│   ├── chatbot-library.js          # 원본 파일
│   ├── chatbot-library.min.js      # 압축된 파일
│   ├── chatbot-library.obf.js      # 기본 난독화 파일
│   └── chatbot-library.secure.js   # 고급 난독화 파일
├── examples/
│   └── index.html                  # 기본 예제
├── test-obfuscated.html            # 난독화 테스트 페이지
├── test-cdn.html                   # CDN 테스트 페이지
├── obfuscator-config.json          # 난독화 설정
├── package.json
├── README.md
└── LICENSE
```

### 빌드 명령어

```bash
# 기본 압축
npm run minify

# 기본 난독화
npm run obfuscate

# 고급 난독화
npm run obfuscate:secure

# 모든 버전 생성
npm run build:all
```

## 📋 브라우저 지원

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ iOS Safari 11+
- ✅ Android Chrome 60+

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- 🐛 버그 리포트: [GitHub Issues](https://github.com/gunggme/chatbot-popup/issues)
- 💬 질문 및 토론: [GitHub Discussions](https://github.com/gunggme/chatbot-popup/discussions)
- 📧 이메일: your-email@example.com

## 🔄 변경 이력

### v1.0.0
- 🎉 첫 번째 릴리스
- ✨ 타이핑 효과 구현
- 🎨 채널톡 스타일 UI
- 📱 반응형 지원
- 🌈 테마 커스터마이징
- 🔒 4단계 보안 수준 지원 (원본/압축/기본난독화/고급난독화)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/gunggme">gunggme</a>
</div> 