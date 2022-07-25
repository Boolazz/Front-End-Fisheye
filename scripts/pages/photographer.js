//======== RÉCUPÉRATION DES DONNÉES PHOTOGRAPHES JSON ========
async function getPhotographers() {
  
    await fetch('./data/photographers.json', {mode : 'cors'})
      .then (res => res.json())
      .then((data) => (photographers = data.photographers));
    return {
      photographers: [...photographers]
    };
}

//======== RÉCUPÉRATION DES DONNÉES MEDIA JSON ========
async function getMedia() {

    await fetch('./data/photographers.json')
        .then((res) => res.json())
        .then((data) => (media = data.media));

    return {
        media : [...media]
    };
}

//======== AFFICHAGE DES PHOTOS DE LA PAGE PHOTOGRAPHERS ========
async function displayDataGalery(media) {
    const photographersGalerySection = document.querySelector('.photographerGalery');
    media.foreach(itemMedia => {
        if(urlIdPhotographer === itemMedia.photographerID) {
            const photographersGaleryModel = photographerMediaFactory(itemMedia);
            const userGaleryCardDOM = photographerGaleryModel.gatGaleryCardDom();
            photographersGalerySection.appendChild(userGaleryCardDOM);
        }
    });
}
