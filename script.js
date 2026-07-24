(() => {
  const qs = (s, scope = document) => scope.querySelector(s);
  const qsa = (s, scope = document) => [...scope.querySelectorAll(s)];
  const body = document.body;
  const preloader = qs('.preloader');
  const progress = qs('.progress');
  const cursor = qs('.cursor');
  const cursorDot = qs('.cursor-dot');
  const navPanel = qs('#navPanel');
  const menuBtn = qs('#menuBtn');
  const navClose = qs('#navClose');
  const themeBtn = qs('#themeBtn');
  const commandPanel = qs('#commandPanel');
  const commandInput = qs('#commandInput');
  const drawer = qs('#contentDrawer');
  const drawerBackdrop = qs('#drawerBackdrop');
  const aiBox = qs('#aiBox');
  const aiToggle = qs('#aiToggle');
  const aiClose = qs('#aiClose');
  const aiReopen = qs('#aiReopen');
  const aiInput = qs('#aiInput');
  const aiSend = qs('#aiSend');
  const aiBody = qs('#aiBody');
  const canvas = qs('#particleCanvas');
  const ctx = canvas.getContext('2d');

  const state = {
    mouse: { x: innerWidth / 2, y: innerHeight / 2 },
    cursor: { x: innerWidth / 2, y: innerHeight / 2 },
    particles: [],
    dark: localStorage.getItem('portfolio-theme') === 'dark'
  };
  if (state.dark) body.classList.add('dark');

  const content = {
    about: {
      title: 'About Sumith',
      html: `<div class="drawer-grid"><div class="drawer-card"><h3>Editorial profile</h3><p class="copy">I design product experiences that are simple, scalable and memorable. My work combines interface design, product strategy, systems thinking and motion craft.</p><p class="copy">This portfolio is built as a digital newspaper, where every section behaves like an edition: readable, interactive and visually distinct.</p></div><div class="drawer-card"><h3>Quick facts</h3><p class="copy">Based in Bangalore. Works across enterprise UX, design systems, dashboards, mobile apps and creator-led storytelling.</p></div></div>`
    },
    journey: {
      title: 'Design Journey',
      html: `<div class="timeline"><div class="timeline-item"><b>2018</b><div><strong>Junior Designer</strong><p class="copy">Built foundations in interface design, layout, typography and product thinking.</p></div></div><div class="timeline-item"><b>2019</b><div><strong>UI/UX Designer</strong><p class="copy">Designed web and mobile experiences with a focus on usability and visual consistency.</p></div></div><div class="timeline-item"><b>2021</b><div><strong>Product Designer</strong><p class="copy">Moved into enterprise products, design systems and end-to-end product collaboration.</p></div></div><div class="timeline-item"><b>2024</b><div><strong>Design Systems Lead</strong><p class="copy">Focused on reusable patterns, scalable experience standards and measurable design impact.</p></div></div></div>`
    },
    giis: caseStudy('GIIS Design System', 'Created a unified design system for enterprise products.', ['Reusable components', 'Governance model', 'Accessibility-ready patterns'], ['45%', 'faster design handoff', '30%', 'less inconsistency', '3x', 'component reuse']),
    media: caseStudy('Media Management Platform', 'A streamlined product to preview, manage and distribute media assets.', ['Dashboard-first experience', 'Smart content states', 'Asset workflow simplification'], ['38%', 'faster review', '24%', 'less rework', '2x', 'clearer discovery']),
    library: caseStudy('Project Library Dashboard', 'A clean academic dashboard for browsing, saving and managing projects.', ['Search-first UX', 'Project cards', 'Responsive student dashboard'], ['50+', 'sample flows', '18', 'screens', '100%', 'responsive']),
    allProjects: {
      title: 'Project Archive',
      html: `<div class="impact-list"><div class="impact-item"><strong>01</strong><span>Enterprise design systems</span></div><div class="impact-item"><strong>02</strong><span>Media product dashboards</span></div><div class="impact-item"><strong>03</strong><span>Project library experience</span></div></div><div class="drawer-card"><h3>Archive note</h3><p class="copy">This dummy archive can later become a real filterable project index with categories such as UX, Web, Mobile, Systems and Experiments.</p></div>`
    },
    playground: {
      title: 'Design Playground',
      html: `<div class="drawer-grid"><div class="drawer-card"><h3>Experiments</h3><p class="copy">Micro-interactions, mobile cards, layout explorations, animated prototypes, visual systems and motion ideas live here.</p></div><div class="drawer-card"><h3>Innovation idea</h3><p class="copy">Add a weekly design drop: each card can flip into a prototype note with challenge, approach and learnings.</p></div></div>`
    },
    travel: {
      title: 'Travel Diaries',
      html: `<div class="timeline"><div class="timeline-item"><b>MY</b><div><strong>Malaysia Diaries</strong><p class="copy">A visual story edition for beaches, night markets and urban discoveries.</p></div></div><div class="timeline-item"><b>BA</b><div><strong>Bali Escape</strong><p class="copy">A relaxed diary format for nature, local culture and food trails.</p></div></div><div class="timeline-item"><b>FT</b><div><strong>Food Trails</strong><p class="copy">A creator-style section for short food notes, photos and recommendations.</p></div></div></div>`
    },
    tools: {
      title: 'Tool Stack',
      html: `<div class="impact-list"><div class="impact-item"><strong>UX</strong><span>Figma, FigJam, Notion</span></div><div class="impact-item"><strong>Motion</strong><span>Framer, Principle, After Effects</span></div><div class="impact-item"><strong>Craft</strong><span>Photoshop, Illustrator, Webflow</span></div></div><div class="drawer-card"><h3>Innovative interaction</h3><p class="copy">Each tool tag on the page can open a mini note. Try clicking the tool chips on the page.</p></div>`
    },
    contact: {
      title: 'Start a Collaboration',
      html: `<div class="drawer-grid"><div class="drawer-card"><h3>Project enquiry</h3><p class="copy">Tell me what you are building, where the experience is stuck and what outcome you want to create.</p></div><div class="drawer-card"><h3>Dummy contact form</h3><p class="copy">Name: Your Name<br>Email: your@email.com<br>Project: Portfolio, product UI, design system or creative story.</p><button class="drawer-close" onclick="alert('Dummy form submitted!')">Send dummy request</button></div></div>`
    },
    linkedin: social('LinkedIn', 'Professional updates, product design notes and design system thinking.'),
    dribbble: social('Dribbble', 'Visual explorations, concept shots, interface details and motion ideas.'),
    behance: social('Behance', 'Long-form case studies, process documentation and project storytelling.'),
    youtube: social('YouTube', 'Travel diaries, creator journeys and behind-the-scenes documentation.')
  };

  function caseStudy(title, summary, bullets, impact) {
    return {
      title,
      html: `<div class="drawer-grid"><div><div class="drawer-card"><h3>Overview</h3><p class="copy">${summary}</p></div><div class="drawer-card" style="margin-top:14px"><h3>Solution highlights</h3><p class="copy">${bullets.map(b => `• ${b}`).join('<br>')}</p></div></div><div><div class="impact-list" style="grid-template-columns:1fr"><div class="impact-item"><strong>${impact[0]}</strong><span>${impact[1]}</span></div><div class="impact-item"><strong>${impact[2]}</strong><span>${impact[3]}</span></div><div class="impact-item"><strong>${impact[4]}</strong><span>${impact[5]}</span></div></div></div></div>`
    };
  }
  function social(name, text) {
    return { title: name, html: `<div class="drawer-card"><h3>${name}</h3><p class="copy">${text}</p><p class="copy">This is dummy content. Replace this section with your actual ${name} profile link later.</p></div>` };
  }

  addEventListener('load', () => setTimeout(() => preloader.classList.add('done'), 550));

  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max <= 0 ? 0 : scrollY / max * 100}%`;
  }
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  addEventListener('mousemove', e => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
  function cursorLoop() {
    state.cursor.x += (state.mouse.x - state.cursor.x) * 0.42;
    state.cursor.y += (state.mouse.y - state.cursor.y) * 0.42;
    cursor.style.transform = `translate(${state.cursor.x}px, ${state.cursor.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  function refreshHoverTargets() {
    qsa('a, button, .project-card, .tool').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }
  refreshHoverTargets();

  menuBtn.addEventListener('click', () => navPanel.classList.add('open'));
  navClose.addEventListener('click', () => navPanel.classList.remove('open'));
  qsa('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
    qs(`#${btn.dataset.scroll}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
    navPanel.classList.remove('open');
  }));

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .15 });
  qsa('.reveal').forEach(el => revealObserver.observe(el));

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  qsa('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const ry = clamp((x / r.width - .5) * 8, -6, 6);
      const rx = clamp((y / r.height - .5) * -8, -6, 6);
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      card.style.setProperty('--x', `${x / r.width * 100}%`);
      card.style.setProperty('--y', `${y / r.height * 100}%`);
    });
    card.addEventListener('mouseleave', () => card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
  });

  qsa('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * .1}px, ${y * .1}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
  });

  function openDrawer(key) {
    const item = content[key] || content.about;
    drawer.innerHTML = `<div class="drawer-top"><h2 class="drawer-title">${item.title}</h2><button class="drawer-close magnetic" id="drawerClose">Close</button></div>${item.html}`;
    drawerBackdrop.classList.add('open');
    drawer.classList.add('open');
    qs('#drawerClose').addEventListener('click', closeDrawer);
    refreshHoverTargets();
  }
  function closeDrawer() { drawer.classList.remove('open'); drawerBackdrop.classList.remove('open'); }
  drawerBackdrop.addEventListener('click', closeDrawer);
  qsa('[data-drawer]').forEach(btn => btn.addEventListener('click', () => openDrawer(btn.dataset.drawer)));
  qsa('[data-tool]').forEach(tool => tool.addEventListener('click', () => openDrawer('tools')));

  function openCommand() { commandPanel.classList.add('open'); setTimeout(() => commandInput.focus(), 40); }
  function closeCommand() { commandPanel.classList.remove('open'); commandInput.value = ''; }
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommand(); }
    if (e.key === 'Escape') { closeCommand(); closeDrawer(); navPanel.classList.remove('open'); }
  });
  commandInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const value = commandInput.value.toLowerCase().trim();
    const routes = { about: '#about', work: '#work', projects: '#work', stories: '#stories', contact: '#connect', connect: '#connect', top: '#top' };
    if (value === 'dark') body.classList.add('dark');
    if (value === 'light') body.classList.remove('dark');
    if (value === 'ai') { aiBox.classList.remove('closed'); aiBox.classList.add('open'); aiReopen.classList.remove('show'); }
    if (routes[value]) qs(routes[value]).scrollIntoView({ behavior: 'smooth' });
    closeCommand();
  });

  function startCounters() {
    const obs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const start = performance.now();
      const duration = 1100;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    }), { threshold: .5 });
    qsa('[data-count]').forEach(el => obs.observe(el));
  }
  startCounters();

  function resizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
  }
  function createParticles() {
    const count = Math.floor(Math.min(innerWidth, 1200) / 28);
    state.particles = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.4 + .5 }));
  }
  function drawParticles() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = getComputedStyle(body).getPropertyValue('--ink').trim();
    ctx.strokeStyle = getComputedStyle(body).getPropertyValue('--line').trim();
    state.particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < state.particles.length; j++) {
        const q = state.particles[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 92) { ctx.globalAlpha = 1 - d / 92; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.globalAlpha = 1; }
      }
    });
    requestAnimationFrame(drawParticles);
  }
  addEventListener('resize', resizeCanvas); resizeCanvas(); drawParticles();

  aiToggle.addEventListener('click', () => aiBox.classList.toggle('open'));
  aiClose.addEventListener('click', () => {
    aiBox.classList.add('closed');
    aiReopen.classList.add('show');
  });
  aiReopen.addEventListener('click', () => {
    aiBox.classList.remove('closed');
    aiBox.classList.add('open');
    aiReopen.classList.remove('show');
  });
  function sendAi() {
    const q = aiInput.value.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    const answer = lower.includes('project') ? 'This portfolio highlights design systems, media dashboards and project library experiences. Open the case studies to see dummy impact metrics.' : lower.includes('tool') ? 'The current dummy stack includes Figma, Framer, Photoshop, Illustrator, Notion and Principle.' : lower.includes('contact') ? 'Use the Say hello panel or the social buttons. They open dummy contact content that can be replaced with real links.' : lower.includes('travel') ? 'Travel Diaries currently includes Malaysia, Bali and Food Trails as dummy editorial story sections.' : 'I can answer about projects, tools, journey, travel and contact. This is a lightweight dummy assistant built only with JavaScript.';
    aiBody.insertAdjacentHTML('beforeend', `<div class="ai-msg"><strong>You:</strong> ${escapeHtml(q)}</div><div class="ai-msg"><strong>Portfolio:</strong> ${answer}</div>`);
    aiInput.value = ''; aiBody.scrollTop = aiBody.scrollHeight;
  }
  aiSend.addEventListener('click', sendAi);
  aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAi(); });
  function escapeHtml(str) { return str.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
})();
