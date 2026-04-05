# clix-browser 홈페이지 업데이트 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** BrowserAutomation 섹션 오른쪽 패널을 실제 이미지로 교체하고, 가이드에 새 clix-browser 커맨드 4개 섹션을 추가한다.

**Architecture:** 컴포넌트 교체(Task 1) → ko.ts 타입 업데이트(Task 2) → en.ts 값 추가(Task 3) → 가이드 컴포넌트(Task 4) 순서로 진행한다. Task 1에서 `en.browser.demoComment` 참조를 먼저 제거해야 Task 2에서 해당 키를 타입에서 안전하게 삭제할 수 있다. Task 2 완료 후 Task 3 전까지 TypeScript 오류가 존재하는 것은 정상이다.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS

---

## 파일 변경 목록

| 파일 | 변경 종류 |
|------|---------|
| `src/components/BrowserAutomation.astro` | 오른쪽 패널 코드 블록 → `<img>` 이미지 교체, `demoComment` 참조 제거 |
| `src/i18n/ko.ts` | `browser.demoComment` 제거 · `snapshotDesc`/`interactDesc` 보완 · `guide.browser` 키 8개 추가 · `exampleLine1-10` → `exampleLine1-17` 교체 |
| `src/i18n/en.ts` | ko.ts와 동일 mirror |
| `src/components/guide/sections/BrowserGuide.astro` | 4개 섹션 추가 · 예제 코드 17줄로 교체 |

---

## Task 1: BrowserAutomation.astro — 이미지 교체

**Files:**
- Modify: `src/components/BrowserAutomation.astro`

컴포넌트에서 `en.browser.demoComment` 참조를 먼저 제거해야 Task 2에서 해당 i18n 키를 타입에서 안전하게 삭제할 수 있다.

---

- [ ] **Step 1: 오른쪽 패널을 이미지로 교체**

`src/components/BrowserAutomation.astro`에서 `<!-- Right: Terminal demo -->` 주석부터 해당 닫는 `</div>`까지 전체를 아래로 교체한다:

```astro
    <!-- Right: Screenshot image -->
    <div
      class="overflow-hidden rounded-2xl"
      style="background: #030712; border: 1px solid rgba(52,211,153,0.2); box-shadow: 0 0 60px rgba(52,211,153,0.06), 0 30px 60px rgba(0,0,0,0.4);"
    >
      <!-- Title bar -->
      <div class="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <span class="ml-2 text-[11px] text-white/30 font-mono">clix-browser</span>
      </div>
      <!-- Screenshot -->
      <img
        src="/images/clix-terminal-workspace.png"
        alt="clix-browser terminal screenshot"
        class="block w-full h-auto"
        loading="lazy"
      />
    </div>
```

교체 범위(현재 코드):
```astro
    <!-- Right: Terminal demo -->
    <div
      class="overflow-hidden rounded-2xl"
      style="background: #030712; border: 1px solid rgba(59,130,246,0.2); box-shadow: 0 0 60px rgba(14,165,233,0.08), 0 30px 60px rgba(0,0,0,0.4);"
    >
      <!-- Title bar -->
      <div class="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <div class="h-3 w-3 rounded-full bg-white/10"></div>
        <span class="ml-2 text-[11px] text-white/30 font-mono">clix-browser</span>
      </div>
      <!-- Code -->
      <div class="p-5 font-mono text-xs leading-relaxed">
        <div class="text-white/40 mb-1" data-i18n="browser.demoComment">{en.browser.demoComment}</div>
        <div class="text-white/90">$ clix-browser open https://localhost:3000</div>
        <div class="text-blue-400/80 mt-0.5 mb-3">→ tab opened</div>

        <div class="text-white/90">$ clix-browser snapshot</div>
        <div class="text-white/40 mt-0.5">→ [ref=4]  link "Home"</div>
        <div class="text-white/40">→ [ref=9]  button "Submit"</div>
        <div class="text-white/40 mb-3">→ [ref=14] input "Search"</div>

        <div class="text-white/90">$ clix-browser click 9</div>
        <div class="text-blue-400/80 mt-0.5 mb-3">→ clicked</div>

        <div class="text-white/90">$ clix-browser screenshot</div>
        <div class="text-blue-400/80 mt-0.5">→ [PNG base64...]</div>
      </div>
    </div>
```

---

- [ ] **Step 2: 빌드 확인**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web
npm run build 2>&1 | tail -10
```
Expected: 오류 없음 (이 시점에서 `demoComment` 키는 en.ts에 아직 존재하므로 TypeScript 문제 없음)

---

- [ ] **Step 3: Commit**

```bash
git add src/components/BrowserAutomation.astro
git commit -m "feat(ui): replace BrowserAutomation terminal demo with screenshot image"
```

---

## Task 2: ko.ts 타입 업데이트

**Files:**
- Modify: `src/i18n/ko.ts`

---

- [ ] **Step 1: `browser` 블록에서 `demoComment` 제거**

`src/i18n/ko.ts`의 `browser` 블록에서 아래 줄을 삭제한다:

```typescript
    demoComment: '# AI 에이전트가 브라우저를 직접 제어',
```

삭제 후 `browser` 블록은 아래와 같다:

```typescript
  // Browser Automation
  browser: {
    label: 'Browser Automation',
    title1: '터미널에서 브라우저를',
    title2: '직접 제어합니다.',
    sub: 'AI 에이전트가 clix-browser 명령어로 탭을 열고, 요소를 조작하고, 스크린샷으로 결과를 검증합니다.',
    feat1Title: '열기 & 이동',
    feat1Desc: 'open으로 탭을 처음 한 번 열고, navigate로 URL을 바꿉니다. 탭은 재사용합니다.',
    feat2Title: '인터랙션',
    feat2Desc: 'snapshot으로 ref 번호를 확인하고 click, fill, press로 요소를 조작합니다.',
    feat3Title: '검증',
    feat3Desc: 'screenshot으로 결과를 캡처하고 evaluate로 JavaScript를 실행해 상태를 확인합니다.',
  },
```

---

- [ ] **Step 2: `guide.browser` 블록 전체 교체**

`src/i18n/ko.ts`의 `guide.browser` 블록 전체를 아래로 교체한다:

```typescript
    browser: {
      label: '브라우저 자동화',
      title: '터미널 안에서 브라우저를 제어합니다',
      sub: 'clix-browser는 AI 에이전트가 터미널을 떠나지 않고 브라우저를 열고 조작하고 결과를 검증하는 명령어 모음입니다.',
      scopeTitle: '어떤 상황에서 씁니까',
      scopeDesc: 'AI 에이전트가 웹 UI를 검증하거나 자동화 흐름을 실행할 때 clix-browser를 씁니다. CLIX 내장 브라우저를 명령어로 직접 제어하므로 별도 자동화 도구가 필요 없습니다.',
      workflowTitle: '기본 원칙: 탭을 한 번만 엽니다',
      workflowDesc: 'open으로 탭을 처음 한 번만 열고, 이후 URL 이동은 반드시 navigate를 씁니다. 새 탭을 계속 열면 컨텍스트가 분산됩니다.',
      openTitle: 'open / navigate — 탭 열기와 이동',
      openDesc: 'open <url>은 새 탭을 열고 ref를 초기화합니다. navigate <url>은 현재 탭에서 URL만 바꿉니다. list로 열린 탭 목록을 확인할 수 있습니다.',
      snapshotTitle: 'snapshot — 인터랙티브 요소 목록',
      snapshotDesc: 'snapshot은 현재 페이지의 클릭 가능한 요소와 ref 번호를 출력합니다. ref 번호 대신 CSS 셀렉터(예: click "#submit")도 쓸 수 있습니다. 페이지가 바뀌면 ref 번호가 달라지므로 조작 전에 다시 실행합니다.',
      interactTitle: 'click / fill / press — 요소 조작',
      interactDesc: 'snapshot의 ref 번호 또는 CSS 셀렉터로 click, fill, press를 실행합니다. fill <ref> <text>는 입력 필드에 텍스트를 입력하고, press는 Enter, Escape, Tab 같은 키를 전송합니다.',
      verifyTitle: 'screenshot / evaluate — 결과 검증',
      verifyDesc: 'screenshot은 현재 화면을 PNG base64로 반환합니다. evaluate <script>는 JavaScript를 실행하고 결과를 반환합니다. 두 명령 모두 상태 확인에 씁니다.',
      tabsTitle: 'list / activate / close — 탭 관리',
      tabsDesc: 'list로 열린 탭 목록을 확인하고, activate <tab-id>로 탭을 전환하고, close <tab-id>로 탭을 닫습니다.',
      waitTitle: 'wait — 로드 및 조건 대기',
      waitDesc: 'wait --load-state는 페이지가 완전히 로드될 때까지 대기합니다. wait --selector <css>는 지정 요소가 DOM에 나타날 때까지, wait --text <text>는 텍스트가 페이지에 등장할 때까지 기다립니다. --timeout-ms로 제한 시간을 조정할 수 있습니다.',
      consoleTitle: 'console — 브라우저 콘솔 수집',
      consoleDesc: 'console 명령어로 브라우저의 console.log와 console.error 출력을 수집합니다. 최근 200개 메시지를 링 버퍼에 보관하므로 페이지 스크립트 디버깅에 씁니다.',
      queryTitle: 'get / is — 상태 조회',
      queryDesc: 'get title, get url, get text <selector>로 페이지 제목·URL·요소 텍스트를 조회합니다. is visible <selector>, is enabled <selector>로 요소의 가시성과 활성화 여부를 확인합니다.',
      advancedTitle: '고급 타겟팅 — CSS 셀렉터, --snapshot-after, --tab',
      advancedDesc: 'click이나 fill에 CSS 셀렉터를 쓰면 ref 번호 없이 바로 조작할 수 있습니다. --snapshot-after 플래그를 붙이면 navigate나 click 후 자동으로 snapshot 결과가 반환됩니다. --tab <tab-id>로 특정 탭을 명시적으로 타겟할 수 있습니다.',
      exampleLine1: '# 1) 탭을 처음 한 번 엽니다',
      exampleLine2: '$ clix-browser open https://localhost:3000',
      exampleLine3: '# 2) 페이지가 완전히 로드될 때까지 대기합니다',
      exampleLine4: '$ clix-browser wait --load-state',
      exampleLine5: '# 3) 인터랙티브 요소를 확인합니다',
      exampleLine6: '$ clix-browser snapshot',
      exampleLine7: '# 4) ref 번호 또는 CSS 셀렉터로 클릭합니다',
      exampleLine8: '$ clix-browser click 9',
      exampleLine9: '$ clix-browser click "#submit"',
      exampleLine10: '# 5) 특정 요소가 나타날 때까지 대기합니다',
      exampleLine11: '$ clix-browser wait --selector ".success-msg"',
      exampleLine12: '# 6) 브라우저 콘솔 로그를 수집합니다',
      exampleLine13: '$ clix-browser console',
      exampleLine14: '# 7) 결과를 스크린샷으로 확인합니다',
      exampleLine15: '$ clix-browser screenshot',
      exampleLine16: '# 이후 URL 이동은 navigate를 씁니다',
      exampleLine17: '$ clix-browser navigate https://localhost:3000/dashboard',
      nextStep: '브라우저 자동화 흐름을 익혔다면 다음 섹션에서 알림, 세션 복구, 백업 흐름을 확인하세요.',
    },
```

---

- [ ] **Step 3: 변경 확인 (TypeScript 오류는 Task 3 전까지 정상)**

```bash
grep -c 'demoComment' src/i18n/ko.ts
```
Expected: `0`

```bash
grep 'waitTitle\|consoleTitle\|queryTitle\|advancedTitle' src/i18n/ko.ts
```
Expected: 4줄 출력

---

- [ ] **Step 4: Commit**

```bash
git add src/i18n/ko.ts
git commit -m "feat(i18n): update ko.ts — remove demoComment, add wait/console/query/advanced guide keys, expand examples to 17 lines"
```

---

## Task 3: en.ts 값 추가 (ko.ts mirror)

**Files:**
- Modify: `src/i18n/en.ts`

---

- [ ] **Step 1: `browser` 블록에서 `demoComment` 제거**

`src/i18n/en.ts`의 `browser` 블록에서 아래 줄을 삭제한다:

```typescript
    demoComment: '# AI agent controls the browser directly',
```

삭제 후 `browser` 블록은 아래와 같다:

```typescript
  // Browser Automation
  browser: {
    label: 'Browser Automation',
    title1: 'Control the browser',
    title2: 'from the terminal.',
    sub: 'AI agents open tabs, interact with elements, and verify results using clix-browser commands — without leaving the terminal.',
    feat1Title: 'Open & Navigate',
    feat1Desc: 'Open a tab once with open, then use navigate to change URLs. The tab is reused across the session.',
    feat2Title: 'Interact',
    feat2Desc: 'Run snapshot to get ref numbers, then click, fill, or press to interact with elements.',
    feat3Title: 'Verify',
    feat3Desc: 'Capture the result with screenshot or run JavaScript directly with evaluate.',
  },
```

---

- [ ] **Step 2: `guide.browser` 블록 전체 교체**

`src/i18n/en.ts`의 `guide.browser` 블록 전체를 아래로 교체한다:

```typescript
    browser: {
      label: 'Browser Automation',
      title: 'Control the browser from the terminal',
      sub: 'clix-browser lets AI agents open, interact with, and verify browser state using terminal commands — no separate automation tool needed.',
      scopeTitle: 'When to use it',
      scopeDesc: 'Use clix-browser when an AI agent needs to verify web UI state or run automation flows. It controls the CLIX built-in browser directly via commands.',
      workflowTitle: 'Core rule: open a tab only once',
      workflowDesc: 'Use open to create a tab the first time, then navigate for all subsequent URL changes. Opening new tabs repeatedly splits context.',
      openTitle: 'open / navigate — open and move',
      openDesc: 'open <url> creates a new tab and resets refs. navigate <url> changes the URL in the current tab. Use list to see open tabs.',
      snapshotTitle: 'snapshot — interactive element list',
      snapshotDesc: 'snapshot prints clickable elements with their ref numbers. You can also target elements by CSS selector (e.g., click "#submit") instead of ref number. Ref numbers reset on navigation, so run snapshot again before interacting.',
      interactTitle: 'click / fill / press — interact with elements',
      interactDesc: 'Use the ref number from snapshot or a CSS selector with click, fill, or press. fill <ref> <text> sets input text; press sends keys like Enter, Escape, or Tab.',
      verifyTitle: 'screenshot / evaluate — verify results',
      verifyDesc: 'screenshot returns the current view as PNG base64. evaluate <script> runs JavaScript and returns the result. Both are useful for checking state.',
      tabsTitle: 'list / activate / close — tab management',
      tabsDesc: 'Use list to see open tabs, activate <tab-id> to switch, and close <tab-id> to close a tab.',
      waitTitle: 'wait — wait for load or condition',
      waitDesc: 'wait --load-state blocks until the page fully loads. wait --selector <css> waits until the element appears in the DOM; wait --text <text> waits until the text appears on the page. Use --timeout-ms to set a custom timeout.',
      consoleTitle: 'console — capture browser logs',
      consoleDesc: 'The console command returns browser console.log and console.error output. The last 200 messages are kept in a ring buffer, making it useful for debugging page scripts.',
      queryTitle: 'get / is — query page state',
      queryDesc: 'get title, get url, and get text <selector> return the page title, URL, or element text. is visible <selector> and is enabled <selector> check element state without interacting.',
      advancedTitle: 'Advanced targeting — CSS selectors, --snapshot-after, --tab',
      advancedDesc: 'CSS selectors let you target elements without a ref number (e.g., click "#login-btn"). Add --snapshot-after to navigate or click to automatically return a snapshot after the action. Use --tab <tab-id> to explicitly target a specific tab.',
      exampleLine1: '# 1) Open a tab the first time',
      exampleLine2: '$ clix-browser open https://localhost:3000',
      exampleLine3: '# 2) Wait for the page to fully load',
      exampleLine4: '$ clix-browser wait --load-state',
      exampleLine5: '# 3) Inspect interactive elements',
      exampleLine6: '$ clix-browser snapshot',
      exampleLine7: '# 4) Click by ref number or CSS selector',
      exampleLine8: '$ clix-browser click 9',
      exampleLine9: '$ clix-browser click "#submit"',
      exampleLine10: '# 5) Wait for an element to appear',
      exampleLine11: '$ clix-browser wait --selector ".success-msg"',
      exampleLine12: '# 6) Capture browser console logs',
      exampleLine13: '$ clix-browser console',
      exampleLine14: '# 7) Verify the result',
      exampleLine15: '$ clix-browser screenshot',
      exampleLine16: '# Navigate within the same tab',
      exampleLine17: '$ clix-browser navigate https://localhost:3000/dashboard',
      nextStep: 'After browser automation, continue to the next section for session alerts, reconnect flows, diagnostics, and backup.',
    },
```

---

- [ ] **Step 3: TypeScript 빌드 확인**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web
npm run build 2>&1 | tail -15
```
Expected: 오류 없이 빌드 완료

---

- [ ] **Step 4: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat(i18n): update en.ts — remove demoComment, add wait/console/query/advanced guide keys, expand examples to 17 lines"
```

---

## Task 4: BrowserGuide.astro — 4개 섹션 추가 및 예제 코드 확장

**Files:**
- Modify: `src/components/guide/sections/BrowserGuide.astro`

---

- [ ] **Step 1: sections 배열에 4개 항목 추가**

`src/components/guide/sections/BrowserGuide.astro`의 `{[...].map(...)` 블록에서 기존 마지막 항목 뒤에 4개를 추가한다.

기존 마지막 항목:
```astro
    { titleKey: 'guide.browser.tabsTitle',     descKey: 'guide.browser.tabsDesc',     titleDefault: guide.tabsTitle,     descDefault: guide.tabsDesc },
```

이 줄 뒤에 다음을 추가한다:
```astro
    { titleKey: 'guide.browser.waitTitle',     descKey: 'guide.browser.waitDesc',     titleDefault: guide.waitTitle,     descDefault: guide.waitDesc },
    { titleKey: 'guide.browser.consoleTitle',  descKey: 'guide.browser.consoleDesc',  titleDefault: guide.consoleTitle,  descDefault: guide.consoleDesc },
    { titleKey: 'guide.browser.queryTitle',    descKey: 'guide.browser.queryDesc',    titleDefault: guide.queryTitle,    descDefault: guide.queryDesc },
    { titleKey: 'guide.browser.advancedTitle', descKey: 'guide.browser.advancedDesc', titleDefault: guide.advancedTitle, descDefault: guide.advancedDesc },
```

---

- [ ] **Step 2: 예제 코드 블록을 17줄로 교체**

기존 `<div class="guide-code">` 블록 전체를 아래로 교체한다:

```astro
  <div class="guide-code">
    <div class="guide-code-line-muted" data-i18n="guide.browser.exampleLine1">{guide.exampleLine1}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine2">{guide.exampleLine2}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine3">{guide.exampleLine3}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine4">{guide.exampleLine4}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine5">{guide.exampleLine5}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine6">{guide.exampleLine6}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine7">{guide.exampleLine7}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine8">{guide.exampleLine8}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine9">{guide.exampleLine9}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine10">{guide.exampleLine10}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine11">{guide.exampleLine11}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine12">{guide.exampleLine12}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine13">{guide.exampleLine13}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine14">{guide.exampleLine14}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine15">{guide.exampleLine15}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine16">{guide.exampleLine16}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine17">{guide.exampleLine17}</div>
  </div>
```

---

- [ ] **Step 3: 빌드 확인**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web
npm run build 2>&1 | tail -10
```
Expected: 오류 없음

---

- [ ] **Step 4: Commit**

```bash
git add src/components/guide/sections/BrowserGuide.astro
git commit -m "feat(guide): add wait/console/query/advanced sections, expand example to 17 lines"
```

---

## Task 5: 최종 검증 및 Push

**Files:** 없음 (검증 및 push만)

---

- [ ] **Step 1: 전체 빌드 확인**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web
npm run build 2>&1 | tail -20
```
Expected: 오류 없음

---

- [ ] **Step 2: demoComment 잔재 확인**

```bash
grep -r 'demoComment' src/
```
Expected: 아무 출력 없음

---

- [ ] **Step 3: 새 i18n 키 연결 확인**

```bash
grep 'waitTitle\|consoleTitle\|queryTitle\|advancedTitle' src/i18n/en.ts src/i18n/ko.ts
```
Expected: 각 파일에서 4줄씩 총 8줄 출력

```bash
grep 'exampleLine17' src/i18n/en.ts src/i18n/ko.ts src/components/guide/sections/BrowserGuide.astro
```
Expected: 3줄 출력 (각 파일에 존재 확인)

---

- [ ] **Step 4: Push**

```bash
git push origin main
```
Expected: `main -> main` 성공 메시지
