
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryImagesApp } from './js/fetchImagesApp';
import {markupImagesGallery} from './js/markupImagesGallery';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    formSearch: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

refs.formSearch.addEventListener('submit', onSubmitForm);

//!!!!!!!В ответе бэкенд возвращает свойство totalHits - 
//общее количество изображений которые подошли под критерий 
//поиска(для бесплатного аккаунта). 


function onSubmitForm(event) {
    event.preventDefault();
    const fetchImagesApp = new GalleryImagesApp();
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    fetchImagesApp.query = currentInput;
    
    if (currentInput === '') {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return;
    }



    console.log(fetchImagesApp.query);
    console.log(fetchImagesApp);

    fetchImagesApp.fetchImages().
        then(images => {
         
                console.log('images.hits.length - ',images.hits.length);
                //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
                if (images.hits.length == 0) {
                return Notiflix.Notify.failure(
                `Sorry, there are no images matching your search query. Please try again.`,
                );
            } else {
                Notify.success(`Hooray! We found totalHits=${images.totalHits} images.`);
                    console.log('images.hits - ', images.hits);
                     console.log('images - ',images);
                return images;
            }
        })
        .then( hits => {

            renderGallery(hits);
        
        });

};



function renderGallery(hits) {
     refs.gallery.insertAdjacentHTML('beforeend', markupImagesGallery(hits));
};
