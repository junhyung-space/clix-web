import type { Translations } from './ko';

export const en: Translations = {
  nav: {
    download: 'Download',
  },

  hero: {
    headline1: 'SSH terminal,',
    headline2: 'built for AI coding tools.',
    sub: 'A macOS SSH client made for developers using Claude Code, Codex, and Gemini CLI.',
    cta: 'Download for macOS — Free',
    meta: 'macOS 14.0 Sonoma or later · Apple Silicon & Intel',
  },

  ai: {
    label: 'AI Integration',
    title1: 'AI tool hooks,',
    title2: 'configured automatically.',
    sub: 'On first launch, CLIX auto-configures hooks for Claude Code, Codex, and Gemini CLI.',
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
    title1: 'Multi-pane terminal',
    title2: 'and workspace recovery.',
    sub: 'Work across multiple servers at once. Restart and everything comes back exactly as you left it.',
    feat1Title: 'Multi-tab & split panes',
    feat1Desc: 'Manage multiple server sessions side-by-side with tabs and horizontal/vertical splits.',
    feat2Title: 'Workspace recovery',
    feat2Desc: 'Tabs, pane layout, and working directories are fully restored after restart.',
    feat3Title: 'Ghostty engine',
    feat3Desc: 'Native rendering via Ghostty/libghostty. Fast, accurate terminal emulation on macOS.',
  },

  ssh: {
    label: 'SSH Management',
    title1: 'Servers and credentials,',
    title2: 'all in one place.',
    sub: 'Hosts, SSH keys, jump hosts, and port forwarding — all in one place.',
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
    title1: 'Install for free,',
    title2: 'start right away.',
    cta: 'Download CLIX for macOS',
    req: 'macOS 14.0 Sonoma or later · Apple Silicon & Intel',
    releases: 'View other releases on GitHub Releases →',
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
