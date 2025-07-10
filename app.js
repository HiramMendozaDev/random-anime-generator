const getRandomAnime = async () => {

    const response = await fetch("https://api.jikan.moe/v4/random/anime");
    const animeObject = await response.json();
    return animeObject.data;

};

function renderAnimeIU(anime) {

    const animeFetchdiv = document.querySelector("#anime-fetch");
    const animeGenres = anime.genres.map(genre => genre.name).join(", ");

    function isNull(prop) {
        if (prop === null || prop === "") {
            return "Unknown";
        } else {
            return prop
        }
    }

    animeFetchdiv.innerHTML = `
        <button class="anime-button">New Anime</button>
        <h2 class="anime-title">${anime.title}</h2>
        <span class="anime-id"><b>MAL ID:</b> ${anime.mal_id}</span>
        <img class="anime-image" src="${anime.images.webp.large_image_url}" alt="${anime.title} cover image.">
        <p class="anime-synopsis"><b>Synopsis:</b> ${isNull(anime.synopsis)}</p> 
        <div class="anime-data">
        <p><b>Type:</b> ${isNull(anime.type)}</p>
        <p><b>Score:</b> ${isNull(anime.score)}</p>
        <p><b>Episodes:</b> ${isNull(anime.episodes)}</p>
        <p><b>Duration:</b> ${isNull(anime.duration)}</p>
        <p><b>Genres:</b> ${isNull(animeGenres)}</p>
        <p><b>Status:</b> ${isNull(anime.status)}</p>
        <a href="https://myanimelist.net/anime/${anime.mal_id}" target="_blank">View on MAL</a>    
        </div>
    `;

    document.querySelector(".anime-button").addEventListener("click", findNewAnime);

};

async function findNewAnime() {

    const newAnime = await getRandomAnime();
    const animeRating = newAnime.rating;


    if (animeRating.includes("Rx")) {
        findNewAnime();
    } else {
        renderAnimeIU(newAnime);
    }

}

async function app() {
    try {
        findNewAnime();
    } catch (error) {
        console.error(error);
    }
};

app();