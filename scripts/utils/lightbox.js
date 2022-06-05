function closeLightboxModal(){
    const lightboxElt = document.querySelector('.lightbox');
    const lightboxContentElt = lightboxElt.querySelector('.lightbox-content');


    //suppression de l'image ou video, et du titre
    if (lightboxContentElt.querySelector('img')){
        lightboxContentElt.removeChild(lightboxContentElt.querySelector('img'));
    } else{
        lightboxContentElt.removeChild(lightboxContentElt.querySelector('video'));
    }

    lightboxContentElt.removeChild(lightboxContentElt.querySelector('h3'));

    lightboxElt.style.display = 'none';
};