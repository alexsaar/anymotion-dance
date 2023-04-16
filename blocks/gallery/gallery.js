const MIME_FOLDER = 'application/vnd.google-apps.folder';
const MIME_IMG = 'image/';

function showGallery(e) {
  const wrapper = e.srcElement.parentElement.parentElement;
  wrapper.querySelector('.gallery-overlay').classList.add('active');
}

function createImgEl(file, key) {
  const imgEl = document.createElement('img');
  imgEl.src = `https://www.googleapis.com/drive/v3/files/${file.id}?&key=${key}&alt=media`;
  imgEl.loading = 'lazy';
  return imgEl;
}

async function retrieveImages(folder, key, block) {
  const resp = await fetch(`https://www.googleapis.com/drive/v3/files?q=%22${folder.id}%22+in+parents&key=${key}`);
  if (resp.ok) {
    const json = await resp.text();
    const data = JSON.parse(json);

    let thumbEl;
    let galleryEl;

    [...data.files].forEach((file) => {
      // create gallery
      if (file.mimeType.startsWith(MIME_IMG)) {
        if (typeof thumbEl === 'undefined') {
          // create thumb and title container
          const folderEl = document.createElement('div');
          folderEl.classList.add('folder');

          const titleEl = document.createElement('h3');
          titleEl.innerHTML = folder.name;
          folderEl.appendChild(titleEl);

          thumbEl = document.createElement('div');
          thumbEl.classList.add('thumb');
          folderEl.appendChild(thumbEl);

          galleryEl = document.createElement('div');
          galleryEl.classList.add('gallery-overlay');
          folderEl.appendChild(galleryEl);

          thumbEl.appendChild(createImgEl(file, key));
          onclick = showGallery;
          block.appendChild(folderEl);
        }
        galleryEl.appendChild(createImgEl(file, key));
      }
    });
  }
}

export default async function decorate(block) {
  // retrieve api key and root folder
  const configResp = await fetch('config.json');
  if (configResp.ok) {
    const configJson = await configResp.text();
    const config = JSON.parse(configJson);

    const key = config.data[0].value;
    const root = config.data[1].value;

    // retrieve galerie folders
    const rootResp = await fetch(`https://www.googleapis.com/drive/v3/files?q=%22${root}%22+in+parents&key=${key}`);
    if (rootResp.ok) {
      const rootJson = await rootResp.text();
      const rootData = JSON.parse(rootJson);
      [...rootData.files].forEach((folder) => {
        if (folder.mimeType === MIME_FOLDER) {
          retrieveImages(folder, key, block);
        }
      });
    }
  }
}
