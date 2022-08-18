const queryString = window.location.search; // récupère l'url entre le ? et le #
const urlParams = new URLSearchParams(queryString); // qu'est-ce que URLserachparam ? recuperer tous les parametres
const urlIdPhotographer = parseInt(urlParams.get("id")); // qu'est-ce que parseint ? transofme les string en nombre

// COMMANDE FETCH DES DONNEES DES PHOTOGRAPHES
async function getPhotographers() {
        
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (photographers = data.photographers));

	return {
		photographers: [...photographers]            
	};
}

// COMMANDE FETCH DES DONNEES MEDIAS
async function getMediaA() {      
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (media = data.media));
    
	return {
		media : [...media]
	};            
}

// AFFICHAGE DE LA GALERIE PHOTO DANS LES PAGES DE PROFIL DES PHOTOGRAPHES
async function displayDataGalery(media) {
	const photographersGalerySection = document.querySelector(".photographerGalery");
	media.forEach(itemMedia => {
		if(urlIdPhotographer === itemMedia.photographerId) {
			const photographerGaleryModel = photographerMediaFactory(itemMedia);
			const userGaleryCardDOM = photographerGaleryModel.getGaleryCardDom();
			photographersGalerySection.appendChild(userGaleryCardDOM);       
		}
	});
}

// AFFICHAGE DES PROFILS DE LA PAGE PHOTOGRAPHER 

async function displayDataPhotographer(photographers) {
	photographers.forEach(photographer => {
		if(urlIdPhotographer === photographer.id) {
			photographerHeaderPage(photographer);
		}
	});
}

async function init() {
	const { photographers } = await getPhotographers();
	const { media } = await getMediaA();
	displayDataGalery(media);
	displayDataPhotographer(photographers);
	getTotalLike(media, photographers);
	validate();
	Lightbox.init();
	trapFocus(modal);  

	sort();
}
init();

