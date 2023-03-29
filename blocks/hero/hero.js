function onLinkClick(e) {
  document.getElementById(e.srcElement.href.split('#')[1]).scrollIntoView(false);
  e.preventDefault();
}

export default function decorate(block) {
  const slider = document.createElement('div');
  slider.className = 'hero-slider';

  if (block.children.length > 1) {
    [...block.children].forEach((el, index) => {
      el.id = `slide-${index}`;

      const a = document.createElement('a');
      a.onclick = onLinkClick;
      a.href = `#slide-${index}`;
      a.className = 'hero-slider-link';
      slider.append(a);
    });

    block.parentElement.append(slider);
  }
}
