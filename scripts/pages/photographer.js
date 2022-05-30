//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers(id) {

    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();

        //récupération des datas selon l'id du photographe
        const photographers = data.photographers.filter(data => data.id === id);
        const media = data.media.filter(data => data.photographerId === id);

        console.log("Les datas: ", data, photographers, media);

        return {photographers, media};

    } catch (error) {
        console.log(error);
    }

}

async function displayData(photographer, medias) {
    const photographHeaderElt = document.querySelector(".photograph-header");
    const contactBtnElt = photographHeaderElt.querySelector('.contact_button');
    const mediaContainerElt = document.querySelector('.media-container');

    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();

    photographHeaderElt.insertBefore(userHeaderDOM.paragraphContainer, contactBtnElt);
    photographHeaderElt.appendChild(userHeaderDOM.img);

    // On inclut le nom du photographe dans le titre de la modal contact.
    const titleModalElt = document.querySelector('.modal__title');
    const spanTitleModalElt = document.createElement('span');
    spanTitleModalElt.textContent = photographer.name;

    titleModalElt.appendChild(spanTitleModalElt);

    let folderName = photographer.name.split(' ');
    folderName = folderName[0].split('-').join(' ');

    console.log("c'est les medias", medias);

    medias.forEach((media) => {
        const mediaModel = mediaFactory({...media, folderName});
        const mediaCardDOM = mediaModel.getMediaCardDOM(medias);
        mediaContainerElt.appendChild(mediaCardDOM);
    });


    const mediaModel = mediaFactory({folderName, ...photographer});
    const mediaInfoPhotographDOM = mediaModel.getInfoPhotographer(medias);

    // left arrow ligthbox event 
    const arrowLightboxLeft = document.querySelector('.move-left-lightbox');

    arrowLightboxLeft.addEventListener('click', () => {

        mediaModel.updateLightbox(medias, 'left');
    });

    // left arrow ligthbox event 
    const arrowLightboxRight = document.querySelector('.move-right-lightbox');

    arrowLightboxRight.addEventListener('click', () => {

        mediaModel.updateLightbox(medias, 'right');
    });

    document.querySelector('main').appendChild(mediaInfoPhotographDOM);
};

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = parseInt(params.get('id'));

    const btnOrderByElt = document.getElementById('order-by');
    const orderListElt = document.getElementById('order-list');

    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(id);
    // tri par popularité par défaut
    media.sort((a, b) => b.likes - a.likes);

    displayData(photographers[0], media);


    btnOrderByElt.addEventListener('click', () => {
        orderListElt.style.display = 'block';
    });

    orderListElt.addEventListener('click', (e) => {
        orderListElt.style.display = 'none';

        const spanElt = document.createElement('span');
        spanElt.textContent = '>';

        const tabStrBtn = e.target.textContent.split('');
        const isChevron = tabStrBtn.find(caractere => caractere === '>');

        if (isChevron){
            btnOrderByElt.textContent = tabStrBtn.slice(0, tabStrBtn.length  - 1).join('');
        } else{
            btnOrderByElt.textContent = tabStrBtn.join('');
        }

        btnOrderByElt.appendChild(spanElt);





        const mediaContainerElt = document.querySelector('.media-container');
        const tabArticlesElt = document.querySelectorAll('.media-container > article');

        //on clean les anciennes valeurs
        tabArticlesElt.forEach(elt => mediaContainerElt.removeChild(elt));

        let folderName = photographers[0].name.split(' ');
        folderName = folderName[0].split('-').join(' ');

        // reste a faire fonction de trie

        const triChoice = e.target.textContent;
        if (triChoice === 'Popularité >'){
            media.sort((a, b) => b.likes - a.likes);
        }
        if (triChoice === 'Date'){
            media.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        }
        if (triChoice === 'Titre'){
            media.sort((a, b) => a.title.codePointAt(0) - b.title.codePointAt(0));
        }

        media.forEach((media) => {
            const mediaModel = mediaFactory({...media, folderName});
            const mediaCardDOM = mediaModel.getMediaCardDOM(media);

            mediaContainerElt.appendChild(mediaCardDOM);
        });

    });

};

init();