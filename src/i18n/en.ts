import type { Translations } from './ko';

export const en: Translations = {
  nav: {
    download: 'Download',
  },

  hero: {
    badge: 'macOS only · v0.1.0 Early Access',
    headline1: 'SSH, reimagined',
    headline2: 'for the AI era.',
    sub: 'The macOS terminal workspace built for developers working with AI coding tools.',
    cta: 'Download for macOS — Free',
    meta: 'Requires macOS 14.0 Sonoma or later · Apple Silicon & Intel',
  },

  ai: {
    label: 'AI Integration',
    title1: 'Deeply integrated',
    title2: 'with AI coding tools.',
    sub: 'Auto-configured hooks, real-time notifications, session handoff — works out of the box.',
    card1: {
      title: 'Zero-config AI setup',
      desc: 'On first launch, CLIX automatically finds and configures hooks for Claude Code, Codex, and Gemini CLI. No manual setup required.',
      demoComment: '# After your AI tool finishes — CLIX gets notified automatically',
      demoSuccess: '✓ Claude Code task done → CLIX notification sent',
    },
    card2: {
      title: 'clix-notify\nIn-app notifications',
      desc: 'Get notified inside CLIX when your AI task completes. No need to babysit long-running jobs.',
      demoOutput: '→ Notification shown in CLIX sidebar',
    },
    card3: {
      title: 'clix-handoff\nSession handoff',
      desc: 'Resume an AI tool in another pane\'s working directory with one command. Essential when juggling multiple servers.',
      demoOutput: '→ claude launched in tab-2 directory',
    },
  },

  workspace: {
    label: 'Terminal Workspace',
    title1: 'Complex workflows,',
    title2: 'one screen.',
    sub: 'Multi-tab, split panes, session recovery — powered by the Ghostty terminal engine.',
    feat1Title: 'Multi-tab & split panes',
    feat1Desc: 'Manage multiple server sessions side-by-side with tabs and horizontal/vertical splits.',
    feat2Title: 'Workspace recovery',
    feat2Desc: 'Tabs, pane layout, and working directories are fully restored after restart.',
    feat3Title: 'Ghostty engine',
    feat3Desc: 'Native rendering via Ghostty/libghostty. Fast, accurate terminal emulation on macOS.',
  },

  ssh: {
    label: 'SSH Management',
    title1: 'All your servers,',
    title2: 'one place.',
    sub: 'Hosts, credentials, routing, and port forwarding — all in one workspace.',
    card1Title: 'Host collections',
    card1Desc: 'Organize servers into Production, Staging, Personal groups. Find any host instantly with tags, favorites, and recent connections.',
    card2Title: 'Credentials & Keychain',
    card2Desc: 'SSH keys, PEM files, and passwords stored securely in macOS Keychain. No plain-text storage.',
    card3Title: 'Jump host routing',
    card3Desc: 'One-click connection through bastion hosts. Works with complex network topologies.',
    card4Title: 'Port forwarding',
    card4Desc: 'Local, remote, and dynamic (SOCKS) forwarding configured in the UI. Automatic port conflict detection.',
    card5Title: 'Backup & restore',
    card5Desc: 'Export hosts, credentials, and routes as JSON. Import on any machine or share with your team.',
    card6Title: 'Unified search',
    card6Desc: 'Search across aliases, hostnames, tags, and notes instantly.',
  },

  preview: {
    label: 'App Preview',
    title: 'See it in action',
    sub: 'Screenshots coming soon',
    placeholder: 'Screenshot placeholder — will be replaced',
  },

  download: {
    title1: 'Download and',
    title2: 'start free.',
    sub: 'Get the latest release from GitHub Releases.',
    cta: 'Download CLIX for macOS',
    req: 'Requires macOS 14.0 Sonoma or later · Apple Silicon & Intel',
    releases: 'View all releases on GitHub →',
  },

  footer: {
    links: {
      github: 'GitHub',
      releases: 'Releases',
      privacy: 'Privacy Policy',
    },
    copyright: '© 2026 CLIX. All rights reserved.',
  },
};
