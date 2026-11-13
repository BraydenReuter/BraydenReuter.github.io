// Easter egg: an 8-bit party walks on screen.
// Trigger: click the profile photo 3 times, or type "party" anywhere.
// Sprites are original pixel fan art drawn in code (no game assets used).
(function () {
  const SCALE = window.innerWidth < 600 ? 3 : 4;
  const W = 22, H = 24, BX = 2, BY = 3; // canvas size and body offset

  // ---- shared chibi body (14 wide) ----
  const HEAD = [
    '....kkkkkk....',
    '..kkHHHHHHkk..',
    '.kHHHHHHHHHHk.',
    '.kHHHHHHHHHHk.',
    '.kHHhHHHHhHHk.',
    '.kHhsssssshHk.',
    '.kHssessessHk.',
    '.kHssessessHk.',
    '..kssssssssk..',
    '...kSssssSk...',
    '....kkkkkk....',
  ];
  const BODY = [
    '.....kssk.....',
    '...kkCCCCkk...',
    '..kCCCCcCCCCk.',
    '.kCkCCCcCCCkCk',
    '.kCkCCCcCCCkCk',
    '.ksbbbbbbbbbsk',
    '..kkCCCCCCCkk.',
  ];
  const LEGS = [
    ['....kppkppk...', '....kppkppk...', '...kookkook...'],
    ['...kppk.kppk..', '...kpk...kpk..', '..kook...kook.'],
  ];

  // ---- per-character extras ----
  const GUNBLADE = ['.kk.', 'kwwk', 'kwwk', 'kwwk', 'kwwk', 'kwWk', 'kwWk', 'kwWk', 'kggk', 'kgkk', '.kgk', '..k.'];
  const STAFF = ['.kk.', 'kGGk', 'kGgk', '.kk.', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '.kbk', '..k.'];
  const BUSTER = ['..k..', '.kwk.', 'kwwwk', 'kwwWk', 'kwwWk', 'kwwWk', 'kwwWk', 'kwwWk', 'kwkWk', 'kwwWk', 'kwwWk', 'kkkkk', '.kgk.', '.kgk.', '..k..'];
  const CAT_EARS = ['..k........k..', '..kk......kk..', '..kHk....kHk..', '..kHnk..knHk..'];
  const SPIKES = ['.......k......', '.k....kHk..k..', 'kHk..kHHk.kHk.', '.kHkkHHHHkHHkk', 'kHHHHHHHHHHHHk'];
  const CLOUD_SIDE = ['kHHk', '.kHk', '..k.'];
  const PAULDRON = ['kmmk', 'kmmk', '.kk.'];
  const TABARD = ['kcck', 'kcck'];

  const BASE = { k: '#120e18', s: '#f3cfa8', S: '#d9a07c' };
  const PARTY = [
    {
      name: 'Thancred', line: "We've reviewed his code. Nothing got past us.",
      pal: { H: '#dfe3ec', h: '#9ea6b8', e: '#3a5a8a', C: '#2b3046', c: '#4a5274', b: '#8b6b3d', p: '#1f2230', o: '#3a2a20', w: '#d7dfec', W: '#8e9ab0', g: '#6e5a3a' },
      extras: [[GUNBLADE, 15, 8]],
    },
    {
      name: "Y'shtola", line: 'His commits are... remarkably clean. I approve.',
      pal: { H: '#ecebf5', h: '#b3acd0', e: '#3fb8a0', n: '#e7a6c0', C: '#3b2c55', c: '#6b52a0', b: '#c9a24a', p: '#2a2038', o: '#2a2038', G: '#5ee0c0', g: '#2fae95' },
      extras: [[CAT_EARS, BX, 0], [STAFF, 15, 5]],
      // staff shaft is brown, not belt-gold
      over: { b: '#c9a24a' }, staffBrown: '#7a5a32',
    },
    {
      name: 'Cloud', line: "...Not interested. In anyone else. Hire him.",
      pal: { H: '#f5d65a', h: '#c99b2e', e: '#4fd3e6', C: '#3c3f80', c: '#5b62b8', b: '#7a5530', p: '#34366b', o: '#4a3020', w: '#c5ccd6', W: '#8a93a3', g: '#5a4632', m: '#c0c6d0' },
      extras: [[SPIKES, BX, 0], [CLOUD_SIDE, BX - 1, BY + 3], [PAULDRON, BX + 1, BY + 12], [BUSTER, 15, 5]],
    },
  ];

  function paint(ctx, grid, ox, oy, pal) {
    grid.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === '.' || !pal[ch]) continue;
        ctx.fillStyle = pal[ch];
        ctx.fillRect(ox + x, oy + y, 1, 1);
      }
    });
  }

  function makeFrame(c, frame) {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const pal = { ...BASE, ...c.pal };
    paint(ctx, HEAD, BX, BY, pal);
    paint(ctx, BODY, BX, BY + HEAD.length, pal);
    paint(ctx, LEGS[frame], BX, BY + HEAD.length + BODY.length, pal);
    c.extras.forEach(([grid, x, y]) => {
      const p = grid === STAFF ? { ...pal, b: c.staffBrown } : pal;
      paint(ctx, grid, x, y, p);
    });
    return cv.toDataURL();
  }

  // ---- styles ----
  const css = document.createElement('style');
  css.textContent = `
    .party { position: fixed; left: 0; bottom: 10px; z-index: 90; display: flex; gap: ${SCALE * 4}px;
             align-items: flex-end; pointer-events: none; }
    .hero8 { position: relative; pointer-events: auto; cursor: pointer; }
    .hero8 img { display: block; width: ${W * SCALE}px; height: ${H * SCALE}px; image-rendering: pixelated;
                 filter: drop-shadow(0 4px 0 rgba(0,0,0,.35)); }
    .party.walking .hero8 img { animation: bob .36s steps(1) infinite; }
    @keyframes bob { 50% { transform: translateY(-${SCALE}px); } }
    .hero8 .nm { position: absolute; left: 50%; bottom: -2px; transform: translateX(-50%);
                 font: 8px 'Press Start 2P', monospace; color: #fff; text-shadow: 1px 1px 0 #000; white-space: nowrap; }
    .bubble { position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) scale(.6);
              opacity: 0; transition: opacity .15s, transform .2s steps(3);
              width: max-content; max-width: 210px; padding: 10px 12px; background: #f6f6f6; color: #111;
              font: 9px/1.6 'Press Start 2P', monospace; border: 3px solid #111;
              box-shadow: 4px 4px 0 rgba(0,0,0,.4); }
    .bubble::after { content: ""; position: absolute; left: 50%; top: 100%; margin-left: -6px;
                     border: 6px solid transparent; border-top-color: #111; }
    .bubble.show { opacity: 1; transform: translateX(-50%) scale(1); }
    .party-toast { position: fixed; top: 22px; left: 50%; transform: translate(-50%, -80px); z-index: 91;
                   font: 11px 'Press Start 2P', monospace; color: #fff; background: #1b1f6e;
                   border: 3px solid #e8e8ff; border-radius: 6px; padding: 12px 18px;
                   box-shadow: 0 0 0 3px #1b1f6e, 6px 6px 0 rgba(0,0,0,.4); transition: transform .35s steps(5); }
    .party-toast.show { transform: translate(-50%, 0); }
    .egg-hint { opacity: .55; }
  `;
  document.head.appendChild(css);

  let running = false;
  async function summon() {
    if (running) return;
    running = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const toast = document.createElement('div');
    toast.className = 'party-toast';
    toast.textContent = '★ Party members joined! ★';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    const wrap = document.createElement('div');
    wrap.className = 'party walking';
    const members = PARTY.map((c) => {
      const frames = [makeFrame(c, 0), makeFrame(c, 1)];
      const el = document.createElement('div');
      el.className = 'hero8';
      el.innerHTML = `<div class="bubble">${c.line}</div><img alt="${c.name} pixel sprite" src="${frames[0]}"><span class="nm">${c.name}</span>`;
      el.addEventListener('click', () => say(el));
      wrap.appendChild(el);
      return { el, frames, img: el.querySelector('img') };
    });
    document.body.appendChild(wrap);

    let f = 0;
    const stepper = setInterval(() => {
      f ^= 1;
      if (wrap.classList.contains('walking')) members.forEach((m) => { m.img.src = m.frames[f]; });
    }, 180);

    const width = wrap.offsetWidth;
    const mid = (innerWidth - width) / 2;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const walk = (from, to, ms) => wrap.animate(
      [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
      { duration: reduce ? 1 : ms, easing: 'linear', fill: 'forwards' }).finished;

    await walk(-width - 20, mid, 2600);
    wrap.classList.remove('walking');
    members.forEach((m) => { m.img.src = m.frames[0]; });
    setTimeout(() => toast.classList.remove('show'), 1200);

    for (const m of members) { say(m.el, 2200); await sleep(2300); }
    await sleep(300);

    wrap.classList.add('walking');
    await walk(mid, innerWidth + 20, 2600);
    clearInterval(stepper);
    wrap.remove(); toast.remove();
    running = false;
  }

  function say(el, ms = 2200) {
    const b = el.querySelector('.bubble');
    b.classList.add('show');
    clearTimeout(b._t);
    b._t = setTimeout(() => b.classList.remove('show'), ms);
  }

  // ---- triggers ----
  let clicks = [], typed = '';
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.avatar')) return;
    const now = Date.now();
    clicks = clicks.filter((t) => now - t < 1200).concat(now);
    if (clicks.length >= 3) { clicks = []; summon(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);
    if (typed === 'party') summon();
  });

  // a hello for anyone who opens dev tools
  console.log('%c👋 Hey, fellow dev!', 'font-size:16px;font-weight:bold;color:#3ddc97');
  console.log('%cThanks for poking around. Try clicking my photo 3 times, or type "party".\n— Brayden · reuterbg@gmail.com', 'color:#8b98a9');

  window.summonParty = summon;
  summon.frames = () => PARTY.map((c) => [makeFrame(c, 0), makeFrame(c, 1)]);
})();
