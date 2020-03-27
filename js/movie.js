const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', async function () {
  try {
    const movieLoader = document.querySelector('.movie-loader');
    movieLoader.classList.toggle('loader');
    const keyword = document.querySelector('.keyword-search');
    const movies = await getMovies(keyword.value);
    updateUi(movies);
  }catch(err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err}`,
      footer: ''
    });
  }
});

function getMovies(keyword) {
  return fetch('https://www.omdbapi.com/?apikey=f7a4022a&s=' + keyword)
  .finally(() => {
    const movieLoader = document.querySelector('.movie-loader');
    movieLoader.classList.toggle('loader');
  })
  .then(resp => {
    if ( !resp.ok ) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  })
  .then(m => {
    if (m.Response === 'False') {
      throw new Error(m.Error);
    }
    return m.Search;
  });
}

function updateUi(movies) {
  let movie = '';
  movies.forEach(m => movie += showCard(m));
  const containerMovie = document.querySelector('.movies');
  containerMovie.innerHTML = movie;
}


document.addEventListener('click', async function (e) {
  try {
    if (e.target.classList.contains('btn-movie-details')) {
      const movieLoader = document.querySelector('.modal-detail-loader');
      movieLoader.classList.toggle('loader');

      const imdbId = e.target.dataset.imdbid;
      const moviesDetails = await getMoviesDetails(imdbId);
      updateUiDetail(moviesDetails);
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err}`,
      footer: ''
    });
  }
});

function getMoviesDetails(imdbId) {
  return fetch('https://www.omdbapi.com/?apikey=f7a4022a&i=' + imdbId)
  .finally(() => {
    const movieLoader = document.querySelector('.modal-detail-loader');
    movieLoader.classList.toggle('loader');
  })
  .then(resp => {
    if (resp.Response === 'False') {
      throw new Error(resp.Error);
    }
    return resp.json();
  });
}

function updateUiDetail(moviesDetails) {
  const movieDetail = showCardDetail(moviesDetails);
  const modalMovie = document.querySelector('.modal-movie');
  modalMovie.innerHTML = movieDetail;
}

function showCard(m) {
  return `<div class="col-md-4 my-3">
  <div class="card bg-dark text-white">
  <img src="${m.Poster}" class="card-img-top">
  <div class="card-body">
  <h5 class="card-title text-white">${m.Title}</h5>
  <h6 class="card-subtitle mb-2 text-white">Type : ${m.Type}</h6>
  <h6 class="card-subtitle mb-2 text-white">Year : ${m.Year}</h6>
  <a href="#" class="btn btn-primary btn-movie-details" data-toggle="modal" data-target="#movieModalDetails" data-imdbid="${m.imdbID}">Movie Details</a>
  </div>
  </div>
  </div>`;
}

function showCardDetail(m) {
  return `<div class="row">
  <div class="col-md-3">
  <div class="card">
  <img src="${m.Poster}" class="card-img-top">
  </div>
  </div>
  <div class="col-md">
  <ul class="list-group">
  <li class="list-group-item">Title : ${m.Title}</li>
  <li class="list-group-item">Released : ${m.Released}</li>
  <li class="list-group-item">Genre : ${highlightGenre(m.Genre)}</li>
  <li class="list-group-item">Director : ${m.Director}</li>
  <li class="list-group-item">Actors : ${m.Actors}</li>
  <li class="list-group-item">Writer : ${m.Writer}</li>
  <li class="list-group-item">Plot : ${m.Plot}</li>
  </ul>
  </div>
  </div>`;
}

function highlightGenre(m) {
  const genres = m.split(',');
  return genres.map(genre => `<span class="badge badge-pill badge-success">${genre}</span>`).join(' ');
}