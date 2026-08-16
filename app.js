/* OCTOCAT MUSEUM — 素の JS。ビルド不要。
   ・言語は JA / EN の2つ。文言はすべて L に持つ。
   ・クイズ(TRIAL)に受かると "awake" になり、
     ホームの絵・差し色・使える画面が変わる。状態は端末に残す。 */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ============ 文言 ============ */
  const L = {
    ja: {
      subtitle: 'みんなのオクトキャット美術館',
      hd_unit: 'UNIT', hd_reg: 'REG', hd_sys: 'SYS',
      standby: 'STANDBY', awake: 'AWAKENED',
      nav_home: 'HOME', nav_trial: 'TRIAL', nav_mural: 'MURAL',
      nav_home_jp: 'ホーム', nav_trial_jp: 'ちょうせん', nav_mural_jp: 'みんなのしるし',
      ft_l: 'GitHub × NEC こどもプログラミングワークショップ',

      st_n: 'いま展示している数', st_h: 'ひらいた回',
      st_v: 'あいている額', st_c: 'ぜんぶ揃うと',
      pt_units: 'DEPLOYED UNITS — チームのなかま',
      pt_note: 'ARCHIVE NOTE — この美術館について',
      home_lede: 'ひとりが、ひとつ。みんなの作品がひとつずつ集まって、'
        + 'ひとつの<b>しるし</b>になります。<br>'
        + 'いま <b data-k="n">—</b> 人。<b data-k="cap">—</b> 人ぶんが集まると、しるしはもっとはっきりします。',
      home_cta_hall: '▸ 展示室に入る',
      home_cta_trial: '▸ ちょうせんする',
      home_cta_mural: '▸ みんなのしるしを見る',
      hero_standby: 'CORE : SEALED — ちょうせんに合格すると、ここが変わります',
      hero_awake: 'CORE : OPEN — みんなのオクトキャット',

      pt_trial: 'TRIAL — GitHub ちょうせん',
      trial_lede: 'GitHub についての4たくもんだいです。ぜんぶで10問。'
        + '<b>8問</b>せいかいすると、この美術館の <b>ふういん</b> がとけます。',
      trial_r1: 'こたえると、すぐに○×とせつめいが出ます。',
      trial_r2: 'まちがえても、なんどでもやりなおせます。',
      trial_r3: 'ごうかくすると、ホームの絵が変わって、新しい画面がひらきます。',
      trial_start: '▸ はじめる',
      trial_hit: 'せいかい',
      trial_next: '▸ つぎへ',
      trial_result: '▸ けっかを見る',
      trial_ok: 'せいかい',
      trial_ng: 'ざんねん',
      trial_pass: 'ふういん、かいじょ',
      trial_fail: 'もうすこし',
      trial_pass_msg: 'ホームの絵が「みんなのオクトキャット」に変わりました。'
        + 'そして <b>MURAL</b> の画面がひらきます。さわると、その子の展示にいけます。',
      trial_fail_msg: 'あと少しです。8問せいかいで、ふういんがとけます。もういちど、どうぞ。',
      trial_again: '▸ もういちど',
      trial_go_mural: '▸ みんなのしるしへ',
      trial_go_home: '▸ ホームへ',
      trial_done_note: 'クリアずみ。もういちど遊んでも、ふういんはとけたままです。',

      pt_mural: 'MASTER MOSAIC — みんなのしるし',
      mural_lede: 'ひとつのタイルが、ひとりです。さわると、その子の展示にいけます。',
      mural_mode: 'さわって ひらく',
      mural_rand: '▸ でたらめに ひとり',

      pt_locked: 'ACCESS DENIED — まだひらきません',
      locked_lede: 'この画面は、ちょうせんに合格するとひらきます。',
      locked_go: '▸ ちょうせんへ',

      hall_of: '第', hall_suffix: '回',
      seats: '席', filled: '展示ずみ', vacant: 'あき', date: '日づけ', place: '場所',
      no_people: 'まだ作品がありません。',
      back_hall: '▸ おなじ回の展示室',
      back_mural: '▸ みんなのしるし',
      next_rand: '▸ つぎの人（でたらめ）',
    },
    en: {
      subtitle: 'The Octocat Gallery, made by everyone',
      hd_unit: 'UNIT', hd_reg: 'REG', hd_sys: 'SYS',
      standby: 'STANDBY', awake: 'AWAKENED',
      nav_home: 'HOME', nav_trial: 'TRIAL', nav_mural: 'MURAL',
      nav_home_jp: '', nav_trial_jp: '', nav_mural_jp: '',
      ft_l: 'GitHub × NEC Kids Programming Workshop',

      st_n: 'on display now', st_h: 'workshops held',
      st_v: 'empty frames', st_c: 'when everyone is here',
      pt_units: 'DEPLOYED UNITS — The teams',
      pt_note: 'ARCHIVE NOTE — About this museum',
      home_lede: 'One person, one Octocat. Every piece joins the others '
        + 'to form a single <b>mark</b>.<br>'
        + '<b data-k="n">—</b> here now. At <b data-k="cap">—</b>, the mark comes fully into focus.',
      home_cta_hall: '▸ Enter a hall',
      home_cta_trial: '▸ Take the trial',
      home_cta_mural: '▸ View the mark',
      hero_standby: 'CORE : SEALED — pass the trial and this will change',
      hero_awake: 'CORE : OPEN — the Octocat of everyone',

      pt_trial: 'TRIAL — GitHub Challenge',
      trial_lede: 'Ten multiple-choice questions about GitHub. '
        + 'Get <b>8</b> right and the museum\'s <b>seal</b> is lifted.',
      trial_r1: 'You get the answer and a short note right away.',
      trial_r2: 'Wrong answers are fine — retry as often as you like.',
      trial_r3: 'Passing changes the home image and opens a new screen.',
      trial_start: '▸ Start',
      trial_hit: 'CORRECT',
      trial_next: '▸ Next',
      trial_result: '▸ See result',
      trial_ok: 'Correct',
      trial_ng: 'Not quite',
      trial_pass: 'SEAL LIFTED',
      trial_fail: 'So close',
      trial_pass_msg: 'The home image is now the Octocat made of everyone, '
        + 'and the <b>MURAL</b> screen has opened. Touch a tile to meet its maker.',
      trial_fail_msg: 'Almost there. Eight correct lifts the seal. Give it another go.',
      trial_again: '▸ Try again',
      trial_go_mural: '▸ To the mark',
      trial_go_home: '▸ To home',
      trial_done_note: 'Already cleared. Replaying will not re-seal anything.',

      pt_mural: 'MASTER MOSAIC — the mark of everyone',
      mural_lede: 'Each tile is one person. Touch a tile to open their room.',
      mural_mode: 'TAP TO OPEN',
      mural_rand: '▸ Random person',

      pt_locked: 'ACCESS DENIED',
      locked_lede: 'This screen opens once you pass the trial.',
      locked_go: '▸ To the trial',

      hall_of: 'Hall ', hall_suffix: '',
      seats: 'seats', filled: 'filled', vacant: 'vacant', date: 'Date', place: 'Place',
      no_people: 'No works yet.',
      back_hall: '▸ Same hall',
      back_mural: '▸ The mark',
      next_rand: '▸ Another person',
    },
  };

  /* ============ クイズ ============ */
  const PASS = 8;
  const QUIZ = [
    { q: { ja: 'GitHub のマスコット「Octocat（オクトキャット）」は、どの2つの生きものが合わさった名前？',
           en: 'GitHub\'s mascot is called the Octocat. Which two creatures make up the name?' },
      a: [{ ja: 'タコ と ネコ', en: 'Octopus and cat' },
          { ja: 'イヌ と ネコ', en: 'Dog and cat' },
          { ja: 'タコ と イヌ', en: 'Octopus and dog' },
          { ja: 'トリ と ネコ', en: 'Bird and cat' }],
      c: 0,
      n: { ja: 'Octo は「タコ」、Cat は「ネコ」。あわせて Octocat です。',
           en: '"Octo" for octopus, "cat" for cat. Together: Octocat.' } },

    { q: { ja: 'プログラムを直したあと「ここまでできた」と記録することを何という？',
           en: 'After changing your code, what do you call saving a record of it?' },
      a: [{ ja: 'コミット', en: 'Commit' },
          { ja: 'コピー', en: 'Copy' },
          { ja: 'プリント', en: 'Print' },
          { ja: 'シャッター', en: 'Shutter' }],
      c: 0,
      n: { ja: 'コミットは「ここまでの記録」。あとから、いつでも見にもどれます。',
           en: 'A commit is a saved point in history. You can always come back to it.' } },

    { q: { ja: 'GitHub で、作品やプログラムを置いておく場所を何という？',
           en: 'On GitHub, what do you call the place where a project lives?' },
      a: [{ ja: 'リポジトリ', en: 'Repository' },
          { ja: 'カメラ', en: 'Camera' },
          { ja: 'モニター', en: 'Monitor' },
          { ja: 'スピーカー', en: 'Speaker' }],
      c: 0,
      n: { ja: 'リポジトリ（repository）は「置き場」という意味。ひとつの作品にひとつ作ります。',
           en: 'A repository is a storehouse — one per project.' } },

    { q: { ja: '「こう直したらどうかな？」と提案して、入れてもらうようお願いするしくみは？',
           en: 'What do you open to propose a change and ask for it to be merged?' },
      a: [{ ja: 'プルリクエスト', en: 'Pull request' },
          { ja: 'ダウンロード', en: 'Download' },
          { ja: 'シャットダウン', en: 'Shutdown' },
          { ja: 'アップデート', en: 'Update' }],
      c: 0,
      n: { ja: 'プルリクエストは「引きとってください」というお願い。みんなで見て、話しあって決めます。',
           en: 'A pull request asks others to pull your change in — after they review it together.' } },

    { q: { ja: '本すじをこわさずに、べつの道で作業するためのしくみは？',
           en: 'What lets you work on a separate line without breaking the main one?' },
      a: [{ ja: 'ブランチ', en: 'Branch' },
          { ja: 'ロープ', en: 'Rope' },
          { ja: 'トンネル', en: 'Tunnel' },
          { ja: 'ハシゴ', en: 'Ladder' }],
      c: 0,
      n: { ja: 'ブランチは木の「えだ」。えだの上でためして、うまくいったら本すじに合わせます。',
           en: 'A branch is like a tree limb: experiment there, then merge back when it works.' } },

    { q: { ja: '「こまったこと」や「やりたいこと」を書いてのこしておく場所は？',
           en: 'Where do you write down a problem or an idea so it is not forgotten?' },
      a: [{ ja: 'イシュー', en: 'Issue' },
          { ja: 'ポスト', en: 'Post box' },
          { ja: 'カレンダー', en: 'Calendar' },
          { ja: 'ライト', en: 'Light' }],
      c: 0,
      n: { ja: 'イシュー（issue）は「宿題ノート」のようなもの。だれでも書けて、みんなで見られます。',
           en: 'An issue is a shared to-do note. Anyone can open one; everyone can see it.' } },

    { q: { ja: '人の作品をまるごと自分のところにコピーして、じゆうに手を加えられるようにすることは？',
           en: 'What do you call copying someone\'s project so you can freely change your own copy?' },
      a: [{ ja: 'フォーク', en: 'Fork' },
          { ja: 'スプーン', en: 'Spoon' },
          { ja: 'ナイフ', en: 'Knife' },
          { ja: 'おはし', en: 'Chopsticks' }],
      c: 0,
      n: { ja: '食べるフォークとおなじつづり。道が二またに分かれる、というイメージです。',
           en: 'Same word as the dinner fork — the picture is a road splitting in two.' } },

    { q: { ja: 'GitHub Pages（ギットハブ ページズ）を使うと、なにができる？',
           en: 'What can you do with GitHub Pages?' },
      a: [{ ja: 'ウェブサイトを世界に公開できる', en: 'Publish a website to the world' },
          { ja: 'ゲームがもらえる', en: 'Get free games' },
          { ja: '絵がうまくなる', en: 'Become better at drawing' },
          { ja: '空をとべる', en: 'Fly through the sky' }],
      c: 0,
      n: { ja: 'この美術館も GitHub Pages で公開されています。いま見ているページが、その答えです。',
           en: 'This very museum is published with GitHub Pages — the page you are on is the answer.' } },

    { q: { ja: 'GitHub Copilot（コパイロット）は、なにを手伝ってくれる？',
           en: 'What does GitHub Copilot help you with?' },
      a: [{ ja: 'プログラムを書くこと', en: 'Writing code' },
          { ja: 'そうじ', en: 'Cleaning the room' },
          { ja: '料理', en: 'Cooking dinner' },
          { ja: '車の運転', en: 'Driving a car' }],
      c: 0,
      n: { ja: 'Copilot は「副操縦士」という意味。となりで、書くのを手伝ってくれます。',
           en: 'Copilot means co-pilot — it sits beside you and helps you write.' } },

    { q: { ja: 'GitHub のもとになった Git（ギット）をつくった人は？',
           en: 'Who created Git, the system GitHub is built on?' },
      a: [{ ja: 'リーナス・トーバルズ', en: 'Linus Torvalds' },
          { ja: 'トーマス・エジソン', en: 'Thomas Edison' },
          { ja: 'アルベルト・アインシュタイン', en: 'Albert Einstein' },
          { ja: 'マリー・キュリー', en: 'Marie Curie' }],
      c: 0,
      n: { ja: 'Linux（リナックス）をつくった人でもあります。2005年に Git をつくりました。',
           en: 'He also created Linux. Git came from him in 2005.' } },
  ];

  /* ============ 状態 ============ */
  const KEY_LANG = 'om.lang', KEY_CLR = 'om.cleared';
  const store = {
    get lang() {
      const v = localStorage.getItem(KEY_LANG);
      if (v === 'ja' || v === 'en') return v;
      return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
    },
    set lang(v) { localStorage.setItem(KEY_LANG, v); },
    get cleared() { return localStorage.getItem(KEY_CLR) === '1'; },
    set cleared(v) { v ? localStorage.setItem(KEY_CLR, '1') : localStorage.removeItem(KEY_CLR); },
  };

  let D = null, lang = store.lang;
  const t = k => {
    const d = L[lang];
    if (d && Object.prototype.hasOwnProperty.call(d, k)) return d[k];
    return (L.ja[k] !== undefined) ? L.ja[k] : '';
  };
  const isAwake = () => store.cleared;

  /* チームの並び順。回ごとに出す順を決めておく。 */
  const ORDER = {
    '1': ['mona', 'copilot', 'ducky', 'guest'],
    '2': ['mona1', 'mona2', 'copilot', 'ducky1', 'ducky2', 'guest'],
  };
  const teamOf = k => D.teams[k] || { label: k, en: k, color: '#7d8590' };
  const teamName = k => (lang === 'en' ? teamOf(k).en : teamOf(k).label);

  /* GitHub公式の動くステッカー。チームの見た目に近いものを当てている。 */
  const MASCOT = {
    mona: 'mona', mona1: 'mona', mona2: 'mona2',
    copilot: 'copilot', ducky: 'ducky', ducky1: 'ducky', ducky2: 'ducky2',
    guest: 'guest',
  };
  const masSrc = name => 'img/mascot/' + name + '.webp';

  /** マスコットの img を入れる。色は所属チームの色にそろえる。 */
  function setMascot(box, name, color) {
    if (!box) return;
    box.style.color = color || 'var(--acc)';
    box.innerHTML = `<img src="${masSrc(name)}" alt="" loading="lazy" decoding="async">`;
  }

  /* ============ 起動演出 ============ */
  const BOOT = [
    'OCTOCAT ARCHIVE SYSTEM  v2.6',
    'linking  ................ OK',
    'specimens ............... %N%',
    'halls ................... %H%',
    'seal .................... %S%',
    '',
    '>> WELCOME',
  ];

  function boot(done) {
    const el = $('#boot-text');
    setMascot($('#boot-mas'), 'universe', 'var(--acc)');
    const lines = BOOT.map(s => s
      .replace('%N%', String(D.people.length))
      .replace('%H%', String(D.rooms.length))
      .replace('%S%', isAwake() ? 'RELEASED' : 'ENGAGED'));
    let i = 0;
    const tick = () => {
      if (i >= lines.length) { setTimeout(done, 260); return; }
      el.textContent += lines[i++] + '\n';
      setTimeout(tick, 90);
    };
    tick();
  }

  /* ============ 画面の骨 ============ */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.body.dataset.mode = isAwake() ? 'awake' : 'standby';
    $$('[data-t]').forEach(el => { el.innerHTML = t(el.dataset.t); });
    $('#rd-n').textContent = D.people.length;
    $('#rd-c').textContent = D.rooms.reduce((s, r) => s + Number(r.seats || 0), 0);
    $('#rd-mode').textContent = isAwake() ? t('awake') : t('standby');
    $('#lang').innerHTML = lang === 'ja'
      ? '<b>JA</b><i>/</i>EN' : 'JA<i>/</i><b>EN</b>';
  }

  function navItems() {
    const out = [{ h: '#/', en: t('nav_home'), jp: t('nav_home_jp') }];
    D.rooms.forEach(r => out.push({
      h: '#/hall/' + r.cohort,
      en: 'HALL ' + String(r.cohort).padStart(2, '0'),
      jp: lang === 'ja' ? r.title : r.date,
    }));
    out.push({ h: '#/trial', en: t('nav_trial'), jp: t('nav_trial_jp') });
    out.push({
      h: '#/mural', en: t('nav_mural'), jp: t('nav_mural_jp'),
      lock: !isAwake(), fresh: isAwake(),
    });
    return out;
  }

  function drawNav() {
    const cur = location.hash || '#/';
    $('#nav').innerHTML = navItems().map(i => {
      const cls = [i.h === cur ? 'on' : '', i.lock ? 'lk' : '', i.fresh ? 'new' : '']
        .filter(Boolean).join(' ');
      return `<a href="${i.h}" class="${cls}">${i.en}`
        + (i.jp ? `<span class="jp">${i.jp}</span>` : '') + '</a>';
    }).join('');
  }

  function view(id) {
    const app = $('#app');
    app.innerHTML = '';
    app.appendChild($('#' + id).content.cloneNode(true));
    $$('[data-t]', app).forEach(el => { el.innerHTML = t(el.dataset.t); });
    fillCounts(app);
    return app;
  }

  function fillCounts(root) {
    const n = D.people.length;
    const cap = D.rooms.reduce((s, r) => s + Number(r.seats || 0), 0);
    const map = { n, cap, halls: D.rooms.length, vacant: Math.max(0, cap - n) };
    $$('[data-k]', root).forEach(el => { el.textContent = map[el.dataset.k]; });
  }

  /* ============ ホーム ============ */
  function vHome() {
    const app = view('t-home');
    const img = $('#hero-img', app);
    img.src = isAwake() ? 'img/emblem.webp' : 'img/mark.png';
    img.alt = isAwake() ? t('hero_awake') : 'GitHub';
    $('#hero-cap', app).innerHTML = isAwake() ? t('hero_awake') : t('hero_standby');

    const acts = [];
    D.rooms.forEach(r => acts.push(
      `<a class="btn ghost" href="#/hall/${r.cohort}">▸ ${lang === 'ja' ? r.title : 'Hall ' + r.cohort}</a>`));
    acts.push(isAwake()
      ? `<a class="btn" href="#/mural">${t('home_cta_mural')}</a>`
      : `<a class="btn" href="#/trial">${t('home_cta_trial')}</a>`);
    $('#home-acts', app).innerHTML = acts.join('');

    /* 配備ユニット＝チーム一覧。人数つきで、動くマスコットを並べる。 */
    const seen = [];
    D.rooms.forEach(r => (ORDER[String(r.cohort)] || []).forEach(k => {
      if (!seen.includes(k) && D.people.some(p => p.team === k)) seen.push(k);
    }));
    $('#units', app).innerHTML = seen.map(k => {
      const n = D.people.filter(p => p.team === k).length;
      return `<div class="unit" style="color:${teamOf(k).color}">
          <div class="mas"><img src="${masSrc(MASCOT[k] || 'guest')}" alt="" loading="lazy" decoding="async"></div>
          <div class="un">${esc(teamName(k))}</div>
          <div class="uc">${String(n).padStart(2, '0')} ${lang === 'ja' ? '名' : 'PPL'}</div>
        </div>`;
    }).join('');
    fillCounts(app);
  }

  /* ============ 展示室 ============ */
  function vHall(cohort) {
    const room = D.rooms.find(r => String(r.cohort) === String(cohort));
    if (!room) return vHome();
    const app = view('t-hall');
    $('.pt-en', app).textContent = 'HALL ' + String(room.cohort).padStart(2, '0');
    $('.pt-jp', app).textContent = lang === 'ja' ? room.title : room.date;

    const mine = D.people.filter(p => String(p.cohort) === String(room.cohort));
    $('.meta', app).innerHTML = [
      `${t('date')} <b>${room.date}</b>`,
      `${t('place')} <b>${lang === 'en' ? (room.place_en || room.place) : room.place}</b>`,
      `${t('filled')} <b>${mine.length}</b> / ${room.seats} ${t('seats')}`,
      `${t('vacant')} <b>${Math.max(0, room.seats - mine.length)}</b>`,
    ].join('');

    const order = ORDER[String(room.cohort)] || [];
    const keys = [...order.filter(k => mine.some(p => p.team === k)),
                  ...[...new Set(mine.map(p => p.team))].filter(k => !order.includes(k))];

    if (!keys.length) { $('.teams', app).innerHTML = `<p class="lede">${t('no_people')}</p>`; return; }

    $('.teams', app).innerHTML = keys.map(k => {
      const list = mine.filter(p => p.team === k);
      const col = teamOf(k).color;
      return `<div class="team-h" style="color:${col}">
          <div class="mas fr"><img src="${masSrc(MASCOT[k] || 'guest')}" alt="" loading="lazy" decoding="async"></div>
          <span class="jp">${esc(teamName(k))}</span>
          <i class="rule"></i>
          <span class="cnt">${list.length}</span>
        </div>
        <ul class="grid">${list.map(cardHTML).join('')}</ul>`;
    }).join('');
  }

  const cardHTML = p => `<li><a class="card" href="#/p/${p.id}">
      <div class="ph"><img loading="lazy" src="img/thumb/${p.id}.webp" alt="${esc(p.name)}"></div>
      <div class="nm">${esc(p.name)}</div>
      <div class="id">${p.id}</div>
      <i class="scanline"></i>
    </a></li>`;

  const esc = s => String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ============ 個別 ============ */
  function vPerson(id) {
    const p = D.people.find(x => x.id === id);
    if (!p) return vHome();
    const app = view('t-person');
    const room = D.rooms.find(r => String(r.cohort) === String(p.cohort)) || {};
    $('.sp-id', app).textContent = p.id;
    $('.sp-art img', app).src = 'img/art/' + p.id + '.webp';
    $('.sp-art img', app).alt = p.name;
    $('.sp-acc', app).textContent = 'SPECIMEN / ' + (lang === 'ja' ? room.title || '' : room.date || '');
    $('.sp-nm', app).textContent = p.name;
    setMascot($('.sp-mas', app), MASCOT[p.team] || 'guest', teamOf(p.team).color);
    $('.d-job', app).textContent = p.job || '—';
    $('.d-team', app).textContent = teamName(p.team);
    $('.d-when', app).textContent = (lang === 'ja' ? room.title : 'Hall ' + p.cohort) + ' / ' + (room.date || '');
    $('.d-id', app).textContent = p.id;

    const acts = [`<a class="btn ghost" href="#/hall/${p.cohort}">${t('back_hall')}</a>`];
    if (isAwake()) {
      acts.push(`<a class="btn ghost" href="#/mural">${t('back_mural')}</a>`);
      acts.push(`<button class="btn" type="button" id="sp-rand">${t('next_rand')}</button>`);
    }
    $('.sp-acts', app).innerHTML = acts.join('');
    const r = $('#sp-rand', app);
    if (r) r.addEventListener('click', () => jumpRandom(p.id));
  }

  function jumpRandom(exceptId) {
    const pool = D.people.filter(x => x.id !== exceptId);
    if (!pool.length) return;
    location.hash = '#/p/' + pool[Math.floor(Math.random() * pool.length)].id;
  }

  /* ============ クイズ ============ */
  function vTrial() {
    const app = view('t-trial');
    setMascot($('#tr-host', app), 'copilot2', 'var(--acc)');
    let order = [...QUIZ.keys()];
    let i = 0, ok = 0, picked = false;

    const shuffle = a => { for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
    shuffle(order);

    $('#tr-n', app).textContent = QUIZ.length;

    $('#tr-start', app).addEventListener('click', () => {
      $('#tr-intro', app).hidden = true;
      $('#tr-play', app).hidden = false;
      ask();
    });

    function ask() {
      picked = false;
      const q = QUIZ[order[i]];
      $('#tr-i', app).textContent = i + 1;
      $('#tr-ok', app).textContent = ok;
      $('#tr-fill', app).style.width = (i / QUIZ.length * 100) + '%';
      $('#tr-q', app).textContent = q.q[lang];
      $('#tr-fb', app).hidden = true;

      const cs = shuffle(q.a.map((a, idx) => ({ a, right: idx === q.c })));
      $('#tr-choices', app).innerHTML = cs.map((c, idx) =>
        `<li><button type="button" data-i="${idx}">
           <span class="k">${'ABCD'[idx]}</span><span>${esc(c.a[lang])}</span>
         </button></li>`).join('');

      $$('#tr-choices button', app).forEach((b, idx) => {
        b.addEventListener('click', () => {
          if (picked) return;
          picked = true;
          const right = cs[idx].right;
          if (right) ok++;
          $$('#tr-choices button', app).forEach((x, j) => {
            x.disabled = true;
            if (cs[j].right) x.classList.add('ok');
            else if (j === idx) x.classList.add('ng');
          });
          const fb = $('#tr-fb', app);
          fb.hidden = false;
          fb.className = 'tr-fb ' + (right ? 'ok' : 'ng');
          fb.innerHTML = `<span class="hd2">${right ? t('trial_ok') : t('trial_ng')}</span>`
            + esc(q.n[lang])
            + `<div class="acts"><button class="btn" type="button" id="tr-next">`
            + (i + 1 < QUIZ.length ? t('trial_next') : t('trial_result')) + '</button></div>';
          $('#tr-ok', app).textContent = ok;
          $('#tr-fill', app).style.width = ((i + 1) / QUIZ.length * 100) + '%';
          $('#tr-next', app).addEventListener('click', () => {
            i++;
            if (i < QUIZ.length) ask(); else finish();
          });
        });
      });
    }

    function finish() {
      $('#tr-play', app).hidden = true;
      const done = $('#tr-done', app);
      done.hidden = false;
      $('#tr-score', app).textContent = ok;
      const pass = ok >= PASS;
      setMascot($('#tr-host2', app), pass ? 'universe' : 'copilot2', 'var(--acc)');
      $('#tr-verdict', app).textContent = pass ? t('trial_pass') : t('trial_fail');
      $('#tr-verdict', app).style.color = pass ? 'var(--acc)' : 'var(--tx)';
      $('#tr-msg', app).innerHTML = pass ? t('trial_pass_msg') : t('trial_fail_msg');

      const acts = [];
      if (pass) {
        const already = isAwake();
        if (!already) release();
        acts.push(`<a class="btn" href="#/mural">${t('trial_go_mural')}</a>`);
        acts.push(`<a class="btn ghost" href="#/">${t('trial_go_home')}</a>`);
        if (already) $('#tr-msg', app).innerHTML += `<br><span class="dim">${t('trial_done_note')}</span>`;
      } else {
        acts.push(`<button class="btn" type="button" id="tr-again">${t('trial_again')}</button>`);
      }
      $('#tr-acts', app).innerHTML = acts.join('');
      const ag = $('#tr-again', app);
      if (ag) ag.addEventListener('click', vTrial);
    }
  }

  /* 封印をとく。ここが「システムの使い方が変わる」ところ。 */
  function release() {
    store.cleared = true;
    const f = $('#flash');
    f.classList.remove('go');
    void f.offsetWidth;
    f.classList.add('go');
    document.body.dataset.mode = 'awake';
    applyStatic();
    drawNav();
  }

  /* ============ 壁画 ============ */
  function vMural() {
    if (!isAwake()) { view('t-locked'); return; }
    const app = view('t-mural');
    const cv = $('#mural', app), tip = $('#tip', app), target = $('#rd-target', app);
    const ctx = cv.getContext('2d');
    const mural = new Image(), pick = new Image();
    let pctx = null;

    mural.onload = () => {
      cv.width = mural.naturalWidth; cv.height = mural.naturalHeight;
      ctx.drawImage(mural, 0, 0);
    };
    pick.onload = () => {
      const o = document.createElement('canvas');
      o.width = pick.naturalWidth; o.height = pick.naturalHeight;
      pctx = o.getContext('2d', { willReadFrequently: true });
      pctx.drawImage(pick, 0, 0);
    };
    mural.src = 'img/mural.webp';
    pick.src = 'img/pick.png';

    const at = e => {
      if (!pctx) return null;
      const r = cv.getBoundingClientRect();
      const x = Math.floor((e.clientX - r.left) / r.width * pick.naturalWidth);
      const y = Math.floor((e.clientY - r.top) / r.height * pick.naturalHeight);
      if (x < 0 || y < 0 || x >= pick.naturalWidth || y >= pick.naturalHeight) return null;
      const d = pctx.getImageData(x, y, 1, 1).data;
      const i = d[0] + d[1] * 256 - 1;
      return i >= 0 && i < D.people.length ? D.people[i] : null;
    };

    cv.addEventListener('pointermove', e => {
      const p = at(e);
      cv.style.cursor = p ? 'pointer' : 'crosshair';
      if (!p) { tip.hidden = true; target.textContent = '— IDLE —'; return; }
      const r = cv.getBoundingClientRect();
      tip.hidden = false;
      tip.textContent = p.name;
      tip.style.left = (e.clientX - r.left) + 'px';
      tip.style.top = (e.clientY - r.top) + 'px';
      target.textContent = p.id + ' / ' + p.name;
    });
    cv.addEventListener('pointerleave', () => {
      tip.hidden = true; target.textContent = '— IDLE —';
    });
    cv.addEventListener('click', e => {
      const p = at(e);
      if (p) location.hash = '#/p/' + p.id;
    });
    $('#rand', app).addEventListener('click', () => jumpRandom(null));
  }

  /* ============ 行き先 ============ */
  function route() {
    const h = (location.hash || '#/').slice(2);
    const [a, b] = h.split('/');
    if (a === 'hall' && b) vHall(b);
    else if (a === 'p' && b) vPerson(b);
    else if (a === 'trial') vTrial();
    else if (a === 'mural') vMural();
    else vHome();
    drawNav();
    window.scrollTo(0, 0);
  }

  /* ============ 開始 ============ */
  fetch('data.json')
    .then(r => r.json())
    .then(d => {
      D = d;
      /* 名刺の裏のQRは ?p=1-01 の形で来る。
         ルーターはハッシュしか見ないので、起動前に移し替えておく。
         replaceState なので hashchange は飛ばず、下の route() が拾う。 */
      const q = new URLSearchParams(location.search).get('p');
      if (q && D.people.some(x => x.id === q)) {
        history.replaceState(null, '', location.pathname + '#/p/' + q);
      } else if (q) {
        history.replaceState(null, '', location.pathname + (location.hash || ''));
      }
      applyStatic();
      boot(() => {
        $('#boot').classList.add('off');
        ['hd', 'nav', 'app', 'ft'].forEach(id => { $('#' + id).hidden = false; });
        route();
      });
      window.addEventListener('hashchange', route);
      $('#lang').addEventListener('click', () => {
        lang = lang === 'ja' ? 'en' : 'ja';
        store.lang = lang;
        applyStatic();
        route();
      });
    })
    .catch(e => {
      $('#boot-text').textContent = 'LINK FAILURE\n' + e;
    });
})();
