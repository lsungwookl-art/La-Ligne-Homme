# Commit Conventions

Conventional Commits 기반 커밋 메시지 규칙과 실전 예시.

---

## 1. Conventional Commits 스펙

### 형식

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type 목록

| Type | 용도 | 예시 |
|------|------|------|
| feat | 새 기능 | `feat: 소셜 로그인 추가` |
| fix | 버그 수정 | `fix: 로그인 시 토큰 만료 처리` |
| refactor | 리팩터링 (기능 변화 없음) | `refactor: 인증 로직 추출` |
| perf | 성능 개선 | `perf: 이미지 lazy loading 적용` |
| style | UI/CSS 변경 | `style: 헤더 반응형 레이아웃` |
| docs | 문서 변경 | `docs: API 엔드포인트 설명 추가` |
| test | 테스트 추가/수정 | `test: 회원가입 E2E 테스트` |
| chore | 빌드/도구 변경 | `chore: ESLint 규칙 업데이트` |
| ci | CI/CD 변경 | `ci: GitHub Actions 캐시 추가` |
| build | 빌드 시스템 변경 | `build: Next.js 15 업그레이드` |

### 한국어 Type 매핑

| 한국어 | Conventional | 용도 |
|--------|-------------|------|
| 기능 | feat | 새 기능 |
| 수정 | fix | 버그 수정 |
| 개선 | perf / refactor | 성능/구조 개선 |
| 리팩터 | refactor | 코드 정리 |
| 스타일 | style | UI 변경 |
| 문서 | docs | 문서 |
| 테스트 | test | 테스트 |
| 빌드 | build / chore / ci | 인프라 |

---

## 2. 커밋 메시지 예시 20+

### feat (기능)

```
feat: Google OAuth 로그인 구현

Supabase Auth를 활용한 Google OAuth 2.0 연동.
로그인 후 /dashboard로 리다이렉트.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

```
feat(auth): 비밀번호 재설정 이메일 발송

사용자가 비밀번호를 잊었을 때 재설정 링크를 이메일로 발송.
링크 유효기간 1시간.
```

```
feat(payments): 카카오페이 결제 연동
```

```
feat(ui): 다크모드 토글 추가
```

### fix (수정)

```
fix: 로그아웃 시 쿠키 미삭제 문제 해결

httpOnly 쿠키가 클라이언트에서 삭제되지 않아
로그아웃 후에도 인증 상태가 유지되는 문제.
서버 사이드에서 Set-Cookie로 만료 처리.
```

```
fix(api): 페이지네이션 마지막 페이지 빈 배열 반환

offset이 총 개수를 초과할 때 500 에러 대신
빈 배열과 함께 200을 반환하도록 수정.
```

```
fix: iOS Safari에서 fixed 요소 위치 틀어짐
```

```
fix(form): 이메일 검증 정규식 오류 수정
```

### refactor (리팩터)

```
refactor: API 클라이언트를 fetch wrapper로 교체

axios 의존성 제거. 표준 fetch API + 타입 안전 래퍼.
번들 크기 12KB 감소.
```

```
refactor(auth): 인증 미들웨어 추출

중복된 인증 로직을 공통 미들웨어로 통합.
```

### perf (성능)

```
perf: 제품 목록 가상 스크롤 적용

1000+ 아이템 렌더링 시 초기 로딩 2.3s → 0.4s.
react-window 적용으로 DOM 노드 95% 감소.
```

```
perf(db): 검색 쿼리에 GIN 인덱스 추가

LIKE 검색 응답시간 850ms → 45ms.
```

### style (스타일)

```
style: 랜딩 페이지 히어로 섹션 리디자인
```

```
style(mobile): 모바일 네비게이션 개선
```

### docs (문서)

```
docs: README에 환경변수 설정 가이드 추가
```

```
docs(api): Swagger 문서 업데이트
```

### test (테스트)

```
test: 결제 플로우 E2E 테스트 추가

카드 결제, 무통장 입금, 환불 시나리오 커버.
```

```
test(auth): 로그인 실패 케이스 단위 테스트
```

### chore / build / ci

```
chore: 사용하지 않는 의존성 제거

lodash, moment.js, classnames 제거.
번들 크기 45KB 감소.
```

```
ci: PR 머지 시 자동 배포 워크플로우 추가
```

```
build: Node.js 22 + pnpm 9 업그레이드
```

---

## 3. Breaking Change 표기법

### Footer 방식 (권장)

```
feat(api): 응답 형식을 envelope 패턴으로 변경

모든 API 응답을 { data, error, meta } 형식으로 통일.

BREAKING CHANGE: 기존 응답이 data 필드 안에 래핑됨.
마이그레이션: response.field → response.data.field
```

### ! 방식 (간단)

```
feat(api)!: 인증 방식 JWT에서 세션 기반으로 변경
```

### scope + ! 조합

```
refactor(db)!: users 테이블 스키마 변경

email 필드를 unique constraint에서 제거.
auth_providers 테이블로 분리.

BREAKING CHANGE: users.email이 더 이상 고유하지 않음.
기존 email 기반 조회를 auth_providers 조인으로 변경 필요.
```

---

## 4. 이슈/티켓 연동

### GitHub Issues

```
fix: 장바구니 수량 음수 입력 가능한 문제

최소값 1로 제한하고 음수 입력 시 자동 보정.

Closes #142
```

```
feat: 위시리스트 기능 추가

Resolves #89
Refs #45, #67
```

### JIRA 티켓

```
feat(PROJ-123): 사용자 초대 기능 구현

이메일로 팀원 초대 + 권한 설정.

Refs: PROJ-123
```

### 여러 이슈 참조

```
fix: 알림 관련 버그 일괄 수정

1. 알림 카운트 실시간 업데이트 (#201)
2. 읽음 처리 후 목록 미갱신 (#203)
3. 모바일에서 알림 팝업 위치 (#205)

Closes #201, #203, #205
```

---

## 5. 모노레포 커밋 전략

### Scope로 패키지 구분

```
feat(web): 랜딩 페이지 추가
fix(api): rate limiter 타임아웃 조정
chore(shared): 공통 타입 정의 업데이트
test(e2e): 결제 플로우 통합 테스트
ci(infra): staging 환경 Terraform 업데이트
```

### 여러 패키지에 걸친 변경

```
feat(web,api): 실시간 알림 시스템 구현

web: WebSocket 연결 + 알림 UI
api: 알림 발송 엔드포인트 + 이벤트 시스템
```

### Turborepo/Nx 프로젝트

```
# 영향 범위가 명확하도록 scope 사용
feat(packages/ui): Button 컴포넌트 variant 추가
fix(apps/web): 라우팅 충돌 해결
chore(root): turbo.json 캐시 설정 조정
```

---

## 6. Git Hooks 설정 가이드

### commitlint + husky

```bash
# 설치
npm install -D @commitlint/config-conventional @commitlint/cli husky

# husky 초기화
npx husky init
```

### commitlint.config.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'perf', 'style', 'docs', 'test', 'chore', 'ci', 'build'],
    ],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [1, 'always', 100],
  },
};
```

### 한국어 커밋용 커스텀 설정

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['기능', '수정', '개선', '리팩터', '스타일', '문서', '테스트', '빌드',
       'feat', 'fix', 'refactor', 'perf', 'style', 'docs', 'test', 'chore', 'ci', 'build'],
    ],
    'subject-max-length': [2, 'always', 50],
  },
};
```

### .husky/commit-msg

```bash
npx --no -- commitlint --edit ${1}
```

---

## 7. 커밋 메시지 품질 기준

### 좋은 커밋 메시지 특징

| 항목 | 기준 |
|------|------|
| 제목 길이 | 50자 이내 (한국어), 72자 이내 (영어) |
| 제목 형식 | 명령형 (한국어: 명사형) |
| 본문 | Why + What (How는 코드가 설명) |
| 커밋 크기 | 300줄 이하 (이상적), 500줄 넘으면 분리 검토 |
| 원자성 | 하나의 논리적 변경 = 하나의 커밋 |

### Before/After

```
# Bad: 모호한 메시지
fix: 버그 수정
update: 코드 업데이트
wip: 작업 중

# Good: 구체적 메시지
fix: 로그인 폼 빈 이메일 제출 시 500 에러
refactor: UserService에서 인증 로직 AuthService로 분리
feat: 프로필 이미지 업로드 (최대 5MB, jpg/png)
```

```
# Bad: 거대 커밋
feat: 전체 인증 시스템 구현 (로그인, 회원가입, 비밀번호 재설정, OAuth, 2FA)

# Good: 작은 단위로 분리
feat(auth): 이메일/비밀번호 로그인 구현
feat(auth): 회원가입 폼 + 이메일 검증
feat(auth): 비밀번호 재설정 플로우
feat(auth): Google OAuth 연동
feat(auth): 2FA TOTP 설정
```
