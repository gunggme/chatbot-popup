# 🚀 ChatBot Popup Library 배포 가이드

이 문서는 ChatBot Popup Library를 CDN에 배포하는 방법을 설명합니다.

## 📋 배포 준비사항

### 1. 필요한 도구
- Git
- GitHub 계정
- npm 계정 (선택사항)

### 2. 파일 구조 확인
```
chatbot-popup-library/
├── lib/
│   ├── chatbot-library.js      # 원본 파일
│   └── chatbot-library.min.js  # 압축된 파일
├── examples/
│   └── index.html              # 예제 파일
├── package.json                # 패키지 정보
├── README.md                   # 라이브러리 문서
├── LICENSE                     # MIT 라이선스
└── DEPLOYMENT.md               # 이 파일
```

## 🌐 CDN 배포 방법

### 방법 1: GitHub + jsDelivr (추천)

**장점**: 무료, 빠름, 자동 업데이트
**단점**: GitHub 의존성

1. **GitHub 저장소 생성**
```bash
# GitHub에서 새 저장소 생성 (chatbot-popup-library)
git init
git add .
git commit -m "Initial commit: ChatBot Popup Library v1.0.0"
git branch -M main
git remote add origin https://github.com/[YOUR_USERNAME]/chatbot-popup-library.git
git push -u origin main
```

2. **릴리스 생성**
```bash
# 태그 생성
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

3. **GitHub Releases에서 릴리스 생성**
- GitHub 저장소 → Releases → Create a new release
- Tag: `v1.0.0`
- Title: `ChatBot Popup Library v1.0.0`
- Description: 주요 기능 설명

4. **jsDelivr CDN 링크**
```html
<!-- 최신 버전 -->
<script src="https://cdn.jsdelivr.net/gh/[YOUR_USERNAME]/chatbot-popup-library@latest/lib/chatbot-library.min.js"></script>

<!-- 특정 버전 -->
<script src="https://cdn.jsdelivr.net/gh/[YOUR_USERNAME]/chatbot-popup-library@1.0.0/lib/chatbot-library.min.js"></script>
```

### 방법 2: npm + unpkg

**장점**: 버전 관리 용이, npm 생태계 활용
**단점**: npm 계정 필요

1. **npm 계정 생성**
```bash
npm login
```

2. **패키지 발행**
```bash
# package.json에서 name 확인 (고유해야 함)
npm publish
```

3. **unpkg CDN 링크**
```html
<!-- 최신 버전 -->
<script src="https://unpkg.com/chatbot-popup-library@latest/lib/chatbot-library.min.js"></script>

<!-- 특정 버전 -->
<script src="https://unpkg.com/chatbot-popup-library@1.0.0/lib/chatbot-library.min.js"></script>
```

### 방법 3: GitHub Pages + 커스텀 도메인

**장점**: 완전한 제어, 커스텀 도메인 가능
**단점**: 설정 복잡, 별도 관리 필요

1. **GitHub Pages 활성화**
- 저장소 → Settings → Pages
- Source: Deploy from a branch
- Branch: main, Folder: / (root)

2. **접근 URL**
```html
<script src="https://[YOUR_USERNAME].github.io/chatbot-popup-library/lib/chatbot-library.min.js"></script>
```

## 🔄 버전 업데이트 프로세스

### 1. 코드 업데이트
```bash
# 코드 수정 후
git add .
git commit -m "Update: 새로운 기능 추가"
```

### 2. 버전 번호 업데이트
```bash
# package.json의 version 필드 업데이트
# "version": "1.0.1"
```

### 3. 압축 파일 재생성 (필요시)
```bash
# 원본 파일이 변경된 경우 압축 파일도 업데이트
```

### 4. 릴리스 배포
```bash
# GitHub 방식
git tag -a v1.0.1 -m "Release v1.0.1: 버그 수정 및 성능 개선"
git push origin v1.0.1

# npm 방식
npm publish
```

## 📊 CDN 성능 최적화

### 1. 파일 크기 최적화
- Minification (이미 적용됨)
- Gzip 압축 활성화
- 불필요한 기능 제거

### 2. 캐싱 전략
```html
<!-- 버전 고정으로 장기 캐싱 활용 -->
<script src="https://cdn.jsdelivr.net/npm/chatbot-popup-library@1.0.0/lib/chatbot-library.min.js"></script>
```

### 3. 로드 최적화
```html
<!-- 비동기 로딩 -->
<script async src="..."></script>

<!-- 지연 로딩 -->
<script defer src="..."></script>
```

## 🔍 배포 검증

### 1. CDN 접근성 테스트
```bash
# curl로 CDN 응답 확인
curl -I https://cdn.jsdelivr.net/npm/chatbot-popup-library@1.0.0/lib/chatbot-library.min.js
```

### 2. 브라우저 테스트
- 다양한 브라우저에서 로딩 확인
- 개발자 도구에서 네트워크 탭 확인
- 콘솔 에러 확인

### 3. 성능 테스트
- PageSpeed Insights
- GTmetrix
- 로딩 시간 측정

## 🚨 트러블슈팅

### 문제 1: CDN에서 파일이 로드되지 않음
**해결책**:
- CORS 헤더 확인
- 파일 경로 확인
- 네트워크 연결 확인

### 문제 2: 캐시 문제로 업데이트가 반영되지 않음
**해결책**:
- 브라우저 캐시 삭제
- CDN 캐시 무효화 (Purge)
- 버전 번호 확인

### 문제 3: MIME 타입 오류
**해결책**:
```html
<script type="text/javascript" src="..."></script>
```

## 📈 모니터링 및 분석

### 1. CDN 사용 통계
- jsDelivr: https://www.jsdelivr.com/statistics
- unpkg: 로그 확인 불가

### 2. GitHub 통계
- Repository insights
- Download 통계
- Star/Fork 추적

### 3. 사용자 피드백
- GitHub Issues
- npm 리뷰
- 커뮤니티 피드백

## 🎯 마케팅 및 홍보

### 1. 문서화
- README.md 최신화
- 예제 코드 제공
- API 문서 작성

### 2. 커뮤니티
- npm 키워드 최적화
- GitHub topics 설정
- 소셜 미디어 공유

### 3. SEO 최적화
- GitHub 저장소 설명
- 태그 및 키워드
- 링크 빌딩

## 🔐 보안 고려사항

### 1. 코드 무결성
- SRI (Subresource Integrity) 해시 제공
```html
<script src="..." integrity="sha384-..." crossorigin="anonymous"></script>
```

### 2. HTTPS 강제
- 모든 CDN 링크에 HTTPS 사용

### 3. 의존성 보안
- 정기적인 보안 감사
- 취약점 모니터링

---

## 📞 지원

배포 과정에서 문제가 발생하면:
- 📧 이메일: your-email@example.com
- 🐛 GitHub Issues: [링크]
- 💬 Discord: [링크] 