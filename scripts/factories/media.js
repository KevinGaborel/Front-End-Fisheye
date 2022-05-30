function mediaFactory(data) {
    const { date, id, likes, photographerId, price, title, video, image, folderName } = data;

    // creer et retourne un elt du DOM, article
    function getMediaCardDOM(medias) {

        const article = document.createElement('article');

        // fonction qui creer un titre, et un elt video ou image en fonction des datas
        function getLightbox(e){
            e.preventDefault();
            const lightboxElt = document.querySelector('.lightbox');
            const lightboxContentElt = lightboxElt.querySelector('.lightbox-content');
            lightboxContentElt.focus();

            if (data.video){
                const videoLightbox = document.createElement('video');
                videoLightbox.setAttribute("src", `/assets/photographers/${folderName}/${video}`);
                videoLightbox.setAttribute('controls', true);

                videoLightbox.dataset.id = data.id;

                lightboxContentElt.appendChild(videoLightbox);
            } else{
                const img = document.createElement('img');
                img.setAttribute("src", `/assets/photographers/${folderName}/${image}`);
                img.setAttribute("alt", title);

                img.dataset.id = data.id;

                lightboxContentElt.appendChild(img);
            }
            
            const titleLightbox = document.createElement('h3');
            titleLightbox.textContent = title;
            
            lightboxContentElt.appendChild(titleLightbox);

            lightboxElt.style.display = 'flex';

            // event clavier
            document.addEventListener('keydown', (e) => {
                const key = e.key;
                if(key === 'ArrowLeft'){
                    updateLightbox(medias, 'left');
                };
                if(key === 'ArrowRight'){
                    updateLightbox(medias, 'right');
                };
                if(key === 'Escape'){
                    lightboxElt.style.display === 'flex' && closeLightboxModal();
                };
            });
        };

        if (data.video){
            const videoElt = document.createElement('video');
            videoElt.setAttribute('src', `/assets/photographers/${folderName}/${video}`);
            videoElt.classList.add('media');

            const link = document.createElement('a');

            link.addEventListener('click', getLightbox);
            link.setAttribute('href', ` `);

            link.appendChild(videoElt);

            article.appendChild(link);
        } else{
            const imgElt = document.createElement('img');
            imgElt.classList.add('media');
            imgElt.setAttribute("src", `/assets/photographers/${folderName}/${image}`);
            imgElt.setAttribute("alt", title);

            const link = document.createElement('a');
            link.addEventListener('click', getLightbox);
            link.setAttribute('href', ` `);

            link.appendChild(imgElt);
            article.appendChild(link);
        }

        const divFooter = document.createElement('div');
        divFooter.classList.add('article-footer');

        const h3 = document.createElement( 'h3' );
        h3.textContent = title;

        const divFav = document.createElement('div');
        
        let spanFav = document.createElement('span');
        spanFav.textContent = likes;
        spanFav.style.marginRight = '10px';
        spanFav.style.fontWeight = '600';
        
        divFav.addEventListener('click', () => {
            spanFav.textContent = likes + 1;
            updateInfoPhotographer();
        });
        

        const iconeFav = document.createElement('i');
        iconeFav.classList.add('fa-solid', 'fa-heart');
        iconeFav.setAttribute('aria-label', 'likes');
        iconeFav.style.color = '#901C1C';

        divFooter.appendChild(h3);
        divFav.appendChild(spanFav);
        divFav.appendChild(iconeFav);
        divFooter.appendChild(divFav);

        article.appendChild(divFooter);

        return (article);
    };

    function getInfoPhotographer(medias){

        const bottomInfoElt = document.createElement('div');
        bottomInfoElt.classList.add('price-photograph');

        const divElt = document.createElement('div');
        const nbLikes = medias.map(media => media.likes).reduce((x, y) => x + y);
        divElt.textContent = nbLikes;
        const iconeFav = document.createElement('i');
        iconeFav.classList.add('fa-solid', 'fa-heart');
        iconeFav.setAttribute('aria-label', 'likes');

        const spanElt = document.createElement('span');
        spanElt.textContent = `${price}€ / jour`;

        divElt.appendChild(iconeFav);
        bottomInfoElt.appendChild(divElt);
        bottomInfoElt.appendChild(spanElt);

        return bottomInfoElt;
    }

    function updateInfoPhotographer(){
        const likeElt = document.querySelectorAll('.article-footer span');

        let result = 0;
        for (let nbLikes of likeElt){
            result = result + parseInt(nbLikes.textContent);
        }

        const nbLikesElt = document.querySelector('.price-photograph > div');
        nbLikesElt.textContent = result;

        const iconeFav = document.createElement('i');
        iconeFav.classList.add('fa-solid', 'fa-heart');
        iconeFav.setAttribute('aria-label', 'likes');

        nbLikesElt.appendChild(iconeFav);

    }

    function updateLightbox(medias, direction){
        const lightboxElt = document.querySelector('.lightbox');
        const lightboxContentElt = lightboxElt.querySelector('.lightbox-content');
        
        const isVideoElt = lightboxContentElt.querySelector('video');
        const isImageElt = lightboxContentElt.querySelector('img');
        const idMedia = isVideoElt ? isVideoElt.dataset.id : isImageElt.dataset.id;
        
        let newId, newMedia;

        if (direction === 'left'){
            newId = medias.findIndex(obj => obj.id === parseInt(idMedia)) - 1;
            newMedia = newId === -1 || newId === -2 ? medias[medias.length - 1] : medias[newId];
        } else{
            newId = medias.findIndex(obj => obj.id === parseInt(idMedia)) + 1;
            newMedia = newId === medias.length ? medias[0] : medias[newId];
        }
        
        //clean all child
        isVideoElt ? lightboxContentElt.removeChild(isVideoElt) : lightboxContentElt.removeChild(isImageElt);
        lightboxContentElt.removeChild(lightboxElt.querySelector('h3'));


        if (newMedia.video){
            const videoLightbox = document.createElement('video');
            videoLightbox.setAttribute("src", `/assets/photographers/${folderName}/${newMedia.video}`);
            videoLightbox.setAttribute('controls', true);
            videoLightbox.dataset.id = newMedia.id;

            lightboxContentElt.appendChild(videoLightbox);
        } else{
            const img = document.createElement('img');
            img.setAttribute("src", `/assets/photographers/${folderName}/${newMedia.image}`);
            img.setAttribute("alt", newMedia.title);
            img.dataset.id = newMedia.id;

            lightboxContentElt.appendChild(img);
        }
        
        const titleLightbox = document.createElement('h3');
        titleLightbox.textContent = newMedia.title;
        
        lightboxContentElt.appendChild(titleLightbox);
    };

    return { getMediaCardDOM, getInfoPhotographer, updateLightbox };
};