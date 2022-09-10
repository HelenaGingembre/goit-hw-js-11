


function markupImagesGallery({hits}) {
      
    const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
         
        return ` <a href="${largeImageURL}">
                    <div class="photo-card">
                            <img src="${webformatURL}" 
                            alt="${tags}"
                            loading="lazy"
                            width = 200
                            height = "100%" />
                            <div class="info">
                                <p class="info-item">
                                Likes:<b>${likes}</b>
                                </p>
                                <p class="info-item">
                                Views:<b>${views}</b>
                                </p>
                                <p class="info-item">
                                Comments:<b>${comments}</b>
                                </p>
                                <p class="info-item">
                                Downloads:<b>${downloads}</b>
                                </p>
                            </div>
                    </div>
                </a>`;
    }).join('');

    return markup;
};

export { markupImagesGallery };