function generateRandomAnimeID(maxValue) {
    const randomId = Math.floor(Math.random() * maxValue) + 1;
    return randomId;
};

async function fetchAnimeData(animeIdNumber) {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeIdNumber}/full`);
    if (!response.ok) {
        throw new Error(`Anime with ID: ${animeIdNumber} doesn't exist or is disabled.`);

    }
    const anime = await response.json();
    return anime.data;
}

function renderAnime(anime) {
    const animeFetchDiv = document.querySelector("#anime-fetch");
    if (anime) {
        animeFetchDiv.innerHTML = `
                <button class="anime-button" onclick="tryFetchingAnime()">New Anime</button>
                <h2 class="anime-title">${anime.title}</h2>
                <span class="anime-id"><b>MAL ID:</b> ${anime.mal_id}</span>
                <img class="anime-image" src="${anime.images.webp.large_image_url}" alt="${anime.title} cover image.">
                <p class="anime-synopsis"><b>Synopsis:</b> ${anime.synopsis}</p> 
                <div class="anime-data">
                <p><b>Type:</b> ${anime.type}</p>
                <p><b>Score:</b> ${anime.score}</p>
                <p><b>Episodes:</b> ${anime.episodes}</p>
                <p><b>Duration:</b> ${anime.duration}</p>
                <p><b>Genres:</b> ${anime.genres.map(genre => genre.name).join(", ")}</p>
                <p><b>Status:</b> ${anime.status}</p>
                <a href="https://myanimelist.net/anime/${anime.mal_id}" target="_blank">View on MAL</a>    
                </div>
                `;
    }
};

function renderPleaseWaitHamster() {
    const animeFetchDiv = document.querySelector("#anime-fetch");
    animeFetchDiv.innerHTML =
        `<div class="hamster-wrapper">
        <p class="hamster-text"><b>Hamster finder says:</b> Searching... please wait. We're working as fast as our little hamster hands can.</p>
        <img class="hamster" src="img/mailman-hamster.png" alt="cute-mailman-hamster">
        </div>
        `;
}

function tryFetchingAnime() {
    const id = generateRandomAnimeID(50000);
    fetchAnimeData(id) //ID value for manual testing
        .then(anime => {
            console.log(anime);
            renderAnime(anime);
        })
        .catch(() => {
            renderPleaseWaitHamster();
            setTimeout(tryFetchingAnime, 350);
        });
}




tryFetchingAnime();
