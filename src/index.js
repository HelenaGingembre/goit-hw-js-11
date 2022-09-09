
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {GalleryImagesApp} from './js/fetchImagesApp';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    formSearch: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

refs.formSearch.addEventListener('submit', onSubmitForm);

//В ответе бэкенд возвращает свойство totalHits - 
//общее количество изображений которые подошли под критерий 
//поиска(для бесплатного аккаунта). 


function onSubmitForm(event) {
    event.preventDefault();
    const fetchImagesApp = new GalleryImagesApp();
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    fetchImagesApp.q = currentInput;
    fetchImagesApp.options.q=currentInput;
    if (fetchImagesApp.q === '') {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return;
    }


   

    console.log(fetchImagesApp.q);
    console.log(fetchImagesApp.options.q);
    console.log(fetchImagesApp);
    fetchImagesApp.fetchImages().then(res => console.log(res));

}

