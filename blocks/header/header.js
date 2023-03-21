import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'address', 'contact', 'sections'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const navSections = nav.querySelector('.nav-sections');
    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
        navSection.addEventListener('click', () => {
          if (isDesktop.matches) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          }
        });
      });
    }

    decorateIcons(nav);
    block.append(nav);

    // // location logo
    // let svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    // svg.setAttribute("viewBox", "0 0 22 33");
    // svg.setAttribute("width", "16");
    // svg.setAttribute("height", "24");

    // let svgpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
    // svgpath.setAttributeNS(null, "d", "M11 0C7.875 0 5.3125 1.11458 3.3125 3.34375C1.3125 5.57292 0.3125 8.45833 0.3125 12C0.3125 15.9583 3.52083 22.4375 9.9375 31.4375L11 32.9375L12.0625 31.4375C18.4792 22.4375 21.6875 15.9583 21.6875 12C21.6875 8.45833 20.6875 5.57292 18.6875 3.34375C16.6875 1.11458 14.125 0 11 0ZM11 28.375C9.04167 25.5417 7.21875 22.5312 5.53125 19.3438C3.84375 16.1562 3 13.7083 3 12C3 9.45833 3.69792 7.27083 5.09375 5.4375C6.48958 3.60417 8.45833 2.6875 11 2.6875C13.5417 2.6875 15.5104 3.60417 16.9062 5.4375C18.3021 7.27083 19 9.45833 19 12C19 13.7083 18.1562 16.1562 16.4688 19.3438C14.7812 22.5312 12.9583 25.5417 11 28.375ZM11 5.3125C9.54167 5.3125 8.29167 5.84375 7.25 6.90625C6.20833 7.96875 5.6875 9.22917 5.6875 10.6875C5.6875 12.1458 6.20833 13.3958 7.25 14.4375C8.29167 15.4792 9.54167 16 11 16C12.4583 16 13.7083 15.4792 14.75 14.4375C15.7917 13.3958 16.3125 12.1458 16.3125 10.6875C16.3125 9.22917 15.7917 7.96875 14.75 6.90625C13.7083 5.84375 12.4583 5.3125 11 5.3125ZM11 13.3125C10.2917 13.3125 9.66667 13.0521 9.125 12.5312C8.58333 12.0104 8.3125 11.3958 8.3125 10.6875C8.3125 9.9375 8.58333 9.30208 9.125 8.78125C9.66667 8.26042 10.2917 8 11 8C11.7083 8 12.3333 8.26042 12.875 8.78125C13.4167 9.30208 13.6875 9.9375 13.6875 10.6875C13.6875 11.3958 13.4167 12.0104 12.875 12.5312C12.3333 13.0521 11.7083 13.3125 11 13.3125Z");
    // svg.append(svgpath);

    // nav.getElementsByClassName("nav-address")[0].prepend(svg);

    // // contact logo
    // svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    // svg.setAttribute("viewBox", "0 0 22 33");
    // svg.setAttribute("width", "22");
    // svg.setAttribute("height", "33");

    // svgpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
    // svgpath.setAttributeNS(null, "d", "M3.328 0.6875C3.0665 0.6875 2.808 0.794375 2.593 0.985625L2.563 1.00419L2.547 1.02106L0.984499 2.83231L0.999499 2.84919C0.517999 3.35094 0.367999 4.10019 0.577499 4.74819C0.578499 4.751 0.576499 4.76169 0.577499 4.76506C1.001 6.13081 2.086 8.76444 4.2025 11.1461C6.3275 13.5367 8.701 14.7067 9.8745 15.2242H9.8895C10.1838 15.3334 10.4982 15.3551 10.8022 15.2873C11.1062 15.2195 11.3895 15.0644 11.6245 14.8372L11.6395 14.8203L11.6555 14.8023L13.2035 13.0625C13.6185 12.5956 13.6185 11.789 13.2035 11.3221L11.1725 9.03725L11.1565 9.00181C10.7415 8.53494 10.009 8.53494 9.594 9.00181L9.579 9.01981L8.594 10.1279C7.84346 9.72224 7.15315 9.1885 6.5475 8.54562C5.7295 7.66644 5.3105 6.65563 5.1575 6.25963L6.1565 5.13463C6.5775 4.661 6.584 3.87687 6.1415 3.41225L6.1565 3.39425L6.11 3.34194L4.11 1.02106L4.0935 1.00419L4.0625 0.985625C3.85444 0.795747 3.59539 0.690673 3.3275 0.6875H3.328ZM3.328 1.8125C3.365 1.8125 3.4015 1.83275 3.438 1.86537L5.438 4.16769L5.469 4.20312L5.484 4.22C5.4805 4.21719 5.514 4.27456 5.453 4.34375L4.203 5.75L3.968 5.99637L4.078 6.34738C4.078 6.34738 4.653 8.07594 5.8595 9.37137L5.968 9.47656C7.13 10.6702 8.5 11.3216 8.5 11.3216L8.8125 11.4802L9.0475 11.2169L10.2975 9.81069C10.3825 9.71506 10.3675 9.71506 10.4525 9.81069L12.5 12.113C12.585 12.2086 12.585 12.1749 12.5 12.2705L10.9685 13.9934C10.7385 14.2162 10.495 14.2612 10.2035 14.1521C9.0695 13.6514 6.8685 12.5619 4.906 10.3552C2.9285 8.12938 1.895 5.60375 1.516 4.37919C1.4395 4.15025 1.4945 3.81106 1.672 3.64062L1.687 3.62375L1.703 3.60519L3.219 1.86537C3.24875 1.83436 3.28703 1.8157 3.3275 1.8125H3.328Z");
    // svg.append(svgpath);

    // nav.getElementsByClassName("nav-contact")[0].prepend(svg);
  }
}
