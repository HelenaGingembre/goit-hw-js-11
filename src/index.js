
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {GalleryImagesApp} from './js/fetchImagesApp';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const fetchImagesApp = new GalleryImagesApp();
const refs = {
    formSearch: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

refs.formSearch.addEventListener('submit', onSubmitForm);




function onSubmitForm(event) {
    event.preventDefault();

    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    fetchImagesApp.query = currentInput;

    console.log(fetchImagesApp.query);
    //fetchImages().then(res => console.log(res));

}

