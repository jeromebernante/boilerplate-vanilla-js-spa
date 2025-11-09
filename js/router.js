// js/router.js
export class Router {
  constructor(routes, notFound) {
    this.routes = routes;
    this.notFound = notFound;
    this.currentRoute = null;

    // Fix: bind popstate handler
    this._onPopState = this._onPopState.bind(this);
    window.addEventListener('popstate', this._onPopState);
  }

  start() {
    this._navigate(location.pathname);
  }

  navigate(path) {
    if (!path.startsWith('/')) path = '/' + path;
    history.pushState(null, '', path);
    this._navigate(path);
  }

  _navigate(path) {
    const match = this._matchRoute(path);
    this.currentRoute = match;
    this._render(match);
  }

  _matchRoute(path) {
    for (const r of this.routes) {
      const regex = new RegExp('^' + r.path.replace(/:\w+/g, '([^/]+)') + '$');
      const params = path.match(regex);
      if (params) {
        const paramNames = (r.path.match(/:\w+/g) || []).map(p => p.slice(1));
        const paramObj = paramNames.reduce((acc, name, i) => {
          acc[name] = params[i + 1];
          return acc;
        }, {});
        return { component: r.component, params: paramObj };
      }
    }
    return { component: this.notFound };
  }

  async _render({ component, params = {} }) {
    const outlet = document.getElementById('router-outlet');
    if (!outlet) return console.error('Missing #router-outlet');
    outlet.innerHTML = '';
    const el = typeof component === 'function' ? component(params) : component;
    const node = await el;
    outlet.appendChild(node);
  }

  // Fix: regular function, bound above
  _onPopState() {
    this._navigate(location.pathname);
  }
}

export function initLinks(router) {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    router.navigate(href);
  });
}