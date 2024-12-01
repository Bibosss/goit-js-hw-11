import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export const createGallery = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<a href="${largeImageURL}" class="gallery_item">
    <img src="${webformatURL}" alt="${tags}" class="gallery__image" />
    <div class="info">
    <p class="info-item"><b>Likes</b> ${likes}</p>
    <p class="info-item"><b>Views</b> ${views}</p>
    <p class="info-item"><b>Comments</b> ${comments}</p>
    <p class="info-item"><b>Downloads</b> ${downloads}</p>
    </div>
    </a>`
}

export function renderGallery(images) {
    const gallery = document.querySelector(".js-gallery");
    gallery.innerHTML = images.map(createGallery).join("");
    initializeLightbox();
}

function initializeLightbox() {
    if (lightbox) {
        lightbox.refresh();
    }
    else {
        lightbox = new SimpleLightbox('.js-gallery a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
        });
    }
}