// Add imports above this line
import { galleryItems } from './gallery-items';

// Change code below this line

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML('beforeend', createPhotoGalleryMarkup(galleryItems));
galleryContainer.addEventListener('click', createModal);

function createPhotoGalleryMarkup () {
        return galleryItems.map(({preview, original, description}) => {
                return `
                <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
        `;
    }).join('');
}

function createModal (e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }

    const modal = basicLightbox.create(`
        <img src="${e.target.dataset.source}" width="800" height="600">
    `)

    modal.show()

    if (modal.visible()) {
        window.addEventListener('keydown', onPressKeyESC);
    }

    function onPressKeyESC(e) {
        if (e.code === 'Escape') {
            modal.close();
            window.removeEventListener('keydown', onPressKeyESC);
        }
    }
}