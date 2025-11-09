// js/main.js
import { Header } from './components/header.js';
import { About } from './components/about.js';
import { Projects } from './components/projects.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';
import { Router, initLinks } from './router.js';
import { Home } from './components/home.js';   // ← add this

// -------------------------------------------------
// 1. Define routes (path → component)
// -------------------------------------------------

const routes = [
  { path: '/',           component: () => Home() },     // ← Home page
  { path: '/about',      component: () => About() },
  { path: '/projects',   component: () => Projects() },
  { path: '/projects/:id', component: projectDetail },
  { path: '/contact',    component: () => Contact() },
];

// 404 fallback
function NotFound() {
  const div = document.createElement('div');
  div.className = 'py-20 text-center text-2xl text-red-600';
  div.textContent = '404 – Page not found';
  return div;
}

// -------------------------------------------------
// 2. Example dynamic route (optional)
// -------------------------------------------------
function projectDetail({ id }) {
  const section = document.createElement('section');
  section.className = 'py-12 px-4';
  section.innerHTML = `
    <h2 class="text-3xl font-bold mb-4">Project #${id}</h2>
    <p class="text-lg">Detailed view for project with id <code>${id}</code>.</p>
  `;
  return section;
}

// -------------------------------------------------
// 3. Render the static shell (header + footer + outlet)
// -------------------------------------------------
function renderShell() {
  const app = document.getElementById('app');
  app.innerHTML = '';                     // clear

  app.appendChild(Header());

  const outlet = document.createElement('div');
  outlet.id = 'router-outlet';
  app.appendChild(outlet);

  app.appendChild(Footer());
}

// -------------------------------------------------
// 4. Bootstrap
// -------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderShell();

  const router = new Router(routes, NotFound);
  router.start();
  initLinks(router);   // makes all [data-link] work
});