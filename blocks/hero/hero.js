function setActiveLink() {
  const banner = document.querySelectorAll('.hero > div');
  [...banner].forEach((el) => {
    const bounding = el.getBoundingClientRect();
    if (bounding.top >= 0
      && bounding.left >= 0
      && bounding.right <= window.innerWidth
      && bounding.bottom <= window.innerHeight) {
      document.querySelector('.hero-slider-link.active').classList.remove('active');
      document.querySelector(`[href="#${el.id}"]`).classList.add('active');
    }
  });
}

function onLinkClick(e) {
  e.preventDefault();

  const el = document.getElementById(e.srcElement.href.split('#')[1]);
  el.scrollIntoView(false);

  setActiveLink();
}

function onScroll(e) {
  setTimeout(setActiveLink(e), 500);
}

export default function decorate(block) {
  const slider = document.createElement('div');
  slider.className = 'hero-slider';

  block.onscroll = onScroll;

  if (block.children.length > 1) {
    [...block.children].forEach((el, index) => {
      el.id = `slide-${index}`;

      const a = document.createElement('a');
      a.onclick = onLinkClick;
      a.href = `#slide-${index}`;
      a.className = 'hero-slider-link';
      slider.append(a);
    });
    slider.children[0].classList.add('active');
    block.parentElement.append(slider);
  }
}
