---
name: commit
description: '"커밋", "commit", "/commit" 요청 시 사용.'
user-invocable: true
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(npx tsc:*), Bash(npx eslint:*), Read, Write
---

# 안전한 Git 커밋 워크플로우

사용자가 "커밋", "commit", "/commit"을 요청하면 아래 4단계를 순서대로 실행한다.

---

## Phase 1: 상태 확인

아래 3개 명령을 **병렬로** 실행한다:

```bash
git status
git diff HEAD
git log --oneline -5
```

- 변경사항이 없으면 "커밋할 변경사항이 없습니다"를 출력하고 **즉시 종료**한다.
- 변경사항이 있으면 Phase 2로 진행한다.

---

## Phase 2: 사전 검증

아래 2개 검증을 실행한다:

```bash
npx tsc --noEmit
npx eslint --no-warn-ignored
```

- **하나라도 실패하면**: 오류 내용을 사용자에게 보고하고 커밋을 **중단**한다. 수정 방법을 제안한다.
- **모두 통과하면**: Phase 3로 진행한다.

---

## Phase 3: 스테이징 & 커밋

### 민감 파일 제외 규칙

아래 패턴에 해당하는 파일은 **절대 `git add` 하지 않는다**:

- `.env*`
- `credentials*`
- `*secret*`
- `*.pem`
- `*.key`

민감 파일이 변경 목록에 있으면 사용자에게 경고하고 해당 파일을 제외한 나머지만 스테이징한다.

### 스테이징

- `git add -A` 또는 `git add .`는 **절대 사용하지 않는다**.
- 변경된 파일을 **개별적으로** `git add <파일경로>` 한다.

### 커밋 메시지 규칙

| 규칙 | 내용 |
|------|------|
| 언어 | 한국어 |
| 형식 | `변경유형: 설명` |
| 제목 길이 | 50자 이내 |
| 본문 | 필요시 상세 설명 추가 |

**변경유형 목록:**

| 유형 | 용도 |
|------|------|
| 기능 | 새로운 기능 추가 |
| 수정 | 버그 수정 |
| 개선 | 기존 기능 개선 |
| 리팩터 | 코드 구조 변경 (기능 변화 없음) |
| 스타일 | UI/CSS 변경 |
| 문서 | 문서 추가/수정 |
| 테스트 | 테스트 추가/수정 |
| 빌드 | 빌드/배포 설정 변경 |

**커밋 메시지 예시:**

```
기능: 소셜 로그인 제거

Google/Kakao 소셜 로그인 관련 코드 및 라우트 전체 삭제.
인증 방식을 이메일/비밀번호로 단일화.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### 커밋 실행

HEREDOC을 사용하여 커밋한다:

```bash
git commit -m "$(cat <<'EOF'
변경유형: 제목

본문 (필요시)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

### 커밋 후

- `git status`로 커밋 결과를 확인한다.
- **절대 `git push`하지 않는다.** 푸시는 사용자가 명시적으로 요청할 때만 수행한다.

---

## Phase 4: 세션 노트 캡처

커밋 성공 후, 이번 커밋 범위의 작업에서 **주목할 만한 지식**이 있었는지 판단한다.

### 캡처 기준 (하나라도 해당하면 기록)

| 기준 | 예시 |
|------|------|
| 디버깅에 상당한 시간 소요 | "next/image 외부 도메인 설정 누락으로 2시간 삽질" |
| 공식 문서에 없는 동작 발견 | "Supabase RLS에서 service_role은 정책 무시" |
| 라이브러리/API 특이 동작 | "Stripe 웹훅은 raw body 필요, bodyParser 꺼야 함" |
| 재사용 가능한 패턴 | "낙관적 업데이트 + 롤백 패턴" |
| 워크어라운드 | "sweph는 ESM import 불가, require 필수" |

### 해당 없으면

대부분의 커밋은 해당 없다. **조용히 스킵**하고 Phase 4를 언급하지 않는다.

### 기록 방법

프로젝트 루트의 `.claude/session-notes.md`에 **append** 한다. 파일이 없으면 생성한다.

```markdown
### 변경유형: 커밋 제목 (커밋해시 앞7자, YYYY-MM-DD HH:MM)
- 배운 점/발견한 것을 1~3줄로 기록
- 왜 중요한지 괄호로 부연 (다음에 같은 실수 방지 등)
```

**예시:**

```markdown
### 기능: 결제 웹훅 연동 (a1b2c3d, 2026-02-25 14:32)
- Stripe 웹훅 서명 검증에 raw body 필요 → Next.js App Router에서 bodyParser 끄는 법 발견
- 멱등성 키로 웹훅 재시도 중복 처리 (Stripe은 최대 3일간 재시도)
```

### 주의

- 기존 내용을 **절대 덮어쓰지 않는다** (append only)
- 한 커밋당 **최대 3줄**. 장황하게 쓰지 않는다
- 코드 블록은 넣지 않는다 (핵심만 자연어로)

---

## 금지 사항

- `git add -A`, `git add .` 사용 금지
- `git push` 자동 실행 금지
- `--no-verify`, `--no-gpg-sign` 등 훅 우회 금지
- `--amend` 사용 금지 (사용자가 명시적으로 요청한 경우만 허용)
- 민감 파일 스테이징 금지

---

## Troubleshooting

### pre-commit hook 실패
- **원인:** ESLint/TypeScript 에러, 포맷팅 불일치
- **해결:** 에러 메시지 확인 후 수정. `npx tsc --noEmit` 과 `npx eslint .` 개별 실행하여 원인 특정. 새 커밋 생성 (--amend 금지)

### 대용량 파일 차단 (100MB+)
- **원인:** 바이너리, 빌드 산출물, 데이터 파일이 스테이징됨
- **해결:** `.gitignore`에 추가. 이미 추적 중이면 `git rm --cached <파일>`. Git LFS 고려

### merge conflict 상태에서 커밋
- **원인:** 충돌 마커(`<<<<<<<`)가 파일에 남아있음
- **해결:** 충돌 파일에서 `<<<<<<<`, `=======`, `>>>>>>>` 검색하여 해결 후 커밋

### 빈 커밋 (변경사항 없음)
- **원인:** 모든 변경이 이미 스테이징되었거나, 변경 취소됨
- **해결:** `git status`로 상태 확인. 변경사항 없으면 커밋 불필요

### 잘못된 커밋 (push 전)
- **원인:** 의도하지 않은 파일 포함, 메시지 오류
- **해결:** 사용자에게 `git reset --soft HEAD~1` 안내 (push 전에만)

---

## Anti-patterns

| 안티패턴 | 문제 | 해결 |
|----------|------|------|
| "fix" 메시지 남발 | 이력 추적 불가 | 구체적: "수정: 장바구니 음수 수량 입력 방지" |
| 거대 커밋 (500줄+) | 리뷰 불가, 리버트 어려움 | 논리적 단위로 분리 (300줄 이하) |
| `--no-verify` 사용 | 품질 검증 우회 | hook 에러 수정이 우선 |
| WIP 커밋 push | 불안정한 main | squash 후 push |
| 한 커밋에 여러 기능 | 리버트 시 부작용 | 기능별 커밋 분리 |

---

## Quality Metrics

| 항목 | 이상적 | 허용 | 위험 |
|------|:------:|:----:|:----:|
| 커밋 크기 | <200줄 | 200~500줄 | >500줄 |
| 메시지 제목 | <50자 | 50~72자 | >72자 |
| 커밋 빈도 | 30분~1시간마다 | 2~3시간마다 | 하루 1회 |
| 변경유형 정확도 | 100% | 90%+ | <80% |

---

## References

- `references/commit-conventions.md` - Conventional Commits 전체 스펙 + 예시 20+
- `references/git-workflows.md` - 브랜치 전략, 커밋 정리, 민감 정보 복구
