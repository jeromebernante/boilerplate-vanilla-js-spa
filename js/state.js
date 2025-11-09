// js/state.js
export class Store {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  // Get current state (or part of it)
  getState() {
    return this.state;
  }

  // Set new state (partial update)
  setState(updater) {
    const prev = this.state;
    this.state = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
    this.listeners.forEach(fn => fn(this.state, prev));
  }

  // Subscribe to changes
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn); // unsubscribe
  }
}

// Export a single shared store
export const store = new Store({
  count: 0  // our counter
});