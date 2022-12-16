var searchInput = $(".search");
var itemWrapper = $("main");

function displayMatches(matches) {
  itemWrapper.html("");

  if (!matches) {
    itemWrapper.html('<p class="no-search">No results found.</p>');
  } else {
    for (var matchObj of matches) {
      itemWrapper.append(
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

  var searchText = searchInput.val().trim();

  if (keyCode === 13 && searchText) {
    $.get(`https://www.omdbapi.com/?apikey=3fa32110&s=${searchText}`).then(
      function (data) {
        displayMatches(data.Search);
      }
    );
  }
}

function init() {
  searchInput.keydown(getMovieData);
}

init();
