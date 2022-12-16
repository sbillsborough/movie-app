var searchInput = document.querySelector(".search");
var itemWrapper = document.querySelector("main");

function displayMatches(matches) {
  itemWrapper.innerHTML = "";

  if (!matches) {
    itemWrapper.innerHTML = '<p class="no-search">No results found</p>';
  } else {
    for (var matchObj of matches) {
      itemWrapper.insertAdjacentHTML(
        "beforeend",
        `
        <div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${matchObj.Poster});">
          <h3>${matchObj.Title}</h3>
          <p>
          ${matchObj.Year}
          </p>
          <a href="https://www.imdb.com/title/${matchObj.imdbID}">View more details.</a>
        </div>
        `
      );
    }
  }
}

function getMovieData(event) {
  var keyCode = event.keyCode;

  var searchText = searchInput.value.trim().toLowerCase();

  if (keyCode === 13 && searchText) {
    var responsePromise = fetch(
      `https://www.omdbapi.com/?apikey=3fa32110&s=${searchText}`
    );

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise.then(handleResponse).then(function (data) {
      displayMatches(data.Search);
    });
  }
}

function init() {
  searchInput.addEventListener("keydown", getMovieData);
}

init();
