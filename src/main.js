import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { pixabayApi } from "./js/pixabay-api.js"
import { createGallery, renderGallery } from "./js/render-functions.js"

const searchForm = document.querySelector('.js-search-form');
const inputField = document.querySelector('.js-search-input');
const gallery = document.querySelector(".js-gallery")
const loader = document.querySelector(".loader")

searchForm.addEventListener("submit", handleSubmit)

function toLoader(show) {
    if (show) {
        loader.classList.remove("hidden");
    }
    else {
        loader.classList.add("hidden");
    }
};

function handleSubmit(event) {
    event.preventDefault();

    const searchQuery = event.target.elements.user_query.value.trim();

    if (!searchQuery) {
        iziToast.error({
            message: 'Please write smth normal.',
            position: 'topRight',
        });
        return;
    };

    gallery.innerHTML = "";

    toLoader(true);

    pixabayApi(searchQuery)
        .then((data) => {
            if (data.total === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            renderGallery(data.hits);
        })
        .catch((error) => {
            console.log(error.message);
        iziToast.error({
                message: 'Failed to fetch images. Please try again later.',
                position: 'topRight',
            });
        })
        .finally(() => {
            toLoader(false);
    })
    event.target.elements.user_query.value = "";
}