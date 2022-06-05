//Mettre le code JavaScript lié à la page photographer.html

// récupère les data via fetch
async function getPhotographers(id) {

    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();

        //récupération des datas selon l'id du photographe
        const photographers = data.photographers.filter(data => data.id === id);
        const media = data.media.filter(data => data.photographerId === id);

        return {photographers, media};

    } catch (error) {
        console.log(error);
    }

}


async function displayData(photographer, medias) {
    const photographHeaderElt = document.querySelector(".photograph-header");
    const contactBtnElt = photographHeaderElt.querySelector('.contact_button');
    const mediaContainerElt = document.querySelector('.media-container');

    // création du header et mise en place au sein du DOM
    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();

    photographHeaderElt.insertBefore(userHeaderDOM.paragraphContainer, contactBtnElt);
    photographHeaderElt.appendChild(userHeaderDOM.img);

    // On inclut le nom du photographe dans le titre de la modal contact.
    const titleModalElt = document.querySelector('.modal__title');
    const spanTitleModalElt = document.createElement('span');
    spanTitleModalElt.textContent = photographer.name;

    titleModalElt.appendChild(spanTitleModalElt);

    // rendre le nom et prénom du photographe compatible afin d'aller rechercher 
    // les datas (images et vidéos via attribut src)
    let folderName = photographer.name.split(' ');
    folderName = folderName[0].split('-').join(' ');

    //pour chaque elt du tableau medias, on crée une carte qu'on inclus dans le DOM
    //on met également à disposition la totalité du tableau medias, pour la lightbox
    medias.forEach((media) => {
        const mediaModel = mediaFactory({...media, folderName});
        const mediaCardDOM = mediaModel.getMediaCardDOM(medias);
        mediaContainerElt.appendChild(mediaCardDOM);
    });

    
    //on creer l'elt en bas à droite, nb de likes et prix 
    const mediaModel = mediaFactory({folderName, ...photographer});
    const mediaInfoPhotographDOM = mediaModel.getInfoPhotographer(medias);
    document.querySelector('main').appendChild(mediaInfoPhotographDOM);

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

};

async function init() {
    // récupération de l'id du photographe, via une query string
    const params = (new URL(document.location)).searchParams;
    const id = parseInt(params.get('id'));

    const btnOrderByElt = document.getElementById('order-by');
    const orderListElt = document.getElementById('order-list');

    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(id);

    // tri par popularité par défaut
    media.sort((a, b) => b.likes - a.likes);


    displayData(photographers[0], media);

    // fonction qui permet la modification du tableau media
    function getTri(e){
        const mediaContainerElt = document.querySelector('.media-container');
        const tabArticlesElt = document.querySelectorAll('.media-container > article');

        //on clean les anciennes valeurs
        tabArticlesElt.forEach(elt => mediaContainerElt.removeChild(elt));

        // rendre le nom et prénom du photographe compatible afin d'aller rechercher 
        // les datas (images et vidéos)
        let folderName = photographers[0].name.split(' ');
        folderName = folderName[0].split('-').join(' ');

        //ternaire qui va faire une action suivant l'argument en paramètre 
        const triChoice = e.nodeType ? e.textContent : e.target.textContent;

        if (triChoice === 'Popularité >'){
            media.sort((a, b) => b.likes - a.likes);
        }else if (triChoice === 'Date'){
            media.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        } else if (triChoice === 'Titre'){
            //on classe par ordre alphabétique
            media.sort((a, b) => a.title.codePointAt(0) - b.title.codePointAt(0));
        }

        // pour chaque media, on créer une carte, qu'on insère dans le DOM
        media.forEach((media) => {
            const mediaModel = mediaFactory({...media, folderName});
            const mediaCardDOM = mediaModel.getMediaCardDOM(media);

            mediaContainerElt.appendChild(mediaCardDOM);
        });
    };

    //event si on clic sur le btn pour trier, alors affiche les trois options (popularité, date, titre)
    btnOrderByElt.addEventListener('click', (e) => {
        e.preventDefault();
        orderListElt.style.display = 'block';

        // met dans un tableau les enfants de orderListElt
        const tabTriChoice = [...orderListElt.children];
        let currentPosition = 0;

        tabTriChoice[currentPosition].style.backgroundColor = '#D3573C';
        tabTriChoice[currentPosition].style.color = 'black';
        tabTriChoice[currentPosition].focus();

        // permet la selection au clavier 
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            const touche = e.key;

            function getCurrentPosition(actualPosition, tab){
                if (actualPosition > tab.length - 1){
                    return actualPosition = 0;

                }else if (actualPosition < 0){
                    return actualPosition = tab.length - 1;
                }

                return actualPosition;
            }
            
            if (touche === "ArrowDown"){
                currentPosition = getCurrentPosition(currentPosition + 1, tabTriChoice);

                tabTriChoice[currentPosition].focus();
                tabTriChoice[currentPosition].style.backgroundColor = '#D3573C';
                tabTriChoice[currentPosition].style.color = 'black';

                //mettre les couleurs standard aux elts pas séléctionné
                tabTriChoice.filter((elt, index) => index !== currentPosition).forEach(elt => {
                    elt.style.backgroundColor = '#901C1C'; 
                    elt.style.color = "white"
                });

            } else if (touche === "ArrowUp"){
                currentPosition = getCurrentPosition(currentPosition - 1, tabTriChoice);

                tabTriChoice[currentPosition].focus();
                tabTriChoice[currentPosition].style.backgroundColor = '#D3573C';
                tabTriChoice[currentPosition].style.color = 'black';

                tabTriChoice.filter((elt, index) => index !== currentPosition).forEach(elt => {
                    elt.style.backgroundColor = '#901C1C'; 
                    elt.style.color = "white"
                });

            } else if (touche === 'Enter') {
                // si "entrer", alors on lance le tri
                getTri(tabTriChoice[currentPosition]);
                orderListElt.style.display = 'none';
            } else if (touche === 'F5') {
                location.reload();
            } else{
                //cancel event
                orderListElt.style.display = 'none';
            }

        });
    });

    // on gère également la séléction au click
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

        getTri(e);
    });

};


document.addEventListener('DOMContentLoaded', init);