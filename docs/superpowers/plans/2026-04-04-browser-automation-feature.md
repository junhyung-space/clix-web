# Browser Automation Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `clix-browser` as a standalone feature section on the main page and a dedicated guide section, including all i18n keys (en + ko) and a new `globe` icon.

**Architecture:** Follow existing component patterns exactly — `BrowserAutomation.astro` mirrors `TerminalWorkspace.astro` (left/right split), `BrowserGuide.astro` mirrors `AIIntegrationGuide.astro`. i18n keys added to both `en.ts` and `ko.ts` simultaneously. No new abstractions.

**Tech Stack:** Astro, Tailwind CSS, TypeScript (i18n type system)

---

## File Map

| Action | File | What changes |
|--------|------|--------------|
| Modify | `src/i18n/ko.ts` | Add `browser` and `guide.browser` + `guide.sidebar.browser` keys (source of truth for `Translations` type) |
| Modify | `src/i18n/en.ts` | Add same keys with English values |
| Modify | `src/components/SectionIconBadge.astro` | Add `globe` to Props union type + SVG + theme color |
| Create | `src/components/BrowserAutomation.astro` | New main-page section component |
| Modify | `src/pages/index.astro` | Import and insert `BrowserAutomation` after `AIIntegration` |
| Create | `src/components/guide/sections/BrowserGuide.astro` | New guide section component |
| Modify | `src/components/guide/GuideSidebar.astro` | Add `browser` entry after `ai-integration` |
| Modify | `src/pages/guide.astro` | Import `BrowserGuide`, add `'browser'` to `SECTIONS`, insert component |

---

## Task 1: Add i18n keys to `ko.ts`

`ko.ts` defines the `Translations` type used by `en.ts`. Adding keys here first ensures the type is updated before `en.ts` references it.

**Files:**
- Modify: `src/i18n/ko.ts`

- [ ] **Step 1: Add `browser` top-level key after `ai` block**

In `ko.ts`, after the closing `},` of the `ai: { ... }` block (around line 38), add:

```ts
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
    demoComment: '# AI 에이전트가 브라우저를 직접 제어',
  },
```

- [ ] **Step 2: Add `guide.sidebar.browser` key**

In the `guide.sidebar` object (around line 106), add `browser` after `ai`:

```ts
      ai: 'AI 도구 사용',
      browser: '브라우저 자동화',
      backup: '알림·복구·백업',
```

- [ ] **Step 3: Add `guide.browser` block**

In the `guide` object, after the `ai: { ... }` block and before `backup:`, add:

```ts
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
      snapshotDesc: 'snapshot은 현재 페이지의 클릭 가능한 요소와 ref 번호를 출력합니다. 페이지가 바뀌면 ref 번호가 달라지므로 조작 전에 다시 실행합니다.',
      interactTitle: 'click / fill / press — 요소 조작',
      interactDesc: 'snapshot의 ref 번호로 click, fill, press를 실행합니다. fill <ref> <text>는 입력 필드에 텍스트를 입력하고, press는 Enter, Escape, Tab 같은 키를 전송합니다.',
      verifyTitle: 'screenshot / evaluate — 결과 검증',
      verifyDesc: 'screenshot은 현재 화면을 PNG base64로 반환합니다. evaluate <script>는 JavaScript를 실행하고 결과를 반환합니다. 두 명령 모두 상태 확인에 씁니다.',
      tabsTitle: 'list / activate / close — 탭 관리',
      tabsDesc: 'list로 열린 탭 목록을 확인하고, activate <tab-id>로 탭을 전환하고, close <tab-id>로 탭을 닫습니다.',
      exampleLine1: '# 1) 탭을 처음 한 번 엽니다',
      exampleLine2: '$ clix-browser open https://localhost:3000',
      exampleLine3: '# 2) 인터랙티브 요소를 확인합니다',
      exampleLine4: '$ clix-browser snapshot',
      exampleLine5: '# 3) ref 번호로 요소를 클릭합니다',
      exampleLine6: '$ clix-browser click 9',
      exampleLine7: '# 4) 결과를 스크린샷으로 확인합니다',
      exampleLine8: '$ clix-browser screenshot',
      exampleLine9: '# 이후 URL 이동은 navigate를 씁니다',
      exampleLine10: '$ clix-browser navigate https://localhost:3000/dashboard',
      nextStep: '브라우저 자동화 흐름을 익혔다면 다음 섹션에서 알림, 세션 복구, 백업 흐름을 확인하세요.',
    },
```

- [ ] **Step 4: Verify `ko.ts` has no TypeScript errors**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing errors unrelated to i18n)

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ko.ts
git commit -m "feat: add browser automation i18n keys to ko.ts"
```

---

## Task 2: Add i18n keys to `en.ts`

`en.ts` implements the `Translations` type defined in `ko.ts`. Add the same keys with English values.

**Files:**
- Modify: `src/i18n/en.ts`

- [ ] **Step 1: Add `browser` top-level key after `ai` block**

In `en.ts`, after the closing `},` of the `ai: { ... }` block (around line 37), add:

```ts
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
    demoComment: '# AI agent controls the browser directly',
  },
```

- [ ] **Step 2: Add `guide.sidebar.browser` key**

In `en.ts`, inside `guide.sidebar`, add `browser` after `ai`:

```ts
      ai: 'AI Tool Usage',
      browser: 'Browser Automation',
      backup: 'Alerts, Recovery & Backup',
```

- [ ] **Step 3: Add `guide.browser` block**

In `en.ts`, in the `guide` object, after the `ai: { ... }` block and before `backup:`, add:

```ts
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
      snapshotDesc: 'snapshot prints clickable elements with their ref numbers. Ref numbers reset on navigation, so run snapshot again before interacting.',
      interactTitle: 'click / fill / press — interact with elements',
      interactDesc: 'Use the ref number from snapshot with click, fill, or press. fill <ref> <text> sets input text; press sends keys like Enter, Escape, or Tab.',
      verifyTitle: 'screenshot / evaluate — verify results',
      verifyDesc: 'screenshot returns the current view as PNG base64. evaluate <script> runs JavaScript and returns the result. Both are useful for checking state.',
      tabsTitle: 'list / activate / close — tab management',
      tabsDesc: 'Use list to see open tabs, activate <tab-id> to switch, and close <tab-id> to close a tab.',
      exampleLine1: '# 1) Open a tab the first time',
      exampleLine2: '$ clix-browser open https://localhost:3000',
      exampleLine3: '# 2) Inspect interactive elements',
      exampleLine4: '$ clix-browser snapshot',
      exampleLine5: '# 3) Click an element by ref number',
      exampleLine6: '$ clix-browser click 9',
      exampleLine7: '# 4) Verify the result',
      exampleLine8: '$ clix-browser screenshot',
      exampleLine9: '# Navigate within the same tab',
      exampleLine10: '$ clix-browser navigate https://localhost:3000/dashboard',
      nextStep: 'After browser automation, continue to the next section for session alerts, reconnect flows, diagnostics, and backup.',
    },
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add browser automation i18n keys to en.ts"
```

---

## Task 3: Add `globe` icon to `SectionIconBadge.astro`

**Files:**
- Modify: `src/components/SectionIconBadge.astro`

- [ ] **Step 1: Add `globe` to the Props union type**

Find this line (around line 3):

```ts
  name:
    | 'bolt'
    | 'bell'
    | 'route'
    | 'layers'
    | 'history'
    | 'terminal'
    | 'collection'
    | 'key'
    | 'network'
    | 'tunnel'
    | 'archive'
    | 'search';
```

Replace with:

```ts
  name:
    | 'bolt'
    | 'bell'
    | 'route'
    | 'layers'
    | 'history'
    | 'terminal'
    | 'collection'
    | 'key'
    | 'network'
    | 'tunnel'
    | 'archive'
    | 'search'
    | 'globe';
```

- [ ] **Step 2: Add `globe` theme to `themeByName`**

Inside `themeByName`, after the `search` entry, add:

```ts
  globe: {
    color: '#34D399',
    background: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.24)',
  },
```

- [ ] **Step 3: Add `globe` SVG**

After the `{name === 'search' && ( ... )}` block, add:

```astro
    {name === 'globe' && (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" />
        <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
        <path d="M3 12h18" />
        <path d="M3.6 8h16.8" />
        <path d="M3.6 16h16.8" />
      </>
    )}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionIconBadge.astro
git commit -m "feat: add globe icon to SectionIconBadge"
```

---

## Task 4: Create `BrowserAutomation.astro` main-page section

Follow `TerminalWorkspace.astro` exactly — left text + right code demo block.

**Files:**
- Create: `src/components/BrowserAutomation.astro`

- [ ] **Step 1: Create the component**

```astro
---
import SectionIconBadge from './SectionIconBadge.astro';
import { en } from '../i18n/en';

const features = [
  { icon: 'globe',    titleKey: 'browser.feat1Title', descKey: 'browser.feat1Desc',
    titleDefault: en.browser.feat1Title, descDefault: en.browser.feat1Desc },
  { icon: 'terminal', titleKey: 'browser.feat2Title', descKey: 'browser.feat2Desc',
    titleDefault: en.browser.feat2Title, descDefault: en.browser.feat2Desc },
  { icon: 'search',   titleKey: 'browser.feat3Title', descKey: 'browser.feat3Desc',
    titleDefault: en.browser.feat3Title, descDefault: en.browser.feat3Desc },
];
---

<section
  class="border-t border-white/[0.04] bg-bg-secondary px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
>
  <div class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

    <!-- Left: Text -->
    <div>
      <span
        class="inline-block bg-blue-muted/15 border border-blue-muted/30 text-blue-accent
               text-[10px] font-bold tracking-[3px] uppercase px-2.5 py-0.5 rounded mb-3"
        data-i18n="browser.label"
      >{en.browser.label}</span>
      <h2 class="mb-3 text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl">
        <span class="grad-text" data-i18n="browser.title1">{en.browser.title1}</span>
        <br />
        <span class="grad-text" data-i18n="browser.title2">{en.browser.title2}</span>
      </h2>
      <p class="text-sm leading-relaxed text-white/72" data-i18n="browser.sub">
        {en.browser.sub}
      </p>

      <div class="mt-8 flex flex-col gap-5">
        {features.map(f => (
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <SectionIconBadge name={f.icon as any} size="sm" />
            </div>
            <div>
              <h4 class="text-sm font-semibold text-text-primary mb-1" data-i18n={f.titleKey}>
                {f.titleDefault}
              </h4>
              <p class="text-xs leading-relaxed text-white/68" data-i18n={f.descKey}>
                {f.descDefault}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

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

  </div>
</section>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/BrowserAutomation.astro
git commit -m "feat: add BrowserAutomation section component"
```

---

## Task 5: Insert `BrowserAutomation` into `index.astro`

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add import and insert component**

Replace the current `index.astro` content with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import AIIntegration from '../components/AIIntegration.astro';
import BrowserAutomation from '../components/BrowserAutomation.astro';
import TerminalWorkspace from '../components/TerminalWorkspace.astro';
import SSHManagement from '../components/SSHManagement.astro';
import AppPreview from '../components/AppPreview.astro';
import Download from '../components/Download.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <AppPreview />
    <AIIntegration />
    <BrowserAutomation />
    <TerminalWorkspace />
    <SSHManagement />
    <Download />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Build to verify no Astro errors**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npm run build 2>&1 | tail -20
```

Expected: build completes without errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: insert BrowserAutomation section into main page"
```

---

## Task 6: Create `BrowserGuide.astro` guide section

Follow `AIIntegrationGuide.astro` exactly — same `guide-section guide-shell` wrapper, `guide-section-block` per topic, `guide-code` for code example.

**Files:**
- Create: `src/components/guide/sections/BrowserGuide.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { en } from '../../../i18n/en';

const guide = en.guide.browser;
---
<div id="browser" class="guide-section guide-shell">
  <p class="guide-kicker text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase" data-i18n="guide.browser.label">{guide.label}</p>
  <h2 class="guide-title" data-i18n="guide.browser.title">{guide.title}</h2>
  <p class="guide-copy" data-i18n="guide.browser.sub">
    {guide.sub}
  </p>

  <div class="guide-summary">
    <p class="guide-summary-title" data-i18n="guide.common.whatYoullDo">{en.guide.common.whatYoullDo}</p>
    <ul class="guide-summary-list">
      <li data-i18n="guide.browser.openTitle">{guide.openTitle}</li>
      <li data-i18n="guide.browser.snapshotTitle">{guide.snapshotTitle}</li>
      <li data-i18n="guide.browser.interactTitle">{guide.interactTitle}</li>
      <li data-i18n="guide.browser.verifyTitle">{guide.verifyTitle}</li>
    </ul>
  </div>

  {[
    { titleKey: 'guide.browser.scopeTitle',    descKey: 'guide.browser.scopeDesc',    titleDefault: guide.scopeTitle,    descDefault: guide.scopeDesc },
    { titleKey: 'guide.browser.workflowTitle', descKey: 'guide.browser.workflowDesc', titleDefault: guide.workflowTitle, descDefault: guide.workflowDesc },
    { titleKey: 'guide.browser.openTitle',     descKey: 'guide.browser.openDesc',     titleDefault: guide.openTitle,     descDefault: guide.openDesc },
    { titleKey: 'guide.browser.snapshotTitle', descKey: 'guide.browser.snapshotDesc', titleDefault: guide.snapshotTitle, descDefault: guide.snapshotDesc },
    { titleKey: 'guide.browser.interactTitle', descKey: 'guide.browser.interactDesc', titleDefault: guide.interactTitle, descDefault: guide.interactDesc },
    { titleKey: 'guide.browser.verifyTitle',   descKey: 'guide.browser.verifyDesc',   titleDefault: guide.verifyTitle,   descDefault: guide.verifyDesc },
    { titleKey: 'guide.browser.tabsTitle',     descKey: 'guide.browser.tabsDesc',     titleDefault: guide.tabsTitle,     descDefault: guide.tabsDesc },
  ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
    <section class="guide-section-block">
      <h3 class="guide-subtitle" data-i18n={titleKey}>{titleDefault}</h3>
      <p class="guide-prose" data-i18n={descKey}>{descDefault}</p>
    </section>
  ))}

  <div class="guide-code">
    <div class="guide-code-line-muted" data-i18n="guide.browser.exampleLine1">{guide.exampleLine1}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine2">{guide.exampleLine2}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine3">{guide.exampleLine3}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine4">{guide.exampleLine4}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine5">{guide.exampleLine5}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine6">{guide.exampleLine6}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine7">{guide.exampleLine7}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine8">{guide.exampleLine8}</div>
    <div class="guide-code-line-muted mt-2" data-i18n="guide.browser.exampleLine9">{guide.exampleLine9}</div>
    <div class="guide-code-line" data-i18n="guide.browser.exampleLine10">{guide.exampleLine10}</div>
  </div>

  <div class="guide-next">
    <p class="guide-next-label" data-i18n="guide.common.nextStep">{en.guide.common.nextStep}</p>
    <p class="guide-next-copy" data-i18n="guide.browser.nextStep">
      {guide.nextStep}
    </p>
  </div>
</div>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/guide/sections/BrowserGuide.astro
git commit -m "feat: add BrowserGuide section component"
```

---

## Task 7: Update `GuideSidebar.astro` and `guide.astro`

**Files:**
- Modify: `src/components/guide/GuideSidebar.astro`
- Modify: `src/pages/guide.astro`

- [ ] **Step 1: Add `browser` entry to sidebar array**

In `GuideSidebar.astro`, find the array mapping (around line 14). Add a `browser` entry after the `ai-integration` entry:

```ts
    { section: 'getting-started', key: 'guide.sidebar.gettingStarted', defaultText: en.guide.sidebar.gettingStarted },
    { section: 'ssh',             key: 'guide.sidebar.ssh',            defaultText: en.guide.sidebar.ssh },
    { section: 'port-forwarding', key: 'guide.sidebar.portForwarding', defaultText: en.guide.sidebar.portForwarding },
    { section: 'workspace',       key: 'guide.sidebar.workspace',      defaultText: en.guide.sidebar.workspace },
    { section: 'ai-integration',  key: 'guide.sidebar.ai',             defaultText: en.guide.sidebar.ai },
    { section: 'browser',         key: 'guide.sidebar.browser',        defaultText: en.guide.sidebar.browser },
    { section: 'backup',          key: 'guide.sidebar.backup',         defaultText: en.guide.sidebar.backup },
    { section: 'settings',        key: 'guide.sidebar.settings',       defaultText: en.guide.sidebar.settings },
```

- [ ] **Step 2: Update `guide.astro` — import and add to SECTIONS**

Replace the current `guide.astro` content with:

```astro
---
import GuideLayout from '../layouts/GuideLayout.astro';
import GettingStarted from '../components/guide/sections/GettingStarted.astro';
import SSHGuide from '../components/guide/sections/SSHGuide.astro';
import PortForwardingGuide from '../components/guide/sections/PortForwardingGuide.astro';
import WorkspaceGuide from '../components/guide/sections/WorkspaceGuide.astro';
import AIIntegrationGuide from '../components/guide/sections/AIIntegrationGuide.astro';
import BrowserGuide from '../components/guide/sections/BrowserGuide.astro';
import BackupGuide from '../components/guide/sections/BackupGuide.astro';
import SettingsGuide from '../components/guide/sections/SettingsGuide.astro';
---

<GuideLayout>
  <GettingStarted />
  <SSHGuide />
  <PortForwardingGuide />
  <WorkspaceGuide />
  <AIIntegrationGuide />
  <BrowserGuide />
  <BackupGuide />
  <SettingsGuide />
</GuideLayout>

<script>
  const SECTIONS = [
    'getting-started',
    'ssh',
    'port-forwarding',
    'workspace',
    'ai-integration',
    'browser',
    'backup',
    'settings',
  ] as const;

  type SectionId = (typeof SECTIONS)[number];

  function scrollToSectionStart(target: HTMLElement) {
    const nav = document.querySelector('nav');
    const navHeight = nav instanceof HTMLElement ? nav.getBoundingClientRect().height : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });
  }

  function showSection(id: SectionId, options?: { scrollToTop?: boolean }) {
    // Hide all sections
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) el.style.display = 'none';
    });

    // Show target section
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';

    // Update sidebar active state
    document.querySelectorAll<HTMLElement>('.guide-sidebar-item').forEach((btn) => {
      const isActive = btn.dataset.section === id;
      if (isActive) {
        btn.classList.add('!text-white', 'font-semibold', '!border-white/[0.08]', 'bg-white/[0.05]');
        btn.classList.remove('text-text-muted');
      } else {
        btn.classList.remove('!text-white', 'font-semibold', '!border-white/[0.08]', 'bg-white/[0.05]');
        btn.classList.remove('text-text-muted');
      }
    });

    // Update URL hash without scroll jump
    history.replaceState(null, '', `#${id}`);

    if (target instanceof HTMLElement && options?.scrollToTop) {
      requestAnimationFrame(() => scrollToSectionStart(target));
    }
  }

  function init() {
    const hash = window.location.hash.slice(1) as SectionId;
    const validHash = (SECTIONS as readonly string[]).includes(hash)
      ? (hash as SectionId)
      : 'getting-started';
    showSection(validHash);
  }

  document.querySelectorAll<HTMLElement>('.guide-sidebar-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section as SectionId;
      if (section && (SECTIONS as readonly string[]).includes(section)) {
        showSection(section, { scrollToTop: true });
      }
    });
  });

  init();
</script>

<style>
  :global(.guide-section) {
    display: none;
  }
</style>
```

- [ ] **Step 3: Build to verify no errors**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npm run build 2>&1 | tail -20
```

Expected: build completes without errors

- [ ] **Step 4: Commit**

```bash
git add src/components/guide/GuideSidebar.astro src/pages/guide.astro
git commit -m "feat: add browser automation to guide sidebar and guide page"
```

---

## Self-Review

**Spec coverage:**
- [x] `BrowserAutomation.astro` — 좌우 분할, AI Integration 다음 배치
- [x] `BrowserGuide.astro` — 별도 가이드 섹션, AI Tool Usage 다음
- [x] `globe` 아이콘 — SectionIconBadge에 추가
- [x] `en.ts` + `ko.ts` 동시 업데이트
- [x] 사이드바 `browser` 항목 추가
- [x] `guide.astro` SECTIONS 배열 업데이트

**Placeholder scan:** 없음 — 모든 i18n 값, SVG, 컴포넌트 코드 완전히 작성됨

**Type consistency:**
- `en.browser.*` 키는 Task 2에서 정의, Task 4에서 `en.browser.feat1Title` 등으로 사용 — 일치
- `en.guide.browser.*` 키는 Task 2에서 정의, Task 6에서 `guide.exampleLine1` 등으로 사용 — 일치
- `SectionIconBadge` `name` prop: Task 3에서 `'globe'` 추가, Task 4에서 `as any` 캐스트로 사용 — 타입 안전성 유지
- `SECTIONS` 배열: Task 7에서 `'browser'` 추가, `GuideSidebar`의 `section: 'browser'`와 `BrowserGuide`의 `id="browser"` — 모두 일치
