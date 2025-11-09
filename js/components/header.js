// js/components/header.js
export function Header() {
  const header = document.createElement('header');
  header.className = 'bg-gray-800 text-white p-4 flex justify-between items-center';

header.innerHTML = `
  <h1 class="text-2xl font-bold">My Portfolio</h1>
  <nav class="space-x-6">
    <a href="/"          data-link class="hover:underline">Home</a>
    <a href="/about"     data-link class="hover:underline">About</a>
    <a href="/projects"  data-link class="hover:underline">Projects</a>
    <a href="/contact"   data-link class="hover:underline">Contact</a>
  </nav>
`;

  return header;
}