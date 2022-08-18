// RECUPERATION DE L'ID DES PHOTOGRAPHES DANS L'URL

const queryString = window.location.search; // récupère l'url entre le ? et le #
const urlParams = new URLSearchParams(queryString); // qu'est-ce que URLserachparam ? recuperer tous les parametres
const urlIdPhotographer = parseInt(urlParams.get("id")); // qu'est-ce que parseint ? transofme les string en nombre

// DECLARATION DES VARIABLES POUR LE CALCUL DE LIKES

const totalLike = document.createElement("span");
const arrayLikes = [];
let likesSum = 0;

// FONCTIONS POUR CREER LA SECTION INFORMATION PHOTOGRAPHE DE LA PAGE DE PROFIL DES PHOTOGRAPHES

function photographerHeaderPage(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");
	const {
		name, portrait, city, country, tagline //comment s'appelle cette méthode ?
	} = photographer;
	const divPhotographerProfile = document.createElement("div");
	divPhotographerProfile.classList.add("photographerProfile");
	divPhotographerProfile.innerHTML = `<h1 class="photographerName">${name}</h1>
                                        <p class="photographerCity">${city}, ${country}
                                        <p class="photographerTagline">${tagline}</p>`;
	const photographerPortraitContainer = document.createElement("div");
	photographerPortraitContainer.classList.add("photographer-portrait-container");
	const photographerPortrait = document.createElement("img");
	photographerPortrait.setAttribute("src", `assets/photographers/${portrait}`);
	photographerPortrait.setAttribute("alt", `Photo de profil de ${name}`);
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(divPhotographerProfile);
	return photographerHeader;
}

// FONCTIONS POUR CREER LA GALERIE PHOTO DES PAGES DE PROFIL DES PHOTOGRAPHES

function photographerMediaFactory(data) {
	const {
		id, photographerId, title, image, likes, video // comment s'apelle cette methode
	} = data;
	function getGaleryCardDom() {
		const photographerGalerySection = document.querySelector(".photographerGalery");
		photographerGalerySection.classList.add("container");

		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographerGalery__item");

		// AFFICHAGE DU NOM DE LA PHOTO

		const photographerArticleInfos = document.createElement("div");
		photographerArticleInfos.classList.add("photographerGalery__item-info");
		const photographerArticleTitle = document.createElement("h2");
		photographerArticleTitle.classList.add("title-photo");
		photographerArticleTitle.textContent = `${title}`;
		photographerArticleTitle.setAttribute("tabindex", "0");
		photographerArticleInfos.appendChild(photographerArticleTitle);

		// AFFICHAGE DU NOMBRE DE LIKE

		const photographArticleLike = document.createElement("div");
		photographArticleLike.classList.add("photographerGalery__item-info--like");
		const photographerArticleNbLike = document.createElement("span");
		photographerArticleNbLike.classList.add("photographerGalery__item-info--Nblike");
		photographerArticleNbLike.id = `${id}`;
		photographerArticleNbLike.textContent = parseInt(`${likes}`);
		photographerArticleNbLike.setAttribute("tabindex", "0");
		photographerArticleNbLike.setAttribute("aria-label", "nombre de likes");
		photographArticleLike.appendChild(photographerArticleNbLike);
		photographerArticleInfos.appendChild(photographArticleLike);

		// AFFICHAGE DE L'ICONE COEUR

		const photographArticleHeart = document.createElement("i");
		photographArticleHeart.className = "fas fa-heart";
		photographArticleHeart.id = `${id}`;
		photographArticleHeart.setAttribute("tabindex", "0");
		photographArticleHeart.setAttribute("aria-label", "coeur pour ajouter un like");
		photographArticleLike.appendChild(photographArticleHeart);

		// CONDITIONS D'AFFICHAGE DE PHOTO OU VIDEO

		const photographerArticleImg = document.createElement("div");
		const photographerArticleVideo = document.createElement("div");
		if (image) {
			photographerArticleImg.classList.add("photographerGalery__item-img");
			photographerArticleImg.innerHTML = `<img class="imgGalery" src="assets/photos/${photographerId}/${image}" alt="${title}" tabindex="0">`;
		} else if (video) {
			photographerArticleVideo.classList.add("photographerGalery__item-img");
			photographerArticleVideo.innerHTML = `<video class="imgGalery" src="assets/photos/${photographerId}/${video}" alt="${title}"/>`;
		}

		// AJOUT DE LIKE

		photographArticleHeart.addEventListener("click", plusOne);
		photographArticleHeart.addEventListener("keydown", removeListenerKeyDown);

		function removeListenerKeyDown(e) {
			if (e.key === "Enter") {
				plusOne();
			}
			photographArticleHeart.removeEventListener("keydown", removeListenerKeyDown);
		}

		function plusOne() {
			let numberLikes = photographerArticleNbLike.textContent = parseInt(`${likes}`);
			numberLikes++;
			photographerArticleNbLike.textContent = numberLikes.toString();

			totalLike.textContent = likesSum += 1;
			photographArticleHeart.removeEventListener("click", plusOne);		
		}

		photographerArticle.appendChild(photographerArticleImg); 
		photographerArticle.appendChild(photographerArticleVideo);
		photographerArticle.appendChild(photographerArticleInfos);

		return (photographerArticle);
	}
	return { getGaleryCardDom };
}

// ONGLET NOMBRE DE LIKE ET PRIX

function getTotalLike(data, photographers) {
	const totalLikeContent = document.querySelector(".total-like-content");

	// CREATION DIV ET SON CONTENU

	const likesHeart = document.createElement("div");
	likesHeart.className = "likes-heart";
	totalLikeContent.appendChild(likesHeart);
	totalLike.className = "total-like";
	likesHeart.appendChild(totalLike);
	const heart = document.createElement("i");
	heart.className = "fas fa-heart";
	likesHeart.appendChild(heart);

	// RECUPERATION DES VALEURS LIKES 

	for (const mediaItem of data) {
		if (urlIdPhotographer === mediaItem.photographerId) {
			const numberLikesSpan = document.getElementById(`${mediaItem.id}`);
			const numberLikes = parseInt(numberLikesSpan.innerHTML);
			arrayLikes.push(numberLikes);
		}
	}
	// CALCUL ET AFFICHAGEDU TOTAL DES LIKES 

	for (let i = 0; i < arrayLikes.length; i++) {
		likesSum += arrayLikes[i];
	}
	totalLike.innerHTML = likesSum;

	// CREATION ET AFFICHAGE PRIX/JOUR PHOTOGRAPHE 

	const addPrice = document.createElement("span");
	addPrice.setAttribute("aria-label", "tarif journalier de la prestation du photographe");
	addPrice.className = "price";
	totalLikeContent.appendChild(addPrice);
	for (const photographer of photographers) {
		if (urlIdPhotographer === photographer.id) {
			addPrice.innerHTML = `${photographer.price}/jour`;
		}
	}
}

// FONCTIONNALITES DU FILTRE

const button = document.querySelector("#button");
const selectDropdown = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectItems = document.querySelectorAll(".select-item");
const selectLabel = document.querySelector("#select-label");
const photographerGalery = document.querySelector(".photographerGalery");
const btnArrow = document.querySelector(".btn-arrow");

button.addEventListener("click", function (e) {
	e.preventDefault();
	toggleHidden();
	
});

function toggleHidden() {
	selectDropdown.classList.toggle("hidden");
	btnArrow.classList.toggle("btn-rotate");
}

function setSelectTitle(e) {
	const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
	selectLabel.innerText = labelElement;
	toggleHidden();
}

// FONCTION DE TRI DU FILTRE

async function displayDataGaleryzer(media) {
	const photographersGalerySection = document.querySelector(".photographerGalery");
	let articles = `<div class="photographerGalery container">`;
	media.forEach(itemMedia => {
		articles += `<article class="photographerGalery__item">
		<div class="photographerGalery__item-img">`
		if (itemMedia.video !== undefined)
			articles += `<video class="imgGalery" src="assets/photos/${itemMedia.photographerId}/${itemMedia.video}" alt="Tricks in te air"></video>`
		else
			articles += `<img class="imgGalery" src="assets/photos/${itemMedia.photographerId}/${itemMedia.image}" alt="Horseshoe" tabindex="0">`
		
		articles += `</div>
		<div></div>
		<div class="photographerGalery__item-info">
			<h2 class="title-photo" tabindex="0">${itemMedia.title}</h2>
			<div class="photographerGalery__item-info--like">
				<span class="photographerGalery__item-info--Nblike" id="${itemMedia.id}" tabindex="0" aria-label="nombre de likes">${itemMedia.likes}</span>
				<i class="fas fa-heart" id="${itemMedia.id}" tabindex="0" aria-label="coeur pour ajouter un like" aria-hidden="true"></i>
			</div>
		</div>
		</article>`
	});
	articles += '</div>';
	photographersGalerySection.outerHTML = articles;
}

async function getMedia(value) {  
	let dropDownTitle    
	await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => {
			mediazer = data.media;
			mediazer = mediazer.filter(
				function(mediazer) {
					return mediazer.photographerId === urlIdPhotographer;
				}
			)
			console.log(mediazer);
			if (value === 'date') 
				displayDataGaleryzer(sortByDate(mediazer));
				dropDownTitle = 'Date';
			if (value === 'likes')
				displayDataGaleryzer(sortByLike(mediazer));
				dropDownTitle = 'Popularité';
			if (value === 'title')
				displayDataGaleryzer(sortByTitle(mediazer));
				dropDownTitle = 'Titre';
		});
}


function sortByDate(mediazer) {
	return mediazer.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByLike(mediazer) {
	return mediazer.sort((a, b) => b.likes - a.likes);
}

function sortByTitle(mediazer) {
	return mediazer.sort((a, b) => {
		if (a.title < b.title) { return -1; }
	});
}

function sort() {

	options.forEach((option) => {
	
		option.addEventListener("click", (e) => {
			const value = e.target.value
			getMedia(value);
			toggleHidden();
			setSelectTitle(e);
			const labelElement = document.querySelector(`label[for="${e.target.id}"]`).textContent;
			photographerGalery.innerHTML = "";
			toggleHidden();
			
			switchData(labelElement);
			displayDataGalery(media);
			Lightbox.init();
		});
	});	

	for(let item of selectItems) {
		item.addEventListener("keydown", (e) => {
			const itemTexContent = item.textContent;
			if(e.key === "Enter") {
				photographerGalery.innerHTML = "";
				selectLabel.innerText = e.target.textContent;
				toggleHidden();
				switchData(itemTexContent);
				displayDataGalery(media);
				Lightbox.init();
			}
		});	
	}
}



