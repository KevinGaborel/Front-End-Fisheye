/* eslint-disable no-unused-vars */

function photographerFactory(data) {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    // va creer un elt article, ainsi qu'une succession d'autres elt, comme le lien vers la page d'un photographe
    // utilise picture, name, country, tagline, price, id et city
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", ' ');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const link = document.createElement('a');
        // création du lien pour acceder à la page du photographe
        link.setAttribute('href', `/photographer?id=${id}`);
        link.setAttribute('aria-label', name);

        const paragraph = document.createElement('p');
        paragraph.style.display = 'flex';
        paragraph.style.flexDirection = 'column';
        paragraph.style.alignItems = 'center';
        paragraph.style.margin = '0';
        
        const spanCountry = document.createElement('span');
        spanCountry.textContent = `${city}, ${country}`;
        spanCountry.style.fontWeight = "500";
        spanCountry.style.color = '#901C1C';

        const spanTagline = document.createElement('span');
        spanTagline.textContent = tagline;
        spanTagline.style.color = 'black';
        spanTagline.style.fontSize = '0.7em';

        const spanPrice = document.createElement('span');
        spanPrice.textContent = `${price}€/jour`;
        spanPrice.style.color = '#525252';
        spanPrice.style.fontSize = '0.7em';

        link.appendChild(img);
        link.appendChild(h2);
        paragraph.appendChild(spanCountry);
        paragraph.appendChild(spanTagline);
        paragraph.appendChild(spanPrice);
        article.appendChild(link);
        article.appendChild(paragraph);

        return (article);
    }


    // retourne un objet avec deux elt de type node.
    function getUserHeaderDOM() {
        const paragraphContainer = document.createElement('div');

        const titleName = document.createElement('h1');
        titleName.textContent = name;

        const paragraph = document.createElement('p');
        paragraph.textContent = `${city}, ${country}`;

        const spanTagline = document.createElement('span');
        spanTagline.textContent = tagline;

        const img = document.createElement('img');
        img.setAttribute('alt', name);
        img.setAttribute('src', `./assets/photographers/${portrait}`);

        paragraph.appendChild(spanTagline);
        paragraphContainer.appendChild(titleName);
        paragraphContainer.appendChild(paragraph);

        return {paragraphContainer, img};
    }

    return { name, picture, getUserCardDOM, getUserHeaderDOM }
}