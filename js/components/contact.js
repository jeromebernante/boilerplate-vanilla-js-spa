// js/components/contact.js
export function Contact() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'py-12 px-4 bg-gray-50';

  section.innerHTML = `
    <h2 class="text-3xl font-semibold mb-6 text-center">Get in Touch</h2>
    <form class="max-w-lg mx-auto space-y-4">
      <input type="text" placeholder="Name" class="w-full p-3 border rounded">
      <input type="email" placeholder="Email" class="w-full p-3 border rounded">
      <textarea placeholder="Message" rows="4" class="w-full p-3 border rounded"></textarea>
      <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Send Message
      </button>
    </form>
  `;

  return section;
}