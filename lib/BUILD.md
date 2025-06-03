# 🚀 ChatBot Library 빌드 및 배포 가이드

## 📋 목차

1. [빌드 환경 설정](#빌드-환경-설정)
2. [개발 모드](#개발-모드)
3. [프로덕션 빌드](#프로덕션-빌드)
4. [테스트](#테스트)
5. [배포](#배포)
6. [CDN 설정](#CDN-설정)

## 🔧 빌드 환경 설정

### 1. 의존성 설치

```bash
cd lib/
npm install
```

### 2. 필요한 패키지

- **webpack**: 번들링
- **terser-webpack-plugin**: JavaScript 압축
- **uglify-js**: 간단한 압축 (대안)
- **webpack-dev-server**: 개발 서버

## 🔨 개발 모드

### 개발 서버 실행

```bash
npm run serve
```

- 주소: `http://localhost:8080`
- 핫 리로드 지원
- 자동으로 `test-simple.html` 또는 `example.html` 실행

### 개발 빌드

```bash
npm run build:dev
```

생성 파일:
- `dist/chatbot-library.js` (압축되지 않은 버전)

### 감시 모드

```bash
npm run watch
```

파일 변경 시 자동으로 다시 빌드합니다.

## 📦 프로덕션 빌드

### 최적화된 빌드

```bash
npm run build
```

생성 파일:
- `dist/chatbot-library.min.js` (압축된 버전)

### 수동 압축 (대안)

```bash
npm run minify
```

생성 파일:
- `chatbot-library.min.js` (UglifyJS로 압축)

## 🧪 테스트

### 1. 로컬 테스트

```bash
# 개발 서버 시작
npm run serve

# 또는 간단한 HTTP 서버 사용
python -m http.server 8000
# 또는
npx serve .
```

### 2. 브라우저에서 테스트

1. `http://localhost:8080/test-simple.html` 접속
2. 우측 하단의 노란색 버튼 클릭
3. 채팅 기능 테스트
4. JavaScript API 버튼들 테스트

### 3. 테스트 체크리스트

- [ ] 채팅 버튼이 나타나는지 확인
- [ ] 팝업이 열리고 닫히는지 확인
- [ ] 메시지 전송이 작동하는지 확인
- [ ] 타이핑 애니메이션이 작동하는지 확인
- [ ] 모바일에서 반응형이 작동하는지 확인
- [ ] ESC 키로 닫기가 작동하는지 확인

## 🌐 배포

### 1. 파일 준비

프로덕션 빌드 후 다음 파일들을 배포:

```
dist/
├── chatbot-library.min.js  (필수)
└── example.html           (선택적)

또는

chatbot-library.min.js     (단일 파일)
```

### 2. 웹 서버 배포

```bash
# 예: Nginx 설정
server {
    listen 80;
    server_name your-domain.com;
    
    location /chatbot/ {
        root /var/www/;
        add_header Access-Control-Allow-Origin *;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

### 3. CORS 설정

API 서버에서 CORS를 허용해야 합니다:

```javascript
// Express.js 예시
app.use(cors({
    origin: ['https://your-website.com', 'https://your-cdn.com'],
    credentials: true
}));
```

## ☁️ CDN 설정

### 1. AWS CloudFront 예시

```yaml
# CloudFormation 템플릿 예시
Resources:
  ChatBotDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: your-bucket.s3.amazonaws.com
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: ""
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad
        Enabled: true
```

### 2. 사용법

사용자는 다음과 같이 스크립트를 추가:

```html
<script src="https://your-cdn.com/chatbot-library.min.js" 
        data-api-url="https://your-api.com/api/chat" 
        data-profile-id="your-profile-id"></script>
```

## 📊 성능 최적화

### 1. 파일 크기 확인

```bash
ls -lh dist/chatbot-library.min.js
# 목표: 50KB 이하
```

### 2. Gzip 압축

웹 서버에서 gzip 압축을 활성화:

```nginx
gzip on;
gzip_types text/javascript application/javascript;
gzip_min_length 1000;
```

### 3. 캐싱 설정

```nginx
location ~* \.(js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔍 디버깅

### 개발자 도구에서 확인

```javascript
// 브라우저 콘솔에서
console.log(window.ChatBot);  // 라이브러리 로드 확인
console.log(window.chatbotInstance);  // 인스턴스 확인
```

### 일반적인 문제들

1. **라이브러리가 로드되지 않음**
   - 파일 경로 확인
   - CORS 에러 확인
   - 네트워크 탭에서 404 에러 확인

2. **API 호출 실패**
   - API 엔드포인트 URL 확인
   - CORS 설정 확인
   - 네트워크 탭에서 요청/응답 확인

3. **스타일 충돌**
   - CSS 우선순위 확인
   - z-index 충돌 확인

## 📋 배포 체크리스트

### 프로덕션 배포 전

- [ ] 프로덕션 빌드 실행
- [ ] 파일 크기 확인 (목표: 50KB 이하)
- [ ] 다양한 브라우저에서 테스트
- [ ] 모바일에서 테스트
- [ ] API 엔드포인트 정상 작동 확인
- [ ] CORS 설정 확인
- [ ] HTTPS 적용 확인

### 배포 후

- [ ] CDN 캐시 무효화
- [ ] 실제 웹사이트에서 테스트
- [ ] 성능 모니터링
- [ ] 오류 로그 확인

## 🆕 버전 관리

### 1. 버전 업데이트

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 2. 배포 파일명

버전별 파일 관리:

```
chatbot-library-v1.0.0.min.js
chatbot-library-v1.1.0.min.js
chatbot-library-latest.min.js  # 심볼릭 링크
```

### 3. 하위 호환성

- 기존 API 유지
- 새 기능 추가 시 기본값 제공
- 중요한 변경사항은 메이저 버전 업

## 📞 지원

문제가 발생하면:

1. 이 가이드의 디버깅 섹션 확인
2. GitHub Issues에 문제 보고
3. 브라우저 콘솔 오류 메시지 포함
4. 사용 환경 정보 포함 (브라우저, OS 등) 