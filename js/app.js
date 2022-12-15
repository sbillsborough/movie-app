var searchInput = document.querySelector(".search");
var itemWrapper = document.querySelector("main");

// out comes the matches array
function displayMatches(matches) {
  // clear the main html element out
  itemWrapper.innerHTML = "";

  // loop over matches
  for (var matchObj of matches) {
    // insert adjacent HTML to a new div for every match
    itemWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${matchObj.image_url});">
      <h3>${matchObj.title}</h3>
      <p>
      ${matchObj.description}
      </p>
      <a href="${matchObj.imdb_url}">View more details.</a>
    </div>
    `
    );
  }
}

function getMovieData(event) {
  // gets the keycode from the event object
  var keyCode = event.keyCode;
  // search value and trims the space from either end of the string (string only) and turn it into a lowercase string;
  var searchText = searchInput.value.trim().toLowerCase();

  // checks if keycode is 13 (13 is the enter key)
  if (keyCode === 13 && searchText) {
    var matches = [];

    for (var movie of movieData) {
      if (movie.title.toLowerCase().includes(searchText)) {
        // push to matches array
        matches.push(movie);
      }
    }

    // fetch omdb data (fetch is like visitAddress())
    var responsePromise = fetch(
      // returns a promise object
      "https://www.omdbapi.com/?apikey=3fa32110&t=drive"
    );

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise
      .then(handleResponse)
      .then(function (data) {
        console.log(data);
        return "this is cool";
      })
      .then(function (huh) {
        console.log(huh);
        var test = "test";
        console.log(test);
      });

    // outside of for loop but inside if statement
    // in goes the matches array
    displayMatches(matches);
  }
}

function init() {
  searchInput.addEventListener("keydown", getMovieData);
}

init();
// grab html elements
// get the inputs value on enter key press
// grab data related to the users search
// inject the movie items into the dom based on users search
