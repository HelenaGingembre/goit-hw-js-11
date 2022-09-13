
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryImagesApp } from './js/fetchImagesApp';
import {markupImagesGallery} from './js/markupImagesGallery';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    formSearch: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.loader'),
};

const totalHits = 0;
refs.formSearch.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', fetchData);

 const fetchImagesApp = new GalleryImagesApp();

//!!!!!!!В ответе бэкенд возвращает свойство totalHits - 
//общее количество изображений которые подошли под критерий 
//поиска(для бесплатного аккаунта). 


function onSubmitForm(event) {
    event.preventDefault();
   
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    
    
    if (currentInput === '') {
        Notiflix.Notify.info('Sorry, nothing has been entered in the search query. Please try again.');
        return;
    }
    fetchImagesApp.query = currentInput;
    console.log('fetchImagesApp.query: ',fetchImagesApp.query);
    console.log('fetchImagesApp: ', fetchImagesApp);
    //TODO !!! button loadMoreBtn.show();
    fetchImagesApp.resetPage();
    clearGalleryContainer();
    fetchData();
};

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
}

function renderGallery(hits) {
     refs.gallery.insertAdjacentHTML('beforeend', markupImagesGallery(hits));
};

function fetchData() {
    //TODO!!!!! loadMoreBtn.disabled();
    loadMoreIsVisible();
    fetchImagesApp.fetchImages().then(images => {
            console.log('images.hits.length - ',images.hits.length);
                //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
            if (images.hits.length == 0) {
                Notiflix.Notify.failure(
                `Sorry, there are no images matching your search query. Please try again.`,
                );
               //TODO!!!!! loadMoreBtn.hide();    

                return;
            } else {
                Notify.success(`Hooray! We found totalHits=${fetchImagesApp.totalHits} images.`);
                    console.log('images.hits - ', images.hits);
                console.log('images - ', images);
                console.log('this.totalHits ', fetchImagesApp.totalHits);
                return images;
            }
        })
        .then( hits => {
            //При поиске по новому ключевому слову необходимо полностью очищать 
            //содержимое галереи, чтобы не смешивать результаты.
            //TODO!!!

            renderGallery(hits);
            onPageScrolling();
            //У библиотеки есть метод refresh() который обязательно нужно вызывать 
            //каждый раз после добавления новой группы карточек изображений.
            lightbox.refresh(); 
        });

}
//Добавить отображение большой версии изображения с библиотекой SimpleLightbox для полноценной галереи.
// Открытие модального окна по клику на элементе галереи. 

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

// метод lightbox.refresh() 
//Знищує та повторно ініціалізує лайтбокс, необхідний, наприклад, для
//  Ajax або після маніпуляцій dom

//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScrolling(){ 
    const { height: cardHeight } = refs.gallery
        .firstElementChild.getBoundingClientRect();
       
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
}

function loadMoreIsVisible() {
     console.log('fetchImagesApp.page??? - ',fetchImagesApp.options.params.page);
  if (getPagesCount() > fetchImagesApp.options.params.page - 1) {
    refs.loadMore.classList.add('is-visible');
  } else {
    refs.loadMore.classList.remove('is-visible');
  }
}

function getPagesCount() {
  return Math.ceil(fetchImagesApp.totalHits / fetchImagesApp.options.params.per_page);
}