
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

    fetchImagesApp.fetchImages().then(images => {
        
        console.log(images);
        refs.gallery.insertAdjacentHTML('beforeend', renderImagesGallery(images));
        
    });

}

function renderImagesGallery({hits}) {
      
    const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
         
        return ` <a href="${largeImageURL}">
                    <div class="photo-card">
                            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                            <div class="info">
                                <p class="info-item">
                                <b>Likes:${likes}</b>
                                </p>
                                <p class="info-item">
                                <b>Views:${views}</b>
                                </p>
                                <p class="info-item">
                                <b>Comments:${comments}</b>
                                </p>
                                <p class="info-item">
                                <b>Downloads:${downloads}</b>
                                </p>
                            </div>
                    </div>
                </a>`;
    }).join('');

    return markup;
}

