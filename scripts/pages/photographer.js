//============ RECUPERATION DES DONNEES JSON "PHOTOGRAPHERS" ============
async function getPhotographers() {
        
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		// eslint-disable-next-line no-undef
		.then((data) => (photographers = data.photographers));

	return {
		// eslint-disable-next-line no-undef
		photographers: [...photographers]            
	};
}

//============== RECUPERATION DES DONNEES JSON "MEDIA" ===================
async function getMedia() {       
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		// eslint-disable-next-line no-undef
		.then((data) => (media = data.media));
    
	return {
		// eslint-disable-next-line no-undef
		media : [...media]
	};            
}

//=================== AFFICHAGE DE LA GALERIE PHOTO DE LA PAGE PHOTOGRAPHER =================
async function displayDataGalery(media) {
	const photographersGalerySection = document.querySelector(".photographerGalery");
	media.forEach(itemMedia => {
		// eslint-disable-next-line no-undef
		if(urlIdPhotographer === itemMedia.photographerId) {
			// eslint-disable-next-line no-undef
			const photographerGaleryModel = photographerMediaFactory(itemMedia);
			const userGaleryCardDOM = photographerGaleryModel.getGaleryCardDom();
			photographersGalerySection.appendChild(userGaleryCardDOM);       
		}
	});
}

//==================== AFFICHAGE DES PROFILS DE LA PAGE PHOTOGRAPHER ====================
async function displayDataPhotographer(photographers) {
	photographers.forEach(photographer => {
		// eslint-disable-next-line no-undef
		if(urlIdPhotographer === photographer.id) {
			// eslint-disable-next-line no-undef
			photographerHeaderPage(photographer);
		}
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	const { media } = await getMedia();
	displayDataGalery(media);
	displayDataPhotographer(photographers);
	// eslint-disable-next-line no-undef
	getTotalLike(media, photographers);
	// eslint-disable-next-line no-undef
	validate();
	// eslint-disable-next-line no-undef
	Lightbox.init();
	// eslint-disable-next-line no-undef
	// sortPhoto(media);
	// eslint-disable-next-line no-undef
	trapFocus(modal);  
	// eslint-disable-next-line no-undef
	sort();
}
init();

