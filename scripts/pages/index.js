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
    
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographers.forEach((photographer) => {
		// eslint-disable-next-line no-undef
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
      
init();
    