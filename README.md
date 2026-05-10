# Vibe Coding Skills

Claude Code 스킬 & 에이전트 모음. 한국어 환경에서 실제 사용하며 다듬은 워크플로우들이다.

## 설치

### 옵션 1 — 플러그인 (권장)

```
/plugin marketplace add eli-kardis/vibe-coding-skills
/plugin install vibe-coding-skills
```

업데이트는 `/plugin update`, 비활성화는 `/plugin disable vibe-coding-skills`.

### 옵션 2 — 스크립트 설치

```bash
git clone https://github.com/eli-kardis/vibe-coding-skills.git
cd vibe-coding-skills
bash install.sh
```

설치 후 Claude Code를 재시작하면 적용된다. 이미 같은 이름의 스킬/에이전트가 있으면 덮어쓰지 않고 건너뛴다.

## 포함된 스킬 (24개)

| 카테고리 | 스킬 | 한 줄 설명 |
|---|---|---|
| **개발 워크플로우** | `commit` | TypeScript/ESLint 검증 후 안전한 커밋 |
| | `orchestrate` | 멀티 에이전트 병렬 위임/진행 추적 |
| | `debate` | 다관점 전문가 토론으로 의사결정 |
| | `retro` | 세션 노트 + git log 기반 회고 생성 |
| | `sync-claude-md` | 세션 정리 → CLAUDE.md 동기화 |
| | `sync-workflow` | dev-workflow / MEMORY 정합성 점검 |
| **코드 품질·테스트** | `codebase-analyzer` | 코드 리뷰·버그 탐지·리팩토링·dead code |
| | `dependency-manager` | outdated / depcheck / lockfile 점검 |
| | `error-path-analysis` | 에러 경로·실패 시나리오·UX 진단 |
| | `webapp-testing` | Playwright 기반 로컬 웹앱 검증 |
| **배포·인프라·보안** | `deploy-safety-guard` | 배포 전 5단계 안전장치 점검 |
| | `site-auditor` | 성능 + 디자인 + SEO + 백엔드 종합 |
| | `performance-checker` | 빌드 / 번들 / 성능 점검 |
| | `security-audit` | OWASP 3-Layer 보안 감사 |
| | `seo-master` | Next.js App Router SEO / GEO 최적화 |
| **디자인·UI** | `web-design-guidelines` | 100+ UI 접근성·UX 감사 |
| | `b2b-landing` | B2B SaaS 랜딩 페이지 생성 |
| **콘텐츠** | `ebook-writing` | 전자책 챕터 작성 / 리뷰 |
| **사업 운영** | `idea` | 아이디어 검증 워크플로 |
| | `start-docs` | PRD / TRD / ERD 일괄 생성 |
| | `product-thinking` | 제품 사고 / MVP 스코프 |
| **법무 (한국)** | `korean-privacy-terms` | 개인정보처리방침·이용약관 자동 생성 |
| **브라우저** | `agent-browser` | 헤드리스 크롤링 / 스크래핑 |
| **영상** | `remotion-studio` | Remotion 영상 템플릿 / 생성 |

## 포함된 에이전트 (12개)

| 카테고리 | 에이전트 | 역할 |
|---|---|---|
| **기획·전략** | `project-planner` | PRD/TRD/ERD, 스코프 정의 |
| | `product-strategist` | MVP / 기능 우선순위 |
| | `ux-researcher` | 페르소나 / 유저 플로우 / 사용성 |
| **프론트엔드** | `frontend-design-specialist` | 프로덕션급 UI + 접근성 100+ |
| **백엔드·인프라** | `api-architect` | REST / GraphQL / 인증 흐름 |
| | `supabase-db-specialist` | 스키마 / 쿼리 / RLS |
| | `devops-engineer` | Docker / CI·CD / IaC |
| | `security-specialist` | OWASP / 보안 취약점 |
| **품질·성능** | `architecture-reviewer` | 아키텍처 / 기술부채 리뷰 |
| | `performance-optimizer` | 번들 / 렌더링 / Core Web Vitals |
| | `test-writer` | TDD / 단위·통합·E2E |
| **문서** | `technical-writer` | API 문서 / README / 체인지로그 |

## 스킬 vs 에이전트

| | 스킬 (Skill) | 에이전트 (Agent) |
|---|---|---|
| **저장 위치** | `~/.claude/skills/` | `~/.claude/agents/` |
| **호출** | 슬래시 명령어 또는 자연어 | Task 도구로 자동 위임 |
| **실행** | 메인 대화에서 직접 | 별도 서브프로세스에서 병렬 가능 |
| **용도** | 반복 워크플로우 자동화 | 전문 분야별 깊은 분석 / 작업 |

## 라이선스

MIT
