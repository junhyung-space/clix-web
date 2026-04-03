# clix-web

[CLIX](https://clix.leejunhyung.com) 공식 웹사이트 소스코드.
Astro + Tailwind CSS 기반 정적 사이트로, GitHub Pages에 자동 배포됩니다.

---

## 바이너리 배포 구조

> CLIX 앱 소스코드 레포(`clix`)는 비공개이므로 Release asset에 외부 접근이 불가합니다.
> 이 레포(`clix-web`)의 Release에 바이너리를 업로드해 공개 다운로드를 제공합니다.

| 항목 | 내용 |
|------|------|
| **다운로드 URL** | `https://github.com/junhyung-space/clix-web/releases/download/v0.1.0/CLIX-0.1.0.zip` |
| **현재 버전** | v0.1.0 |
| **요구 사항** | macOS 14.0 Sonoma 이상 · Apple Silicon (arm64) |

웹사이트의 다운로드 버튼은 위 `releases/download/v0.1.0/CLIX-0.1.0.zip` URL을 가리킵니다. 따라서 태그와 자산명을 함께 맞춰 릴리즈를 올려야 합니다.

---

## 새 버전 배포 방법

### 1. clix 레포에서 Release 빌드

```bash
# clix 레포에서 실행
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer \
xcodebuild \
  -scheme clix \
  -configuration Release \
  -derivedDataPath /tmp/clix-release-build \
  ARCHS=arm64 \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO \
  build

ditto -c -k --keepParent \
  /tmp/clix-release-build/Build/Products/Release/CLIX.app \
  /tmp/CLIX-0.1.0.zip
```

### 2. 이 레포에 Release 등록

```bash
# 신규 버전
gh -R junhyung-space/clix-web release create v0.1.0 /tmp/CLIX-0.1.0.zip \
  --title "CLIX v0.1.0" \
  --notes "릴리즈 노트"

# 기존 버전에 파일 교체
gh -R junhyung-space/clix-web release upload v0.1.0 /tmp/CLIX-0.1.0.zip --clobber
```

> 현재 웹사이트는 태그와 파일명이 모두 포함된 URL을 사용하므로, 버전이 바뀌면 `src/config/release.ts`와 릴리즈 태그/자산명을 같이 업데이트해야 합니다.

---

## 개발 환경

```bash
npm install
npm run dev     # localhost:4321
npm run build   # ./dist/ 에 정적 파일 생성
```

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 로컬 개발 서버 시작 (`localhost:4321`) |
| `npm run build` | 프로덕션 빌드 (`./dist/`) |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |

---

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후 GitHub Pages에 배포합니다.

- **사이트 URL:** https://clix.leejunhyung.com
- **워크플로:** `.github/workflows/deploy.yml`

---

## 프로젝트 구조

```
clix-web/
├── public/
│   ├── icon.png
│   └── images/
├── src/
│   ├── components/       # Astro 컴포넌트
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Download.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro  # 공통 레이아웃 + i18n 초기화
│   ├── pages/
│   │   ├── index.astro   # 메인 랜딩 페이지
│   │   └── guide.astro   # 가이드 페이지
│   └── i18n/
│       ├── ko.ts          # 한국어
│       └── en.ts          # 영어
├── astro.config.mjs
└── package.json
```

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | [Astro](https://astro.build) 5.x (Static) |
| CSS | [Tailwind CSS](https://tailwindcss.com) 3.x |
| 배포 | GitHub Pages |
| 다국어 | 클라이언트 사이드 i18n (ko / en) |
