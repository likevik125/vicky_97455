/* =========================================================
   Vignesh M Portfolio — script.js
   ========================================================= */

/* ---------- Loader ---------- */
(function loader() {
  const fill = document.getElementById('loaderFill');
  const wrap = document.getElementById('loader');
  let p = 0;
  const id = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18);
    fill.style.width = p + '%';
    if (p >= 100) {
      clearInterval(id);
      setTimeout(() => wrap.classList.add('hide'), 350);
    }
  }, 90);
})();

/* ---------- Year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Custom Cursor ---------- */
(function cursor() {
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');
  if (matchMedia('(pointer: coarse)').matches) { ring.style.display = dot.style.display = 'none'; return; }
  let x = 0, y = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
  });
  (function tick() {
    rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(tick);
  })();
})();

/* ---------- Nav scroll + mobile ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('scrollBar').style.width =
    (window.scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 600);
});
document.getElementById('menuBtn').addEventListener('click', () =>
  document.getElementById('mobileMenu').classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open')));
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Active nav link on scroll ---------- */
const sections = ['home','about','services','skills','experience','projects','contact'];
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) cur = id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
});

/* ---------- Typing effect ---------- */
(function typing() {
  const el = document.getElementById('typing');
  const words = ['E-learning Products', 'Graphics Design', 'UI/UX Design', 'UI Developer', 'Social Media Creatives design','Proposal Creative Design'];
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) ci++;
    else if (deleting && ci > 0) ci--;
    else { deleting = !deleting; if (!deleting) wi = (wi + 1) % words.length; }
    setTimeout(tick, deleting ? 50 : 110);
  }
  tick();
})();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });

/* ---------- DATA & RENDER ---------- */

// Services
const services = [
  ['palette2','Product & UI/UX Design','Transforming complex problems into intuitive, user-centered digital products.'],
  ['code-slash','Frontend (UI) Development','Translating design concepts into pixel-perfect, highly responsive interfaces.'],
  ['layers','Scalable Design Systems','Architecting robust Figma libraries and components for seamless engineering handovers.'],
  ['phone','Mobile & Responsive Design','Engineering fluid, mobile-first interfaces optimized for all screen sizes.'],
  ['pen','Interaction & Motion Design','Enhancing usability through purposeful micro-interactions and transitions.'],
  ['magic','Visual & Brand Design','Crafting high-converting corporate layouts, marketing assets, and ad campaigns.'],
];
document.getElementById('servicesGrid').innerHTML = services.map(([i,t,d],idx) => `
  <div class="col-md-6 col-lg-4 reveal service-card-wrap" style="transition-delay:${idx*90}ms">
    <div class="service-card" data-delay="${idx * 0.35}s">
      <div class="service-icon"><i class="bi bi-${i}"></i></div>
      <h3>${t}</h3><p>${d}</p>
    </div>
  </div>`).join('');

const servicesSection = document.getElementById('services');
const servicesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('#servicesGrid .service-card');
      const sectionRect = servicesSection.getBoundingClientRect();
      const centerX = sectionRect.left + sectionRect.width / 2;
      const centerY = sectionRect.top + sectionRect.height / 2;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const dx = centerX - (rect.left + rect.width / 2);
        const dy = centerY - (rect.top + rect.height / 2);
        card.style.setProperty('--x', `${dx}px`);
        card.style.setProperty('--y', `${dy}px`);
        card.style.setProperty('--animation-delay', `${idx * 0.45}s`);
        card.classList.add('service-card-animate');
      });

      servicesObserver.disconnect();
    }
  });
}, { threshold: 0.16 });
servicesObserver.observe(servicesSection);

// Skills
const skillGroups = [
  { title: 'UI/UX', items: [['User Research',88],['Wireframing',92],['Prototyping',90],['Design Systems',86],['Interaction Design',84],['Visual Hierarchy',90],['Responsive Design',95],['Accessibility',78]] },
  { title: 'Frontend', items: [['HTML5',96],['CSS3',94],['Responsive Dev',94],['Frontend Animation',80],['SQL & MySQL (Database Management)',79]] },
  { title: 'Graphic & Tools', items: [['Figma',94],['Adope XD',90],['Canva',83],['Animate CC',75],['Social Design',92],['VS Code',96]] },
];
document.getElementById('skillsGrid').innerHTML = skillGroups.map((g,gi) => `
  <div class="col-lg-4 reveal" style="transition-delay:${gi*100}ms">
    <div class="skill-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="m-0">${g.title}</h3>
        <small class="text-muted">${g.items.length} skills</small>
      </div>
      ${g.items.map(([n,v]) => `
        <div class="skill-row">
          <div class="top"><span>${n}</span><span class="skill-value">0%</span></div>
          <div class="bar"><div data-w="${v}" style="width:0"></div></div>
        </div>`).join('')}
    </div>
  </div>`).join('');

// Animate skills bars & counts when skills section enters viewport
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || skillsSection.classList.contains('skills-animated')) return;
    skillsSection.classList.add('skills-animated');
    document.querySelectorAll('.skill-row').forEach((row, idx) => {
      const fill = row.querySelector('.bar > div');
      const target = Number(fill.dataset.w || 0);
      const valueEl = row.querySelector('.skill-value');
      row.classList.add('active');
      setTimeout(() => {
        fill.style.width = target + '%';
        let current = 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          current = Math.round(progress * target);
          valueEl.textContent = `${current}%`;
          if (progress < 1) requestAnimationFrame(tick);
          else valueEl.textContent = `${target}%`;
        }
        requestAnimationFrame(tick);
      }, idx * 120);
    });
    skillsObserver.unobserve(skillsSection);
  });
}, { threshold: 0.22 });
skillsObserver.observe(skillsSection);

// Marquee
const mq = ['Product Design','UX Research','User Flow','Information Architecture','Wireframing','Prototyping','UI Design','Interaction Design','Design Systems','Responsive Design','Visual Design','Micro Interactions','Usability Testing','Accessibility','Design Handoff','Figma','Adobe XD','Canva','Photoshop','SQL Database'];
const mqHtml = mq.map(w => `<span>${w}<span class="star">✦</span></span>`).join('');
document.getElementById('marqueeTrack').innerHTML = mqHtml + mqHtml;

// Experience
const exp = [
  { y:'Oct 2022 — Apr 2024', t:'Frontend Developer & UI Specialist (E-Learning Project)', w:'Fulltime', d:'Collaborated within a cross-functional team of 3–4 members to develop and deploy highly interactive K-12 digital learning modules for high school mathematics. Spearheaded the technical translation of complex academic content into web-accessible formats by engineering intricate mathematical equations using MathML, HTML5, and CSS3. Implemented optimized, lightweight JavaScript scripts to dynamically fetch, import, and render source files smoothly across modern platforms. Successfully delivered pixel-perfect, highly responsive, and cross-browser compatible layouts that adhered strictly to web accessibility standards across all device screens.' },
  { y:'Oct 2022 — Apr 2024', t:'Visual Designer & Interactive Media Specialist (EdTech Product)', w:'Fulltime', d:'Collaborated within a cross-functional team of 3–4 members to design and deploy interactive visual assets for K-12 (10th, 11th, and 12th grade) mathematics e-learning platforms. Specialized in translating complex academic concepts into high-quality, engaging vector diagrams, geometric charts, and instructional graphics using Adobe Photoshop and Canva. Spearheaded the creation and import of dynamic, animated educational content using Adobe Animate CC 2020, transforming static source assets into interactive media optimized for digital classrooms and seamless web integration.' },
  { y:'Sep 2025 — Nov 2025', t:'Product Designer — E-Commerce Mobile Application', w:'Fulltime', d:'Collaborated within an agile 3-member product team over a 3-month cycle to design Easy Shop, a comprehensive, end-to-end e-commerce mobile application. Spearheaded foundational UX research and mapped intuitive user journeys to architect a massive, scalable ecosystem spanning 60+ high-fidelity screens from scratch. Utilized Figma and Adobe XD to establish a cohesive visual design system and interactive prototypes, while leveraging Canva to produce polished, high-converting product imagery. Successfully optimized complex user flows—from advanced filtering to frictionless checkout—delivering a seamless, production-ready mobile interface.' },
  { y:'Sep 2025 — Nov 2025', t:'Marketing & Brand Growth', w:'Fulltime', d:'Beyond the core product layout, successfully spearheaded the conceptualization and design of high-converting visual assets to drive user acquisition and corporate growth for the platform. Leveraged Figma and Canva to design engaging marketing posters and high-impact multi-slide LinkedIn carousel presentations that boosted brand visibility and social media engagement. Additionally, utilized Adobe XD and modern typography systems to design polished, comprehensive B2B company proposal decks and corporate pitch templates. By aligning aesthetic excellence with business objectives, successfully maintained absolute brand consistency across both marketing collateral and the product ecosystem, bridging the gap between product UI/UX and visual marketing design.' },
];
document.getElementById('timeline').innerHTML = exp.map(e => `
  <div class="tl-item reveal">
    <div class="year">${e.y}</div>
    <h4>${e.t}</h4>
    <div class="where">${e.w}</div>
    <p>${e.d}</p>
  </div>`).join('');

// Education
const edu = [
  { y:'2025', t:'UI/UX Design Course', s:'Online + Practical Projects', d:'Wireframing, prototyping, user research, responsive design, visual hierarchy and Figma workflow.' },
  { y:'2018 — 2022', t:'B.Sc Computer Science', s:'Sri S. Ramasamy Naidu Memorial College, Sattur', d:'Programming, software concepts, frontend tech and problem solving.' },
  { y:'2017 — 2018', t:'Higher Secondary (XII)', s:'Govt. Higher Secondary School', d:'' },
  { y:'2015— 2016', t:'Secondary (X)', s:'Govt. Higher Secondary School', d:'' },
];
document.getElementById('educationGrid').innerHTML = edu.map((e,i) => `
  <div class="col-md-6 reveal" style="transition-delay:${i*80}ms">
    <div class="edu-card">
      <div class="edu-icon"><i class="bi bi-mortarboard"></i></div>
      <div>
        <div class="year">${e.y}</div>
        <h3>${e.t}</h3>
        <div class="where">${e.s}</div>
        ${e.d ? `<p class="text-muted mt-2 mb-0 small">${e.d}</p>`:''}
      </div>
    </div>
  </div>`).join('');

// Projects
// =========================
// PROJECTS DATA
// =========================

function createProjectCover(title, category) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const palette = {
    web: ['#22d3ee', '#7c5cff'],
    mobile: ['#ff4fa3', '#7c5cff'],
    graphic: ['#f59e0b', '#ef4444'],
    visual: ['#a855f7', '#22d3ee']
  };
  const [c1, c2] = palette[category] || palette.web;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="48" fill="#07070b"/>
      <rect x="40" y="40" width="1120" height="820" rx="38" fill="url(#g)"/>
      <circle cx="320" cy="240" r="220" fill="${c1}" opacity="0.22"/>
      <circle cx="912" cy="650" r="260" fill="${c2}" opacity="0.25"/>
      <rect x="100" y="130" width="280" height="16" rx="8" fill="rgba(255,255,255,0.7)"/>
      <rect x="100" y="172" width="220" height="12" rx="6" fill="rgba(255,255,255,0.4)"/>
      <rect x="100" y="620" width="320" height="120" rx="24" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.24)"/>
      <rect x="460" y="240" width="600" height="280" rx="34" fill="rgba(7,7,11,0.28)" stroke="rgba(255,255,255,0.18)"/>
      <text x="100" y="760" fill="white" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700">${safeTitle}</text>
      <text x="100" y="820" fill="rgba(255,255,255,0.78)" font-family="Segoe UI, Arial, sans-serif" font-size="28">${category.toUpperCase()}</text>
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
    </svg>
  `)}`;
}

const projects = [
  {
    t:'E-Commerce Mobile App',
    d:'End-to-end mobile shopping experience',
    tags:['Mobile','UI'],
    cat:'mobile',
    link:'https://www.behance.net/gallery/238787823/E-commerce-Mobile-App',
    featured:true,
    img:'assets/E-commerce Mobile App.jpg'
  },
  {
    t:'HoraGlobal WorkForce OS',
    d:'Workforce platform UX system',
    tags:['Web','Product'],
    cat:'web',
    link:'https://www.behance.net/gallery/251774181/HoraGlobal-WorkForce-OS',
    featured:true,
    img:'assets/HoraGlobal WorkForce OS.jpg'
  },
  {
    t:'Interactive E-Learning Ecosystem',
    d:'Immersive learning experience',
    tags:['Web','UI/UX'],
    cat:'web',
    link:'https://www.behance.net/gallery/251788549/Interactive-E-Learning-Ecosystem',
    featured:true,
    img:'assets/Interactive E-Learning Ecosystem.jpg'
  },
  {
    t:'Zyra Scribe AI',
    d:'AI writing experience design',
    tags:['Web','AI'],
    cat:'web',
    link:'https://www.behance.net/gallery/251775061/Zyra-Scribe-Ai',
    img:'assets/Zyra Scribe AI.jpg'
  },
  {
    t:'SmartFood Safe',
    d:'Food safety product UX',
    tags:['Web','Product'],
    cat:'web',
    link:'https://www.behance.net/gallery/251654013/SmartFood-Safe',
    img:'assets/SmartFood Safe.jpg'
  },
  {
    t:'Foodie Delivery Mobile App',
    d:'Food ordering and delivery flow',
    tags:['Mobile','UX'],
    cat:'mobile',
    link:'https://www.behance.net/gallery/251732161/Foodie-Delivery-Mobile-App',
    img:'assets/Foodie Delivery Mobile App.jpg'
  },
  {
    t:'EdTech Social Media Campaign',
    d:'Marketing creatives and campaign design',
    tags:['Graphic','Brand'],
    cat:'graphic',
    link:'https://www.behance.net/gallery/251779077/EdTech-Social-Media-Campaign-Marketing-Creatives',
    img:'assets/EdTech Social Media Campaign.jpg'
  },
  {
    t:'Premium Beverage Landing Page',
    d:'Interactive beverage brand experience',
    tags:['Graphic','UI'],
    cat:'graphic',
    link:'https://www.behance.net/gallery/250946837/Premium-Interactive-Beverage-Landing-Page',
    img:'assets/Premium Beverage Landing Page.jpg'
  },
  {
    t:'Modern Burger Landing Page',
    d:'Restaurant landing page UI',
    tags:['Graphic','Web'],
    cat:'graphic',
    link:'https://www.behance.net/gallery/247485999/Modern-Burger-Restaurant-Landing-Page-UI-Design',
    img:'assets/Modern Burger Landing Page.jpg'
  },
  {
    t:'Corporate Identity Profile Layout',
    d:'Corporate identity and profile layout',
    tags:['Visual','Identity'],
    cat:'visual',
    link:'https://www.behance.net/gallery/251777615/Corporate-Identity-Profile-Layout-Design',
    img:'assets/Corporate Identity Profile Layout.jpg'
  },
  {
    t:'Tech Academy Brochure',
    d:'Rural skill development brochure',
    tags:['Visual','Print'],
    cat:'visual',
    link:'https://www.behance.net/gallery/251777207/Tech-Academy-Rural-Skill-Development-Brochure',
    img:'assets/Tech Academy Brochure.jpg'
  },
  {
    t:'Cyber Security Internship Brochure',
    d:'Training internship profile design',
    tags:['Visual','Brand'],
    cat:'visual',
    link:'https://www.behance.net/gallery/251777989/Cyber-Security-Training-Internship-Brochure-Design',
    img:'assets/Cyber Security Internship Brochure.jpg'
  },
  {
    t:'Data Analytics Career Profile',
    d:'Career profile layout design',
    tags:['Visual','Editorial'],
    cat:'visual',
    link:'https://www.behance.net/gallery/251778337/Data-Analytics-Academy-Career-Profile-Design',
    img:'assets/Data Analytics Career Profile.jpg'
  }
];

// =========================
// FILTER CATEGORIES
// =========================

const categories = [
  ['all','All'],
  ['web','Web'],
  ['mobile','Mobile'],
  ['graphic','Graphic'],
  ['visual','Visual']
];


// =========================
// RENDER FILTER BUTTONS
// =========================

document.getElementById('filters').innerHTML =
  categories.map(([key,label],index) => `
    
    <button 
      class="filter-btn ${index === 0 ? 'active' : ''}" 
      data-f="${key}"
    >
      ${label}
    </button>

  `).join('');




// =========================
// RENDER PROJECTS
// =========================

function renderProjects(filter = 'all') {
  let filteredProjects;

  if (filter === 'all') {
    filteredProjects = projects.filter(project => project.featured);
  } else {
    filteredProjects = projects.filter(project => project.cat === filter);
  }

  document.getElementById('projectsGrid').innerHTML = filteredProjects.map((project, index) => `
    <div class="col-md-6 col-lg-4 reveal" style="transition-delay:${index * 70}ms">
      <div class="project-card" data-link="${project.link}" tabindex="0" role="button" aria-label="Open ${project.t}">
        <img src="${project.img}" alt="${project.t}" loading="lazy" />
        <div class="overlay">
          <div class="tag-row">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <h3>${project.t}</h3>
          <p>${project.d}</p>
          <a class="project-action" href="${project.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
            View project <i class="bi bi-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.project-card[data-link]').forEach(card => {
    const openProject = () => window.open(card.dataset.link, '_blank', 'noopener,noreferrer');
    card.addEventListener('click', openProject);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject();
      }
    });
  });

  document.querySelectorAll('#projectsGrid .reveal').forEach(el => io.observe(el));
}


// =========================
// INITIAL LOAD
// =========================

renderProjects('all');




// =========================
// FILTER BUTTON CLICK
// =========================

document.getElementById('filters')
.addEventListener('click', (e) => {

  const button = e.target.closest('.filter-btn');

  if(!button) return;

  // Remove active class
  document.querySelectorAll('.filter-btn')
    .forEach(btn => btn.classList.remove('active'));

  // Add active class
  button.classList.add('active');

  // Get selected category
  const filterValue = button.dataset.f;

  // Render filtered projects
  renderProjects(filterValue);

});
/* Re-observe all reveal items */
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Animate skill bars when visible */
const barIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar > div').forEach(b => b.style.width = b.dataset.w + '%');
      barIo.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(el => barIo.observe(el));

/* Contact form */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thanks! Your message has been recorded. I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => msg.textContent = '', 5000);
});
