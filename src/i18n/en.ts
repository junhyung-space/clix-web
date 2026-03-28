import type { Translations } from './ko';

export const en: Translations = {
  nav: {
    download: 'Coming Soon',
  },

  hero: {
    headline1: 'SSH terminal,',
    headline2: 'built for AI coding tools.',
    sub: 'A macOS SSH workspace app for developers using Claude Code, Codex, and Gemini CLI.',
    cta: 'Public release coming soon',
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
      desc: 'Resume an AI tool in another tab\'s working directory with one command. Useful when moving between multiple servers.',
      demoOutput: '→ claude launched in tab-2 directory',
    },
  },

  workspace: {
    label: 'Terminal Workspace',
    title1: 'Terminal workspace',
    title2: 'and session recovery.',
    sub: 'Move between multiple sessions and pick up where you left off after reopening the app.',
    feat1Title: 'Session switching',
    feat1Desc: 'Move between open terminal sessions quickly from the workspace sidebar.',
    feat2Title: 'Workspace recovery',
    feat2Desc: 'Restore open sessions and working directories after restarting the app.',
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
    sub: 'Manage Hosts, Keychain, Port Forwarding, and Snippets in one place.',
    placeholder: 'CLIX main view for managing hosts and SSH settings',
  },

  download: {
    title1: 'Install for free,',
    title2: 'start right away.',
    cta: 'Public release coming soon',
    req: 'macOS 14.0 Sonoma or later · Apple Silicon & Intel',
    releases: 'The public download link will be available on this page.',
  },

  footer: {
    links: {
      privacy: 'Privacy Policy',
    },
    copyright: '© 2026 CLIX. All rights reserved.',
  },
};
