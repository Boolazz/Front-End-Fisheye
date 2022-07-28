// ======== RECUPERATION DE L'ID DES PHOTOGRAPHES DANS L'URL ========

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlIdPhotographer = parseInt(urlParams.get("id"));

// =============== VARIABLES POUR CALCUL DES LIKES ======================

const totalLike = document.createElement("span");
const arrayLikes = [];
let likesSum = 0;

// ======== FONCTION CREATION DES INFOS DE PROFIL DE LA PAGE PHOTOGRAPHER ==========

// eslint-disable-next-line no-unused-vars
function photographerHeaderPage(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");
	const {
		name, portrait, city, country, tagline
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
	photographerPortrait.setAttribute("alt", "");
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(divPhotographerProfile);
	return photographerHeader;
}

// =============== FONCTION CREATION DE LA GALERIE PHOTO DES PHOTOGRAPHES ====================

// eslint-disable-next-line no-unused-vars
function photographerMediaFactory(data) {
	const {
		id, photographerId, title, image, likes, video
	} = data;
	function getGaleryCardDom() {
		const photographerGalerySection = document.querySelector(".photographerGalery");
		photographerGalerySection.classList.add("container");

		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographerGalery__item");

		// =============== CREATION PARAGRAPHE CONTENANT NOM DE LA PHOTO ===============

		const photographerArticleInfos = document.createElement("div");
		photographerArticleInfos.classList.add("photographerGalery__item-info");
		const photographerArticleTitle = document.createElement("h2");
		photographerArticleTitle.classList.add("title-photo");
		photographerArticleTitle.textContent = `${title}`;
		photographerArticleTitle.setAttribute("tabindex", "0");
		photographerArticleInfos.appendChild(photographerArticleTitle);

		// =============== CREATION SPAN CONTENANT LE NOMBRE DE LIKES ===================

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

		// ================ CREATION DE L'ICONE COEUR ======================================

		const photographArticleHeart = document.createElement("i");
		photographArticleHeart.className = "fas fa-heart";
		photographArticleHeart.id = `${id}`;
		photographArticleHeart.setAttribute("tabindex", "0");
		photographArticleHeart.setAttribute("aria-label", "coeur pour ajouter un like");
		photographArticleLike.appendChild(photographArticleHeart);

		// ============== CONDITION POUR L'AFFICHAGE DES IMAGES OU VIDEOS ======================

		const photographerArticleImg = document.createElement("div");
		const photographerArticleVideo = document.createElement("div");
		if (image) {
			photographerArticleImg.classList.add("photographerGalery__item-img");
			photographerArticleImg.innerHTML = `<img class="imgGalery" src="assets/photos/${photographerId}/${image}" alt="${title}" tabindex="0">`;
		} else if (video) {
			photographerArticleVideo.classList.add("photographerGalery__item-img");
			photographerArticleVideo.innerHTML = `<video class="imgGalery" src="assets/photos/${photographerId}/${video}" alt="${title}"/>`;
		}

		// ==================== AJOUT DES LIKES AU CLICK SUR LE COEUR ===============

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

// ================= FONCTION CALCUL DU TOTAL DES LIKES ET AFFICHAGE DU PRIX ============================

// eslint-disable-next-line no-unused-vars
function getTotalLike(data, photographers) {
	const totalLikeContent = document.querySelector(".total-like-content");

	// ============= CREATION DIV ET SON CONTENU: TOTAL LIKES + COEUR ==================

	const likesHeart = document.createElement("div");
	likesHeart.className = "likes-heart";
	totalLikeContent.appendChild(likesHeart);
	totalLike.className = "total-like";
	likesHeart.appendChild(totalLike);
	const heart = document.createElement("i");
	heart.className = "fas fa-heart";
	likesHeart.appendChild(heart);

	// ================== RECUPERATION DES VALEURS LIKES DANS UN TABLEAU ====================

	for (const mediaItem of data) {
		if (urlIdPhotographer === mediaItem.photographerId) {
			const numberLikesSpan = document.getElementById(`${mediaItem.id}`);
			const numberLikes = parseInt(numberLikesSpan.innerHTML);
			arrayLikes.push(numberLikes);
		}
	}
	// =================== CALCUL ET INSERTION DU TOTAL DES LIKES DANS SPAN ==================

	for (let i = 0; i < arrayLikes.length; i++) {
		likesSum += arrayLikes[i];
	}
	totalLike.innerHTML = likesSum;

	// ================= CREATION ET AFFICHAGE PRIX/JOUR PHOTOGRAPHE ====================

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

// ======================= FONCTIONNALITE DU SELECT ===========================

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

// ======================= FONCTION DE TRIE DU SELECT ===========================

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
	await fetch("./data/photographers.json")
		.then((res) => res.json())
			// eslint-disable-next-line no-undef
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
			if (value === 'likes')
				displayDataGaleryzer(sortByLike(mediazer));
			if (value === 'title')
				displayDataGaleryzer(sortByTitle(mediazer));
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
				
				// eslint-disable-next-line no-undef
				displayDataGalery(media);
				// eslint-disable-next-line no-undef
				Lightbox.init();
			}
		});	
	}
}



