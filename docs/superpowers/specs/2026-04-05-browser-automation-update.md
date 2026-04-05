# clix-browser 홈페이지 업데이트 스펙

**날짜:** 2026-04-05
**관련 스펙:** `2026-04-04-browser-automation-feature.md`

---

## 배경

clix 앱의 clix-browser 기능이 강화됐다. 기존 홈페이지에는 반영되지 않은 새 커맨드들이 추가됐고, 메인 섹션의 오른쪽 패널을 실제 스크린샷 이미지 공간으로 교체해야 한다.

---

## 변경 범위

### 1. 메인 페이지 — BrowserAutomation.astro

**변경 내용:** 오른쪽 패널의 fake 터미널 코드 블록을 실제 이미지로 교체한다.

**현재:**
- macOS title bar + 터미널 텍스트 시뮬레이션 (open → snapshot → click → screenshot)

**변경 후:**
- macOS title bar 유지 (`clix-browser` 레이블)
- 아래에 `<img>` 태그로 실제 스크린샷 이미지 표시
- 임시 이미지: `/images/clix-terminal-workspace.png` (실제 clix-browser 스크린샷 확보 시 교체)
- 테두리/글로우: emerald green 유지 (`rgba(52,211,153,...)`)
- 스타일 패턴: `TerminalWorkspace.astro`와 동일 (`overflow-hidden rounded-2xl`, `block w-full h-auto`)

**i18n:** 새 키 추가 없음. 단, `browser.demoComment` 키는 이미지 교체로 더 이상 사용되지 않으므로 ko.ts / en.ts 양쪽에서 제거한다.

---

### 2. 가이드 페이지 — BrowserGuide.astro

기존 7개 섹션에 4개 새 섹션을 추가한다.

#### 추가할 섹션 (순서: 기존 섹션 이후, `guide-next` 이전)

| 섹션 | 커맨드 | 설명 |
|------|--------|------|
| **Wait** | `browser-wait` | 페이지 로드/셀렉터 등장/텍스트 등장 대기 |
| **Console** | `browser-console` | 브라우저 console.log 수집 |
| **Query** | `browser-get`, `browser-is` | 제목·URL·텍스트 조회, 가시성·활성화 여부 확인 |
| **Advanced Targeting** | `--snapshot-after`, `--tab`, CSS 셀렉터 | 고급 타겟팅 옵션 |

#### 기존 섹션 내 보완

- **snapshot 섹션**: CSS 셀렉터 지원 언급 추가 (`click "#submit"` 형태)
- **interact 섹션**: `browser-press` 키보드 입력 설명 보완

#### 예제 코드 블록 업데이트

기존 5줄 예제를 확장해 새 커맨드를 포함한다:

```
# 1) Open a tab the first time
$ clix-browser open https://localhost:3000
# 2) Wait for the page to load
$ clix-browser wait --load-state
# 3) Inspect interactive elements
$ clix-browser snapshot
# 4) Click by ref number or CSS selector
$ clix-browser click 9
$ clix-browser click "#submit"
# 5) Wait for an element to appear
$ clix-browser wait --selector ".success-msg"
# 6) Capture console logs
$ clix-browser console
# 7) Verify with screenshot
$ clix-browser screenshot
```

---

### 3. i18n — ko.ts / en.ts

`guide.browser` 블록에 새 섹션에 해당하는 키를 추가한다.

추가할 키 목록:

```
guide.browser.waitTitle
guide.browser.waitDesc
guide.browser.consoleTitle
guide.browser.consoleDesc
guide.browser.queryTitle
guide.browser.queryDesc
guide.browser.advancedTitle
guide.browser.advancedDesc
```

기존 예제 라인 키(`exampleLine1`~`exampleLine10`)를 `exampleLine1`~`exampleLine17`로 확장한다.

`browser.demoComment` 키는 메인 섹션 이미지 교체로 인해 더 이상 사용되지 않으므로 **ko.ts와 en.ts 모두에서 제거**한다.

---

## 파일 변경 목록

| 파일 | 변경 종류 |
|------|---------|
| `src/components/BrowserAutomation.astro` | 오른쪽 패널 코드 → 이미지 교체, `demoComment` ref 제거 |
| `src/components/guide/sections/BrowserGuide.astro` | 4개 섹션 추가, 예제 코드 확장 |
| `src/i18n/ko.ts` | `guide.browser` 키 8개 추가, 예제 라인 확장, `browser.demoComment` 제거 |
| `src/i18n/en.ts` | 동일 (ko.ts 변경과 mirror) |

---

## 구현 순서

1. `ko.ts` — Translations 타입 업데이트 (새 키 추가, demoComment 제거)
2. `en.ts` — 영문 값 추가 (ko.ts mirror)
3. `BrowserAutomation.astro` — 이미지 교체
4. `BrowserGuide.astro` — 새 섹션 4개 추가 + 예제 코드 확장

---

## 비고

- `clix-terminal-workspace.png`는 임시 이미지다. 실제 clix-browser 동작 스크린샷 확보 시 `clix-browser-preview.png` 등으로 추가하고 src를 교체한다.
- 가이드 사이드바(`GuideSidebar.astro`)와 `guide.astro`의 SECTIONS 배열은 변경 없다 — `browser` 섹션 자체는 이미 등록돼 있다.
- `Nav.astro`도 변경 없다.
