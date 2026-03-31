# CLIX Guide Page — Design Spec

**Date:** 2026-03-29
**Status:** Approved

---

## Overview

Add a `/guide` documentation page to the clix-web site that helps users understand how to install, configure, and use the CLIX macOS app. The guide is separate from the landing page and follows a sidebar + content layout.

---

## Goals

- Help users get started quickly after downloading the app
- Document all major features (AI integration, SSH management, terminal workspace, port forwarding, backup, settings)
- Match the landing page's visual design (dark + blue gradient theme)
- Support Korean and English with the same i18n toggle

---

## Non-Goals

- Search functionality within the guide (out of scope for v1)
- Per-section URLs / hash routing (JS section switching only)
- Video embeds or animated GIFs

---

## Architecture

### New Files

| File | Description |
|------|-------------|
| `src/pages/guide.astro` | New guide page, imports GuideLayout and all section components |
| `src/layouts/GuideLayout.astro` | Page shell: Nav + sidebar + content slot |
| `src/components/guide/GuideSidebar.astro` | Left sidebar with section navigation |
| `src/components/guide/sections/GettingStarted.astro` | 시작하기 section |
| `src/components/guide/sections/AIIntegrationGuide.astro` | AI 도구 연동 section |
| `src/components/guide/sections/WorkspaceGuide.astro` | 터미널 워크스페이스 section |
| `src/components/guide/sections/SSHGuide.astro` | 호스트 & SSH 관리 section |
| `src/components/guide/sections/PortForwardingGuide.astro` | 포트 포워딩 section |
| `src/components/guide/sections/BackupGuide.astro` | 백업 & 복원 section |
| `src/components/guide/sections/SettingsGuide.astro` | 설정 section |

### Modified Files

| File | Change |
|------|--------|
| `src/components/Nav.astro` | Add "가이드 / Guide" link pointing to `/guide` |
| `src/i18n/ko.ts` | Add `guide.*` translation keys |
| `src/i18n/en.ts` | Add `guide.*` translation keys |

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  Nav: CLIX logo │ 홈  가이드(active)  KO/EN  다운로드  │
├────────────────┬────────────────────────────────────┤
│                │                                    │
│  Sidebar       │  Content Area                      │
│  ─────────     │  ────────────                      │
│  가이드         │  [Section Label]                   │
│                │  Section Title                     │
│  🚀 시작하기 ◀  │  Section subtitle                  │
│  ─────────     │                                    │
│  기능           │  Step list / Code blocks / Tips    │
│  🤖 AI 도구 연동│                                    │
│  🖥 터미널      │                                    │
│  🔐 SSH 관리   │                                    │
│  🚇 포트 포워딩 │                                    │
│  📦 백업 & 복원 │                                    │
│  ─────────     │                                    │
│  기타           │                                    │
│  ⚙️ 설정        │                                    │
│                │                                    │
└────────────────┴────────────────────────────────────┘
```

- Sidebar: `width: 220px`, sticky, `top: 52px` (below Nav), scrollable
- Content area: `max-width: 760px`, `padding: 40px 56px`
- Active section: blue left border + blue text highlight

---

## Navigation (JS Section Switching)

The guide is a **single Astro page**. All 7 section components are rendered in the HTML but only one is visible at a time. A client-side script handles switching.

```js
// Pseudocode
sidebar links → data-section="getting-started"
section divs  → id="getting-started", class="guide-section hidden"

on sidebar click:
  hide all .guide-section
  show matching section
  update sidebar active state
  update URL hash (window.location.hash = sectionId)

on page load:
  read window.location.hash → show that section (default: getting-started)
```

URL reflects current section via hash: `/guide#ai-integration`

---

## i18n

Reuse the existing `data-i18n` attribute system from the landing page. Add a `guide` namespace to `ko.ts` and `en.ts`:

```ts
guide: {
  nav: { title: '가이드' },
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
    sub: 'CLIX를 설치하고 첫 번째 서버에 접속하는 방법을 안내합니다.',
    step1Title: 'DMG 파일 다운로드',
    step1Desc: '...',
    step2Title: '앱 실행 → 셸 통합 자동 설정',
    step2Desc: '...',
    step3Title: '첫 번째 호스트 추가',
    step3Desc: '...',
    tipTitle: '셸 통합 확인하기',
    tipDesc: '...',
  },
  ai: { ... },
  workspace: { ... },
  ssh: { ... },
  portForwarding: { ... },
  backup: { ... },
  settings: { ... },
}
```

---

## Content Structure Per Section

Each section follows this pattern:

1. **Section label** — small uppercase label (e.g., "AI 도구 연동")
2. **Title** — large heading
3. **Subtitle** — 1-2 sentence description
4. **Step list** — numbered steps with title + description (where applicable)
5. **Code blocks** — terminal command examples with output
6. **Tips** — highlighted callout boxes for important notes

### Section Content Outline

#### 1. 시작하기 (Getting Started)
- Download DMG
- First launch → shell integration auto-setup
- Add first host
- Tip: verify shell integration with `clix-notify "test"`

#### 2. AI 도구 연동
- Zero-config hook setup (Claude Code, Codex, Gemini CLI)
- `clix-notify` — send in-app notifications from terminal
- `clix-handoff` — resume AI tool in another pane's directory
- `clix-sessions` — list current open sessions

#### 3. 터미널 워크스페이스
- Creating and switching tabs
- Splitting panes (horizontal / vertical)
- Workspace recovery after restart

#### 4. 호스트 & SSH 관리
- Adding a host
- SSH key / password credential setup
- Jump host (bastion) configuration
- Collections, favorites, tags, search

#### 5. 포트 포워딩
- Local / remote / dynamic (SOCKS) rule types
- Creating a rule (wizard)
- Auto-start toggle

#### 6. 백업 & 복원
- Export hosts and credentials as JSON
- Import on another machine

#### 7. 설정
- Shell integration toggle
- Auto dotfile modification
- Theme options

---

## Visual Design

Reuse existing Tailwind tokens and global CSS classes from the landing page:

- Background: `bg-bg-darkest` / `bg-bg-dark` for sidebar
- Borders: `border-blue-muted/14`
- Active state: `border-l-2 border-blue-accent`, `text-blue-accent`
- Section label: `text-blue-accent text-xs uppercase tracking-widest`
- Code blocks: `bg-[#0d1117]` dark background, green commands, blue output
- Tips: `bg-blue-deep/[0.06] border border-blue-muted/20 text-blue-muted/90`
- Step numbers: small circular badge `bg-blue-deep/20 border border-blue-muted/30`

---

## Responsive Behavior

- **Desktop (≥1024px)**: sidebar + content side-by-side
- **Mobile (<1024px)**: sidebar collapses to top dropdown or hidden; content full-width

Mobile responsive is a stretch goal for v1 — desktop-first is acceptable since the target users are developers on macOS.

---

## Acceptance Criteria

- [ ] `/guide` page loads without errors
- [ ] All 7 sections render and switch correctly via sidebar clicks
- [ ] URL hash updates on section switch (`/guide#ai-integration`)
- [ ] KO/EN toggle works on guide page (same toggle as landing)
- [ ] Nav shows "가이드" link, active state when on guide page
- [ ] Visual design matches landing page theme
- [ ] `npm run build` passes with no TypeScript errors
