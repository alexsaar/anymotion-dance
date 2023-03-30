import ffetch from '../../scripts/ffetch.js';

export default async function decorate(block) {
  const roots = [...block.querySelectorAll('a')];
  const refs = roots.map((a) => a.href);

  const articles = await ffetch('/query-index.json')
    .filter(({ path }) => refs.find((root) => path.indexOf(new URL(root).pathname) >= 0
      && path !== new URL(root).pathname)).all();

  [...block.children].forEach((child) => {
    child.remove();
  });

  [...articles].forEach((article) => {
    const articleEl = document.createElement('div');
    articleEl.className = 'article';
    block.append(articleEl);

    const title = document.createElement('h2');
    title.innerHTML = article.title.split('|')['0'];
    articleEl.append(title);

    const desc = document.createElement('p');
    desc.innerHTML = article.description;
    articleEl.append(desc);

    const more = document.createElement('a');
    more.href = article.path;
    more.innerHTML = 'Weiter lesen';
    more.classList.add('more');
    const moreWrapper = document.createElement('p');
    moreWrapper.append(more);
    articleEl.append(moreWrapper);
  });

  // [...block.children].forEach((div, index) => {
  //   const link = div.querySelector('a');
  //   const newsItem = articles.find((news) => link.href.indexOf(news.path) >= 0);
  //   if (newsItem) {
  //     link.textContent = newsItem.title;
  //   }

  //   div.classList.add(`post-${index + 1}`);
  //   div.firstElementChild.classList.add('zoom-effect-wrapper');
  //   if (newsItem && !div.firstElementChild.querySelector('img')) {
  //     const img = createOptimizedPicture(newsItem.image, newsItem.title, false);
  //     div.firstElementChild.append(img);
  //   }

  //   const textDiv = div.lastElementChild;
  //   const p = document.createElement('p');
  //   p.innerHTML = textDiv.innerHTML;
  //   textDiv.replaceWith(p);
  // });
}
