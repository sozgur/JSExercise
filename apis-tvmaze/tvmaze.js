/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // Make an ajax request to the searchShows api.
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = res.data;

  return data.map((item) => {
    const image =
      item.show.image !== null
        ? item.show.image.medium
        : "https://tinyurl.com/tv-missing";
    return {
      id: item.show.id,
      name: item.show.name,
      summary: item.show.summary,
      image,
    };
  });
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src=${show.image}>
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary episode-button">Episodes</button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // get episodes from tvmaze
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const data = res.data;

  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      summary: item.season,
      number: item.number,
    };
  });
}

/** Populate episode list:
 *     - given list of episodes, add episode to DOM
 *     - hide show list and show episode list
 */
function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (episode of episodes) {
    let $item = $(`
      <li>${episode.name} (season ${episode.season}, number ${episode.number})</li>
      `);
    $episodesList.append($item);
  }
  $("#shows-list").hide();
  $("#episodes-area").show();
}

// Handle get episodes of show
$("#shows-list").on("click", async function handleEpisodes(e) {
  if ($(e.target).hasClass("episode-button")) {
    const showID = $(e.target).closest(".card").attr("data-show-id");
    let episodes = await getEpisodes(showID);
    populateEpisodes(episodes);
  }
});
