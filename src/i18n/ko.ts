export const ko = {
  // Nav
  nav: {
    download: '출시 예정',
  },

  // Hero
  hero: {
    headline1: 'SSH 작업을 더 자연스럽게',
    headline2: 'AI 코딩 도구와 함께',
    sub: 'Claude Code, Codex, Gemini CLI와 함께 쓰기 좋은 macOS SSH 워크스페이스 앱',
    cta: '공개 배포 준비 중',
    meta: 'macOS 14.0 Sonoma 이상 · Apple Silicon & Intel',
  },

  // AI Integration
  ai: {
    label: 'AI Integration',
    title1: 'AI 도구 연동,',
    title2: '자동으로 설정됩니다',
    sub: '처음 실행하면 Claude Code, Codex, Gemini CLI 연동을 자동으로 설정합니다',
    card1: {
      title: 'AI 연동 자동 설정',
      desc: '앱을 처음 실행하면 Claude Code, Codex, Gemini CLI 설정 파일을 찾아 필요한 훅을 등록합니다. 별도 설정 없이 바로 사용할 수 있습니다.',
      demoComment: '# AI 도구 작업이 끝나면 CLIX가 자동으로 알림을 받습니다',
      demoSuccess: '✓ Claude Code 작업 완료 → CLIX에 알림이 전달됨',
    },
    card2: {
      title: 'clix-notify\n인앱 알림',
      desc: 'AI 작업이 끝나면 CLIX 안에서 바로 알림을 받을 수 있습니다. 오래 걸리는 작업을 계속 지켜보지 않아도 됩니다.',
      demoOutput: '→ CLIX 사이드바에 알림이 표시됨',
    },
    card3: {
      title: 'clix-handoff\n세션 핸드오프',
      desc: '다른 탭의 작업 디렉토리에서 AI 도구를 이어서 실행할 수 있습니다. 여러 서버를 오가며 작업할 때 유용합니다.',
      demoOutput: '→ tab-2 디렉토리에서 claude 실행',
    },
  },

  // Terminal Workspace
  workspace: {
    label: 'Terminal Workspace',
    title1: '터미널 워크스페이스와',
    title2: '작업 복구',
    sub: '여러 세션을 전환하며 작업하고, 다시 열어도 이전 작업 상태를 이어갈 수 있습니다',
    feat1Title: '세션 전환',
    feat1Desc: '열린 터미널 세션을 사이드바에서 빠르게 오가며 작업할 수 있습니다.',
    feat2Title: '워크스페이스 복구',
    feat2Desc: '앱을 다시 실행해도 열려 있던 세션과 작업 디렉토리를 이어서 복구할 수 있습니다.',
    feat3Title: 'Ghostty 엔진',
    feat3Desc: 'Ghostty/libghostty 기반의 네이티브 렌더링. 빠르고 정확한 터미널 에뮬레이션.',
  },

  // SSH Management
  ssh: {
    label: 'SSH Management',
    title1: '서버와 자격증명을',
    title2: '한 곳에서 관리',
    sub: '호스트부터 SSH 키, 점프 호스트, 포트 포워딩까지 한곳에서 관리합니다',
    card1Title: '호스트 컬렉션',
    card1Desc: '서버를 Production, Staging, Personal 같은 그룹으로 나누고 태그, 즐겨찾기, 최근 연결로 빠르게 찾을 수 있습니다.',
    card2Title: '자격증명 & Keychain',
    card2Desc: 'SSH 키, PEM 파일, 비밀번호를 macOS Keychain에 저장합니다. 평문으로 저장하지 않습니다.',
    card3Title: '점프 호스트 라우팅',
    card3Desc: '배스천 서버를 거쳐 내부 서버에 연결할 수 있습니다. 복잡한 네트워크도 미리 설정해두면 간편합니다.',
    card4Title: '포트 포워딩',
    card4Desc: '로컬, 리모트, 다이나믹(SOCKS) 포워딩을 UI에서 설정하고 관리합니다. 포트 충돌도 자동으로 감지합니다.',
    card5Title: '백업 & 복구',
    card5Desc: '호스트, 자격증명, 라우팅 설정을 JSON으로 내보내고 다시 가져올 수 있습니다.',
    card6Title: '통합 검색',
    card6Desc: '별칭, 호스트명, 태그, 메모를 한 번에 검색할 수 있습니다.',
  },

  // App Preview
  preview: {
    label: 'App Preview',
    title: '앱 미리보기',
    sub: 'Hosts, Keychain, Port Forwarding, Snippets를 한 화면에서 관리할 수 있습니다',
    placeholder: '호스트와 SSH 설정을 한곳에서 관리하는 CLIX 메인 화면',
  },

  // Download
  download: {
    title1: '무료로 설치하고',
    title2: '바로 시작해보세요',
    cta: '공개 배포 준비 중',
    req: 'macOS 14.0 Sonoma 이상 · Apple Silicon & Intel',
    releases: '배포 링크는 공개 시 이 페이지에서 제공됩니다.',
  },

  // Footer
  footer: {
    links: {
      privacy: '개인정보처리방침',
    },
    copyright: '© 2026 CLIX. All rights reserved.',
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof ko>;
