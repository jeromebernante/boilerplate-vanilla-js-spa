export function About() {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'py-8 px-4 bg-gray-100';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-semibold mb-4';
  title.textContent = 'About Me';

  const content = document.createElement('p');
  content.className = 'text-lg';
  content.textContent = 'I am a web developer passionate about building interactive experiences with vanilla JS and Tailwind.';

  section.appendChild(title);
  section.appendChild(content);
  return section;
}