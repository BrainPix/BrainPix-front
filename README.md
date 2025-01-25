# 창의적인 사람들의 공간 BrainPIX

![image](https://github.com/user-attachments/assets/11a611df-9b77-4596-b2cf-ec299d1242a7)

<br>

## 프로젝트 소개

- BrainPIX는 사람들이 자신의 아이디어를 공유하고 판매하거나, 협력자를 찾을 수 있는 플랫폼입니다.
- 기업과 개인 모두 아이디어를 제안하여 협력자를 찾거나 거래할 수 있습니다.

<br>

## 1. 개발 환경

- Front : HTML, React (TypeScript), SCSS
- 버전 및 이슈관리 : Github, Issue Templates, Pull Request Templates
- 협업 툴 : Discord, Notion
  <br>

## 2. 채택한 개발 기술과 브랜치 전략

### React (TypeScript), SCSS

- React (TypeScript)
  - TypeScript를 사용하여 타입 안전성을 확보하고, 코드의 안정성을 높였습니다.
  - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
- SCSS
  - SCSS는 클래스 이름을 고유하게 부여할 수 있어, 일관된 네이밍 컨벤션을 유지하는 데 필요한 비용을 절약할 수 있어 채택하였습니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 하고 있습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용하고 있습니다.
- airbnb의 코딩 컨벤션을 참고하고 있습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적에 두었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치를 운용했습니다.
- main, develop 브랜치로 나누어 개발을 하였습니다.
  - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
  - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.

<br>

## 3. 프로젝트 구조

```
BRAINPIX-front/
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── .stylelintrc.json
├── package-lock.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
└── src/
    ├── assets/
    │   └── icons/
    ├── components/
    │   ├── button/
    │   ├── header/
    │   ├── preview/
    ├── hooks/
    ├── pages/
    │   ├── collaboration/
    │   ├── idea-market/
    │   ├── layout/
    │   ├── request-assign/
    │   ├── sign-up/
    │   └── test/
    ├── styles/
    ├── utils/
    ├── App.tsx
    ├── main.tsx
    └── vite-env.d.ts
```

<br>

## 4. 역할 분담

### 팀장 김민정 / 몽실

- **페이지**
  - 회원가입 페이지
- **공통 컴포넌트**
  - navbar

<br>
    
### 권소현 / 현

- **페이지**
  - 아이디어 마켓(결제 페이지)
- **공통 컴포넌트**
  - 취소/등록 버튼

<br>

### 임가희 / 제리

- **페이지**
  - 마이 페이지
- **공통 컴포넌트**
  - 카테고리 설정 버튼

<br>

### 최규호 / 호담

- **페이지**
  - 아이디어 마켓(메인 페이지)
- **공통 컴포넌트**
  - 미리보기 컴포넌트

<br>
