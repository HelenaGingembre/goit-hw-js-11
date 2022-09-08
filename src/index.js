import axios from 'axios';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const PIXABAY_API_KEY = '29780910-989eab2d4bf0da575fbd77284';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
    formSearch: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

refs.formSearch.addEventListener('submit', onSubmitForm);


const options = {
            key: `${PIXABAY_API_KEY}`,
            q: `cat`,
            page: 1,
            per_page: 40,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        };

function onSubmitForm(event) {
    event.preventDefault();
   async  function fetchImages(){
        const response = await fetch(`${BASE_URL}?key=${PIXABAY_API_KEY}&q=${options.q}&per_page=${options.per_page}&image_type=${options.image_type}` );
        const images = await response.json();
        return images;
   }
    fetchImages().then(images => console.log(images));
}

