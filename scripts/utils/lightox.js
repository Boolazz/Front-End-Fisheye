const boxImg = document.querySelector(".lightbox-img");
const dom = document.querySelector(".lightboxContainer");
const mainContent = document.getElementById("main");

// eslint-disable-next-line no-unused-vars
class Lightbox {
	static init() {
		const lightboxImg = Array.from(document.querySelectorAll(".imgGalery"));
		const gallery = lightboxImg.map((img) => img.getAttribute("src"));
		const altAttribute = lightboxImg.map((img) => img.getAttribute("alt"));

		lightboxImg.forEach((img) => {
			img.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), e.currentTarget.getAttribute("alt"), gallery, altAttribute);
				document.body.classList.add("stop_scrolling");
				dom.setAttribute("aria-hidden", "false");
				mainContent.setAttribute("aria-hidden", "true");
			});
		});

		lightboxImg.forEach((img) => {
			img.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					new Lightbox(e.currentTarget.getAttribute("src"), e.currentTarget.getAttribute("alt"), gallery, altAttribute);
					document.body.classList.add("stop_scrolling");
					dom.setAttribute("aria-hidden", "false");
					mainContent.setAttribute("aria-hidden", "true");
				}
			});
		});
	}

	/**
     * @param {string} url URL de l'image
     * @param {string[]} images Chemins des images de la lightbox
     */

	constructor(url, alt, images, attributes) {
		this.lightboxElement = this.buildDOM();
		this.images = images;
		this.attributes = attributes;
		this.loadImage(url, alt);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.lightboxElement);
		document.addEventListener("keyup", this.onKeyUp);
	}

	/**
     *
     * @param {string} url URL de l'image
     */

	loadImage(url, alt) {
		this.url = url;
		this.alt = alt;
		if (url.includes("jpg")) {
			boxImg.innerHTML = `<img src="${url}" alt="${alt}"> 
                                <p class="lightbox-tag">${alt}</p>`;
		} else if (url.includes("mp4")) {
			boxImg.innerHTML = `<video src="${url}" alt="${alt}" controls></video> 
                                <p class="lightbox-tag">${alt}</p>`;
		}
	}

	/**
     *
     * @param {keyboarEvent} e
     */

	onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowLeft") {
			this.prev(e);
		} else if (e.key === "ArrowRight") {
			this.next(e);
		}
	}

	/**
     * Ferme la lightbox
     * @param {MouseEvent} e
     */
	close(e) {
		e.preventDefault();
		this.lightboxElement.remove();
		document.removeEventListener("keyup", this.onKeyUp);
		document.body.classList.remove("stop_scrolling");
		dom.setAttribute("aria-hidden", "true");
		mainContent.setAttribute("aria-hidden", "false");
	}

	next(e) {
		e.preventDefault();
		let indexUrl = this.images.findIndex((image) => image === this.url);
		let indexAlt = this.attributes.findIndex((attribute) => attribute === this.alt);
		if (indexUrl === this.images.length - 1) {
			indexUrl = 0;
			indexAlt = 0;
		}
		this.loadImage(this.images[indexUrl + 1], this.attributes[indexAlt + 1]);
	}

	prev(e) {
		e.preventDefault();
		let indexUrl = this.images.findIndex((image) => image === this.url);
		let indexAlt = this.attributes.findIndex((attribute) => attribute === this.alt);

		if (indexUrl === 0) {
			indexUrl = this.images.length;
			indexAlt = this.attributes.length;
		}
		this.loadImage(this.images[indexUrl - 1], this.attributes[indexAlt - 1]);
	}

	/**
     * @param {string} url URL de l'image
     * @return {HTMLelement}
     */

	buildDOM() {
		dom.style = "visibility:visible";
		dom.querySelector(".close").addEventListener("click", this.close.bind(this));
		dom.querySelector(".slide-next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".slide-prev").addEventListener("click", this.prev.bind(this));
		
		return dom;
	}
}
