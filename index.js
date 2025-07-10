   function generateRandomAnimeID() {
            const randomId = Math.floor(Math.random() * 50000) + 1;
            return randomId;
        };

        function fetchAnimeData(id) {
            return fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Anime with ID: ${id} doesn't exist or is disabled.`);

                    }
                    return response.json();
                })
                .then(anime => {
                    //console.log(anime.data); test
                    return anime.data
                })
        }

        function tryFetchingAnime() {
            const id = generateRandomAnimeID();
            fetchAnimeData(id) //ID value for manual testing
                .then(anime => {
                    if (anime) {
                        renderAnime(anime);
                    }
                })
                .catch(() => {
                    const animeFetchDiv = document.querySelector("#anime-fetch").innerHTML = `<div class="hamster-wrapper">
                    <p class="hamster-text"><b>Hamster finder says:</b> Searching... please wait. We're working as fast as our little hamster hands can.</p>
                     <img class="hamster" src="img/mailman-hamster.png" alt="cute-mailman-hamster">
                    </div>
                    `;
                    setTimeout(tryFetchingAnime, 350);
                });
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

        tryFetchingAnime();
