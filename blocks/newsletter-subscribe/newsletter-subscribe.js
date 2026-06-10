export default function decorate(block) {
  const rows = [...block.children];

  // Extract optional config
  const actionUrl = rows[0]?.querySelector('div')?.textContent?.trim()
    || 'https://www.mdanderson.org/publications.html';
  const titleText = rows[1]?.querySelector('div')?.textContent?.trim()
    || 'Subscribe to our Cancerwise newsletter';

  block.innerHTML = '';

  // Email icon circle
  const iconWrap = document.createElement('div');
  iconWrap.className = 'newsletter-icon';
  iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  block.appendChild(iconWrap);

  // Title
  const title = document.createElement('div');
  title.className = 'newsletter-title';
  title.textContent = titleText;
  block.appendChild(title);

  // Form
  const form = document.createElement('form');
  form.action = actionUrl;
  form.method = 'post';
  form.className = 'newsletter-form';
  form.setAttribute('novalidate', '');

  const fieldsWrap = document.createElement('div');
  fieldsWrap.className = 'newsletter-fields';

  const fields = [
    { name: 'tfa_23', placeholder: 'First Name *', type: 'text', autocomplete: 'given-name' },
    { name: 'tfa_38', placeholder: 'Last Name *', type: 'text', autocomplete: 'family-name' },
    { name: 'tfa_20', placeholder: 'Email Address *', type: 'email', autocomplete: 'email' },
  ];

  fields.forEach((f) => {
    const input = document.createElement('input');
    input.type = f.type;
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.autocomplete = f.autocomplete;
    input.required = true;
    input.className = 'newsletter-input';
    fieldsWrap.appendChild(input);
  });

  form.appendChild(fieldsWrap);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'newsletter-submit';
  submit.textContent = 'Get started';
  form.appendChild(submit);

  block.appendChild(form);
}
