async function getPhotographers() {
  
    await fetch('./data/photographers.json', {mode : 'cors'})
      .then (res => res.json())
      .then((data) => (photographers = data.photographers));
    return {
      photographers: [...photographers]
    };
}

async function getMedia() {

    await fetch('./data/photographers.json')
        .then((res) => res.json())
        .then((data) => (media = data.media));

    return {
        media : [...media]
    };
}