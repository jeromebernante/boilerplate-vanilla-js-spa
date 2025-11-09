// js/components/pages/projects.js
import { store } from '../../state.js';

function ProjectCard({ title, description }) {
  const card = document.createElement('div');
  card.className = 'bg-white p-4 rounded shadow-md';

  card.innerHTML = `
    <h3 class="text-xl font-bold mb-2">${title}</h3>
    <p>${description}</p>
  `;

  return card;
}

export function Projects() {
  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'py-8 px-4';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-semibold mb-4';
  title.textContent = 'Projects';

  const counter = document.createElement('div');
  counter.className = 'mb-6 p-4 bg-indigo-50 rounded-lg text-center';

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

  // Initial render
  function render() {
    const { count } = store.getState();

    counter.innerHTML = `
      <p class="text-2xl font-bold mb-3">Counter: <span id="count">${count}</span></p>
      <div class="space-x-2">
        <button id="dec" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decrement</button>
        <button id="inc" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Increment</button>
      </div>
    `;

    // Attach events
    counter.querySelector('#dec').onclick = () => store.setState(s => ({ count: s.count - 1 }));
    counter.querySelector('#inc').onclick = () => store.setState(s => ({ count: s.count + 1 }));

    // Example cards
    grid.innerHTML = '';
    grid.appendChild(ProjectCard({ title: 'Project 1', description: 'Vanilla JS app.' }));
    grid.appendChild(ProjectCard({ title: 'Project 2', description: 'Tailwind magic.' }));
  }

  // First render
  render();

  // Re-render when state changes
  const unsubscribe = store.subscribe(render);

  // Cleanup on route leave (optional but clean)
  section.addEventListener('remove', unsubscribe);

  // Build DOM
  section.appendChild(title);
  section.appendChild(counter);
  section.appendChild(grid);

  return section;
}