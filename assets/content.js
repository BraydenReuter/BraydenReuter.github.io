window.renderSite = function (root) {
  const chips = (list) => `<div class="chips">${list.map((c) => `<span class="chip">${c}</span>`).join('')}</div>`;

  root.innerHTML = `
  <nav class="nav" data-build="nav"><div class="wrap">
    <a class="logo" href="#top">brayden<span>.dev</span></a>
    <div class="nav-links">
      <a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a>
      <a href="#skills">Skills</a><a href="#contact">Contact</a>
    </div>
  </div></nav>

  <header class="hero" id="top"><div class="wrap">
    <div class="hero-grid">
      <div class="hero-text" data-build="hero">
        <div class="eyebrow">// software engineering · cloud infrastructure</div>
        <h1>Brayden<br><span class="grad">Reuter</span></h1>
        <p class="lede">Computer Science student at Randolph College, graduating May 2027. I enjoy understanding how things work, finding ways to improve them, and turning ideas into functional applications.</p>
        <div class="cta">
          <a class="btn primary" href="#projects">View projects →</a>
          <a class="btn" href="https://github.com/BraydenReuter" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="avatar" data-build="avatar">
        <div class="initials">BR</div>
        <img class="photo" src="assets/img/photo.jpeg" alt="Brayden Reuter" onerror="this.remove()">
        <div class="tag">● open to work · May 2027</div>
      </div>
    </div>
    <div class="stats" data-build="stats">
      <div class="stat"><b>4.0</b><span>GPA · CS + Math</span></div>
      <div class="stat"><b>6+</b><span>Languages</span></div>
      <div class="stat"><b>2</b><span>Cloud certs in progress</span></div>
      <div class="stat"><b>1</b><span>Business founded</span></div>
    </div>
  </div></header>

  <div class="rest">
    <section id="about"><div class="wrap">
      <div class="sec-head"><span class="num">01</span><h2>About</h2></div>
      <div class="about">
        <div class="about-text">
          <p>I'm a Computer Science student at Randolph College (B.S., Math minor), graduating in May 2027. I like building things people actually use. At CloudFit Software I built three internal tools as a software developer intern, and on my own I built Outfit Picker, a wardrobe app with in-browser AI background removal that's live online.</p>
          <p>I also tutor CS students at Randolph and previously ran Ghost Host, a small web hosting business. I'm looking for software engineering or cloud infrastructure roles starting in 2027 and am studying for the AZ-900 and AWS Solutions Architect – Associate exams.</p>
        </div>
        <aside class="facts">
          <div class="fact"><span>based in</span><b>Lynchburg, VA</b></div>
          <div class="fact"><span>degree</span><b>B.S. Computer Science, Math minor</b></div>
          <div class="fact"><span>graduating</span><b>May 2027</b></div>
          <div class="fact"><span>looking for</span><b>Software engineering &amp; cloud infrastructure roles</b></div>
          <div class="fact"><span>also</span><b>Computer Science tutor</b></div>
        </aside>
      </div>
    </div></section>

    <section id="experience"><div class="wrap">
      <div class="sec-head"><span class="num">02</span><h2>Experience</h2><span class="svc-tag">● experience-svc · healthy</span></div>
      <div class="timeline">
        <div class="job">
          <div class="when">Jun 2026 – August 2026</div>
          <div><h3>CloudFit Software</h3><div class="role">Software Developer Intern · Lynchburg, VA</div>
          <p>Building internal automation tools in C#, TypeScript and JSON with database integrations to streamline security workflows and cut manual processing. Part of the team behind a company-wide app employees use every day.</p></div>
        </div>
        <div class="job">
          <div class="when">Aug 2024 – Jul 2025</div>
          <div><h3>Ghost Host</h3><div class="role">Founder &amp; Hosting Operator · Parrish, FL</div>
          <p>Started and ran a website hosting business: built prototype sites, deployed client sites and handled ongoing hosting updates, working directly with customers to turn requirements into working configurations.</p></div>
        </div>
        <div class="job">
          <div class="when">August 2026 – Present</div>
          <div><h3>Randolph College</h3><div class="role">Computer Science Tutor · Lynchburg, VA</div>
          <p> Tutor students in programming fundamentals, data structures, algorithms and debugging.</p></div>
        </div>
        <div class="job">
          <div class="when">Oct 2025 – Jun 2026</div>
          <div><h3>Best Buy</h3><div class="role">Tech Sales Person · Lynchburg, VA</div>
          <p>Provided personalized technology recommendations by assessing customer needs, explaining product features, and guiding purchasing decisions to deliver effective solutions.</p></div>
        </div>
        <div class="job">
          <div class="when">September 2026 – Present</div>
          <div><h3>Target</h3><div class="role">Tech Sales Associate · Lynchburg, VA</div>
          <p>Assisted customers in identifying technology products that best suited their needs, providing knowledgeable recommendations and guidance on product features and functionality.</p></div>
        </div>
      </div>
    </div></section>

    <section id="projects"><div class="wrap">
      <div class="sec-head"><span class="num">03</span><h2>Projects</h2><span class="svc-tag">● projects-svc · healthy</span></div>
      <div class="projects">
        <div class="proj">
          <div class="kicker">full-stack · ai</div>
          <h3>Outfit Picker</h3>
          <p>A digital wardrobe with search, multi-field filters and a saved-outfit builder. AI background removal runs right in the browser (ONNX), and an Express/Prisma API stores clothing and photos in PostgreSQL. Deployed as a public demo on Render.</p>
          ${chips(['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'ONNX Runtime'])}
          <a class="link" href="https://outfit-picker-fomc.onrender.com/" target="_blank" rel="noopener">Live demo →</a>
          <a class="link" href="https://github.com/BraydenReuter/outfit-picker" target="_blank" rel="noopener">Source on GitHub →</a>
        </div>
        <div class="proj">
          <div class="kicker">game dev</div>
          <h3>Craft a Tycoon</h3>
          <p>A Roblox tycoon game with scripted gameplay systems, player progression mechanics and custom 3D models.</p>
          ${chips(['Lua / Luau', 'Roblox Studio', '3D Modeling'])}
        </div>
      </div>
    </div></section>

    <section id="skills"><div class="wrap">
      <div class="sec-head"><span class="num">04</span><h2>Skills</h2><span class="svc-tag">● skills-svc · healthy</span></div>
      <div class="skills">
        <div class="skill-group"><h3>languages</h3>${chips(['C#', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Lua/Luau', 'SQL'])}</div>
        <div class="skill-group"><h3>frameworks</h3>${chips(['React', 'Node.js', 'Express', '.NET', 'Prisma', 'Zod', 'Vite'])}</div>
        <div class="skill-group"><h3>cloud &amp; tools</h3>${chips(['Azure', 'AWS', 'Kubernetes', 'Git/GitHub', 'PostgreSQL','SQLite', 'JSON', 'Roblox Studio', 'Render'])}</div>
      </div>
      <p class="certs"><b>In progress:</b> Microsoft Azure Fundamentals (AZ-900) · AWS Solutions Architect – Associate (SAA-C03)</p>
    </div></section>

    <section class="contact" id="contact"><div class="wrap">
      <h2>Let's build something.</h2>
      <p>Open to cloud, software, AI and security roles starting 2027.</p>
      <div class="cta">
        <a class="btn primary" href="mailto:reuterbg@gmail.com">reuterbg@gmail.com</a>
        <a class="btn" href="https://github.com/BraydenReuter" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/brayden-reuter-56a34328a/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div></section>

    <footer>© 2026 Brayden Reuter <span class="egg-hint">· psst… click my photo three times</span></footer>
  </div>`;
};

window.prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.wait = (ms) => new Promise((r) => setTimeout(r, ms));
