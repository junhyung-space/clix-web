# CLIX 공식 웹사이트 디자인 스펙

**날짜:** 2026-03-28
**상태:** 승인됨
**저장소:** clix-web (GitHub Pages 배포)

---

## 1. 개요

clix macOS 앱을 소개하고 다운로드를 제공하는 공식 랜딩 페이지. 단일 페이지 스크롤 구조로 앱의 핵심 가치(AI 코딩 도구 최적화 SSH 터미널)를 전달하고, GitHub Releases 다운로드로 연결한다.

---

## 2. 요구사항

### 기술 스택
- **프레임워크:** Astro (정적 사이트 생성)
- **스타일링:** Tailwind CSS
- **호스팅:** GitHub Pages
- **배포:** GitHub Actions (main 브랜치 push 시 자동 배포)

### 언어
- 한국어 + 영어 동시 지원 (다국어)
- 기본 언어: 한국어, 언어 토글로 영어 전환
- Astro의 i18n 라우팅 또는 클라이언트 사이드 언어 전환 방식 사용

### 비주얼 스타일
- **배경:** 딥 블랙 (#0a0e1a)
- **포인트 컬러:** 블루 그라디언트 (#1d4ed8 → #0ea5e9)
- **텍스트:** 거의 흰색 (#f8fafc), 보조 (#94a3b8), 비활성 (#475569)
- **카드/패널:** rgba(255,255,255,0.02~0.05) 반투명
- **보더:** rgba(59,130,246,0.1~0.3) 블루 계열
- **Hero 배경:** radial-gradient 블루 글로우 효과
- **로고:** clix 앱 아이콘 (design-assets/clix-app-icon-source.png) 사용

---

## 3. 페이지 구조 (단일 스크롤)

### 섹션 순서

```
Nav → Hero → AI Integration → Terminal Workspace → SSH Management → App Preview → Download → Footer
```

---

### 3.1 Navigation

**레이아웃:** 고정(sticky) 상단 바, 좌: 로고, 우: 언어 토글 + 다운로드 버튼
**요소:**
- 로고: clix 앱 아이콘 (32×32) + "CLIX" 워드마크 (letter-spacing: 3px)
- 언어 토글: "한국어 / EN" 알약형 버튼 — 클릭 시 페이지 언어 전환
- 다운로드 버튼: 블루 그라디언트, GitHub Releases 최신 릴리즈 링크

**스타일:** backdrop-filter blur, 블루 계열 하단 보더

---

### 3.2 Hero

**목표:** 첫 화면에서 "AI 코딩 도구를 위한 macOS SSH 터미널"을 즉시 전달
**레이아웃:** 풀 뷰포트 높이, 중앙 정렬, 세로 배치

**요소 (위→아래):**
1. 배지: `macOS 전용 · v0.1.0 Early Access`
2. 앱 아이콘: 96×96, 블루 글로우 그림자
3. **헤드라인:** "SSH, reimagined for the AI era." / "AI 시대를 위해 새로 만든 SSH"
4. 서브헤드라인 (영): "The macOS terminal workspace built for developers working with AI coding tools."
5. 서브헤드라인 (한): "Claude Code, Codex, Gemini CLI와 함께 일하는 개발자를 위한 터미널"
6. AI 도구 배지: Claude Code / Codex / Gemini CLI (각 컬러 닷 포함)
7. CTA 버튼 1개:
   - Primary: "⬇ Download for macOS — Free" (블루 그라디언트)
8. 시스템 요구사항: "macOS 14.0 Sonoma 이상 · Apple Silicon & Intel"

**배경:** radial-gradient 블루 글로우 (위쪽 집중)

---

### 3.3 AI Integration

**목표:** clix의 핵심 차별점 — AI 코딩 도구와의 통합을 상세히 설명
**레이아웃:** 섹션 헤더 + 3개 카드 그리드 (대형 1개 + 중형 2개)

**섹션 헤더:**
- 레이블: "AI Integration"
- 제목: "AI 코딩 도구와 완전히 연결됩니다" / "Deeply integrated with AI coding tools"
- 설명: "자동 설정, 실시간 알림, 세션 핸드오프 — 별도 설정 없이 바로 동작"

**카드 구성:**

| 카드 | 크기 | 내용 |
|------|------|------|
| Zero-config AI 연동 | 대형 (전체 폭) | Claude Code·Codex·Gemini 설정 파일 자동 탐지, 훅 자동 등록. 터미널 데모 포함 |
| clix-notify | 중형 | AI 작업 완료 시 인앱 알림. `clix-notify "메시지" --kind completed` 예시 |
| clix-handoff | 중형 | 다른 패인 디렉토리로 AI 세션 이어받기. `clix-handoff tab-2 claude` 예시 |

**카드 디자인:** 상단 블루 하이라이트 선, 터미널 코드 블록 예시 포함
**배경:** 딥 다크 + 상단 블루 글로우

---

### 3.4 Terminal Workspace

**목표:** 멀티패인 터미널, Ghostty 엔진, 워크스페이스 복구 기능 소개
**레이아웃:** 좌: 텍스트 + 기능 목록 / 우: 터미널 UI 목업

**텍스트 영역:**
- 제목: "복잡한 작업도 한 화면에서" / "Complex workflows, one screen"
- 설명: "멀티탭, 분할 패인, 세션 복구 — Ghostty 엔진의 빠른 네이티브 터미널 경험"
- 기능 목록 3개:
  1. 멀티탭 & 분할 패인 — 좌우·상하 자유 분할
  2. 워크스페이스 복구 — 재시작 후 레이아웃·디렉토리 복원
  3. Ghostty 엔진 — 네이티브 렌더링, 빠르고 정확한 에뮬레이션

**우측 목업:** macOS 앱 스타일 터미널 창, 2-패인 분할 화면 (prod / staging 세션 시뮬레이션)

---

### 3.5 SSH Management

**목표:** SSH 연결 관리 기능 전체 소개
**레이아웃:** 섹션 헤더 + 6개 카드 (3열 그리드)

**섹션 헤더:**
- 제목: "모든 서버를 한 곳에서 관리" / "All your servers, one place"

**카드 6개:**
1. 호스트 컬렉션 — Production/Staging/Personal 그룹, 태그·즐겨찾기·최근 연결
2. 자격증명 & Keychain — SSH 키·PEM·비밀번호, macOS Keychain 저장, 평문 없음
3. 점프 호스트 라우팅 — 배스천 경유 원클릭 연결
4. 포트 포워딩 — 로컬·리모트·SOCKS, UI에서 관리, 충돌 자동 감지
5. 백업 & 복구 — JSON 내보내기/가져오기, 팀 공유 가능
6. 통합 검색 — 별칭·호스트명·태그·메모 전체 검색

---

### 3.6 App Preview

**목표:** 실제 앱 화면 시각화 (현재는 플레이스홀더)
**레이아웃:** 중앙 정렬, macOS 앱 창 형태의 스크린샷 프레임

**스크린샷:** 초기에는 플레이스홀더, 추후 실제 스크린샷으로 교체
**프레임:** macOS 트래픽 신호등 버튼 + 타이틀 바 + 블루 글로우 그림자

---

### 3.7 Download

**목표:** 명확한 다운로드 CTA
**레이아웃:** 중앙 정렬, 블루 글로우 배경

**요소:**
- 헤드라인: "지금 무료로 시작하세요" / "Download and start free"
- 설명: "GitHub Releases에서 최신 버전을 다운로드"
- 대형 다운로드 버튼: GitHub Releases 최신 릴리즈로 연결
- 시스템 요구사항: "macOS 14.0 Sonoma 이상 · Apple Silicon & Intel 지원"
- 부가 링크: "GitHub Releases에서 더 많은 버전 보기 →"

**다운로드 링크 패턴:** `https://github.com/{owner}/clix/releases/latest/download/clix.dmg`
(실제 릴리즈 파일명은 구현 시 확정)

---

### 3.8 Footer

**요소:**
- 좌: 로고 (아이콘 + CLIX 워드마크)
- 중: 링크 — GitHub / Releases / 개인정보처리방침
- 우: Copyright © 2026 CLIX

**개발자 정보:** `junhyung.lee@genesisnest.com` — 푸터 하단 또는 중앙 링크 영역에 연락처로 표시

---

## 4. 다국어 처리

**방식:** 클라이언트 사이드 언어 전환 (Astro 단일 페이지 + JS)
- 페이지 로드 시 브라우저 언어 감지 (navigator.language) → 한국어면 KO, 그 외 EN 기본값
- Nav 토글로 즉시 전환 (페이지 리로드 없음)
- 선택 언어 localStorage에 저장

**콘텐츠 관리:** `src/i18n/ko.ts` / `src/i18n/en.ts` 두 파일에 키-값 번역 정의, Astro 컴포넌트에서 import해서 사용. Astro 멀티페이지 i18n 라우팅은 사용하지 않음 (단일 페이지이므로 불필요).

---

## 5. 배포

- **저장소:** `clix-web` (별도 GitHub 저장소, 현재 작업 디렉토리 `/Users/junhyunglee/Workspace/projects/clix-web`)
- **GitHub Actions:** main 브랜치 push → Astro 빌드 → GitHub Pages 배포
- **커스텀 도메인:** 선택적 (CNAME 설정으로 추후 연결 가능)

---

## 6. 자산

| 자산 | 위치 | 용도 |
|------|------|------|
| 앱 아이콘 | `clix/design-assets/clix-app-icon-source.png` | Nav 로고, Hero 아이콘 |
| 앱 스크린샷 | 추후 추가 | App Preview 섹션 |

---

## 7. 스코프 외 (현재 버전)

- 별도 페이지 (changelog, docs, roadmap)
- 뉴스레터/waitlist 폼
- 분석 도구 (GA 등)
- 다크/라이트 모드 토글 (다크 고정)
