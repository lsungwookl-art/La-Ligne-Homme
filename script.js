/* ==========================================================================
   서부산스튜디오 — script.js
   글 데이터 + 카테고리/보기전환/검색/페이지네이션/상세보기
   ==========================================================================

   ▶ 글을 추가·수정하려면 아래 POSTS 배열만 고치면 됩니다.

   {
     id:       숫자, 고유값 (중복 금지)
     category: 'news'(소식) 또는 'event'(행사)
     title:    제목
     date:     'YYYY-MM-DD' (등록일)
     views:    조회수 (숫자, 표시용)
     pinned:   true 이면 목록 맨 위 고정 (생략 가능)
     image:    썸네일 경로 (생략하면 이미지 없는 카드로 표시)
     excerpt:  목록에 보이는 한두 줄 요약
     body:     본문. ['문단', {h:'소제목'}, {ul:['항목1','항목2']}] 형태
     info:     행사 정보 (생략 가능) — { '일시': '...', '장소': '...' }
   }
   ========================================================================== */

const POSTS = [
  {
    id: 10,
    category: 'event',
    title: '봄맞이 오픈 스튜디오 — 사흘간의 무료 개방',
    date: '2026-07-24',
    views: 412,
    pinned: true,
    image: 'images/look-01.jpg',
    excerpt: '스튜디오 전 공간을 사흘간 무료로 개방합니다. 예약 없이 방문해 촬영 세트와 장비를 직접 둘러보세요.',
    body: [
      '한 해 동안 서부산스튜디오를 찾아주신 분들께 감사드리는 마음으로, 메인 홀부터 호리존·소품실까지 전 공간을 사흘간 무료로 개방합니다.',
      { h: '이렇게 진행됩니다' },
      { ul: [
        '메인 홀 조명 세팅 시연 — 매일 오후 2시, 4시 (각 30분)',
        '보유 장비 자유 테스트 — 개인 카메라 지참 시 촬영 가능',
        '대관 상담 부스 상시 운영 — 현장 예약 시 첫 대관 20% 할인'
      ] },
      '예약 없이 편하게 들러주세요. 단체 방문(6인 이상)은 원활한 안내를 위해 미리 연락 주시면 감사하겠습니다.'
    ],
    info: {
      '일시': '2026년 8월 7일(금) – 8월 9일(일) 11:00 – 19:00',
      '장소': '서부산스튜디오 3층 전 공간',
      '참가비': '무료 (사전 예약 불필요)',
      '문의': '051-000-0000'
    }
  },
  {
    id: 9,
    category: 'news',
    title: '메인 홀 리뉴얼 완료 — 층고 4.2m 호리존 상시 운영',
    date: '2026-07-18',
    views: 287,
    image: 'images/look-02.jpg',
    excerpt: '두 달간의 공사를 마치고 메인 홀이 새로 문을 열었습니다. 호리존이 상시 세팅되어 별도 준비 시간 없이 바로 촬영할 수 있습니다.',
    body: [
      '5월부터 진행한 메인 홀 리뉴얼이 마무리되었습니다. 가장 큰 변화는 호리존 상설화입니다. 그동안 촬영 때마다 세팅과 도색에 시간이 들었지만, 이제는 예약 시간 그대로 촬영을 시작하실 수 있습니다.',
      { h: '달라진 점' },
      { ul: [
        '호리존 상시 세팅 (폭 6m · 층고 4.2m)',
        '천장 레일 조명 12기 신규 설치',
        '남향 통창 전동 블라인드 — 자연광 단계 조절 가능',
        '대기 라운지 분리 — 스태프·모델 동선 개선'
      ] },
      '리뉴얼 기간 동안 일정을 조정해주신 모든 분들께 감사드립니다. 새로워진 공간에서 뵙겠습니다.'
    ]
  },
  {
    id: 8,
    category: 'event',
    title: '9월 인물 사진 클래스 — 자연광 다루기 (4주 과정)',
    date: '2026-07-11',
    views: 356,
    image: 'images/look-03.jpg',
    excerpt: '자연광만으로 인물의 분위기를 만드는 법을 4주에 걸쳐 다룹니다. 카메라를 다뤄본 분이라면 누구나 참여할 수 있습니다.',
    body: [
      '조명 장비 없이, 창문 하나로 얼마나 다른 사진을 만들 수 있는지 함께 실습합니다. 매주 토요일 오전 3시간, 총 4회 과정입니다.',
      { h: '커리큘럼' },
      { ul: [
        '1주차 — 빛의 방향 읽기: 순광·사광·역광의 성격',
        '2주차 — 반사판과 디퓨저로 그림자 조절하기',
        '3주차 — 인물 포즈 디렉팅과 거리감',
        '4주차 — 촬영 결과물 리뷰 및 보정 방향 잡기'
      ] },
      '정원은 8명이며, 선착순 마감입니다. 카메라는 개인 장비를 지참해 주세요 (렌즈 대여 가능).'
    ],
    info: {
      '일시': '2026년 9월 5일 – 9월 26일, 매주 토요일 10:00 – 13:00',
      '장소': '서부산스튜디오 메인 홀',
      '정원': '8명 (선착순)',
      '참가비': '18만원 (4회 · 재료비 포함)'
    }
  },
  {
    id: 7,
    category: 'news',
    title: '주말 대관 시간대 확대 안내',
    date: '2026-06-30',
    views: 198,
    excerpt: '요청이 많았던 토요일 야간 대관을 정식 운영합니다. 7월부터 22시까지 이용하실 수 있습니다.',
    body: [
      '토요일 저녁 시간대 문의가 꾸준히 있어 운영 시간을 늘렸습니다. 7월 1일 예약분부터 적용됩니다.',
      { ul: [
        '토요일 — 10:00 ~ 22:00 (기존 20:00)',
        '일요일 — 사전 예약제 유지 (최소 3시간)',
        '야간 시간대(19시 이후) 요금은 주간과 동일합니다'
      ] },
      '예약은 전화 또는 인스타그램 메시지로 받고 있습니다.'
    ]
  },
  {
    id: 6,
    category: 'event',
    title: '사진전 《서부산의 겨울》 — 지역 작가 5인 기획전',
    date: '2026-06-21',
    views: 471,
    image: 'images/look-04.jpg',
    excerpt: '사상·강서·북구를 기록해 온 지역 작가 다섯 분의 겨울 연작을 스튜디오 라운지에서 선보입니다.',
    body: [
      '카메라를 들고 동네를 걸어 온 다섯 작가의 시선을 모았습니다. 낙동강 하구의 안개, 이른 아침의 공단, 사라져 가는 골목까지 — 익숙한 풍경이 낯설게 보이는 순간들입니다.',
      { h: '참여 작가' },
      { ul: [
        '강民 — 《하구, 여섯 시》 연작 12점',
        '노선영 — 《공장의 아침》 연작 8점',
        '박지우 — 《괘법동 산책》 연작 10점',
        '외 2인'
      ] },
      '관람은 무료이며, 작가와의 대화는 개막 첫 주 토요일 오후에 진행됩니다.'
    ],
    info: {
      '기간': '2026년 8월 22일 – 9월 14일',
      '관람 시간': '월–토 11:00 – 19:00 (일요일 휴관)',
      '장소': '서부산스튜디오 라운지 갤러리',
      '관람료': '무료'
    }
  },
  {
    id: 5,
    category: 'news',
    title: '장비 대여 목록 업데이트 (2026년 하반기)',
    date: '2026-06-09',
    views: 233,
    excerpt: '스트로보 2기와 배경지 8종이 추가되었습니다. 대여 목록과 요금표를 새로 정리했습니다.',
    body: [
      '하반기 장비 목록을 정리했습니다. 대관 시 기본 포함되는 장비와 별도 대여 장비를 구분해 안내드립니다.',
      { h: '신규 입고' },
      { ul: [
        '스트로보 600Ws 2기 (소프트박스 90cm 포함)',
        '지속광 LED 패널 4기',
        '종이 배경지 8종 추가 — 총 30종 보유',
        '반사판·디퓨저 세트 3조'
      ] },
      '기본 포함 장비는 대관료에 이미 반영되어 있으며, 추가 장비만 시간당 별도 요금이 붙습니다. 자세한 요금표는 전화로 문의해 주세요.'
    ]
  },
  {
    id: 4,
    category: 'news',
    title: '공식 유튜브 채널을 열었습니다',
    date: '2026-05-28',
    views: 512,
    excerpt: '촬영 현장 스케치와 조명 세팅 팁을 영상으로 담습니다. 격주 수요일에 새 영상이 올라갑니다.',
    body: [
      '사진으로는 다 전하지 못했던 현장의 공기를 영상으로 담아보려 합니다. 첫 영상은 메인 홀 조명 세팅 과정을 처음부터 끝까지 보여주는 20분짜리 기록입니다.',
      { h: '앞으로 올라갈 영상' },
      { ul: [
        '조명 세팅 실황 — 한 컷을 위한 준비 과정',
        '대관 이용 안내 — 처음 오시는 분들을 위한 공간 투어',
        '작가 인터뷰 — 스튜디오를 거쳐 간 사람들'
      ] },
      '우측 상단 유튜브 버튼으로 바로 이동하실 수 있습니다. 구독과 알림 설정도 부탁드립니다.'
    ]
  },
  {
    id: 3,
    category: 'event',
    title: '프로필 촬영 데이 — 하루 열 명, 사전 신청제',
    date: '2026-05-14',
    views: 389,
    excerpt: '취업·프로필용 사진이 필요한 분들을 위해 한 달에 하루, 정해진 시간에 촬영을 진행합니다.',
    body: [
      '한 사람당 40분씩, 하루 열 분만 촬영합니다. 정장 셔츠와 간단한 메이크업 수정 도구는 현장에 준비되어 있습니다.',
      { h: '진행 방식' },
      { ul: [
        '1인 40분 — 상담 10분, 촬영 25분, 셀렉 5분',
        '보정본 2컷 제공 (원본 전체 전달)',
        '배경 3종 중 선택 — 화이트 / 그레이 / 다크',
        '결과물은 촬영 후 5일 이내 이메일 전달'
      ] },
      '신청은 인스타그램 DM으로 받으며, 신청 순서대로 시간대를 배정합니다.'
    ],
    info: {
      '일시': '매월 셋째 주 일요일 11:00 – 18:00',
      '장소': '서부산스튜디오 메인 홀',
      '정원': '하루 10명',
      '참가비': '6만원 (보정본 2컷 포함)'
    }
  },
  {
    id: 2,
    category: 'news',
    title: '주차 안내 — 건물 뒤편 전용 구획 5면 확보',
    date: '2026-04-30',
    views: 176,
    excerpt: '주차 문의가 많아 건물 뒤편에 전용 구획을 마련했습니다. 방문 전 꼭 확인해 주세요.',
    body: [
      '스튜디오동 뒤편에 전용 주차 구획 5면을 확보했습니다. 바닥에 표시된 "STUDIO" 구획을 이용해 주세요.',
      { ul: [
        '전용 구획 5면 — 무료, 선착순',
        '만차 시 인근 공영주차장 이용 (도보 3분, 30분 500원)',
        '장비 하역은 건물 측면 화물 출입구 이용 가능'
      ] },
      '주말에는 자리가 빨리 차는 편이니 대중교통 이용도 함께 고려해 주시면 좋겠습니다.'
    ]
  },
  {
    id: 1,
    category: 'news',
    title: '서부산스튜디오가 문을 열었습니다',
    date: '2026-04-15',
    views: 634,
    excerpt: '사상구 괘법동에 촬영과 전시가 함께 이루어지는 공간을 마련했습니다. 첫인사를 드립니다.',
    body: [
      '오랫동안 부산 서부권에는 마음 편히 촬영할 공간이 부족했습니다. 서면이나 해운대까지 장비를 싣고 나가야 했던 시간을 줄여보자는 생각에서 이 공간이 시작되었습니다.',
      '260㎡ 규모의 메인 홀과 라운지, 소품실을 갖췄습니다. 촬영뿐 아니라 작은 전시와 클래스도 함께 열 수 있도록 설계했습니다.',
      '앞으로 이곳에서 일어나는 일들을 이 게시판에 차곡차곡 남기겠습니다. 소식과 행사, 두 갈래로 나누어 정리하니 관심 있는 쪽을 골라 보셔도 좋습니다.',
      '자주 들러주세요. 감사합니다.'
    ]
  }
];

/* ── 설정 ────────────────────────────────────────────────── */
const PER_PAGE = 6;

const CATEGORY_LABEL = { news: '소식', event: '행사' };

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric', month: 'long', day: 'numeric'
});

/* ── DOM 참조 ────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);

const els = {
  panel:      $('#post-panel'),
  list:       $('#post-list'),
  empty:      $('#empty-state'),
  status:     $('#result-status'),
  pagination: $('#pagination'),
  detail:     $('#post-detail'),
  search:     $('#search-input'),
  tabs:       Array.from(document.querySelectorAll('.tab')),
  viewBtns:   Array.from(document.querySelectorAll('.view-btn')),
  navToggle:  $('.nav-toggle'),
  mobileNav:  $('#mobile-nav')
};

/* ── 유틸 ────────────────────────────────────────────────── */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return dateFormatter.format(new Date(y, m - 1, d));
}

function shortDate(iso) {
  return iso.replace(/-/g, '.');
}

/* ── 상태: 전부 URL에 반영해 뒤로가기·공유가 동작하도록 ──── */
function readState() {
  const p = new URLSearchParams(location.search);
  const category = ['news', 'event'].includes(p.get('cat')) ? p.get('cat') : 'all';
  const view = p.get('view') === 'list' ? 'list' : 'card';
  const page = Math.max(1, Number(p.get('page')) || 1);
  const postId = p.get('post') ? Number(p.get('post')) : null;
  return { category, view, page, q: (p.get('q') || '').trim(), postId };
}

function writeState(patch, { replace = false } = {}) {
  const next = { ...readState(), ...patch };
  const p = new URLSearchParams();
  if (next.category !== 'all') p.set('cat', next.category);
  if (next.view !== 'card')    p.set('view', next.view);
  if (next.q)                  p.set('q', next.q);
  if (next.page > 1)           p.set('page', String(next.page));
  if (next.postId)             p.set('post', String(next.postId));

  const url = p.toString() ? `?${p}` : location.pathname;
  history[replace ? 'replaceState' : 'pushState'](null, '', url);
  render();
}

/* ── 필터링 ──────────────────────────────────────────────── */
function filterPosts({ category, q }) {
  const keyword = q.toLowerCase();
  return POSTS
    .filter((post) => category === 'all' || post.category === category)
    .filter((post) => {
      if (!keyword) return true;
      const haystack = [post.title, post.excerpt, ...flattenBody(post.body)]
        .join(' ').toLowerCase();
      return haystack.includes(keyword);
    })
    .sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return b.date.localeCompare(a.date);
    });
}

function flattenBody(body = []) {
  return body.flatMap((block) => {
    if (typeof block === 'string') return [block];
    if (block.h)  return [block.h];
    if (block.ul) return block.ul;
    return [];
  });
}

/* ── 렌더: 목록 ──────────────────────────────────────────── */
function renderList(state) {
  const filtered = filterPosts(state);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  els.panel.dataset.view = state.view;
  els.list.dataset.view = state.view;

  // 목록 번호는 최신 글이 큰 번호를 갖도록 전체 개수 기준으로 계산
  els.list.innerHTML = pageItems.map((post, i) => {
    const no = filtered.length - (start + i);
    return renderItem(post, no, state.view);
  }).join('');

  els.empty.hidden = pageItems.length > 0;
  els.status.textContent = filtered.length
    ? `${state.q ? `‘${state.q}’ 검색 결과 ` : ''}총 ${filtered.length}건 · ${page}/${totalPages} 페이지`
    : '';

  renderPagination(page, totalPages);
}

function renderItem(post, no, view) {
  const cat = CATEGORY_LABEL[post.category];
  const thumb = post.image
    ? `<img src="${esc(post.image)}" alt="" width="600" height="400" loading="lazy" decoding="async" />`
    : '';

  return `
    <li class="post-item">
      <a class="post-link" href="?post=${post.id}" data-post-id="${post.id}">
        ${view === 'card' ? `<div class="post-thumb">${thumb}</div>` : ''}
        <span class="post-no">${no}</span>
        <span class="post-cat"><span class="badge badge-${post.category}">${cat}</span></span>
        <div class="post-body">
          <div class="post-meta">
            <span class="badge badge-${post.category}">${cat}</span>
            <time datetime="${post.date}">${formatDate(post.date)}</time>
          </div>
          <h3 class="post-title">${post.pinned ? '<span class="post-badge-pin">공지</span>' : ''}${esc(post.title)}</h3>
          <p class="post-excerpt">${esc(post.excerpt)}</p>
        </div>
        <time class="post-date" datetime="${post.date}">${shortDate(post.date)}</time>
        <span class="post-views">${post.views.toLocaleString('ko-KR')}</span>
      </a>
    </li>`;
}

function renderPagination(page, totalPages) {
  if (totalPages <= 1) { els.pagination.innerHTML = ''; return; }

  const btn = (label, targetPage, opts = {}) => `
    <button class="page-btn" type="button" data-page="${targetPage}"
      ${opts.disabled ? 'disabled' : ''}
      ${opts.current ? 'aria-current="page"' : ''}
      ${opts.label ? `aria-label="${opts.label}"` : ''}>${label}</button>`;

  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map((n) => btn(String(n), n, { current: n === page, label: `${n}페이지` }))
    .join('');

  els.pagination.innerHTML =
    btn('‹', page - 1, { disabled: page === 1, label: '이전 페이지' }) +
    numbers +
    btn('›', page + 1, { disabled: page === totalPages, label: '다음 페이지' });
}

/* ── 렌더: 상세 ──────────────────────────────────────────── */
function renderDetail(post, state) {
  const siblings = filterPosts({ category: 'all', q: '' });
  const idx = siblings.findIndex((p) => p.id === post.id);
  const prev = siblings[idx - 1]; // 더 최신 글
  const next = siblings[idx + 1]; // 더 이전 글

  const bodyHtml = post.body.map((block) => {
    if (typeof block === 'string') return `<p>${esc(block)}</p>`;
    if (block.h)  return `<h3>${esc(block.h)}</h3>`;
    if (block.ul) return `<ul>${block.ul.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
    return '';
  }).join('');

  const infoHtml = post.info ? `
    <div class="detail-info">
      <dl>
        ${Object.entries(post.info)
          .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}
      </dl>
    </div>` : '';

  const heroHtml = post.image ? `
    <figure class="detail-hero">
      <img src="${esc(post.image)}" alt="${esc(post.title)} 관련 사진" width="1200" height="750" decoding="async" />
    </figure>` : '';

  els.detail.innerHTML = `
    <button class="detail-back" type="button" data-action="back">← 목록으로 돌아가기</button>
    <div class="detail-meta">
      <span class="badge badge-${post.category}">${CATEGORY_LABEL[post.category]}</span>
      <time datetime="${post.date}">${formatDate(post.date)}</time>
      <span>조회 ${post.views.toLocaleString('ko-KR')}</span>
    </div>
    <h2 class="detail-title">${esc(post.title)}</h2>
    ${heroHtml}
    <div class="detail-body">${bodyHtml}</div>
    ${infoHtml}
    <nav class="detail-nav" aria-label="이전 다음 글">
      ${prev
        ? `<button type="button" data-post-id="${prev.id}">이전 글<strong>${esc(prev.title)}</strong></button>`
        : '<span></span>'}
      ${next
        ? `<button type="button" data-post-id="${next.id}">다음 글<strong>${esc(next.title)}</strong></button>`
        : '<span></span>'}
    </nav>`;

  document.title = `${post.title} | 서부산스튜디오`;
  void state;
}

/* ── 렌더 진입점 ─────────────────────────────────────────── */
function render() {
  const state = readState();
  const post = state.postId ? POSTS.find((p) => p.id === state.postId) : null;

  // 탭 상태
  els.tabs.forEach((tab) => {
    const selected = tab.dataset.category === state.category;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  els.panel.setAttribute('aria-labelledby', `tab-${{ all: 'all', news: 'news', event: 'event' }[state.category]}`);

  // 보기 전환 버튼 상태
  els.viewBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));

  // 검색어 동기화 (사용자가 입력 중일 때는 덮어쓰지 않음)
  if (document.activeElement !== els.search) els.search.value = state.q;

  if (post) {
    els.panel.hidden = true;
    els.detail.hidden = false;
    renderDetail(post, state);
  } else {
    els.detail.hidden = true;
    els.detail.innerHTML = '';
    els.panel.hidden = false;
    document.title = '서부산스튜디오 | 소식과 행사';
    renderList(state);
  }
}

function renderCounts() {
  document.querySelectorAll('.tab-count').forEach((el) => {
    const key = el.dataset.count;
    el.textContent = key === 'all'
      ? POSTS.length
      : POSTS.filter((p) => p.category === key).length;
  });
}

/* ── 이벤트 ──────────────────────────────────────────────── */
// 카테고리 탭 (클릭 + 좌우 방향키)
els.tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    writeState({ category: tab.dataset.category, page: 1, postId: null });
  });
  tab.addEventListener('keydown', (e) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const target = els.tabs[(index + delta + els.tabs.length) % els.tabs.length];
    target.focus();
    target.click();
  });
});

// 보기 방식 전환
els.viewBtns.forEach((btn) => {
  btn.addEventListener('click', () => writeState({ view: btn.dataset.view }));
});

// 검색 (입력이 멈추면 반영)
let searchTimer;
els.search.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    writeState({ q: els.search.value.trim(), page: 1, postId: null }, { replace: true });
  }, 250);
});
els.search.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  clearTimeout(searchTimer);
  writeState({ q: els.search.value.trim(), page: 1, postId: null });
});

// 페이지 이동
els.pagination.addEventListener('click', (e) => {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled) return;
  writeState({ page: Number(btn.dataset.page) });
  els.panel.focus();
  document.getElementById('board').scrollIntoView({ block: 'start' });
});

// 목록 → 상세
els.list.addEventListener('click', (e) => {
  const link = e.target.closest('[data-post-id]');
  if (!link) return;
  e.preventDefault();
  writeState({ postId: Number(link.dataset.postId) });
  els.detail.focus();
  document.getElementById('board').scrollIntoView({ block: 'start' });
});

// 상세 내부 (목록으로 / 이전·다음 글)
els.detail.addEventListener('click', (e) => {
  const back = e.target.closest('[data-action="back"]');
  if (back) {
    writeState({ postId: null });
    document.getElementById('board').scrollIntoView({ block: 'start' });
    return;
  }
  const jump = e.target.closest('[data-post-id]');
  if (!jump) return;
  writeState({ postId: Number(jump.dataset.postId) });
  els.detail.focus();
  document.getElementById('board').scrollIntoView({ block: 'start' });
});

// 뒤로가기 / 앞으로가기
window.addEventListener('popstate', render);

// 모바일 메뉴
els.navToggle.addEventListener('click', () => {
  const open = els.navToggle.getAttribute('aria-expanded') === 'true';
  els.navToggle.setAttribute('aria-expanded', String(!open));
  els.mobileNav.hidden = open;
});
els.mobileNav.addEventListener('click', (e) => {
  if (!e.target.closest('a')) return;
  els.navToggle.setAttribute('aria-expanded', 'false');
  els.mobileNav.hidden = true;
});

/* ── 시작 ────────────────────────────────────────────────── */
renderCounts();
render();
