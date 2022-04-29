function photographerFactory(data) {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", ' ');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const link = document.createElement('a');
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
    return { name, picture, getUserCardDOM }
}