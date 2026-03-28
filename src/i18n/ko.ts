export const ko = {
  // Nav
  nav: {
    download: '다운로드',
  },

  // Hero
  hero: {
    headline1: 'SSH 터미널,',
    headline2: 'AI 코딩 도구와 함께',
    sub: 'Claude Code, Codex, Gemini CLI를 쓰는 개발자를 위해 만든 macOS SSH 클라이언트',
    cta: 'macOS용 무료 다운로드',
    meta: 'macOS 14.0 Sonoma 이상 · Apple Silicon & Intel',
  },

  // AI Integration
  ai: {
    label: 'AI Integration',
    title1: 'AI 도구 훅,',
    title2: '자동으로 설정됩니다',
    sub: '처음 실행하면 Claude Code, Codex, Gemini의 설정을 자동으로 잡아줍니다',
    card1: {
      title: 'Zero-config AI 연동',
      desc: '앱을 처음 실행하면 Claude Code, Codex, Gemini CLI의 설정 파일을 자동으로 찾아 훅을 등록합니다. 별도로 설정할 것이 없어요.',
      demoComment: '# AI 도구 실행 후 — CLIX가 자동으로 알림을 받아요',
      demoSuccess: '✓ Claude Code 작업 완료 → CLIX 알림 전송됨',
    },
    card2: {
      title: 'clix-notify\n인앱 알림',
      desc: 'AI 작업이 완료되면 CLIX 앱 안에서 바로 알림을 받아요. 오래 걸리는 작업을 기다리지 않아도 됩니다.',
      demoOutput: '→ CLIX 사이드바에 알림 표시됨',
    },
    card3: {
      title: 'clix-handoff\n세션 핸드오프',
      desc: '다른 패인의 작업 디렉토리로 AI 도구를 바로 이어서 실행할 수 있습니다. 여러 서버를 오가며 작업할 때 유용해요.',
      demoOutput: '→ tab-2 디렉토리에서 claude 실행됨',
    },
  },

  // Terminal Workspace
  workspace: {
    label: 'Terminal Workspace',
    title1: '멀티패인 터미널과',
    title2: '워크스페이스 복구',
    sub: '여러 서버를 동시에 보면서 작업하고, 재시작해도 그 상태 그대로 돌아옵니다',
    feat1Title: '멀티탭 & 분할 패인',
    feat1Desc: '여러 서버 세션을 탭과 좌우·상하 분할로 동시에 관리. 복잡한 레이아웃도 자유롭게.',
    feat2Title: '워크스페이스 복구',
    feat2Desc: '앱 재시작 후에도 탭·패인 레이아웃과 작업 디렉토리가 그대로 복원됩니다.',
    feat3Title: 'Ghostty 엔진',
    feat3Desc: 'Ghostty/libghostty 기반의 네이티브 렌더링. 빠르고 정확한 터미널 에뮬레이션.',
  },

  // SSH Management
  ssh: {
    label: 'SSH Management',
    title1: '서버와 자격증명을',
    title2: '한 곳에서 관리',
    sub: '호스트, SSH 키, 점프 호스트, 포트 포워딩까지',
    card1Title: '호스트 컬렉션',
    card1Desc: '서버를 Production, Staging, Personal 등으로 분류. 태그, 즐겨찾기, 최근 연결로 빠르게 찾아요.',
    card2Title: '자격증명 & Keychain',
    card2Desc: 'SSH 키, PEM 파일, 비밀번호를 macOS Keychain에 저장합니다. 평문으로 저장되지 않아요.',
    card3Title: '점프 호스트 라우팅',
    card3Desc: '배스천 서버를 경유해 내부 서버에 바로 연결됩니다. 복잡한 네트워크도 설정해두면 간단해요.',
    card4Title: '포트 포워딩',
    card4Desc: '로컬, 리모트, 다이나믹(SOCKS) 포워딩을 UI에서 설정·관리. 포트 충돌도 자동으로 감지합니다.',
    card5Title: '백업 & 복구',
    card5Desc: '호스트, 자격증명, 라우트 설정을 JSON으로 내보내고 복원할 수 있어요.',
    card6Title: '통합 검색',
    card6Desc: '별칭, 호스트명, 태그, 메모를 한 번에 검색합니다.',
  },

  // App Preview
  preview: {
    label: 'App Preview',
    title: '앱 미리보기',
    sub: '스크린샷 준비 중입니다',
    placeholder: '실제 스크린샷으로 교체 예정',
  },

  // Download
  download: {
    title1: '무료로 설치하고',
    title2: '바로 써보세요',
    cta: 'macOS용 CLIX 다운로드',
    req: 'macOS 14.0 Sonoma 이상 · Apple Silicon & Intel',
    releases: 'GitHub Releases에서 다른 버전 보기 →',
  },

  // Footer
  footer: {
    links: {
      github: 'GitHub',
      releases: 'Releases',
      privacy: '개인정보처리방침',
    },
    copyright: '© 2026 CLIX. All rights reserved.',
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof ko>;
