function mediaFactory(data) {
    const { date, id, likes, photographerId, price, title, video, image } = data;

    const photograph = [
        {name: 'Ellie Rose', id: 930},
        {name: 'Marcel', id: 195},
        {name: 'Mimi', id: 243},
        {name: 'Nabeel', id: 527},
        {name: 'Rhode', id: 925},
        {name: 'Tracy', id: 82}
    ];

    function getMediaCardDOM() {
        const article = document.createElement('article');

        const folderName = photograph.find(obj => obj.id === photographerId).name;

        if (data.video){
            const videoElt = document.createElement('video');
            videoElt.setAttribute('src', `/assets/photographers/${folderName}/${video}`);
            videoElt.classList.add('media');

            article.appendChild(videoElt);
        } else{
            const imgElt = document.createElement('img');
            imgElt.classList.add('media');
            imgElt.setAttribute("src", `/assets/photographers/${folderName}/${image}`);
            imgElt.setAttribute("alt", title);

            const link = document.createElement('a');
            link.setAttribute('href', `/photographer?media=${image}&id=${id}`);

            link.appendChild(imgElt);
            article.appendChild(link);
        }

        const divFooter = document.createElement('div');
        divFooter.classList.add('article-footer');

        const h3 = document.createElement( 'h3' );
        h3.textContent = title;

        const divFav = document.createElement('div');

        const spanFav = document.createElement('span');
        spanFav.textContent = likes;
        spanFav.style.marginRight = '10px';
        spanFav.style.fontWeight = '600';

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

    return { getMediaCardDOM, getInfoPhotographer };
};