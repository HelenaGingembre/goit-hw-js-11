import axios from 'axios';

const axios = require('axios').default;

const API_KEY = '29780910-989eab2d4bf0da575fbd77284';
const BASE_URL =  'https://pixabay.com/api/';

export  class GalleryImagesApp{

    constructor() {
        this.options = {
            key: `${API_KEY}`,
            q: null, // q:'cat',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: 1, 
            per_page: 40, 
        };
    }
 
    async fetchImages() {
        //`${BASE_URL}`, this.options
        try {   
           const response = await axios.get(`https://pixabay.com/api/?key=29780910-989eab2d4bf0da575fbd77284&q=${this.options.q}&image_type=photo&orientation=horizontal&per_page=40`);
        const images = await response.data;
        return images;
        } catch (error) {
            console.log(error);
       }
        
    }
    
} 

    
export { FetchImagesApp };
