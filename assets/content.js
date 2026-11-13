// Shared portfolio content so all three prototypes end on the same page.
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
          <p>Hi! I'm Brayden Reuter, a Computer Science student at Randolph College pursuing my Bachelor of Science with a minor in Mathematics, expected to graduate in May 2027.</p>
          <p>I've always had a passion for technology, especially programming, algorithms, and problem-solving. I enjoy understanding how things work, finding ways to improve them, and turning ideas into functional applications.</p>
          <p>My experience spans software development, web hosting, automation, and game development. During my internship at CloudFit Software, I gained hands-on experience developing internal tools and collaborating on real-world software solutions. Outside of work, I've developed projects such as Outfit Picker, a full-stack digital wardrobe application with AI-powered image processing, and a Roblox game built using Lua. I also founded and operated Ghost Host, a small website hosting business that gave me valuable experience in web development, deployment, and managing technical services.</p>
          <p>Beyond development, I've worked as a Computer Science tutor, helping other students better understand programming concepts and strengthen their problem-solving skills.</p>
          <p>I'm particularly interested in pursuing a career in software engineering or cloud infrastructure. I'm currently working toward my Microsoft Azure Fundamentals and AWS Solutions Architect – Associate certifications to further develop my understanding of cloud technologies.</p>
          <p>Above all, I'm someone who genuinely enjoys learning, taking on new challenges, and continuously improving my technical skills. As I approach graduation, I'm excited to apply my experience, contribute to meaningful projects, and continue growing as a professional in the technology industry.</p>
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
          <div class="when">Jun 2026 – Present</div>
          <div><h3>CloudFit Software</h3><div class="role">Software Developer Intern · Lynchburg, VA</div>
          <p>Building internal automation tools in C#, TypeScript and JSON with database integrations to streamline security workflows and cut manual processing. Part of the team behind a company-wide app employees use every day.</p></div>
        </div>
        <div class="job">
          <div class="when">Aug 2024 – Jul 2025</div>
          <div><h3>Ghost Host</h3><div class="role">Founder &amp; Hosting Operator · Parrish, FL</div>
          <p>Started and ran a website hosting business: built prototype sites, deployed client sites and handled ongoing hosting updates, working directly with customers to turn requirements into working configurations.</p></div>
        </div>
        <div class="job">
          <div class="when">Oct 2025 – Jun 2026</div>
          <div><h3>Best Buy &amp; Target</h3><div class="role">Tech Sales Associate · Lynchburg, VA</div>
          <p>Translated technical specs into plain-English recommendations, compared devices and troubleshot problems for customers in a fast-paced retail setting.</p></div>
        </div>
      </div>
    </div></section>

    <section id="projects"><div class="wrap">
      <div class="sec-head"><span class="num">03</span><h2>Projects</h2><span class="svc-tag">● projects-svc · healthy</span></div>
      <div class="projects">
        <a class="proj" href="https://github.com/BraydenReuter/outfit-picker" target="_blank" rel="noopener">
          <div class="kicker">full-stack · ai</div>
          <h3>Outfit Picker</h3>
          <p>A digital wardrobe with searchable inventory, multi-field filters and a saved-outfit builder. An Express/Prisma API on SQLite talks to a Python FastAPI service that runs BiRefNet locally to remove photo backgrounds with AI.</p>
          ${chips(['React', 'TypeScript', 'Express', 'Prisma', 'SQLite', 'FastAPI', 'PyTorch'])}
          <span class="link">github.com/BraydenReuter/outfit-picker →</span>
        </a>
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
        <div class="skill-group"><h3>languages</h3>${chips(['C#', 'Java', 'JavaScript', 'TypeScript', 'Python', 'Lua/Luau'])}</div>
        <div class="skill-group"><h3>frameworks</h3>${chips(['React', 'Node.js', 'Express', '.NET', 'FastAPI', 'PyTorch', 'Prisma', 'Zod'])}</div>
        <div class="skill-group"><h3>cloud &amp; tools</h3>${chips(['Azure', 'Git/GitHub', 'REST APIs', 'SQLite', 'JSON', 'Roblox Studio'])}</div>
      </div>
      <p class="certs"><b>In progress:</b> Microsoft Azure Fundamentals (AZ-900) · AWS Solutions Architect – Associate (SAA-C03)</p>
    </div></section>

    <section class="contact" id="contact"><div class="wrap">
      <h2>Let's build something.</h2>
      <p>Open to cloud, software, AI and security roles starting 2027.</p>
      <div class="cta">
        <a class="btn primary" href="mailto:reuterbg@gmail.com">reuterbg@gmail.com</a>
        <a class="btn" href="https://github.com/BraydenReuter" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div></section>

    <footer>© 2026 Brayden Reuter <span class="egg-hint">· psst… click my photo three times</span></footer>
  </div>`;
};

window.prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.wait = (ms) => new Promise((r) => setTimeout(r, ms));
