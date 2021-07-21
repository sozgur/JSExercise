let currentMovieID = 0;
let movieMap = [];
let direction = "up";

// Create Movie
$("#movie-form").on("submit", createMovie);

// Delete Movie
$("#movie-table").on("click", "button", function (e) {
    // find the index where this movie is
    let indexToRemoveAt = movieMap.findIndex(
        (movie) => movie.id === +$(e.target).data("id")
    );

    // remove it from the array of movies
    movieMap.splice(indexToRemoveAt, 1);

    //remove it from the DOM
    $(e.target).closest("tr").remove();
});

//Sort according to rating or title
$(".table thead").on("click", "th", function (e) {
    direction = direction === "up" ? "down" : "up";
    let sortKey = $(e.target).attr("id");
    let sortedMovies = sortBy(movieMap, sortKey, direction);

    //empty table and fill it again with sorted
    $("#movie-table").empty();
    for (let movie of sortedMovies) {
        $("#movie-table").append(createMovieHTML(movie));
    }

    console.log(sortedMovies);
});

// Take input calues from movie form and create movie in table
function createMovie(e) {
    e.preventDefault();
    const title = $("#title").val();
    if (title.length < 2) {
        return;
    }
    const rating = $("#rating").val();
    const movieData = { title, rating, id: currentMovieID };
    movieMap.push(movieData);

    $("#movie-table").append(createMovieHTML(movieData));
    $("#movie-form").trigger("reset");
    currentMovieID++;
}

//Create a movie data HTML
function createMovieHTML(data) {
    return `
        <tr>
            <td>${data.title} </td>
            <td>${data.rating} </td>
            <td><button type="button" id=${data.id} class="btn btn-danger">Remove</button></td>
        </tr>
    `;
}

function sortBy(array, sortKey, direction) {
    return array.sort((first, second) => {
        if (first[sortKey] < second[sortKey]) {
            return direction === "up" ? -1 : 1;
        }
        if (first[sortKey] > second[sortKey]) {
            return direction === "up" ? 1 : -1;
        }
        return 0;
    });
}
