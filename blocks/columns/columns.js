export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    if (!row.previousElementSibling) {
      row.classList.add('columns-left');
    } else if (row.previousElementSibling.classList.contains('columns-left')) {
      row.classList.add('columns-right');
    } else {
      row.classList.add('columns-left');
    }

    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
