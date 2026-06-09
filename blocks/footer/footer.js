export default async function decorate(block) {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) {
    const meta = document.querySelector('meta[name="footer"]');
    const footerPath = meta ? meta.content : '/footer';
    resp = await fetch(`${footerPath}.plain.html`);
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const parser = new DOMParser();
  const footerDoc = parser.parseFromString(html, 'text/html');
  const sections = footerDoc.body.querySelectorAll(':scope > div');

  const footer = document.createElement('div');
  footer.className = 'footer-wrapper';

  // Section 0: Newsletter + Social + Podcast
  const newsSection = sections[0];
  if (newsSection) {
    const band = document.createElement('div');
    band.className = 'footer-newsletter-band';

    const heading = newsSection.querySelector('p');
    if (heading) {
      const h = document.createElement('p');
      h.className = 'footer-newsletter-heading';
      h.textContent = heading.textContent;
      band.appendChild(h);
    }

    const form = document.createElement('form');
    form.className = 'footer-newsletter-form';
    ['First Name', 'Last Name', 'Email Address'].forEach((placeholder) => {
      const input = document.createElement('input');
      input.type = placeholder.includes('Email') ? 'email' : 'text';
      input.placeholder = `${placeholder} *`;
      input.required = true;
      form.appendChild(input);
    });
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Get started';
    form.appendChild(submitBtn);
    band.appendChild(form);

    const lists = newsSection.querySelectorAll('ul');
    if (lists[0]) {
      const socialList = document.createElement('ul');
      socialList.className = 'footer-social-icons';
      lists[0].querySelectorAll('li').forEach((li) => {
        socialList.appendChild(li.cloneNode(true));
      });
      band.appendChild(socialList);
    }
    if (lists[1]) {
      const podcastList = document.createElement('ul');
      podcastList.className = 'footer-podcast-icons';
      lists[1].querySelectorAll('li').forEach((li) => {
        podcastList.appendChild(li.cloneNode(true));
      });
      band.appendChild(podcastList);
    }

    footer.appendChild(band);
  }

  // Section 1: Link columns
  const linksSection = sections[1];
  if (linksSection) {
    const band = document.createElement('div');
    band.className = 'footer-links-band';

    const logoLink = linksSection.querySelector('a');
    if (logoLink) {
      const logo = logoLink.cloneNode(true);
      logo.className = 'footer-logo';
      band.appendChild(logo);
    }

    const columns = document.createElement('div');
    columns.className = 'footer-columns';
    linksSection.querySelectorAll('ul').forEach((ul) => {
      const col = document.createElement('div');
      col.className = 'footer-column';
      const items = ul.querySelectorAll('li');
      items.forEach((li, idx) => {
        if (idx === 0 && !li.querySelector('a')) {
          const h = document.createElement('h4');
          h.className = 'footer-column-heading';
          h.textContent = li.textContent;
          col.appendChild(h);
        } else {
          const p = document.createElement('p');
          p.appendChild(li.querySelector('a') ? li.querySelector('a').cloneNode(true) : document.createTextNode(li.textContent));
          col.appendChild(p);
        }
      });
      columns.appendChild(col);
    });
    band.appendChild(columns);
    footer.appendChild(band);
  }

  // Section 2: Legal links
  const legalSection = sections[2];
  if (legalSection) {
    const band = document.createElement('div');
    band.className = 'footer-legal-band';
    const ul = legalSection.querySelector('ul');
    if (ul) {
      const list = ul.cloneNode(true);
      list.className = 'footer-legal-links';
      band.appendChild(list);
    }
    footer.appendChild(band);
  }

  // Section 3: Bottom bar
  const bottomSection = sections[3];
  if (bottomSection) {
    const band = document.createElement('div');
    band.className = 'footer-bottom-band';

    const logoLink = bottomSection.querySelector('a');
    if (logoLink) {
      const logo = logoLink.cloneNode(true);
      logo.className = 'footer-bottom-logo';
      band.appendChild(logo);
    }

    const paragraphs = bottomSection.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const el = p.cloneNode(true);
      el.className = p.textContent.includes('©') ? 'footer-copyright' : 'footer-mission';
      band.appendChild(el);
    });

    footer.appendChild(band);
  }

  block.textContent = '';
  block.appendChild(footer);
}
