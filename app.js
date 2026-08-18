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
      home_cta_reseal: '▸ ふういんを もどす',
      reseal_ask: 'ふういんを かけなおしますか？\nもういちど こころみに ちょうせんできるように なります。',
      hero_standby: 'CORE : SEALED — ちょうせんに合格すると、ここが変わります',
      hero_awake: 'CORE : OPEN — みんなのオクトキャット',

      pt_trial: 'TRIAL — GitHub ちょうせん',
      trial_lede: 'もんだいは ぜんぶで10問。やさしいものからはじまって、'
        + 'さいごの1問がいちばんむずかしい。'
        + '<b>8問</b>せいかいすると、この美術館の <b>ふういん</b> がとけます。',
      trial_r1: 'こたえると、すぐに○×とせつめいが出ます。',
      trial_r2: '出る問題は毎回ちがいます。まちがえても、なんどでもやりなおせます。',
      trial_r3: 'ごうかくすると、ホームの絵が変わって、新しい画面がひらきます。',
      trial_start: '▸ はじめる',
      trial_hit: 'せいかい',
      trial_combo: 'れんぞく',
      trial_final: 'さいしゅうもんだい',
      trial_run1: 'いい調子！ {n}れんぞく',
      trial_run2: 'すごい、{n}れんぞく！',
      trial_run3: 'とまらない！ {n}れんぞく！！',
      trial_best: 'さいこうれんぞく',
      trial_next: '▸ つぎへ',
      trial_result: '▸ けっかを見る',
      trial_ok: 'せいかい',
      trial_ng: 'ざんねん',
      trial_pass: 'ふういん、かいじょ',
      trial_perfect: 'ぜんもんせいかい',
      trial_perfect_msg: '10問ぜんぶ、せいかいです。おみごと。',
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

      bf_jp: 'イベント概要',
      bf_event: 'EVENT', bf_theme: 'THEME', bf_date: 'DATE', bf_loc: 'LOCATION',
      bf_addr: 'ADDRESS', bf_host: 'HOST', bf_partner: 'PARTNERS',
      bf_program: 'PROGRAM', bf_crew: 'CREW',
      bf_target: 'TARGET', bf_fee: 'ADMISSION',
      bf_total: '計', bf_unit: '名', bf_tbd: '準備中',

      roster_open: '▸ 所属を選ぶ',
      roster_jp: '所属部隊一覧',
      roster_role: 'ENGINEER',
      roster_guest: 'SPECIAL GUEST',
      roster_guest_role: 'SPECIAL GUEST — MC',
      lx_mode: 'にほんご モード',
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
      home_cta_reseal: '▸ Re-seal the archive',
      reseal_ask: 'Re-seal the archive?\nYou will be able to take the trial again.',
      hero_standby: 'CORE : SEALED — pass the trial and this will change',
      hero_awake: 'CORE : OPEN — the Octocat of everyone',

      pt_trial: 'TRIAL — GitHub Challenge',
      trial_lede: 'Ten multiple-choice questions. They start easy and the very '
        + 'last one is the hardest. '
        + 'Get <b>8</b> right and the museum\'s <b>seal</b> is lifted.',
      trial_r1: 'You get the answer and a short note right away.',
      trial_r2: 'The questions differ every time. Wrong answers are fine — retry as often as you like.',
      trial_r3: 'Passing changes the home image and opens a new screen.',
      trial_start: '▸ Start',
      trial_hit: 'CORRECT',
      trial_combo: 'STREAK',
      trial_final: 'FINAL QUESTION',
      trial_run1: 'Nice — {n} in a row',
      trial_run2: 'Great, {n} in a row!',
      trial_run3: 'Unstoppable — {n} in a row!!',
      trial_best: 'BEST STREAK',
      trial_next: '▸ Next',
      trial_result: '▸ See result',
      trial_ok: 'Correct',
      trial_ng: 'Not quite',
      trial_pass: 'SEAL LIFTED',
      trial_perfect: 'PERFECT RUN',
      trial_perfect_msg: 'All ten correct. Beautifully done.',
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

      bf_jp: '',
      bf_event: 'EVENT', bf_theme: 'THEME', bf_date: 'DATE', bf_loc: 'LOCATION',
      bf_addr: 'ADDRESS', bf_host: 'HOST', bf_partner: 'PARTNERS',
      bf_program: 'PROGRAM', bf_crew: 'CREW',
      bf_target: 'TARGET', bf_fee: 'ADMISSION',
      bf_total: 'Total', bf_unit: '', bf_tbd: 'TBD',

      roster_open: '▸ Choose a squadron',
      roster_jp: '',
      roster_role: 'ENGINEER',
      roster_guest: 'SPECIAL GUEST',
      roster_guest_role: 'SPECIAL GUEST — MC',
      lx_mode: 'ENGLISH MODE',
    },
  };

  /* ============ クイズ ============ */
  /* 24問の中から、やさしい4問・ふつう4問・むずかしい2問をえらんで10問にする。
     やるたびに顔ぶれが変わって、最後の1問はいちばん難しいものが来る。
     d は難しさ（1〜3）、g は種類（git / github / mine / pc）。 */
  const PASS = 8;
  const DRAW = [[1, 4], [2, 4], [3, 2]];

  const POOL = [
    /* ---- やさしい ---- */
    { d: 1, g: 'github',
      q: { ja: 'GitHub のマスコット「Octocat（オクトキャット）」は、どの2つの生きものが合わさった名前？',
           en: 'GitHub\'s mascot is called the Octocat. Which two creatures make up the name?' },
      a: [{ ja: 'タコ と ネコ', en: 'Octopus and cat' },
          { ja: 'イヌ と ネコ', en: 'Dog and cat' },
          { ja: 'タコ と イヌ', en: 'Octopus and dog' },
          { ja: 'トリ と ネコ', en: 'Bird and cat' }],
      c: 0,
      n: { ja: 'Octo は「タコ」、Cat は「ネコ」。あわせて Octocat です。',
           en: '"Octo" for octopus, "cat" for cat. Together: Octocat.' } },

    { d: 1, g: 'git',
      q: { ja: 'プログラムを直したあと「ここまでできた」と記録することを何という？',
           en: 'After changing your code, what do you call saving a record of it?' },
      a: [{ ja: 'コミット', en: 'Commit' },
          { ja: 'コピー', en: 'Copy' },
          { ja: 'プリント', en: 'Print' },
          { ja: 'シャッター', en: 'Shutter' }],
      c: 0,
      n: { ja: 'コミットは「ここまでの記録」。あとから、いつでも見にもどれます。',
           en: 'A commit is a saved point in history. You can always come back to it.' } },

    { d: 1, g: 'github',
      q: { ja: 'GitHub で、作品やプログラムを置いておく場所を何という？',
           en: 'On GitHub, what do you call the place where a project lives?' },
      a: [{ ja: 'リポジトリ', en: 'Repository' },
          { ja: 'カメラ', en: 'Camera' },
          { ja: 'モニター', en: 'Monitor' },
          { ja: 'スピーカー', en: 'Speaker' }],
      c: 0,
      n: { ja: 'リポジトリ（repository）は「置き場」という意味。ひとつの作品にひとつ作ります。',
           en: 'A repository is a storehouse — one per project.' } },

    { d: 1, g: 'github',
      q: { ja: 'GitHub Copilot（コパイロット）は、なにを手伝ってくれる？',
           en: 'What does GitHub Copilot help you with?' },
      a: [{ ja: 'プログラムを書くこと', en: 'Writing code' },
          { ja: 'そうじ', en: 'Cleaning the room' },
          { ja: '料理', en: 'Cooking dinner' },
          { ja: '車の運転', en: 'Driving a car' }],
      c: 0,
      n: { ja: 'Copilot は「副操縦士」という意味。となりで、書くのを手伝ってくれます。',
           en: 'Copilot means co-pilot — it sits beside you and helps you write.' } },

    { d: 1, g: 'github',
      q: { ja: 'GitHub Pages（ギットハブ ページズ）を使うと、なにができる？',
           en: 'What can you do with GitHub Pages?' },
      a: [{ ja: 'ウェブサイトを世界に公開できる', en: 'Publish a website to the world' },
          { ja: 'ゲームがもらえる', en: 'Get free games' },
          { ja: '絵がうまくなる', en: 'Become better at drawing' },
          { ja: '空をとべる', en: 'Fly through the sky' }],
      c: 0,
      n: { ja: 'この美術館も GitHub Pages で公開されています。いま見ているページが、その答えです。',
           en: 'This very museum is published with GitHub Pages — the page you are on is the answer.' } },

    { d: 1, g: 'mine',
      q: { ja: 'マインクラフトで、スイッチやしかけを動かすときに使う「赤い粉」は？',
           en: 'In Minecraft, what red dust do you use to power switches and contraptions?' },
      a: [{ ja: 'レッドストーン', en: 'Redstone' },
          { ja: 'ダイヤモンド', en: 'Diamond' },
          { ja: 'こくたん', en: 'Charcoal' },
          { ja: 'マグマ', en: 'Lava' }],
      c: 0,
      n: { ja: 'レッドストーンは、ゲームの中の「電気」。つなぎ方しだいで、ふしぎな装置が作れます。',
           en: 'Redstone is electricity inside the game. Wire it up and you can build real machines.' } },

    { d: 1, g: 'pc',
      q: { ja: 'コンピューターに「こうしてね」と順ばんに伝える書きものを、何という？',
           en: 'What do you call the written instructions you give a computer, step by step?' },
      a: [{ ja: 'プログラム', en: 'A program' },
          { ja: 'ポスター', en: 'A poster' },
          { ja: 'てがみ', en: 'A letter' },
          { ja: 'レシート', en: 'A receipt' }],
      c: 0,
      n: { ja: 'プログラムは、コンピューターへの「手順書」。上から順に、そのとおりに動きます。',
           en: 'A program is a recipe for a computer: it follows the steps in order, exactly.' } },

    { d: 1, g: 'pc',
      q: { ja: 'プログラムのまちがいを見つけて直すことを、何という？',
           en: 'What do you call finding and fixing mistakes in a program?' },
      a: [{ ja: 'デバッグ', en: 'Debugging' },
          { ja: 'ダウンロード', en: 'Downloading' },
          { ja: 'ログイン', en: 'Logging in' },
          { ja: 'セーブ', en: 'Saving' }],
      c: 0,
      n: { ja: 'まちがいを「バグ」といい、それを取りのぞくから「デバッグ」。プロもいちばん時間を使う作業です。',
           en: 'Mistakes are "bugs", so removing them is "de-bugging" — where pros spend most of their time.' } },

    /* ---- ふつう ---- */
    { d: 2, g: 'github',
      q: { ja: '「こう直したらどうかな？」と提案して、入れてもらうようお願いするしくみは？',
           en: 'What do you open to propose a change and ask for it to be merged?' },
      a: [{ ja: 'プルリクエスト', en: 'Pull request' },
          { ja: 'ダウンロード', en: 'Download' },
          { ja: 'シャットダウン', en: 'Shutdown' },
          { ja: 'アップデート', en: 'Update' }],
      c: 0,
      n: { ja: 'プルリクエストは「引きとってください」というお願い。みんなで見て、話しあって決めます。',
           en: 'A pull request asks others to pull your change in — after they review it together.' } },

    { d: 2, g: 'git',
      q: { ja: '本すじをこわさずに、べつの道で作業するためのしくみは？',
           en: 'What lets you work on a separate line without breaking the main one?' },
      a: [{ ja: 'ブランチ', en: 'Branch' },
          { ja: 'ロープ', en: 'Rope' },
          { ja: 'トンネル', en: 'Tunnel' },
          { ja: 'ハシゴ', en: 'Ladder' }],
      c: 0,
      n: { ja: 'ブランチは木の「えだ」。えだの上でためして、うまくいったら本すじに合わせます。',
           en: 'A branch is like a tree limb: experiment there, then merge back when it works.' } },

    { d: 2, g: 'github',
      q: { ja: '「こまったこと」や「やりたいこと」を書いてのこしておく場所は？',
           en: 'Where do you write down a problem or an idea so it is not forgotten?' },
      a: [{ ja: 'イシュー', en: 'Issue' },
          { ja: 'ポスト', en: 'Post box' },
          { ja: 'カレンダー', en: 'Calendar' },
          { ja: 'ライト', en: 'Light' }],
      c: 0,
      n: { ja: 'イシュー（issue）は「宿題ノート」のようなもの。だれでも書けて、みんなで見られます。',
           en: 'An issue is a shared to-do note. Anyone can open one; everyone can see it.' } },

    { d: 2, g: 'github',
      q: { ja: '人の作品をまるごと自分のところにコピーして、じゆうに手を加えられるようにすることは？',
           en: 'What do you call copying someone\'s project so you can freely change your own copy?' },
      a: [{ ja: 'フォーク', en: 'Fork' },
          { ja: 'スプーン', en: 'Spoon' },
          { ja: 'ナイフ', en: 'Knife' },
          { ja: 'おはし', en: 'Chopsticks' }],
      c: 0,
      n: { ja: '食べるフォークとおなじつづり。道が二またに分かれる、というイメージです。',
           en: 'Same word as the dinner fork — the picture is a road splitting in two.' } },

    { d: 2, g: 'git',
      q: { ja: 'えだの上で作った直しを、本すじに合わせることを何という？',
           en: 'What do you call folding your branch work back into the main line?' },
      a: [{ ja: 'マージ', en: 'Merge' },
          { ja: 'ジャンプ', en: 'Jump' },
          { ja: 'リセット', en: 'Reset' },
          { ja: 'スリープ', en: 'Sleep' }],
      c: 0,
      n: { ja: 'マージは「合流」。川が合わさるように、ふたつの流れをひとつにします。',
           en: 'Merge means "join". Two streams of work flow together into one.' } },

    { d: 2, g: 'github',
      q: { ja: 'GitHub で、気に入った作品につける「いいね」のような印は？',
           en: 'On GitHub, what do you give a project you like, similar to a "like"?' },
      a: [{ ja: 'スター（★）', en: 'A star (★)' },
          { ja: 'ハンコ', en: 'A stamp' },
          { ja: 'メダル', en: 'A medal' },
          { ja: 'シール', en: 'A sticker' }],
      c: 0,
      n: { ja: 'スターは、いつでも見にもどれる「しおり」にもなります。人気の作品は何万もつきます。',
           en: 'A star is also a bookmark. Popular projects collect tens of thousands of them.' } },

    { d: 2, g: 'mine',
      q: { ja: 'マインクラフトの Java版 は、なんという言葉（プログラミング言語）で作られている？',
           en: 'Minecraft: Java Edition is written in which programming language?' },
      a: [{ ja: 'Java（ジャバ）', en: 'Java' },
          { ja: 'HTML（エイチティーエムエル）', en: 'HTML' },
          { ja: 'Excel（エクセル）', en: 'Excel' },
          { ja: 'MIDI（ミディ）', en: 'MIDI' }],
      c: 0,
      n: { ja: '名前のとおり Java で書かれています。だから「Java版」とよばれます。',
           en: 'It is right there in the name — the edition is written in Java.' } },

    { d: 2, g: 'mine',
      q: { ja: 'マインクラフトで、コマンドを自動で実行してくれるブロックは？',
           en: 'In Minecraft, which block runs commands automatically?' },
      a: [{ ja: 'コマンドブロック', en: 'Command block' },
          { ja: 'かまど', en: 'Furnace' },
          { ja: 'チェスト', en: 'Chest' },
          { ja: 'たいまつ', en: 'Torch' }],
      c: 0,
      n: { ja: 'コマンドブロックをならべると、ゲームの中でプログラムを組んでいるのとおなじことができます。',
           en: 'Chain command blocks together and you are effectively programming inside the game.' } },

    { d: 2, g: 'pc',
      q: { ja: 'プログラムのまちがいを「バグ」といいます。もともとは何のこと？',
           en: 'Program mistakes are called "bugs". What did the word originally mean?' },
      a: [{ ja: '虫', en: 'An insect' },
          { ja: '雨', en: 'Rain' },
          { ja: 'かぜ', en: 'Wind' },
          { ja: 'ほこり', en: 'Dust' }],
      c: 0,
      n: { ja: 'むかし、コンピューターにはさまった一ぴきのガ（虫）が原因で止まったことがあり、記録に残されています。',
           en: 'A moth once jammed an early computer — the team taped it into the logbook as the first "bug".' } },

    /* ---- むずかしい ---- */
    { d: 3, g: 'git',
      q: { ja: 'GitHub のもとになった Git（ギット）をつくった人は？',
           en: 'Who created Git, the system GitHub is built on?' },
      a: [{ ja: 'リーナス・トーバルズ', en: 'Linus Torvalds' },
          { ja: 'トーマス・エジソン', en: 'Thomas Edison' },
          { ja: 'アルベルト・アインシュタイン', en: 'Albert Einstein' },
          { ja: 'マリー・キュリー', en: 'Marie Curie' }],
      c: 0,
      n: { ja: 'Linux（リナックス）をつくった人でもあります。2005年に Git をつくりました。',
           en: 'He also created Linux. Git came from him in 2005.' } },

    { d: 3, g: 'github',
      q: { ja: 'Octocat には、ちゃんと名前がついています。なんという名前？',
           en: 'The Octocat has a proper name. What is it?' },
      a: [{ ja: 'モナリザ', en: 'Mona Lisa' },
          { ja: 'クレオパトラ', en: 'Cleopatra' },
          { ja: 'ジュリエット', en: 'Juliet' },
          { ja: 'アリス', en: 'Alice' }],
      c: 0,
      n: { ja: '有名な絵「モナ・リザ」から。ふだんは「モナ」と呼ばれています。',
           en: 'Named after the famous painting. Everyone just calls her Mona.' } },

    { d: 3, g: 'github',
      q: { ja: 'GitHub が毎年出している、世界のプログラミングの様子をまとめた報告書の名前は？',
           en: 'What is GitHub\'s yearly report on how the world writes software called?' },
      a: [{ ja: 'Octoverse（オクトバース）', en: 'Octoverse' },
          { ja: 'Catalog（カタログ）', en: 'Catalog' },
          { ja: 'Starmap（スターマップ）', en: 'Starmap' },
          { ja: 'Codebook（コードブック）', en: 'Codebook' }],
      c: 0,
      n: { ja: 'Octo（タコ）と Universe（うちゅう）を合わせた名前。どの言語が人気かなどが分かります。',
           en: '"Octo" plus "universe". It shows things like which languages are growing fastest.' } },

    { d: 3, g: 'mine',
      q: { ja: 'マインクラフトを最初につくった人の、あだ名は？',
           en: 'What was the nickname of the person who first created Minecraft?' },
      a: [{ ja: 'Notch（ノッチ）', en: 'Notch' },
          { ja: 'Creeper（クリーパー）', en: 'Creeper' },
          { ja: 'Steve（スティーブ）', en: 'Steve' },
          { ja: 'Ender（エンダー）', en: 'Ender' }],
      c: 0,
      n: { ja: '本名はマルクス・ペルソン。ひとりで作りはじめたゲームが、世界じゅうに広がりました。',
           en: 'His real name is Markus Persson. A game he started alone ended up everywhere.' } },

    { d: 3, g: 'github',
      q: { ja: 'いろいろな姿の Octocat を集めた、図かんのようなページの名前は？',
           en: 'What is the gallery of all the different Octocat designs called?' },
      a: [{ ja: 'Octodex（オクトデックス）', en: 'Octodex' },
          { ja: 'Octobox（オクトボックス）', en: 'Octobox' },
          { ja: 'Octozoo（オクトズー）', en: 'Octozoo' },
          { ja: 'Octomap（オクトマップ）', en: 'Octomap' }],
      c: 0,
      n: { ja: '宇宙飛行士やヒーローなど、何百もの Octocat がならんでいます。みんなのオクトキャットも、その仲間です。',
           en: 'Hundreds of Octocats — astronauts, heroes, and more. Yours belongs in there too.' } },

    { d: 3, g: 'github',
      q: { ja: 'GitHub は2018年に、ある会社の仲間になりました。どこ？',
           en: 'In 2018 GitHub joined which company?' },
      a: [{ ja: 'マイクロソフト', en: 'Microsoft' },
          { ja: '任天堂', en: 'Nintendo' },
          { ja: 'ソニー', en: 'Sony' },
          { ja: 'トヨタ', en: 'Toyota' }],
      c: 0,
      n: { ja: 'いまも GitHub は GitHub のまま。世界じゅうの人が、これまでどおり使っています。',
           en: 'GitHub still runs as GitHub, used by people all over the world just as before.' } },

    { d: 3, g: 'pc',
      q: { ja: '世界ではじめてプログラムを書いた人といわれるのは、だれ？',
           en: 'Who is regarded as the first person to write a computer program?' },
      a: [{ ja: 'エイダ・ラブレス', en: 'Ada Lovelace' },
          { ja: 'ライト兄弟', en: 'The Wright brothers' },
          { ja: 'ガリレオ・ガリレイ', en: 'Galileo Galilei' },
          { ja: 'ヘレン・ケラー', en: 'Helen Keller' }],
      c: 0,
      n: { ja: '約180年前、まだコンピューターが完成していない時代に、その動かし方を書きのこした人です。',
           en: 'Around 180 years ago she wrote how a machine would work — before it was ever built.' } },
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

  /* 組織図の回ごとの色。回が増えても順ぐりに割り当たる。 */
  const HALLC = ['var(--acc)', 'var(--pk)', 'var(--ok)', 'var(--warn)'];

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

  function view(id, host, keep) {
    const app = host || $('#app');
    if (!keep) app.innerHTML = '';
    const frag = $('#' + id).content.cloneNode(true);
    const first = frag.firstElementChild;
    app.appendChild(frag);
    const scope = keep ? first : app;
    $$('[data-t]', scope).forEach(el => { el.innerHTML = t(el.dataset.t); });
    fillCounts(scope);
    return keep ? first : app;
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
    if (isAwake()) acts.push(`<button class="btn ghost seal" type="button" id="reseal">${t('home_cta_reseal')}</button>`);
    $('#home-acts', app).innerHTML = acts.join('');
    const rs = $('#reseal', app);
    if (rs) rs.addEventListener('click', () => {
      if (confirm(t('reseal_ask'))) reseal();
    });

    /* 配備ユニット＝組織図。回ごとに枝分かれさせて、チームが重なっても見わけがつくようにする。
       枝はチームまで。だれがいるかは、その先の展示室で見る。 */
    const halls = D.rooms.map(r => {
      const cid = String(r.cohort);
      const mine = D.people.filter(p => String(p.cohort) === cid);
      const keys = (ORDER[cid] || []).filter(k => mine.some(p => p.team === k));
      const rest = [...new Set(mine.map(p => p.team))].filter(k => !keys.includes(k));
      return { r, cid, mine, keys: [...keys, ...rest] };
    }).filter(h => h.keys.length);

    const unit = (k, mine) => {
      const n = mine.filter(p => p.team === k).length;
      return `<div class="og-unit" style="color:${teamOf(k).color}">
          <div class="mas"><img src="${masSrc(MASCOT[k] || 'guest')}" alt="" loading="lazy" decoding="async"></div>
          <div class="un">${esc(teamName(k))}</div>
          <div class="uc">${String(n).padStart(2, '0')} ${lang === 'ja' ? '名' : 'PPL'}</div>
        </div>`;
    };

    $('#units', app).innerHTML =
      `<div class="og-hub"><span class="og-k">ARCHIVE</span>
         <b>${D.people.length}</b><i>${lang === 'ja' ? '名' : 'PPL'}</i></div>
       <div class="og-halls" style="--n:${halls.length}">${halls.map((h, hi) => `
         <section class="og-hall" style="--c:${HALLC[hi % HALLC.length]}">
           <a class="og-h" href="#/hall/${h.cid}">
             <span class="og-k">HALL ${h.cid.padStart(2, '0')}</span>
             <b>${esc(lang === 'ja' ? h.r.title : (h.r.en || 'Hall ' + h.cid))}</b>
             <i>${esc(h.r.date || '')}</i>
             <em>${String(h.mine.length).padStart(2, '0')} ${lang === 'ja' ? '名' : 'PPL'}</em>
           </a>
           <div class="og-units" style="--n:${h.keys.length}">
             ${h.keys.map(k => unit(k, h.mine)).join('')}
           </div>
         </section>`).join('')}</div>`;
    fillCounts(app);
  }

  /* ============ 展示室 ============ */
  const SQUAD = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT'];

  /** その回のチームを、決めた順に並べて返す。人のいないチームは出さない。 */
  function teamKeys(mine, cohort) {
    const order = ORDER[String(cohort)] || [];
    return [...order.filter(k => mine.some(p => p.team === k)),
            ...[...new Set(mine.map(p => p.team))].filter(k => !order.includes(k))];
  }

  /** MISSION BRIEFING。中身が空の行は出さない。 */
  function fillBrief(app, room) {
    const b = (room.brief || {})[lang] || (room.brief || {}).ja;
    const panel = $('.brief', app);
    if (!b) { panel.hidden = true; return; }
    $('.pt-jp', panel).textContent = t('bf_jp');

    const rows = [];
    const line = (k, v, cls) => { if (v) rows.push([t(k), esc(v), cls || '']); };
    line('bf_event', b.event);
    line('bf_theme', b.theme);
    line('bf_date', b.date);
    line('bf_program', b.program);
    line('bf_target', b.target);
    line('bf_fee', b.fee);
    line('bf_loc', b.location);
    if (b.address) {
      rows.push([t('bf_addr'), b.map
        ? `<a href="${esc(b.map)}" target="_blank" rel="noopener">${esc(b.address)}</a>`
        : esc(b.address), 'dim']);
    }
    line('bf_host', b.host);
    line('bf_partner', b.partners, 'dim');

    if (b.crew && b.crew.length) {
      const total = b.crew.reduce((s, c) => s + c[1], 0);
      const chips = b.crew.map(([nm, n], i) =>
        `<span class="chip" style="--i:${i}">${esc(nm)} ${n}${t('bf_unit')}</span>`).join('');
      rows.push([t('bf_crew'),
        `<div class="crew">${chips}<b class="tot">${t('bf_total')} ${total}${t('bf_unit')}</b></div>`, 'wide']);
    }

    $('.bf-l', app).innerHTML = rows.map(([k, v, c]) =>
      `<dt>${k}</dt><dd class="${c}">${v}</dd>`).join('');
  }

  /** CREW ROSTER。所属ごとのカードを全画面で出す。 */
  function openRoster(room) {
    const mine = D.people.filter(p => String(p.cohort) === String(room.cohort));
    const ov = view('t-roster', document.body, true);
    $('.ov-jp', ov).textContent = t('roster_jp');

    const keys = teamKeys(mine, room.cohort);
    const guests = keys.filter(k => k === 'guest');
    const units = keys.filter(k => k !== 'guest');

    const member = (p, role) => `<a class="mb" href="#/p/${p.id}">
        <span class="mb-ph"><img loading="lazy" src="img/thumb/${p.id}.webp" alt=""></span>
        <span class="mb-x"><span class="mb-r">${role}</span><span class="mb-n">${esc(p.name)}</span></span>
      </a>`;

    const card = (k, i) => {
      const list = mine.filter(p => p.team === k);
      const en = (teamOf(k).en || k).toUpperCase();
      const jp = teamOf(k).label;
      return `<section class="sq-c" style="--c:${teamOf(k).color}">
          <header class="sq-h">
            <span class="sq-m"><img src="${masSrc(MASCOT[k] || 'guest')}" alt=""></span>
            <span class="sq-x">
              <span class="sq-s">SQUADRON ${SQUAD[i] || String(i + 1)}</span>
              <span class="sq-n">${esc(en)} TEAM</span>
              ${lang === 'ja' ? `<span class="sq-j">${esc(jp)}</span>` : ''}
            </span>
          </header>
          <div class="sq-l">${list.map(p => member(p, t('roster_role'))).join('')}</div>
        </section>`;
    };

    $('.sq', ov).innerHTML = units.map(card).join('')
      + guests.map(k => {
        const list = mine.filter(p => p.team === k);
        return `<section class="sq-c gu" style="--c:${teamOf(k).color}">
            <header class="sq-h sq-h2"><span class="sq-s">${t('roster_guest')}</span></header>
            <div class="sq-l">${list.map(p => member(p, t('roster_guest_role'))).join('')}</div>
          </section>`;
      }).join('');

    const close = () => { ov.classList.remove('on'); setTimeout(() => ov.remove(), 240); };
    $('.ov-x', ov).addEventListener('click', close);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    ov.addEventListener('pointerdown', e => { if (e.target.closest('.mb')) close(); });
    document.addEventListener('keydown', function esc2(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc2); }
    });
    requestAnimationFrame(() => ov.classList.add('on'));
  }

  function vHall(cohort) {
    const room = D.rooms.find(r => String(r.cohort) === String(cohort));
    if (!room) return vHome();
    const app = view('t-hall');
    const hp = $('.hallp', app);
    $('.pt-en', hp).textContent = 'HALL ' + String(room.cohort).padStart(2, '0');
    $('.pt-jp', hp).textContent = lang === 'ja' ? room.title : room.date;
    fillBrief(app, room);

    const mine = D.people.filter(p => String(p.cohort) === String(room.cohort));
    $('.meta', app).innerHTML = [
      `${t('date')} <b>${room.date}</b>`,
      `${t('place')} <b>${lang === 'en' ? (room.place_en || room.place) : room.place}</b>`,
      `${t('filled')} <b>${mine.length}</b> / ${room.seats} ${t('seats')}`,
      `${t('vacant')} <b>${Math.max(0, room.seats - mine.length)}</b>`,
    ].join('');

    const keys = teamKeys(mine, room.cohort);

    if (!keys.length) { $('.teams', app).innerHTML = `<p class="lede">${t('no_people')}</p>`; return; }

    $('.hall-acts', app).innerHTML =
      `<button class="btn" type="button" id="ros">${t('roster_open')}</button>`;
    $('#ros', app).addEventListener('click', () => openRoster(room));

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
  const shuffle = a => { for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };

  /* やさしい順に4問・4問・2問えらんで、10問の山をつくる。
     だんだん難しくなり、最後の1問はいちばん手ごわいものが来る。 */
  function drawQuiz() {
    const set = [];
    for (const [d, n] of DRAW) {
      set.push(...shuffle(POOL.filter(q => q.d === d)).slice(0, n));
    }
    return set;
  }

  /* クイズの案内役。毎回ちがう子が、走査線で組み上がって出てくる。
     さわると、その場でもう一度だれかがやって来る。 */
  const HOSTS = ['mona', 'mona2', 'copilot', 'copilot2', 'ducky', 'ducky2', 'universe', 'guest'];
  let hostLast = -1;

  function rollHost(box, from) {
    const cast = from || HOSTS;
    let j = Math.floor(Math.random() * cast.length);
    if (cast === HOSTS && j === hostLast) j = (j + 1) % cast.length;
    if (cast === HOSTS) hostLast = j;
    setMascot(box, cast[j], 'var(--acc)');
    box.classList.remove('hin');
    void box.offsetWidth;
    box.classList.add('hin');
  }

  function vTrial() {
    const app = view('t-trial');
    const host = $('#tr-host', app);
    rollHost(host);
    host.addEventListener('click', () => rollHost(host));
    const QUIZ = drawQuiz();
    let i = 0, ok = 0, picked = false, run = 0, best = 0;

    $('#tr-n', app).textContent = QUIZ.length;

    $('#tr-start', app).addEventListener('click', () => {
      $('#tr-intro', app).hidden = true;
      $('#tr-play', app).hidden = false;
      ask();
    });

    /* 連続せいかいの表示。3・5・7・10 でひときわ光る。 */
    function drawCombo(pop) {
      const c = $('#tr-combo', app);
      c.hidden = run < 2;
      $('#tr-combo b', app).textContent = run;
      c.classList.toggle('hot', run >= 5);
      if (pop) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    }

    function ask() {
      picked = false;
      const q = QUIZ[i];
      const last = i + 1 === QUIZ.length;
      $('#tr-i', app).textContent = i + 1;
      $('#tr-ok', app).textContent = ok;
      $('#tr-fill', app).style.width = (i / QUIZ.length * 100) + '%';
      $('#tr-q', app).textContent = q.q[lang];
      $('#tr-fb', app).hidden = true;
      $('#tr-lv', app).textContent = '★'.repeat(q.d);
      $('#tr-lv', app).dataset.d = q.d;
      $('#tr-final', app).hidden = !last;
      drawCombo(false);

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
          if (right) { ok++; run++; if (run > best) best = run; } else { run = 0; }
          drawCombo(right && run >= 2);
          $$('#tr-choices button', app).forEach((x, j) => {
            x.disabled = true;
            if (cs[j].right) x.classList.add('ok');
            else if (j === idx) x.classList.add('ng');
          });
          const fb = $('#tr-fb', app);
          fb.hidden = false;
          fb.className = 'tr-fb ' + (right ? 'ok' : 'ng');
          const cheer = right && run >= 3
            ? `<span class="tr-cheer">${t(run >= 7 ? 'trial_run3' : run >= 5 ? 'trial_run2' : 'trial_run1')
                 .replace('{n}', run)}</span>` : '';
          fb.innerHTML = `<span class="hd2">${right ? t('trial_ok') : t('trial_ng')}</span>${cheer}`
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
      $('#tr-of', app).textContent = QUIZ.length;
      const pass = ok >= PASS;
      const perfect = ok === QUIZ.length;
      rollHost($('#tr-host2', app),
        perfect ? ['mona', 'mona2', 'universe'] : pass ? ['universe', 'mona', 'copilot'] : ['copilot2', 'ducky', 'ducky2']);
      $('#tr-verdict', app).textContent = perfect ? t('trial_perfect')
        : pass ? t('trial_pass') : t('trial_fail');
      $('#tr-verdict', app).style.color = pass ? 'var(--acc)' : 'var(--tx)';
      $('#tr-msg', app).innerHTML = (perfect ? t('trial_perfect_msg') + ' ' : '')
        + (pass ? t('trial_pass_msg') : t('trial_fail_msg'));
      const bs = $('#tr-best', app);
      bs.hidden = best < 3;
      $('#tr-best b', app).textContent = best;

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

  /* 封印をかけなおす。ためした人が、もういちど最初から遊べるようにするための戻し道。 */
  function reseal() {
    store.cleared = false;
    document.body.dataset.mode = 'standby';
    applyStatic();
    drawNav();
    if (location.hash.startsWith('#/mural')) location.hash = '#/';
    else route();
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

  /* ============ 言語切替 ============ */
  /* 切り替えるたびに、この3人のだれかが出てくる。
     1=きいろのアヒル / 2=ピンクのネコ / 3=むらさきのコパイロット。 */
  const LX_CAST = [
    { m: 'ducky', c: '#f2c04b' },
    { m: 'mona', c: '#d16bd9' },
    { m: 'copilot', c: '#6f7bf7' },
  ];
  let lxBusy = false, lxLast = -1;

  function switchLang() {
    if (lxBusy) return;
    lxBusy = true;

    let i = Math.floor(Math.random() * LX_CAST.length);
    if (i === lxLast) i = (i + 1) % LX_CAST.length;
    lxLast = i;
    const cast = LX_CAST[i];
    const next = lang === 'ja' ? 'en' : 'ja';

    const lx = $('#lx');
    lx.style.setProperty('--lc', cast.c);
    $('.lx-mas', lx).src = masSrc(cast.m);
    $('.lx-from', lx).textContent = lang.toUpperCase();
    $('.lx-to', lx).textContent = next.toUpperCase();
    $('.lx-mode', lx).textContent = L[next].lx_mode;
    lx.hidden = false;
    requestAnimationFrame(() => lx.classList.add('on'));

    // 中身の入れ替えは、キャラが組み上がって衝撃波が消えたあと。
    // 幕が下りきっているので、切り替わる瞬間は見えない。
    setTimeout(() => {
      lang = next;
      store.lang = lang;
      applyStatic();
      route();
    }, 1150);

    setTimeout(() => lx.classList.add('out'), 1460);

    setTimeout(() => {
      lx.classList.remove('on', 'out');
      lx.hidden = true;
      lxBusy = false;
    }, 1820);
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
      $('#lang').addEventListener('click', switchLang);
    })
    .catch(e => {
      $('#boot-text').textContent = 'LINK FAILURE\n' + e;
    });
})();
