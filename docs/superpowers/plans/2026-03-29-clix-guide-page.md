# CLIX Guide Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/guide` documentation page with a sidebar navigation that switches between 7 content sections (Getting Started, AI Integration, Workspace, SSH, Port Forwarding, Backup, Settings) using client-side JS, with KO/EN i18n support matching the landing page.

**Architecture:** Single Astro page (`src/pages/guide.astro`) that reuses `Layout.astro` for the HTML shell and i18n script. A `GuideLayout.astro` wraps the Nav + sidebar + content area. All 7 section components are rendered in HTML but shown/hidden by a client-side script that reads `data-section` attributes and `window.location.hash`.

**Tech Stack:** Astro v5, Tailwind CSS v3, TypeScript — identical to the existing landing page stack. No new dependencies required.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/i18n/ko.ts` | Add `nav.guide` + `guide.*` translation keys |
| Modify | `src/i18n/en.ts` | Add `nav.guide` + `guide.*` translation keys (English) |
| Modify | `src/components/Nav.astro` | Add "가이드" link; highlight active when on `/guide` |
| Create | `src/layouts/GuideLayout.astro` | Page shell: Layout.astro + Nav + sidebar + content `<slot />` |
| Create | `src/components/guide/GuideSidebar.astro` | Left sidebar with `data-section` buttons |
| Create | `src/components/guide/sections/GettingStarted.astro` | 시작하기 section |
| Create | `src/components/guide/sections/AIIntegrationGuide.astro` | AI 도구 연동 section |
| Create | `src/components/guide/sections/WorkspaceGuide.astro` | 터미널 워크스페이스 section |
| Create | `src/components/guide/sections/SSHGuide.astro` | 호스트 & SSH 관리 section |
| Create | `src/components/guide/sections/PortForwardingGuide.astro` | 포트 포워딩 section |
| Create | `src/components/guide/sections/BackupGuide.astro` | 백업 & 복원 section |
| Create | `src/components/guide/sections/SettingsGuide.astro` | 설정 section |
| Create | `src/pages/guide.astro` | Assembles GuideLayout + all 7 sections + JS switching script |

---

## Task 1: Add i18n translation keys

**Files:**
- Modify: `src/i18n/ko.ts`
- Modify: `src/i18n/en.ts`

- [ ] **Step 1: Add guide keys to ko.ts**

Add the `nav.guide` key and the full `guide` namespace inside the `ko` object, before the closing `} as const`:

```typescript
// In ko.ts — add `guide: '가이드'` to nav, and add the guide block

export const ko = {
  nav: {
    download: '출시 예정',
    guide: '가이드',          // ← ADD THIS
  },

  // ... (all existing keys unchanged) ...

  // Guide Page                // ← ADD THIS ENTIRE BLOCK
  guide: {
    sidebar: {
      label: '가이드',
      featuresLabel: '기능',
      otherLabel: '기타',
      gettingStarted: '시작하기',
      ai: 'AI 도구 연동',
      workspace: '터미널 워크스페이스',
      ssh: '호스트 & SSH 관리',
      portForwarding: '포트 포워딩',
      backup: '백업 & 복원',
      settings: '설정',
    },
    gettingStarted: {
      label: '시작하기',
      title: '설치부터 첫 연결까지',
      sub: 'CLIX를 설치하고 첫 번째 서버에 접속하는 방법을 안내합니다. 셸 통합은 앱 실행 시 자동으로 설정됩니다.',
      step1Title: 'DMG 파일 다운로드',
      step1Desc: '다운로드 페이지에서 최신 버전의 clix.dmg를 받아 앱 폴더에 설치합니다.',
      step2Title: '앱 실행 → 셸 통합 자동 설정',
      step2Desc: '처음 실행하면 shell-integration.zsh 설치 여부를 묻습니다. 허용하면 clix-notify, clix-handoff, clix-sessions가 자동으로 등록됩니다.',
      step3Title: '첫 번째 호스트 추가',
      step3Desc: '사이드바 하단 + 버튼을 눌러 호스트 정보를 입력하고 저장합니다. 저장 후 클릭하면 바로 연결됩니다.',
      tipTitle: '셸 통합 확인하기',
      tipDesc: '터미널에서 clix-notify "테스트"를 실행해보세요. CLIX 앱에 알림이 오면 정상입니다.',
    },
    ai: {
      label: 'AI 도구 연동',
      title: 'AI 코딩 도구 연동',
      sub: '처음 실행 시 Claude Code, Codex, Gemini CLI 설정을 자동으로 잡아줍니다.',
      zeroConfigTitle: 'Zero-config 훅 자동 설정',
      zeroConfigDesc: '앱을 처음 실행하면 Claude Code, Codex, Gemini CLI 설정 파일을 찾아 clix-notify 훅을 자동으로 등록합니다. 별도 설정 없이 바로 사용할 수 있습니다.',
      notifyTitle: 'clix-notify — 인앱 알림',
      notifyDesc: '터미널에서 clix-notify 명령어로 CLIX 앱 안에 알림을 보낼 수 있습니다. AI 도구 작업이 끝나면 자동으로 호출됩니다.',
      handoffTitle: 'clix-handoff — 세션 핸드오프',
      handoffDesc: '다른 탭의 작업 디렉토리에서 AI 도구를 이어서 실행합니다. clix-sessions로 열린 세션 목록을 확인하고 원하는 탭으로 핸드오프할 수 있습니다.',
      sessionsTitle: 'clix-sessions — 세션 목록',
      sessionsDesc: '현재 열린 모든 CLIX 세션과 작업 디렉토리를 확인합니다.',
    },
    workspace: {
      label: '터미널 워크스페이스',
      title: '탭과 분할 패인',
      sub: '여러 서버를 한 화면에서 보며 작업하고, 재시작해도 그 상태 그대로 돌아옵니다.',
      tabTitle: '탭 생성 & 전환',
      tabDesc: '상단 탭 바에서 새 탭을 열거나 기존 탭을 전환합니다. 각 탭은 독립적인 SSH 세션을 유지합니다.',
      paneTitle: '패인 분할',
      paneDesc: '탭을 가로 또는 세로로 분할해 여러 세션을 한 화면에서 볼 수 있습니다.',
      recoveryTitle: '워크스페이스 복구',
      recoveryDesc: '앱을 다시 실행하면 마지막으로 열려 있던 탭과 작업 디렉토리를 자동으로 복구합니다.',
    },
    ssh: {
      label: '호스트 & SSH 관리',
      title: '호스트와 자격증명 관리',
      sub: '호스트, SSH 키, 점프 호스트, 컬렉션까지 한 곳에서 관리합니다.',
      addHostTitle: '호스트 추가',
      addHostDesc: '사이드바 하단 + 버튼 → 호스트명, IP, 포트, 사용자명을 입력합니다. 자격증명은 SSH 키 또는 비밀번호로 설정할 수 있습니다.',
      credTitle: 'SSH 키 & 자격증명',
      credDesc: 'SSH 키와 PEM 파일은 macOS Keychain에 안전하게 저장됩니다. 자격증명 뷰에서 한 번에 관리할 수 있습니다.',
      jumpTitle: '점프 호스트',
      jumpDesc: '배스천 서버를 거쳐 내부 서버에 접속하는 경로를 미리 설정합니다. 호스트 편집 → Route 탭에서 설정합니다.',
      collectionsTitle: '컬렉션 & 검색',
      collectionsDesc: '서버를 Production, Staging, Personal 그룹으로 나누고 태그와 즐겨찾기를 활용합니다. 별칭, 호스트명, 태그를 통합 검색할 수 있습니다.',
    },
    portForwarding: {
      label: '포트 포워딩',
      title: '포트 포워딩 설정',
      sub: '로컬, 리모트, 다이나믹(SOCKS) 포워딩 규칙을 UI에서 간단하게 설정합니다.',
      typesTitle: '포워딩 종류',
      typesDesc: '로컬(Local): 원격 포트를 로컬로 포워딩 · 리모트(Remote): 로컬 포트를 원격으로 노출 · 다이나믹(SOCKS): SOCKS5 프록시',
      createTitle: '규칙 만들기',
      createDesc: '호스트 편집 → Port Forwarding 탭 → + 버튼으로 규칙을 추가합니다. 포트 충돌은 자동으로 감지됩니다.',
      autoStartTitle: '자동 시작',
      autoStartDesc: '규칙에 자동 시작을 켜두면 호스트에 연결할 때 포워딩이 자동으로 시작됩니다.',
    },
    backup: {
      label: '백업 & 복원',
      title: '데이터 백업과 복원',
      sub: '호스트, 자격증명, 라우팅 설정을 JSON으로 내보내고 다른 기기에서 가져올 수 있습니다.',
      exportTitle: '내보내기',
      exportDesc: 'CLIX 메뉴 → Backup → Export를 선택합니다. 호스트, 자격증명, 라우팅 정보가 JSON 파일로 저장됩니다.',
      importTitle: '가져오기',
      importDesc: '다른 기기에 CLIX를 설치한 뒤 CLIX 메뉴 → Backup → Import로 JSON 파일을 불러옵니다.',
    },
    settings: {
      label: '설정',
      title: '앱 설정',
      sub: '셸 통합, dotfile 자동 수정 등 앱 동작 방식을 조정합니다.',
      shellTitle: '셸 통합',
      shellDesc: 'clix-notify, clix-handoff, clix-sessions 명령어의 자동 등록 여부를 설정합니다. Settings → General에서 변경할 수 있습니다.',
      dotfileTitle: 'Dotfile 자동 수정',
      dotfileDesc: '앱이 .zshrc에 셸 통합 스크립트를 자동으로 추가하는 기능을 켜고 끌 수 있습니다.',
    },
  },
} as const;
```

- [ ] **Step 2: Add guide keys to en.ts**

Add the same structure with English text. In `en.ts`, add `nav.guide` and the `guide` block:

```typescript
// In en.ts — add guide key to nav, and add the guide block

export const en: Translations = {
  nav: {
    download: 'Coming Soon',
    guide: 'Guide',            // ← ADD THIS
  },

  // ... (all existing keys unchanged) ...

  guide: {                     // ← ADD THIS ENTIRE BLOCK
    sidebar: {
      label: 'Guide',
      featuresLabel: 'Features',
      otherLabel: 'Other',
      gettingStarted: 'Getting Started',
      ai: 'AI Tool Integration',
      workspace: 'Terminal Workspace',
      ssh: 'Hosts & SSH',
      portForwarding: 'Port Forwarding',
      backup: 'Backup & Restore',
      settings: 'Settings',
    },
    gettingStarted: {
      label: 'Getting Started',
      title: 'From install to first connection',
      sub: 'How to install CLIX and connect to your first server. Shell integration is configured automatically on first launch.',
      step1Title: 'Download the DMG',
      step1Desc: 'Download the latest clix.dmg from the download page and install it to your Applications folder.',
      step2Title: 'Launch → shell integration auto-setup',
      step2Desc: 'On first launch, CLIX asks to install shell-integration.zsh. Allow it to automatically register clix-notify, clix-handoff, and clix-sessions.',
      step3Title: 'Add your first host',
      step3Desc: 'Click the + button at the bottom of the sidebar, fill in the host details, and save. Click the host to connect immediately.',
      tipTitle: 'Verify shell integration',
      tipDesc: 'Run clix-notify "test" in your terminal. If a notification appears in CLIX, everything is working.',
    },
    ai: {
      label: 'AI Tool Integration',
      title: 'AI coding tool integration',
      sub: 'On first launch, CLIX auto-configures hooks for Claude Code, Codex, and Gemini CLI.',
      zeroConfigTitle: 'Zero-config hook setup',
      zeroConfigDesc: 'On first launch, CLIX finds and configures clix-notify hooks in Claude Code, Codex, and Gemini CLI config files. No manual setup needed.',
      notifyTitle: 'clix-notify — In-app notifications',
      notifyDesc: 'Use clix-notify in your terminal to send notifications to the CLIX app. It is called automatically when AI tools finish a task.',
      handoffTitle: 'clix-handoff — Session handoff',
      handoffDesc: 'Resume an AI tool in another tab\'s working directory. Use clix-sessions to list open sessions, then hand off to the desired tab.',
      sessionsTitle: 'clix-sessions — Session list',
      sessionsDesc: 'Lists all currently open CLIX sessions and their working directories.',
    },
    workspace: {
      label: 'Terminal Workspace',
      title: 'Tabs and split panes',
      sub: 'Work across multiple servers at once. Restart and everything comes back exactly as you left it.',
      tabTitle: 'Creating and switching tabs',
      tabDesc: 'Open new tabs or switch between existing ones from the tab bar at the top. Each tab maintains its own SSH session.',
      paneTitle: 'Splitting panes',
      paneDesc: 'Split a tab horizontally or vertically to see multiple sessions side by side.',
      recoveryTitle: 'Workspace recovery',
      recoveryDesc: 'When you relaunch the app, CLIX automatically restores the tabs and working directories from your last session.',
    },
    ssh: {
      label: 'Hosts & SSH',
      title: 'Managing hosts and credentials',
      sub: 'Hosts, SSH keys, jump hosts, and collections — all in one place.',
      addHostTitle: 'Adding a host',
      addHostDesc: 'Click the + button in the sidebar → enter hostname, IP, port, and username. Set credentials to an SSH key or password.',
      credTitle: 'SSH keys & credentials',
      credDesc: 'SSH keys and PEM files are stored securely in macOS Keychain. Manage all credentials from the Credentials view.',
      jumpTitle: 'Jump hosts',
      jumpDesc: 'Pre-configure routes through bastion servers to reach internal hosts. Edit host → Route tab to set up a jump chain.',
      collectionsTitle: 'Collections & search',
      collectionsDesc: 'Organize servers into Production, Staging, Personal groups. Use tags and favorites for quick access. Search across aliases, hostnames, and tags.',
    },
    portForwarding: {
      label: 'Port Forwarding',
      title: 'Port forwarding rules',
      sub: 'Set up local, remote, and dynamic (SOCKS) forwarding rules from the UI.',
      typesTitle: 'Forwarding types',
      typesDesc: 'Local: forward a remote port to localhost · Remote: expose a local port on the remote · Dynamic: SOCKS5 proxy',
      createTitle: 'Creating a rule',
      createDesc: 'Edit host → Port Forwarding tab → click + to add a rule. Port conflicts are detected automatically.',
      autoStartTitle: 'Auto-start',
      autoStartDesc: 'Enable auto-start on a rule to have forwarding begin automatically whenever you connect to that host.',
    },
    backup: {
      label: 'Backup & Restore',
      title: 'Backing up and restoring data',
      sub: 'Export hosts, credentials, and routes as JSON. Import on any machine.',
      exportTitle: 'Exporting',
      exportDesc: 'CLIX menu → Backup → Export. Hosts, credentials, and routing config are saved to a JSON file.',
      importTitle: 'Importing',
      importDesc: 'Install CLIX on a new machine, then CLIX menu → Backup → Import to load the JSON file.',
    },
    settings: {
      label: 'Settings',
      title: 'App settings',
      sub: 'Adjust shell integration, dotfile modification, and other app behaviours.',
      shellTitle: 'Shell integration',
      shellDesc: 'Controls whether clix-notify, clix-handoff, and clix-sessions are auto-registered. Change in Settings → General.',
      dotfileTitle: 'Dotfile auto-modification',
      dotfileDesc: 'Toggle whether the app automatically adds the shell integration script to your .zshrc.',
    },
  },
};
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npm run build
```

Expected: `1 page(s) built` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/ko.ts src/i18n/en.ts
git commit -m "feat: add guide i18n translation keys (ko + en)"
```

---

## Task 2: Create section components (GettingStarted + AIIntegrationGuide)

**Files:**
- Create: `src/components/guide/sections/GettingStarted.astro`
- Create: `src/components/guide/sections/AIIntegrationGuide.astro`

> **Pattern shared by all sections:**
> - Outer `<div>` with `id="<section-id>"` and `class="guide-section"` (hidden by default via inline style; the JS in guide.astro shows the active one)
> - Section label → title → subtitle → content

- [ ] **Step 1: Create GettingStarted.astro**

```astro
---
---
<div id="getting-started" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.gettingStarted.label"
  >시작하기</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.gettingStarted.title"
  >설치부터 첫 연결까지</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.gettingStarted.sub"
  >CLIX를 설치하고 첫 번째 서버에 접속하는 방법을 안내합니다. 셸 통합은 앱 실행 시 자동으로 설정됩니다.</p>

  <!-- Steps -->
  <div class="flex flex-col gap-4 mb-8">
    {[
      { num: 1, titleKey: 'guide.gettingStarted.step1Title', descKey: 'guide.gettingStarted.step1Desc',
        titleDefault: 'DMG 파일 다운로드', descDefault: '다운로드 페이지에서 최신 버전의 clix.dmg를 받아 앱 폴더에 설치합니다.' },
      { num: 2, titleKey: 'guide.gettingStarted.step2Title', descKey: 'guide.gettingStarted.step2Desc',
        titleDefault: '앱 실행 → 셸 통합 자동 설정', descDefault: '처음 실행하면 shell-integration.zsh 설치 여부를 묻습니다.' },
      { num: 3, titleKey: 'guide.gettingStarted.step3Title', descKey: 'guide.gettingStarted.step3Desc',
        titleDefault: '첫 번째 호스트 추가', descDefault: '사이드바 하단 + 버튼을 눌러 호스트 정보를 입력합니다.' },
    ].map(({ num, titleKey, descKey, titleDefault, descDefault }) => (
      <div class="flex gap-4 items-start bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-4">
        <div class="w-6 h-6 rounded-full bg-blue-deep/20 border border-blue-muted/30 text-blue-accent text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {num}
        </div>
        <div>
          <h4 class="text-sm font-semibold text-text-primary mb-1" data-i18n={titleKey}>{titleDefault}</h4>
          <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
        </div>
      </div>
    ))}
  </div>

  <!-- Tip -->
  <div class="bg-blue-deep/[0.06] border border-blue-muted/20 rounded-xl p-4 mb-6">
    <p class="text-xs font-semibold text-blue-accent mb-1" data-i18n="guide.gettingStarted.tipTitle">셸 통합 확인하기</p>
    <p class="text-xs text-blue-muted/90 leading-relaxed" data-i18n="guide.gettingStarted.tipDesc">
      터미널에서 clix-notify "테스트"를 실행해보세요. CLIX 앱에 알림이 오면 정상입니다.
    </p>
  </div>

  <!-- Code block -->
  <div class="bg-[#0d1117] border border-blue-muted/20 rounded-xl p-4 font-mono text-xs">
    <div class="text-text-darkest"># 셸 통합 정상 동작 확인</div>
    <div class="text-green-500 mt-1">$ clix-notify "빌드 완료"</div>
    <div class="text-blue-muted mt-1">✓ 알림이 CLIX로 전송되었습니다</div>
  </div>
</div>
```

- [ ] **Step 2: Create AIIntegrationGuide.astro**

```astro
---
---
<div id="ai-integration" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.ai.label"
  >AI 도구 연동</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.ai.title"
  >AI 코딩 도구 연동</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.ai.sub"
  >처음 실행 시 Claude Code, Codex, Gemini CLI 설정을 자동으로 잡아줍니다.</p>

  <!-- Zero-config -->
  <div class="mb-6">
    <h3 class="text-base font-bold text-text-primary mb-2" data-i18n="guide.ai.zeroConfigTitle">Zero-config 훅 자동 설정</h3>
    <p class="text-xs text-text-muted leading-relaxed mb-3" data-i18n="guide.ai.zeroConfigDesc">
      앱을 처음 실행하면 Claude Code, Codex, Gemini CLI 설정 파일을 찾아 clix-notify 훅을 자동으로 등록합니다.
    </p>
    <div class="bg-[#0d1117] border border-blue-muted/20 rounded-xl p-4 font-mono text-xs">
      <div class="text-text-darkest"># 첫 실행 시 자동 설정됩니다</div>
      <div class="text-green-500 mt-1">✓ Claude Code hooks configured</div>
      <div class="text-green-500">✓ Codex hooks configured</div>
      <div class="text-green-500">✓ Gemini CLI hooks configured</div>
    </div>
  </div>

  <!-- clix-notify -->
  <div class="mb-6">
    <h3 class="text-base font-bold text-text-primary mb-2" data-i18n="guide.ai.notifyTitle">clix-notify — 인앱 알림</h3>
    <p class="text-xs text-text-muted leading-relaxed mb-3" data-i18n="guide.ai.notifyDesc">
      터미널에서 clix-notify 명령어로 CLIX 앱 안에 알림을 보낼 수 있습니다.
    </p>
    <div class="bg-[#0d1117] border border-blue-muted/20 rounded-xl p-4 font-mono text-xs">
      <div class="text-green-500">$ clix-notify "배포 완료" --kind completed</div>
      <div class="text-blue-muted mt-1">→ CLIX 사이드바에 알림이 표시됨</div>
    </div>
  </div>

  <!-- clix-handoff -->
  <div class="mb-6">
    <h3 class="text-base font-bold text-text-primary mb-2" data-i18n="guide.ai.handoffTitle">clix-handoff — 세션 핸드오프</h3>
    <p class="text-xs text-text-muted leading-relaxed mb-3" data-i18n="guide.ai.handoffDesc">
      다른 탭의 작업 디렉토리에서 AI 도구를 이어서 실행합니다.
    </p>
    <div class="bg-[#0d1117] border border-blue-muted/20 rounded-xl p-4 font-mono text-xs">
      <div class="text-green-500">$ clix-handoff tab-2 claude</div>
      <div class="text-blue-muted mt-1">→ tab-2 디렉토리에서 claude 실행</div>
    </div>
  </div>

  <!-- clix-sessions -->
  <div>
    <h3 class="text-base font-bold text-text-primary mb-2" data-i18n="guide.ai.sessionsTitle">clix-sessions — 세션 목록</h3>
    <p class="text-xs text-text-muted leading-relaxed mb-3" data-i18n="guide.ai.sessionsDesc">
      현재 열린 모든 CLIX 세션과 작업 디렉토리를 확인합니다.
    </p>
    <div class="bg-[#0d1117] border border-blue-muted/20 rounded-xl p-4 font-mono text-xs">
      <div class="text-green-500">$ clix-sessions</div>
      <div class="text-blue-muted mt-1">tab-1  server-a  /home/user/project</div>
      <div class="text-blue-muted">tab-2  server-b  /var/www/app</div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/guide/sections/GettingStarted.astro src/components/guide/sections/AIIntegrationGuide.astro
git commit -m "feat: add GettingStarted and AIIntegrationGuide section components"
```

---

## Task 3: Create section components (WorkspaceGuide + SSHGuide)

**Files:**
- Create: `src/components/guide/sections/WorkspaceGuide.astro`
- Create: `src/components/guide/sections/SSHGuide.astro`

- [ ] **Step 1: Create WorkspaceGuide.astro**

```astro
---
---
<div id="workspace" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.workspace.label"
  >터미널 워크스페이스</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.workspace.title"
  >탭과 분할 패인</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.workspace.sub"
  >여러 서버를 한 화면에서 보며 작업하고, 재시작해도 그 상태 그대로 돌아옵니다.</p>

  <div class="flex flex-col gap-5">
    {[
      { titleKey: 'guide.workspace.tabTitle', descKey: 'guide.workspace.tabDesc',
        titleDefault: '탭 생성 & 전환', descDefault: '상단 탭 바에서 새 탭을 열거나 기존 탭을 전환합니다.' },
      { titleKey: 'guide.workspace.paneTitle', descKey: 'guide.workspace.paneDesc',
        titleDefault: '패인 분할', descDefault: '탭을 가로 또는 세로로 분할해 여러 세션을 한 화면에서 볼 수 있습니다.' },
      { titleKey: 'guide.workspace.recoveryTitle', descKey: 'guide.workspace.recoveryDesc',
        titleDefault: '워크스페이스 복구', descDefault: '앱을 다시 실행하면 마지막으로 열려 있던 탭과 작업 디렉토리를 자동으로 복구합니다.' },
    ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
      <div class="bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-5">
        <h3 class="text-sm font-bold text-text-primary mb-2" data-i18n={titleKey}>{titleDefault}</h3>
        <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Create SSHGuide.astro**

```astro
---
---
<div id="ssh" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.ssh.label"
  >호스트 & SSH 관리</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.ssh.title"
  >호스트와 자격증명 관리</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.ssh.sub"
  >호스트, SSH 키, 점프 호스트, 컬렉션까지 한 곳에서 관리합니다.</p>

  <div class="flex flex-col gap-5">
    {[
      { titleKey: 'guide.ssh.addHostTitle', descKey: 'guide.ssh.addHostDesc',
        titleDefault: '호스트 추가', descDefault: '사이드바 하단 + 버튼 → 호스트명, IP, 포트, 사용자명을 입력합니다.' },
      { titleKey: 'guide.ssh.credTitle', descKey: 'guide.ssh.credDesc',
        titleDefault: 'SSH 키 & 자격증명', descDefault: 'SSH 키와 PEM 파일은 macOS Keychain에 안전하게 저장됩니다.' },
      { titleKey: 'guide.ssh.jumpTitle', descKey: 'guide.ssh.jumpDesc',
        titleDefault: '점프 호스트', descDefault: '배스천 서버를 거쳐 내부 서버에 접속하는 경로를 미리 설정합니다.' },
      { titleKey: 'guide.ssh.collectionsTitle', descKey: 'guide.ssh.collectionsDesc',
        titleDefault: '컬렉션 & 검색', descDefault: '서버를 Production, Staging, Personal 그룹으로 나누고 태그와 즐겨찾기를 활용합니다.' },
    ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
      <div class="bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-5">
        <h3 class="text-sm font-bold text-text-primary mb-2" data-i18n={titleKey}>{titleDefault}</h3>
        <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/guide/sections/WorkspaceGuide.astro src/components/guide/sections/SSHGuide.astro
git commit -m "feat: add WorkspaceGuide and SSHGuide section components"
```

---

## Task 4: Create remaining section components (PortForwarding, Backup, Settings)

**Files:**
- Create: `src/components/guide/sections/PortForwardingGuide.astro`
- Create: `src/components/guide/sections/BackupGuide.astro`
- Create: `src/components/guide/sections/SettingsGuide.astro`

- [ ] **Step 1: Create PortForwardingGuide.astro**

```astro
---
---
<div id="port-forwarding" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.portForwarding.label"
  >포트 포워딩</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.portForwarding.title"
  >포트 포워딩 설정</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.portForwarding.sub"
  >로컬, 리모트, 다이나믹(SOCKS) 포워딩 규칙을 UI에서 간단하게 설정합니다.</p>

  <div class="flex flex-col gap-5">
    {[
      { titleKey: 'guide.portForwarding.typesTitle', descKey: 'guide.portForwarding.typesDesc',
        titleDefault: '포워딩 종류',
        descDefault: '로컬(Local): 원격 포트를 로컬로 포워딩 · 리모트(Remote): 로컬 포트를 원격으로 노출 · 다이나믹(SOCKS): SOCKS5 프록시' },
      { titleKey: 'guide.portForwarding.createTitle', descKey: 'guide.portForwarding.createDesc',
        titleDefault: '규칙 만들기',
        descDefault: '호스트 편집 → Port Forwarding 탭 → + 버튼으로 규칙을 추가합니다. 포트 충돌은 자동으로 감지됩니다.' },
      { titleKey: 'guide.portForwarding.autoStartTitle', descKey: 'guide.portForwarding.autoStartDesc',
        titleDefault: '자동 시작',
        descDefault: '규칙에 자동 시작을 켜두면 호스트에 연결할 때 포워딩이 자동으로 시작됩니다.' },
    ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
      <div class="bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-5">
        <h3 class="text-sm font-bold text-text-primary mb-2" data-i18n={titleKey}>{titleDefault}</h3>
        <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Create BackupGuide.astro**

```astro
---
---
<div id="backup" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.backup.label"
  >백업 & 복원</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.backup.title"
  >데이터 백업과 복원</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.backup.sub"
  >호스트, 자격증명, 라우팅 설정을 JSON으로 내보내고 다른 기기에서 가져올 수 있습니다.</p>

  <div class="flex flex-col gap-5">
    {[
      { titleKey: 'guide.backup.exportTitle', descKey: 'guide.backup.exportDesc',
        titleDefault: '내보내기',
        descDefault: 'CLIX 메뉴 → Backup → Export를 선택합니다. 호스트, 자격증명, 라우팅 정보가 JSON 파일로 저장됩니다.' },
      { titleKey: 'guide.backup.importTitle', descKey: 'guide.backup.importDesc',
        titleDefault: '가져오기',
        descDefault: '다른 기기에 CLIX를 설치한 뒤 CLIX 메뉴 → Backup → Import로 JSON 파일을 불러옵니다.' },
    ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
      <div class="bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-5">
        <h3 class="text-sm font-bold text-text-primary mb-2" data-i18n={titleKey}>{titleDefault}</h3>
        <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Create SettingsGuide.astro**

```astro
---
---
<div id="settings" class="guide-section">
  <p
    class="text-blue-accent text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5"
    data-i18n="guide.settings.label"
  >설정</p>
  <h2
    class="text-3xl font-extrabold text-text-primary tracking-tight mb-3"
    data-i18n="guide.settings.title"
  >앱 설정</h2>
  <p
    class="text-sm text-text-muted leading-relaxed mb-8"
    data-i18n="guide.settings.sub"
  >셸 통합, dotfile 자동 수정 등 앱 동작 방식을 조정합니다.</p>

  <div class="flex flex-col gap-5">
    {[
      { titleKey: 'guide.settings.shellTitle', descKey: 'guide.settings.shellDesc',
        titleDefault: '셸 통합',
        descDefault: 'clix-notify, clix-handoff, clix-sessions 명령어의 자동 등록 여부를 설정합니다.' },
      { titleKey: 'guide.settings.dotfileTitle', descKey: 'guide.settings.dotfileDesc',
        titleDefault: 'Dotfile 자동 수정',
        descDefault: '앱이 .zshrc에 셸 통합 스크립트를 자동으로 추가하는 기능을 켜고 끌 수 있습니다.' },
    ].map(({ titleKey, descKey, titleDefault, descDefault }) => (
      <div class="bg-white/[0.02] border border-blue-muted/[0.14] rounded-xl p-5">
        <h3 class="text-sm font-bold text-text-primary mb-2" data-i18n={titleKey}>{titleDefault}</h3>
        <p class="text-xs text-text-muted leading-relaxed" data-i18n={descKey}>{descDefault}</p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/guide/sections/PortForwardingGuide.astro \
        src/components/guide/sections/BackupGuide.astro \
        src/components/guide/sections/SettingsGuide.astro
git commit -m "feat: add PortForwardingGuide, BackupGuide, SettingsGuide section components"
```

---

## Task 5: Create GuideSidebar component

**Files:**
- Create: `src/components/guide/GuideSidebar.astro`

- [ ] **Step 1: Create GuideSidebar.astro**

```astro
---
---
<aside
  class="w-[220px] flex-shrink-0 sticky top-[52px] h-[calc(100vh-52px)]
         overflow-y-auto border-r border-blue-muted/[0.14] bg-bg-primary/60 py-7"
>
  <!-- Label -->
  <p
    class="text-[9px] font-bold text-text-darkest uppercase tracking-[0.08em] px-5 mb-1.5"
    data-i18n="guide.sidebar.label"
  >가이드</p>

  <!-- Getting Started -->
  <button
    data-section="getting-started"
    class="guide-sidebar-item w-full flex items-center gap-2 px-5 py-[7px] text-[12.5px]
           text-text-muted text-left border-l-2 border-transparent
           hover:text-text-secondary hover:bg-white/[0.03] transition-colors duration-150"
  >
    <span class="w-[18px] text-center text-sm">🚀</span>
    <span data-i18n="guide.sidebar.gettingStarted">시작하기</span>
  </button>

  <!-- Divider -->
  <div class="h-px bg-blue-muted/[0.12] mx-5 my-3"></div>

  <!-- Features label -->
  <p
    class="text-[9px] font-bold text-text-darkest uppercase tracking-[0.08em] px-5 mb-1.5"
    data-i18n="guide.sidebar.featuresLabel"
  >기능</p>

  <!-- Feature items -->
  {[
    { section: 'ai-integration',  icon: '🤖', key: 'guide.sidebar.ai',              default: 'AI 도구 연동' },
    { section: 'workspace',       icon: '🖥',  key: 'guide.sidebar.workspace',       default: '터미널 워크스페이스' },
    { section: 'ssh',             icon: '🔐', key: 'guide.sidebar.ssh',             default: '호스트 & SSH 관리' },
    { section: 'port-forwarding', icon: '🚇', key: 'guide.sidebar.portForwarding',  default: '포트 포워딩' },
    { section: 'backup',          icon: '📦', key: 'guide.sidebar.backup',          default: '백업 & 복원' },
  ].map(({ section, icon, key, default: defaultText }) => (
    <button
      data-section={section}
      class="guide-sidebar-item w-full flex items-center gap-2 px-5 py-[7px] text-[12.5px]
             text-text-muted text-left border-l-2 border-transparent
             hover:text-text-secondary hover:bg-white/[0.03] transition-colors duration-150"
    >
      <span class="w-[18px] text-center text-sm">{icon}</span>
      <span data-i18n={key}>{defaultText}</span>
    </button>
  ))}

  <!-- Divider -->
  <div class="h-px bg-blue-muted/[0.12] mx-5 my-3"></div>

  <!-- Other label -->
  <p
    class="text-[9px] font-bold text-text-darkest uppercase tracking-[0.08em] px-5 mb-1.5"
    data-i18n="guide.sidebar.otherLabel"
  >기타</p>

  <button
    data-section="settings"
    class="guide-sidebar-item w-full flex items-center gap-2 px-5 py-[7px] text-[12.5px]
           text-text-muted text-left border-l-2 border-transparent
           hover:text-text-secondary hover:bg-white/[0.03] transition-colors duration-150"
  >
    <span class="w-[18px] text-center text-sm">⚙️</span>
    <span data-i18n="guide.sidebar.settings">설정</span>
  </button>
</aside>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/guide/GuideSidebar.astro
git commit -m "feat: add GuideSidebar component"
```

---

## Task 6: Create GuideLayout and guide.astro page

**Files:**
- Create: `src/layouts/GuideLayout.astro`
- Create: `src/pages/guide.astro`

- [ ] **Step 1: Create GuideLayout.astro**

```astro
---
import Layout from './Layout.astro';
import Nav from '../components/Nav.astro';
import GuideSidebar from '../components/guide/GuideSidebar.astro';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'CLIX 가이드',
  description = 'CLIX 사용 가이드 — 설치, AI 도구 연동, SSH 관리, 터미널 워크스페이스',
} = Astro.props;
---

<Layout title={title} description={description}>
  <Nav />
  <div class="flex min-h-[calc(100vh-52px)]">
    <GuideSidebar />
    <main class="flex-1 py-10 px-14" style="max-width: 760px;">
      <slot />
    </main>
  </div>
</Layout>
```

- [ ] **Step 2: Create guide.astro**

```astro
---
import GuideLayout from '../layouts/GuideLayout.astro';
import GettingStarted from '../components/guide/sections/GettingStarted.astro';
import AIIntegrationGuide from '../components/guide/sections/AIIntegrationGuide.astro';
import WorkspaceGuide from '../components/guide/sections/WorkspaceGuide.astro';
import SSHGuide from '../components/guide/sections/SSHGuide.astro';
import PortForwardingGuide from '../components/guide/sections/PortForwardingGuide.astro';
import BackupGuide from '../components/guide/sections/BackupGuide.astro';
import SettingsGuide from '../components/guide/sections/SettingsGuide.astro';
---

<GuideLayout>
  <GettingStarted />
  <AIIntegrationGuide />
  <WorkspaceGuide />
  <SSHGuide />
  <PortForwardingGuide />
  <BackupGuide />
  <SettingsGuide />
</GuideLayout>

<script>
  const SECTIONS = [
    'getting-started',
    'ai-integration',
    'workspace',
    'ssh',
    'port-forwarding',
    'backup',
    'settings',
  ] as const;

  type SectionId = (typeof SECTIONS)[number];

  function showSection(id: SectionId) {
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
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.classList.add('!border-l-blue-accent', '!text-blue-accent', 'font-semibold');
      } else {
        btn.classList.remove('!border-l-blue-accent', '!text-blue-accent', 'font-semibold');
      }
    });

    // Update URL hash without scrolling
    history.replaceState(null, '', `#${id}`);
  }

  // Init: show section from hash or default to getting-started
  function init() {
    const hash = window.location.hash.slice(1) as SectionId;
    const validHash = SECTIONS.includes(hash) ? hash : 'getting-started';
    showSection(validHash);
  }

  // Sidebar click handlers
  document.querySelectorAll<HTMLElement>('.guide-sidebar-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section as SectionId;
      if (section && SECTIONS.includes(section)) showSection(section);
    });
  });

  init();
</script>

<style>
  /* All sections hidden by default; JS shows the active one */
  :global(.guide-section) {
    display: none;
  }
</style>
```

- [ ] **Step 3: Verify build produces 2 pages**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npm run build
```

Expected output contains:
```
▶ src/pages/index.astro
   └─ /index.html
▶ src/pages/guide.astro
   └─ /guide/index.html
2 page(s) built
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/GuideLayout.astro src/pages/guide.astro
git commit -m "feat: add GuideLayout and guide page with JS section switching"
```

---

## Task 7: Update Nav with guide link

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Update Nav.astro**

Add a "가이드" link between the logo and the right-side buttons, with active styling when on the guide page:

```astro
---
const isGuide = Astro.url.pathname.startsWith('/guide');
---

<nav
  class="sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 py-4
         bg-bg-primary/90 border-b border-blue-muted/10 backdrop-blur-xl"
>
  <!-- Logo -->
  <a href="/" class="flex items-center gap-3 no-underline">
    <div class="w-12 h-12 md:w-14 md:h-14">
      <img
        src="/icon.png"
        alt="CLIX"
        class="w-full h-full object-contain"
      />
    </div>
    <span class="font-extrabold text-lg md:text-xl tracking-[3px] text-text-primary">
      CLIX
    </span>
  </a>

  <!-- Right -->
  <div class="flex items-center gap-4">
    <!-- Guide link -->
    <a
      href="/guide"
      class={`text-sm font-medium transition-colors ${
        isGuide
          ? 'text-blue-accent'
          : 'text-text-muted hover:text-text-secondary'
      }`}
      data-i18n="guide.sidebar.gettingStarted"
    >
      가이드
    </a>

    <button
      id="lang-toggle"
      class="text-xs text-text-secondary border border-text-darkest/40
             rounded-full px-3 py-1 cursor-pointer hover:border-blue-muted/40
             transition-colors"
    >
      KO / EN
    </button>

    <span
      class="btn-primary text-white text-sm font-semibold
             px-4 py-2 rounded-lg opacity-70 select-none"
      data-i18n="nav.download"
    >
      출시 예정
    </span>
  </div>
</nav>
```

> **Note:** The guide link reuses `data-i18n="guide.sidebar.gettingStarted"` key which gives "가이드"/"Guide" — wait, that's "시작하기"/"Getting Started". Use `nav.guide` which was added in Task 1 (`'가이드'` / `'Guide'`). So the `data-i18n` attribute should be `"nav.guide"`:

```astro
    <a
      href="/guide"
      class={`text-sm font-medium transition-colors ${
        isGuide
          ? 'text-blue-accent'
          : 'text-text-muted hover:text-text-secondary'
      }`}
      data-i18n="nav.guide"
    >
      가이드
    </a>
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/junhyunglee/Workspace/projects/clix-web && npm run build
```

Expected: `2 page(s) built` with no errors.

- [ ] **Step 3: Commit and push**

```bash
git add src/components/Nav.astro
git commit -m "feat: add guide link to Nav with active state"
git push origin main
```

---

## Acceptance Checklist

After all tasks are complete, verify each item:

- [ ] `https://clix.leejunhyung.com/guide` loads without 404
- [ ] All 7 sections render; clicking each sidebar item shows the correct section
- [ ] URL hash updates on section switch (e.g., `/guide#ai-integration`)
- [ ] KO/EN toggle on guide page translates all `data-i18n` text
- [ ] Nav shows "가이드" / "Guide" link; it is highlighted (blue) on the guide page
- [ ] Logo link in Nav goes to `/` (home), not `#`
- [ ] `npm run build` produces 2 pages with no TypeScript errors
