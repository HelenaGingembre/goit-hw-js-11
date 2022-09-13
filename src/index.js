
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


refs.formSearch.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', fetchData);

 const fetchImagesApp = new GalleryImagesApp();



function onSubmitForm(event) {
    event.preventDefault();
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
        
    if (currentInput === '') {
        Notiflix.Notify.info('Sorry, nothing has been entered in the search query. Please try again.');
        return;
    }
    fetchImagesApp.query = currentInput;
    // console.log('fetchImagesApp.query: ',fetchImagesApp.query);
    // console.log('fetchImagesApp: ', fetchImagesApp);
    
    loadMoreIsVisibleToggle();
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
    
    loadMoreIsVisibleToggle();
    fetchImagesApp.fetchImages().then(images => {
            // console.log('images.hits.length - ',images.hits.length);
                //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
            if (images.hits.length == 0) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
                loadMoreIsVisibleToggle();
                return;
            } else {
                Notify.success(`Hooray! We found totalHits=${fetchImagesApp.total} images.`);
                // console.log('images.hits - ', images.hits);
                // console.log('images - ', images);
                // console.log('this.totalHits ', fetchImagesApp.totalHits);
                return images;
            }
        })
        .then( hits => {
            renderGallery(hits);
            onPageScrolling();
            // метод lightbox.refresh() 
            //Знищує та повторно ініціалізує лайтбокс, необхідний, наприклад, для
            //Ajax або після маніпуляцій dom
            lightbox.refresh(); 
            loadMoreIsVisibleToggle();
        });

}
//Добавить отображение большой версии изображения с библиотекой SimpleLightbox для полноценной галереи.
// Открытие модального окна по клику на элементе галереи. 

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});



//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScrolling() { 
    //возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
       
    window.scrollBy({
        top: cardHeight * 10,
        behavior: "smooth",
        });
}

function loadMoreIsVisibleToggle() {
    //  console.log('fetchImagesApp.page - ',fetchImagesApp.options.params.page);
  if (getPagesCount() > fetchImagesApp.options.params.page - 1) {
      refs.loadMore.classList.remove('is-hidden');
  } else {
    refs.loadMore.classList.add('is-hidden');
  }
}

function getPagesCount() {
    const res = Math.ceil(fetchImagesApp.total / fetchImagesApp.options.params.per_page);
    console.log('res', res);
    // console.log('fetchImagesApp.totalHits', fetchImagesApp.total); 
    // console.log('fetchImagesApp.options.params.per_page', fetchImagesApp.options.params.per_page);
    return res;
}