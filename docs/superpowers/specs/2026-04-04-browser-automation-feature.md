# clix-browser 기능 추가 설계 스펙

**날짜:** 2026-04-04
**상태:** 승인됨

---

## 1. 개요

CLIX 앱에 추가된 인앱 브라우저 제어 기능(`clix-browser`)을 홈페이지 메인과 가이드 페이지에 반영한다.
`clix-browser`는 AI 에이전트가 터미널을 떠나지 않고 브라우저를 열고, 요소를 조작하고, 스크린샷으로 결과를 검증할 수 있는 강력한 차별화 기능이다.

---

## 2. 변경 범위

### 2.1 메인 페이지 (`src/pages/index.astro`)

**새 컴포넌트:** `src/components/BrowserAutomation.astro`

**섹션 순서 (변경 후):**
```
Hero → AppPreview → AIIntegration → BrowserAutomation (신규) → TerminalWorkspace → SSHManagement → Download
```

**레이아웃:** 좌우 분할 (TerminalWorkspace와 동일 패턴)
- **좌측:** 섹션 라벨 + 제목 + 설명 + 기능 목록 3개 (아이콘 포함)
- **우측:** 터미널 명령어 데모 블록 (단계별 시퀀스)

**기능 목록 3개:**
1. **열기 & 이동** (`globe` 아이콘) — `clix-browser open`으로 탭을 처음 한 번 열고, 이후 `navigate`로 이동
2. **인터랙션** (`terminal` 아이콘) — `snapshot`으로 ref 번호 확인 → `click` / `fill` / `press`로 조작
3. **검증** (`search` 아이콘) — `screenshot`으로 결과 캡처, `evaluate`로 JS 실행

**우측 데모 블록 (코드 시퀀스):**
```
# AI 에이전트가 브라우저를 직접 제어
$ clix-browser open https://localhost:3000
→ tab opened

$ clix-browser snapshot
→ [ref=4] link "Home"
→ [ref=9] button "Submit"
→ [ref=14] input "Search"

$ clix-browser click 9
→ clicked

$ clix-browser screenshot
→ [PNG base64...]
```

**i18n 키 (신규):**
- `browser.label` — "Browser Automation"
- `browser.title1` — "터미널에서 브라우저를" / "Control the browser"
- `browser.title2` — "직접 제어합니다" / "from the terminal."
- `browser.sub` — 설명 1줄
- `browser.feat1Title`, `browser.feat1Desc`
- `browser.feat2Title`, `browser.feat2Desc`
- `browser.feat3Title`, `browser.feat3Desc`
- `browser.demoComment` — `# AI 에이전트가 브라우저를 직접 제어` / `# AI agent controls the browser directly`

**SectionIconBadge:** `globe` 아이콘 신규 추가 필요 (SVG: 지구본 형태)

---

### 2.2 가이드 페이지 (`src/pages/guide.astro`)

**새 컴포넌트:** `src/components/guide/sections/BrowserGuide.astro`

**사이드바 순서 (변경 후):**
```
Getting Started → Hosts & Connections → Port Forwarding → Terminal Workflow
→ AI Tool Usage → Browser Automation (신규) → Alerts & Backup → Settings
```

**섹션 ID:** `browser`

**가이드 내용 구성:**
1. **개요** — clix-browser가 무엇인지, AI 에이전트와 함께 쓰는 맥락
2. **기본 워크플로우** — 처음 한 번만 `open`, 이후 `navigate` 재사용 원칙
3. **명령어별 설명** (각 `guide-section-block`으로):
   - `open` / `navigate` — 탭 열기와 이동
   - `snapshot` — 인터랙티브 요소 목록과 ref 번호
   - `click` / `fill` / `press` — 요소 조작
   - `screenshot` / `evaluate` — 결과 검증
   - `list` / `activate` / `close` — 탭 관리
4. **실전 예시 코드 블록** — `guide-code` 스타일로 단계별 시퀀스
5. **Next step** 링크

**i18n 키 (신규):** `guide.browser.*`
- `label`, `title`, `sub`
- `scopeTitle`, `scopeDesc`
- `workflowTitle`, `workflowDesc`
- `openTitle`, `openDesc`
- `snapshotTitle`, `snapshotDesc`
- `interactTitle`, `interactDesc`
- `verifyTitle`, `verifyDesc`
- `tabsTitle`, `tabsDesc`
- `exampleLine1` ~ `exampleLine10`
- `nextStep`

**사이드바 i18n:** `guide.sidebar.browser` — "Browser Automation" / "브라우저 자동화"

---

## 3. 컴포넌트 구조

### `BrowserAutomation.astro`
```
TerminalWorkspace.astro 패턴을 따름:
- 섹션 배경: bg-bg-secondary + border-t border-white/[0.04]
- 그리드: md:grid-cols-2, items-center
- 좌측: 라벨 배지 → 제목(grad-text) → sub → features 목록
- 우측: 다크 코드 블록 (bg #030712, border rgba(59,130,246,0.2))
```

### `BrowserGuide.astro`
```
AIIntegrationGuide.astro 패턴을 따름:
- guide-section guide-shell wrapper
- guide-summary → guide-section-block 반복 → guide-code → guide-next
```

---

## 4. 타입 변경

`src/i18n/en.ts`에 `Translations` 타입이 정의되어 있고, `ko.ts`는 이를 구현한다.
신규 키는 `en.ts`(`Translations` 타입 + 값)와 `ko.ts`(값) 두 파일 모두에 동시에 추가해야 한다.

---

## 5. 스코프 외

- 실제 앱 스크린샷 이미지 (`public/images/clix-browser-*.png`) — 추후 추가
- `clix-browser list`, `activate`, `close` 명령어는 가이드에서 간략히만 언급
- 메인 섹션 우측은 이미지 없이 코드 블록만 사용 (스크린샷 미확보 상태)
