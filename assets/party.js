// Easter egg: an 8-bit party walks across the screen, pauses, and walks off.
// Trigger: click the profile photo 3 times, or type "party" anywhere.
// Sprites are original pixel fan art (see party-sprites.js); no game assets used.
(function () {
  const DATA = window.PARTY_SPRITES;
  if (!DATA) return;
  const SCALE = window.innerWidth < 600 ? 2 : 3;
  const W = DATA.width, H = DATA.height + 2;
  const LEGS_ROW = 31;

  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }

  function makeFrame(c, f) {
    const px = Array.from({ length: H }, () => new Array(W).fill(null));
    const paint = (grid, oy) => (grid || []).forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const col = c.palette[row[x]];
        if (row[x] !== '.' && col && oy + y + 1 < H && x + 1 < W) px[oy + y + 1][x + 1] = col;
      }
    });
    paint(c.back, 0);
    paint(c.body, 0);
    paint(DATA.legs[c.legs][f], LEGS_ROW);
    paint(c.front, 0);

    // auto-outline: any empty pixel touching a filled one
    const edge = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (px[y][x]) continue;
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => px[y + dy] && px[y + dy][x + dx])) edge.push([x, y]);
    }
    edge.forEach(([x, y]) => { px[y][x] = DATA.outline; });

    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (!px[y][x]) continue;
      const [r, g, b] = hex(px[y][x]); const i = (y * W + x) * 4;
      img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL();
  }

  const css = document.createElement('style');
  css.textContent = `
    .party { position: fixed; left: 0; bottom: 8px; z-index: 90; display: flex; gap: ${SCALE * 3}px;
             align-items: flex-end; pointer-events: none; }
    .party img { display: block; width: ${W * SCALE}px; height: ${H * SCALE}px; image-rendering: pixelated;
                 filter: drop-shadow(0 ${SCALE}px 0 rgba(0,0,0,.35)); }
    .party.walking img { animation: bob .3s steps(1) infinite; }
    .party.walking img:nth-child(2) { animation-delay: -.1s; }
    .party.walking img:nth-child(3) { animation-delay: -.2s; }
    @keyframes bob { 50% { transform: translateY(-${SCALE}px); } }
    .party-toast { position: fixed; top: 22px; left: 50%; transform: translate(-50%, -90px); z-index: 91;
                   font: 11px 'Press Start 2P', monospace; color: #fff; background: #1b1f6e;
                   border: 3px solid #e8e8ff; border-radius: 6px; padding: 12px 18px;
                   box-shadow: 0 0 0 3px #1b1f6e, 6px 6px 0 rgba(0,0,0,.4); transition: transform .35s steps(5); }
    .party-toast.show { transform: translate(-50%, 0); }
    .egg-hint { opacity: .55; }
  `;
  document.head.appendChild(css);

  // walk order: Cloud leads, then Y'shtola, then Thancred
  const ORDER = ['Cloud', "Y'shtola", 'Thancred'];
  let cache = null;
  const frames = () => cache || (cache = ORDER.map((n) => {
    const c = DATA.chars.find((x) => x.name === n);
    return { name: n, f: [0, 1, 2].map((i) => makeFrame(c, i)) };
  }));

  let running = false;
  async function summon() {
    if (running) return;
    running = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const toast = document.createElement('div');
    toast.className = 'party-toast';
    toast.textContent = '★ Party members joined! ★';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    const wrap = document.createElement('div');
    wrap.className = 'party walking';
    // DOM order is reversed so the leader (Cloud) is on the right, heading right
    const members = frames().slice().reverse().map((m) => {
      const img = new Image();
      img.alt = `${m.name} pixel sprite`;
      img.src = m.f[1];
      wrap.appendChild(img);
      return { img, f: m.f };
    });
    document.body.appendChild(wrap);

    // walk cycle: step A, stand, step B, stand
    const cycle = [1, 0, 2, 0];
    let tick = 0;
    const stepper = setInterval(() => {
      if (!wrap.classList.contains('walking')) return;
      tick = (tick + 1) % cycle.length;
      members.forEach((m) => { m.img.src = m.f[cycle[tick]]; });
    }, 150);

    const width = wrap.offsetWidth;
    const mid = (innerWidth - width) / 2;
    const walk = (from, to) => wrap.animate(
      [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
      { duration: reduce ? 1 : Math.abs(to - from) * 3.2, easing: 'linear', fill: 'forwards' }).finished;

    await walk(-width - 20, mid);
    wrap.classList.remove('walking');
    members.forEach((m) => { m.img.src = m.f[0]; });
    setTimeout(() => toast.classList.remove('show'), 600);
    await sleep(1200);

    wrap.classList.add('walking');
    await walk(mid, innerWidth + 20);
    clearInterval(stepper);
    wrap.remove(); toast.remove();
    running = false;
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

  console.log('%c👋 Hey, fellow dev!', 'font-size:16px;font-weight:bold;color:#3ddc97');
  console.log('%cThanks for poking around. Try clicking my photo 3 times, or type "party".\n— Brayden · reuterbg@gmail.com', 'color:#8b98a9');

  window.summonParty = summon;
})();
