export const ko = {
  // Nav
  nav: {
    download: '출시 예정',
    guide: '가이드',
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

  // Guide Page
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

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof ko>;
