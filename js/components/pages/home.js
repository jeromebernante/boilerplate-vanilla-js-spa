// js/components/home.js
export function Home() {
  const section = document.createElement('section');
  section.className = 'py-16 px-4 text-center bg-gradient-to-b from-indigo-50 to-white';

  section.innerHTML = `
    <h1 class="text-5xl font-bold mb-4">Hi, I'm Alex</h1>
    <p class="text-xl mb-8">Full-Stack Developer & Designer</p>
    <a href="/projects" data-link class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
      View My Work
    </a>
  `;

  return section;
}