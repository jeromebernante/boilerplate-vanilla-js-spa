// Helper: load HTML into a selector
async function loadComponent(selector, file) {
  try {
    const el = document.querySelector(selector);
    if (!el) {
      console.warn(`Element ${selector} not found`);
      return;
    }
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
    return true;
  } catch (error) {
    console.error(`Error loading component ${file}:`, error);
    return false;
  }
}

// Routes map with titles
const routes = {
  "/": { file: "/pages/home.html", title: "Home | Pretty Page JS" },
  "/home": { file: "/pages/home.html", title: "Home | Pretty Page JS" },
  "/about": { file: "/pages/about.html", title: "About Us | Pretty Page JS" },
  "/contact": { file: "/pages/contact.html", title: "Contact Us | Pretty Page JS" }
};

// Component registry: which components to load for which pages
// format: path -> array of { selector: placeholder, file: component file }
const pageComponents = {
  "/": [
    { selector: "#hero-component", file: "/components/hero.html" },
    { selector: "#intro-component", file: "/components/intro.html" },
    { selector: "#services-component", file: "/components/services.html" },
    { selector: "#reviews-component", file: "/components/reviews.html" },
    { selector: "#highlights-component", file: "/components/highlights.html" },
    { selector: "#cta-component", file: "/components/cta.html" },
    { selector: "#blog-component", file: "/components/blog.html" },
    { selector: "#contact-schedule-component", file: "/components/contact-schedule.html" }
  ],
  "/contact": [
    { selector: "#contact-component", file: "/components/contact-form.html" }
  ],
  "/about": [
    { selector: "#gallery-component", file: "/components/gallery.html" }
  ]
};

// Load optional components for a page
// Helper: Get meta title for a path
function getMetaTitle(path) {
  const route = routes[path];
  return route ? route.title : "404 | Page Not Found";
}

async function loadPageComponents(path) {
  const components = pageComponents[path] || [];
  for (const c of components) {
    await loadComponent(c.selector, c.file);
  }
}

// Render the page
async function renderRoute() {
  try {
    const path = window.location.pathname;
    const route = routes[path] || routes["/"];  // fallback to home page

    console.log('Rendering route:', path);
    
    // Update page title immediately
    document.title = route.title;
    console.log('Set title to:', route.title);

    // Load main page content
    const res = await fetch(route.file);
    if (!res.ok) {
      throw new Error(`Failed to load ${route.file}`);
    }
    document.getElementById("app").innerHTML = await res.text();

    // Load optional components
    await loadPageComponents(path);

    // Update active nav link
    updateActiveLink(path);

    // Ensure title is set after content loads
    requestAnimationFrame(() => {
      document.title = route.title;
      console.log('Title confirmed as:', document.title);
    });
  } catch (error) {
    console.error('Error rendering route:', error);
    document.title = '404 | Page Not Found';
  }
}

// Highlight current nav link
function updateActiveLink(path) {
  document.querySelectorAll("a[data-link]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === path);
  });
}

// Navigate programmatically
async function navigateTo(url) {
  history.pushState(null, "", url);
  await renderRoute();
}

// Intercept clicks
document.addEventListener("click", e => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});

// Initialize the application
async function initApp() {
  // Load header and footer components
  await Promise.all([
    loadComponent("#header", "/components/header.html"),
    loadComponent("#footer", "/components/footer.html")
  ]);

  // Get the current path and update history if needed
  const path = window.location.pathname;
  if (path !== '/' && routes[path]) {
    history.replaceState(null, '', path);
  }
  
  // Initial route render
  await renderRoute();
}

// Handle back/forward buttons
window.addEventListener("popstate", () => {
  renderRoute();
});

// Initialize when DOM is ready
window.addEventListener("DOMContentLoaded", initApp);

// Handle browser back/forward
window.addEventListener("popstate", () => {
  renderRoute();
});
