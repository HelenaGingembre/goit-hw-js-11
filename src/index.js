
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
    // console.log('fetchImagesApp: ', fetchImagesApp);
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
    fetchImagesApp.fetchImages().then(images => {
        //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
       
        if (images.hits.length == 0 ) {
            console.log('images', images);
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            // loadMoreIsVisibleToggle();
            // return;
        }
        else {
            Notiflix.Notify.success(`Hooray! We found totalHits=${fetchImagesApp.total} images.`);
            console.log('images.hits - ', images.hits);
            return images;
        }
    })
        .then(hits => {
           
            if (hits == undefined) {
            console.log('hits undefined', hits);
                return;
            }
            // clearGalleryContainer();
            renderGallery(hits);
            onPageScrolling();
            // метод lightbox.refresh() 
            //Знищує та повторно ініціалізує лайтбокс, необхідний, наприклад, для
            //Ajax або після маніпуляцій dom
            lightbox.refresh();
            if (refs.gallery.children.length === hits.totalHits) {
                Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
                loadMoreIsVisibleToggle();
                // console.log('hits.totalHits', hits.totalHits);
            }
            loadMoreIsVisibleToggle();
        })
};
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
    // console.log('res', res);
    return res;
}