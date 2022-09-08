import axios from 'axios';


const PIXABAY_API_KEY = '29780910-989eab2d4bf0da575fbd77284';
axios.defaults.baseURL =  'https://pixabay.com/api/';

export class GalleryImagesApp{

    constructor() {
        this.query = null;
        this.page = 1;
        this.per_page = 40;
    }
    options = {
            key: `${PIXABAY_API_KEY}`,
            q: this.query,  // q:'cat',
            page: this.page, //this.page=1
            per_page: this.per_page, //this.per_page = 40,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        };
 //?${this.options}
    async fetchImages() {
        try {   
           const response = await axios.get(`${BASE_URL}`, this.options );
        const images = await response.json();
        return images;
        } catch (error) {
            console.log(error);
       }
        
   }

} 

    
export { FetchImagesApp };
