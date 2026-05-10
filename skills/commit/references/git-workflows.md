# Git Workflows

브랜치 전략, 커밋 정리, 민감 정보 복구 등 Git 워크플로우 가이드.

---

## 1. 브랜치 전략 비교

### GitHub Flow (권장: 소규모~중규모 팀)

```
main ─────●────●────●────●────●────
           \        /    \        /
feature/a   ●──●──●      \      /
                          ●──●──●
                          feature/b
```

**규칙:**
- `main`은 항상 배포 가능 상태
- 기능마다 `main`에서 브랜치 생성
- PR → 코드 리뷰 → 머지 → 자동 배포
- 브랜치명: `feat/기능명`, `fix/버그명`

**장점:** 단순, CI/CD 친화적
**단점:** 스테이징/QA 환경 분리 어려움

### Git Flow (권장: 릴리즈 주기 있는 프로젝트)

```
main    ────●────────────●──────────
            |            ↑
release     |    ●──●──●─┘
            |    ↑
develop ────●──●─┤──●──●──●────────
             \   |  ↑ /
feature/a     ●──┘ ●─┘
```

**브랜치:**
- `main` - 프로덕션
- `develop` - 개발 통합
- `feature/*` - 기능 개발
- `release/*` - 릴리즈 준비
- `hotfix/*` - 긴급 수정

**장점:** 릴리즈 관리 명확
**단점:** 복잡, 머지 빈번

### Trunk Based Development (권장: 시니어 팀, 빠른 배포)

```
main ──●──●──●──●──●──●──●──●──
        \  /    \ /
         ●       ●
     (short-lived branches, <1 day)
```

**규칙:**
- `main`에 직접 커밋 (또는 매우 짧은 브랜치)
- Feature flag로 미완성 기능 숨김
- 하루 여러 번 배포

**장점:** 머지 충돌 최소, 빠른 피드백
**단점:** Feature flag 관리 필요, 높은 테스트 커버리지 필요

### 선택 가이드

| 상황 | 전략 |
|------|------|
| 1~3명 팀, SaaS | GitHub Flow |
| 5명+ 팀, 릴리즈 주기 | Git Flow |
| 시니어 팀, CI/CD 성숙 | Trunk Based |
| 오픈소스 | GitHub Flow + Fork |

---

## 2. 브랜치명 규칙

### 형식

```
<type>/<issue-number>-<short-description>
```

### 예시

```
feat/123-social-login
fix/456-cart-negative-quantity
refactor/789-auth-middleware
hotfix/urgent-payment-bug
release/v2.1.0
```

### 규칙

- 소문자만 사용
- 단어 구분은 하이픈(-)
- 이슈 번호 포함 권장
- 20자 이내 설명

---

## 3. 커밋 정리 (Interactive Rebase)

### Squash: 여러 커밋을 하나로 합치기

```bash
# 최근 3개 커밋을 하나로
git rebase -i HEAD~3
```

에디터에서:

```
pick abc1234 feat: 로그인 폼 추가
squash def5678 fix: 로그인 폼 스타일 수정
squash ghi9012 fix: 로그인 폼 검증 추가
```

결과:

```
feat: 로그인 폼 추가

- 이메일/비밀번호 입력 폼
- 스타일 적용
- 클라이언트 사이드 검증
```

### Fixup: 메시지 없이 합치기

```bash
# 이전 커밋에 수정사항 합치기
git commit --fixup=abc1234
git rebase -i --autosquash HEAD~5
```

### Reorder: 커밋 순서 변경

```
# 에디터에서 줄 순서 변경
pick ghi9012 test: 로그인 테스트
pick abc1234 feat: 로그인 폼 추가
pick def5678 fix: 로그인 스타일
```

### 주의사항

- **push 전에만** rebase 수행
- 이미 push한 커밋은 rebase 금지 (협업 시)
- rebase 중 충돌 발생 시 `git rebase --abort`로 취소 가능

---

## 4. 다양한 언어/프레임워크 Lint 통합

### Python (Ruff)

```bash
# pre-commit hook
ruff check . && ruff format --check .
```

### Go

```bash
go vet ./...
golangci-lint run
```

### Rust

```bash
cargo clippy -- -D warnings
cargo fmt -- --check
```

### 통합 pre-commit 설정

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
      - id: ruff-format

  - repo: local
    hooks:
      - id: typecheck
        name: TypeScript type check
        entry: npx tsc --noEmit
        language: system
        types: [typescript]
        pass_filenames: false
```

---

## 5. 민감 정보 실수 복구

### 상황 1: 커밋했지만 아직 push 안함

```bash
# 1. 파일에서 민감정보 제거
echo "" > .env

# 2. 마지막 커밋 수정 (push 전이므로 안전)
git add .env
git commit --amend --no-edit

# 3. .gitignore에 추가
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: .env를 gitignore에 추가"
```

### 상황 2: 이미 push함 (git filter-repo)

```bash
# git-filter-repo 설치
pip install git-filter-repo

# 특정 파일을 히스토리에서 완전 삭제
git filter-repo --path .env --invert-paths

# 강제 push (팀원에게 사전 공지 필수)
git push origin --force --all
```

### 상황 3: BFG Repo-Cleaner (대용량 파일 제거)

```bash
# 설치
brew install bfg

# 100MB 이상 파일 제거
bfg --strip-blobs-bigger-than 100M

# 특정 파일 제거
bfg --delete-files .env

# 정리
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

### 복구 후 필수 조치

1. 노출된 시크릿 즉시 로테이션 (API 키, 비밀번호 변경)
2. GitHub에서 캐시 삭제 요청 (Settings > Cache)
3. 팀원에게 `git fetch --all && git reset --hard origin/main` 안내
4. `.gitignore` 업데이트 확인

---

## 6. .gitignore 최적화 패턴

### Next.js 프로젝트

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
.next/
out/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# Sentry
.sentryclirc
```

### 글로벌 gitignore (모든 프로젝트 적용)

```bash
# 설정
git config --global core.excludesfile ~/.gitignore_global
```

```gitignore
# ~/.gitignore_global
.DS_Store
Thumbs.db
*.swp
*.swo
*~
.idea/
.vscode/settings.json
```

---

## 7. 커밋 관련 안티패턴

| 안티패턴 | 문제 | 해결 |
|----------|------|------|
| "fix" 남발 | 이력 추적 불가 | 구체적 설명: "fix: 장바구니 수량 음수" |
| 거대 커밋 (1000줄+) | 리뷰 불가, 리버트 어려움 | 논리적 단위로 분리 |
| WIP 커밋 push | 불안정한 main | squash 후 push |
| `--no-verify` 습관 | 품질 저하 | hook 수정이 우선 |
| 커밋 없이 오래 작업 | 변경사항 누적 | 30분마다 중간 커밋 |
| merge commit 남발 | 이력 복잡 | rebase 우선 |
| 한 커밋에 여러 기능 | 리버트 시 부작용 | 기능별 분리 |

### Before/After

```bash
# Bad: 한 커밋에 모든 것
git add -A
git commit -m "update"

# Good: 논리적 분리
git add src/auth/
git commit -m "feat(auth): 로그인 API 구현"

git add src/components/LoginForm.tsx
git commit -m "feat(ui): 로그인 폼 컴포넌트"

git add tests/auth.test.ts
git commit -m "test(auth): 로그인 단위 테스트"
```
