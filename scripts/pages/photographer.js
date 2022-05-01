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

async function displayData(photographer, media) {
    const photographHeaderElt = document.querySelector(".photograph-header");
    const contactBtnElt = photographHeaderElt.querySelector('.contact_button');

    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();

    photographHeaderElt.insertBefore(userHeaderDOM.paragraphContainer, contactBtnElt);
    photographHeaderElt.appendChild(userHeaderDOM.img);

    /*
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographHeaderElt.appendChild(userCardDOM);
    });
    */
};

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = parseInt(params.get('id'));

    const btnBorderByElt = document.getElementById('order-by');
    const orderListElt = document.getElementById('order-list');

    btnBorderByElt.addEventListener('click', () => {
        orderListElt.style.display = 'block';
    });

    console.log(id);

    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(id);

    console.log(photographers[0], media);

    displayData(photographers[0], media);
};

init();