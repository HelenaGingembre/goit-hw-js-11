import axios from 'axios';

const API_KEY = '29780910-989eab2d4bf0da575fbd77284';
const BASE_URL =  'https://pixabay.com/api/';

export  class GalleryImagesApp{

    constructor() {
        //В ответе бэкенд возвращает свойство totalHits - 
//общее количество изображений которые подошли под критерий 
//поиска(для бесплатного аккаунта). 

        this.totalHits = 0;
        this.options = {
            params: {
                key: API_KEY,
                q: null, // q:'cat',
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: 1,
                per_page: 40,
            }
        };
    }
 
    async fetchImages() {
        //BASE_URL, this.options
        //`https://pixabay.com/api/?key=29780910-989eab2d4bf0da575fbd77284&q=${this.options.q}&image_type=photo&orientation=horizontal&per_page=40`
        //`${BASE_URL}?key=${this.options.key}&q=${this.options.q}&image_type=photo&orientation=horizontal&per_page=40`
        try {   
           
            const response = await axios.get(BASE_URL ,this.options);
            const images = await response.data;
            this.totalHits = images.total;
            if (response.status == 200) {
                 this.incrementPage();
            }
            return images;

        } catch (error) {
            console.log('error: ', error);
       }
    }
    
    get query() {
        return this.options.params.q;
    }

    set query(newQuery) {
        this.options.params.q = newQuery;
    }
    get total() {
        return this.totalHits;
    }

    incrementPage() {
        this.options.params.page += 1;
   }

    resetPage() {
        this.options.params.page = 1;
  }
} 

    
export { FetchImagesApp };
