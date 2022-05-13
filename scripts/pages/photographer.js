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

    // On inclut le nom du photographe dans le modal contact.
    const titleModal = document.querySelector('.modal__title');
    titleModal.textContent = `${titleModal.textContent + photographer.name}`;

    console.log("c'est les medias", medias);

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaContainerElt.appendChild(mediaCardDOM);
    });


    const mediaModel = mediaFactory(photographer);
    const mediaInfoPhotographDOM = mediaModel.getInfoPhotographer(medias);

    console.log(mediaInfoPhotographDOM);

    document.querySelector('main').appendChild(mediaInfoPhotographDOM);
};

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = parseInt(params.get('id'));

    const btnOrderByElt = document.getElementById('order-by');
    const orderListElt = document.getElementById('order-list');


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
    });

    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(id);

    console.log(photographers[0], media);

    displayData(photographers[0], media);
};

init();