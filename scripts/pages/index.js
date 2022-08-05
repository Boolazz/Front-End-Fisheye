// COMMANDE FETCH RECUP DONNEES PHOTOGRAPHES
async function getPhotographers() {
        
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (photographers = data.photographers));
	return {
		photographers: [...photographers]            
	};
}

// AFFICHE LES DONNEES DE CHAQUE PHOTOGRAPHES DANS LA PAGE D'ACCUEIL
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

// INITIALISATION DES FONCTIONS
async function init() {
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
      
init();
    