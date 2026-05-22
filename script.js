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
  <div class="col-md-6 col-lg-4 reveal" style="transition-delay:${idx*70}ms">
    <div class="service-card">
      <div class="service-icon"><i class="bi bi-${i}"></i></div>
      <h3>${t}</h3><p>${d}</p>
    </div>
  </div>`).join('');

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
          <div class="top"><span>${n}</span><span>${v}%</span></div>
          <div class="bar"><div data-w="${v}"></div></div>
        </div>`).join('')}
    </div>
  </div>`).join('');

// Marquee
const mq = ['UI/UX Design','Frontend Development','Figma','HTML5 & CSS3','UX Research ','SQL & Databases','Design Systems','Rapid Prototyping','Responsive UI','Wireframing','Micro-interactions',' Mobile-First Design','Visual Strategy','Adobe XD','Canva'];
const mqHtml = mq.map(w => `<span>${w}<span class="star">✦</span></span>`).join('');
document.getElementById('marqueeTrack').innerHTML = mqHtml + mqHtml;

// Experience
const exp = [
  { y:'Oct 2022 — Apr 2024', t:'🚀Frontend Developer & UI Specialist (E-Learning Project)', w:'Fulltime', d:'Collaborated within a cross-functional team of 3–4 members to develop and deploy highly interactive K-12 digital learning modules for high school mathematics. Spearheaded the technical translation of complex academic content into web-accessible formats by engineering intricate mathematical equations using MathML, HTML5, and CSS3. Implemented optimized, lightweight JavaScript scripts to dynamically fetch, import, and render source files smoothly across modern platforms. Successfully delivered pixel-perfect, highly responsive, and cross-browser compatible layouts that adhered strictly to web accessibility standards across all device screens.' },
  { y:'Oct 2022 — Apr 2024', t:'🎨Visual Designer & Interactive Media Specialist (EdTech Product)', w:'Fulltime', d:'Collaborated within a cross-functional team of 3–4 members to design and deploy interactive visual assets for K-12 (10th, 11th, and 12th grade) mathematics e-learning platforms. Specialized in translating complex academic concepts into high-quality, engaging vector diagrams, geometric charts, and instructional graphics using Adobe Photoshop and Canva. Spearheaded the creation and import of dynamic, animated educational content using Adobe Animate CC 2020, transforming static source assets into interactive media optimized for digital classrooms and seamless web integration.' },
  { y:'Sep 2025 — Nov 2025', t:'📦Product Designer — E-Commerce Mobile Application', w:'Fulltime', d:'Collaborated within an agile 3-member product team over a 3-month cycle to design Easy Shop, a comprehensive, end-to-end e-commerce mobile application. Spearheaded foundational UX research and mapped intuitive user journeys to architect a massive, scalable ecosystem spanning 60+ high-fidelity screens from scratch. Utilized Figma and Adobe XD to establish a cohesive visual design system and interactive prototypes, while leveraging Canva to produce polished, high-converting product imagery. Successfully optimized complex user flows—from advanced filtering to frictionless checkout—delivering a seamless, production-ready mobile interface.' },
  { y:'Sep 2025 — Nov 2025', t:'📣 Marketing & Brand Growth', w:'Fulltime', d:'Beyond the core product layout, successfully spearheaded the conceptualization and design of high-converting visual assets to drive user acquisition and corporate growth for the platform. Leveraged Figma and Canva to design engaging marketing posters and high-impact multi-slide LinkedIn carousel presentations that boosted brand visibility and social media engagement. Additionally, utilized Adobe XD and modern typography systems to design polished, comprehensive B2B company proposal decks and corporate pitch templates. By aligning aesthetic excellence with business objectives, successfully maintained absolute brand consistency across both marketing collateral and the product ecosystem, bridging the gap between product UI/UX and visual marketing design.' },
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

const projects = [

  // WEB
  {
    img:'assets/project-elearning.jpg',
    t:'EduFlow',
    d:'E-Learning platform UI',
    tags:['UI/UX','Web'],
    cat:'web'
  },

  // GRAPHIC
  {
    img:'assets/project-social.jpg',
    t:'Brandify',
    d:'Social media creatives',
    tags:['Graphic'],
    cat:'graphic'
  },

  // MOBILE
  {
    img:'assets/project-fintech.jpg',
    t:'Finwise',
    d:'Fintech mobile app',
    tags:['Mobile','UI'],
    cat:'mobile'
  },

  // GRAPHIC
  {
    img:'assets/project-saas.jpg',
    t:'CloudPanel',
    d:'SaaS landing page',
    tags:['Graphic'],
    cat:'graphic'
  },

  // GRAPHIC
  {
    img:'assets/project-elearning_1.jpg',
    t:'LearnHub',
    d:'Course dashboard',
    tags:['Graphic'],
    cat:'graphic'
  },

  // GRAPHIC
  {
    img:'assets/Poster_Design.png',
    t:'Walletly',
    d:'Wallet mobile UI',
    tags:['Graphic'],
    cat:'graphic'
  },

  // MOBILE
  {
    img:'assets/project-fintech_1.jpg',
    t:'Walletly',
    d:'Wallet mobile UI',
    tags:['Mobile'],
    cat:'mobile'
  },

  // WEB
  {
    img:'assets/project_elearning_1.jpg',
    t:'Walletly',
    d:'Wallet mobile UI',
    tags:['Web'],
    cat:'web'
  },

  // GRAPHIC
  {
    img:'assets/project-elearning_2.jpg',
    t:'Walletly',
    d:'Wallet mobile UI',
    tags:['Graphic'],
    cat:'graphic'
  },

];


// =========================
// FILTER CATEGORIES
// =========================

const categories = [
  ['all','All'],
  ['web','Web'],
  ['mobile','Mobile'],
  ['graphic','Graphic']
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

  // Show all projects
  if(filter === 'all') {
    filteredProjects = projects;
  }

  // Filter by category
  else {
    filteredProjects = projects.filter(project => {
      return project.cat === filter;
    });
  }


  // Render HTML
  document.getElementById('projectsGrid').innerHTML =
    filteredProjects.map((project,index) => `

      <div 
        class="col-md-6 col-lg-4 reveal" 
        style="transition-delay:${index * 70}ms"
      >

        <div class="project-card">

          <img 
            src="${project.img}" 
            alt="${project.t}" 
            loading="lazy"
          />

          <div class="overlay">

            <div class="tag-row">
              ${project.tags.map(tag => `
                <span>${tag}</span>
              `).join('')}
            </div>

            <h3>${project.t}</h3>

            <p>${project.d}</p>

          </div>

        </div>

      </div>

    `).join('');


  // Reveal Animation
  document.querySelectorAll('#projectsGrid .reveal')
    .forEach(el => io.observe(el));

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
// Why hire
const why = [
  ['eye','Visual Precision','Obsessed with typography, spacing, and grids to transform standard UI into premium products.'],
  ['layers-half','Design-to-Code','Designing with production logic and writing clean frontend layout code seamlessly.'],
  ['lightning-charge','Agile Mindset','Comfortable with fast-paced sprints, rapid prototyping feedback, and project pivots.'],
  ['chat-dots','Collaboration','Transparent communicator who pitches ideas, checks technical limits, and respects timelines.'],
];
document.getElementById('whyGrid').innerHTML = why.map(([i,t,d],idx) => `
  <div class="col-md-6 col-lg-3 reveal" style="transition-delay:${idx*70}ms">
    <div class="why-card"><i class="bi bi-${i}"></i><h4>${t}</h4><p>${d}</p></div>
  </div>`).join('');
// Process
const proc = [
  ['01','Discover','Understand business goals, map user constraints, and audit layouts to find friction points.'],
  ['02','Define','Translate research insights into clean information architecture, user flows, and product proposals.'],
  ['03','Design','Turn wireframes into premium UI layouts backed by a scalable, component-ready Figma Design System.'],
  ['04','Develop','Convert high-fidelity interfaces into semantic, pixel-perfect, and highly responsive HTML5 and CSS3 code.'],
  ['05','Deliver','Conduct visual QA, engineer interactive micro-interactions, and ship production-ready source files.'],
];
document.getElementById('processGrid').innerHTML = proc.map(([n,t,d],i) => `
  <div class="col-md-6 col-lg reveal" style="transition-delay:${i*80}ms">
    <div class="process-card"><div class="process-num text-gradient">${n}</div><h4 class="mt-2">${t}</h4><p class="text-muted mt-2 mb-0">${d}</p></div>
  </div>`).join('');

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
